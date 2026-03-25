// ═══════════════════════════════════════════════════════════════════════
// "云海 · Sublime Canyon"  —  Enhanced Edition
// Volumetric cloud sea, reflective water, starfield, rim-lit peaks,
// animated mist tendrils, and cinematic tone mapping
// ═══════════════════════════════════════════════════════════════════════

#define LAYERS       12.0
#define PI           3.14159265
#define TAU          6.28318530

// ─── Utilities ───────────────────────────────────────────────────────

float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

float valuenoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float a = hash(i),              b = hash(i + vec2(1, 0));
    float c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// ─── Noise Variants ──────────────────────────────────────────────────

// Ridged multifractal — sharp creases for jagged peaks
float ridged(vec2 p, int oct) {
    float val = 0.0, amp = 0.5, prev = 1.0;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 8; i++) {
        if (i >= oct) break;
        float n = abs(valuenoise(p) * 2.0 - 1.0);
        n = 1.0 - n; n *= n; n *= prev;
        val += n * amp; prev = n;
        p = rot * p * 2.13 + vec2(2.3, 1.7);
        amp *= 0.52;
    }
    return val;
}

// Standard FBM — smooth rolling terrain & clouds
float fbm(vec2 p, int oct) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(0.86, 0.5, -0.5, 0.86);
    for (int i = 0; i < 8; i++) {
        if (i >= oct) break;
        v += a * valuenoise(p);
        p = m * p * 2.0 + vec2(1.7, 9.2);
        a *= 0.5;
    }
    return v;
}

// Warped FBM — organic flowing fog and cloud shapes
float warpedFbm(vec2 p, float t) {
    vec2 q = vec2(fbm(p + vec2(0.0, 0.0), 4),
                  fbm(p + vec2(5.2, 1.3), 4));
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.15, 4),
                  fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.12, 4));
    return fbm(p + 4.0 * r, 4);
}

// ─── Starfield ───────────────────────────────────────────────────────

vec3 stars(vec2 uv, float t) {
    vec3 col = vec3(0.0);
    // Two layers of stars at different scales
    for (float s = 0.0; s < 2.0; s++) {
        float scale = 200.0 + s * 300.0;
        vec2 gv = fract(uv * scale) - 0.5;
        vec2 id = floor(uv * scale);
        float rnd = hash21(id + s * 77.7);
        float size = smoothstep(0.95, 1.0, rnd);  // only brightest ~5%
        float twinkle = sin(t * (2.0 + rnd * 4.0) + rnd * TAU) * 0.5 + 0.5;
        float star = size * smoothstep(0.04, 0.0, length(gv)) * (0.5 + 0.5 * twinkle);
        // Slightly warm/cool star color variation
        vec3 starCol = mix(vec3(0.8, 0.85, 1.0), vec3(1.0, 0.9, 0.7), rnd);
        col += star * starCol;
    }
    return col;
}

// ─── Mountain Height Function ────────────────────────────────────────

float mountain(vec2 uv, float aspect, float depth, float t) {
    vec2 cUv = uv - vec2(0.5, 0.80);
    cUv.x *= aspect;

    float scale = mix(8.0, 0.8, pow(depth, 1.5));
    float parallaxX = cUv.x * scale * (1.0 + abs(cUv.x) * mix(0.1, 1.2, depth));

    float speed = mix(0.01, 0.08, depth);
    vec2 p = vec2(parallaxX + t * speed, depth * 25.0);

    float warp = fbm(p * 0.3 + vec2(t * 0.1, 0.0), 4) * 0.5;

    float ridgeNoise  = ridged(p * 0.25 + warp, 7);
    float smoothNoise = fbm(p * 0.25 + warp, 6);
    float h = mix(ridgeNoise, smoothNoise, 0.35) * 1.6;
    h = pow(h, 0.72);

    float gorgeDepth = mix(0.02, 0.85, pow(depth, 1.4));
    float gorgeCurve = smoothstep(mix(0.1, 1.8, depth), 0.0, abs(cUv.x));

    float baseY = 0.60 - pow(depth, 1.2) * 0.55 - (gorgeCurve * gorgeDepth);

    float breathAmp = mix(0.005, 0.06, depth);
    float breath = sin(t * 2.0 - length(cUv) * 5.0 + depth * 10.0) * breathAmp;

    return baseY + h * mix(0.22, 0.92, depth) + breath;
}

// ─── Volumetric Cloud Layer ──────────────────────────────────────────

float cloudDensity(vec2 uv, float t) {
    vec2 p = uv * vec2(3.0, 8.0);
    p.x += t * 0.04;
    float density = warpedFbm(p, t);
    density = smoothstep(0.35, 0.75, density);
    return density;
}

// ─── Main Render ─────────────────────────────────────────────────────

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;
    float t = iTime * 0.4;

    // ─── Time-of-day cycle (slow) ───
    float dayPhase = sin(iTime * 0.05) * 0.5 + 0.5;  // 0 = deep night, 1 = golden hour

    // ─── Sky Palette (shifts with time) ───
    vec3 nightSkyHi  = vec3(0.01, 0.01, 0.04);
    vec3 nightSkyLo  = vec3(0.03, 0.06, 0.14);
    vec3 dawnSkyHi   = vec3(0.06, 0.04, 0.12);
    vec3 dawnSkyLo   = vec3(0.15, 0.25, 0.38);

    vec3 skyHi = mix(nightSkyHi, dawnSkyHi, dayPhase);
    vec3 skyLo = mix(nightSkyLo, dawnSkyLo, dayPhase);

    vec3 voidColor  = mix(vec3(0.01, 0.02, 0.05), vec3(0.03, 0.04, 0.08), dayPhase);
    vec3 mistColor  = mix(vec3(0.06, 0.14, 0.24), vec3(0.12, 0.25, 0.38), dayPhase);
    vec3 lightColor = mix(vec3(0.7, 0.5, 0.3), vec3(1.0, 0.85, 0.55), dayPhase);
    vec3 warmAccent = vec3(1.0, 0.45, 0.15);  // fiery rim accent

    // ─── Base Sky Gradient ───
    vec3 col = mix(skyLo, skyHi, pow(uv.y, 0.8));

    // ─── Stars (fade with daylight) ───
    float starFade = smoothstep(0.4, 0.0, dayPhase) * smoothstep(0.5, 0.85, uv.y);
    col += stars(uv, iTime) * starFade * 0.8;

    // ─── Vanishing Point & Sun ───
    vec2 vp = vec2(0.5, 0.80);
    vec2 rayUv = uv - vp;
    rayUv.x *= aspect;
    float sunDist = length(rayUv);

    // Multi-layered sun
    float sunCore = smoothstep(0.035, 0.025, sunDist);
    float sunRing = smoothstep(0.06, 0.035, sunDist) * 0.6;
    float sunGlow = exp(-sunDist * 8.0) * 0.95;
    float sunBloom = exp(-sunDist * 3.0) * 0.25;

    vec3 sunCol = mix(warmAccent, lightColor, smoothstep(0.0, 0.06, sunDist));
    col += sunCol * (sunCore + sunRing + sunGlow) + lightColor * sunBloom;

    // ─── God Rays (volumetric feel) ───
    float angle = atan(rayUv.y, rayUv.x);
    float rays = 0.0;
    rays += fbm(vec2(angle * 4.0 - t * 0.2, sunDist * 2.0), 3) * 0.6;
    rays += fbm(vec2(angle * 8.0 + t * 0.15, sunDist * 3.0), 2) * 0.4;
    float rayMask = smoothstep(0.0, 0.3, sunDist) * smoothstep(1.2, 0.3, sunDist);
    rays *= rayMask;
    col += lightColor * pow(max(rays, 0.0), 2.0) * 0.7;

    // Radial light scatter near horizon
    float horizonGlow = exp(-abs(uv.y - 0.78) * 6.0) * exp(-abs(uv.x - 0.5) * 1.5);
    col += mix(warmAccent, lightColor, 0.5) * horizonGlow * 0.35;

    // ─── Mountain Layers ───
    float prevH = 0.0;
    for (float i = 0.0; i < LAYERS; i++) {
        float depth = i / (LAYERS - 1.0);
        float h = mountain(uv, aspect, depth, t);

        float mask = smoothstep(h + 0.004, h - 0.003, uv.y);

        // Layer silhouette color (darker = closer, mistier = farther)
        vec3 layerInk = mix(mistColor * 1.6, voidColor, pow(depth, 0.7));

        // Internal depth shading
        float depthInside = max(0.0, h - uv.y);
        float rockTex = valuenoise(uv * mix(120.0, 25.0, depth) + depth * 11.0);
        vec3 shade = layerInk * (1.0 - depthInside * mix(2.5, 9.0, depth));

        // Subtle warm highlight on rock surfaces catching sunlight
        float sunAngle = dot(normalize(vec2(0.0, 1.0)), normalize(vp - uv));
        shade += lightColor * rockTex * 0.08 * (1.0 - depth) * max(sunAngle, 0.0);

        // ─── Rim Lighting (bright edge glow) ───
        float rimWidth = mix(0.008, 0.003, depth);
        float rim = smoothstep(rimWidth, 0.0, abs(uv.y - h));
        vec3 rimCol = mix(warmAccent, lightColor, depth);
        shade += rimCol * rim * mix(1.2, 0.3, depth);

        // Atmospheric mist between layers
        float mistBand = smoothstep(h - mix(0.06, 0.55, depth), h + 0.03, uv.y);
        vec3 layerMist = mix(mistColor * 0.6, mistColor * 0.3, depth);
        vec3 finalLayerCol = mix(layerMist, shade, mistBand);

        col = mix(col, finalLayerCol, mask);
        prevH = h;
    }

    // ─── Cloud Sea (between middle layers) ───
    float cloudBand = smoothstep(0.25, 0.45, uv.y) * smoothstep(0.65, 0.45, uv.y);
    float clouds = cloudDensity(uv, t);
    vec3 cloudCol = mix(mistColor * 1.2, lightColor * 0.6, clouds * 0.4);
    // Clouds lit from above by the sun
    float cloudLit = exp(-length(uv - vp) * 3.0);
    cloudCol += warmAccent * cloudLit * 0.2;
    col = mix(col, cloudCol, clouds * cloudBand * 0.55);

    // ─── Mist Tendrils (animated wisps) ───
    for (float m = 0.0; m < 3.0; m++) {
        float mistY = 0.25 + m * 0.12;
        float tendril = fbm(vec2(uv.x * 6.0 + t * (0.06 + m * 0.02), m * 7.7), 5);
        tendril = smoothstep(0.4, 0.7, tendril);
        float band = exp(-pow((uv.y - mistY) * 12.0, 2.0));
        vec3 tendrilCol = mix(mistColor, lightColor * 0.3, 0.3);
        col = mix(col, tendrilCol, tendril * band * 0.3);
    }

    // ─── Reflective Water (bottom of canyon) ───
    float waterLine = 0.12;
    if (uv.y < waterLine) {
        // Mirror UV for reflection
        vec2 refUv = vec2(uv.x, waterLine + (waterLine - uv.y));

        // Water surface distortion
        float wave1 = sin(uv.x * 40.0 + t * 3.0) * 0.003;
        float wave2 = sin(uv.x * 80.0 - t * 2.5) * 0.001;
        float wave3 = valuenoise(vec2(uv.x * 15.0, t * 0.8)) * 0.006;
        refUv.y += wave1 + wave2 + wave3;
        refUv.x += sin(uv.y * 60.0 + t * 2.0) * 0.002;

        // Sample reflected sky color (simplified)
        vec3 refCol = mix(skyLo, skyHi, pow(refUv.y, 0.8));
        float refSunDist = length((refUv - vp) * vec2(aspect, 1.0));
        refCol += lightColor * exp(-refSunDist * 6.0) * 0.5;

        // Water darkening and tint
        float waterDepth = (waterLine - uv.y) / waterLine;
        vec3 waterTint = vec3(0.03, 0.08, 0.18);
        refCol = mix(refCol * 0.35, waterTint, waterDepth * 0.6);

        // Fresnel-like brightening at water edge
        float fresnel = smoothstep(0.04, 0.0, waterLine - uv.y);
        refCol += lightColor * fresnel * 0.15;

        // Specular highlights on wave crests
        float specular = pow(max(sin(uv.x * 60.0 + t * 3.0), 0.0), 32.0);
        specular *= smoothstep(0.08, 0.0, waterLine - uv.y);
        refCol += lightColor * specular * 0.2;

        col = mix(col, refCol, smoothstep(waterLine + 0.005, waterLine - 0.005, uv.y));
    }

    // ─── Organic Fog (base atmosphere) ───
    float fogNoise = fbm(vec2(uv.x * 3.0 + t * 0.1, uv.y * 5.0 - t * 0.05), 4);
    float fogGrad = smoothstep(0.0, 0.55, uv.y) * smoothstep(0.9, 0.35, uv.y);
    vec3 fogCol = mix(mistColor, lightColor * 0.3, fogNoise * 0.5);
    col += fogCol * fogNoise * fogGrad * 0.3;

    // ─── Floating Particles (dust motes / fireflies) ───
    for (float p = 0.0; p < 30.0; p++) {
        float rnd1 = hash21(vec2(p, p * 1.23));
        float rnd2 = hash21(vec2(p * 2.34, p));
        vec2 particlePos = vec2(
            fract(rnd1 + t * (0.01 + rnd2 * 0.02)),
            0.15 + rnd2 * 0.55
        );
        particlePos.y += sin(t * (1.0 + rnd1 * 2.0) + rnd1 * TAU) * 0.02;

        vec2 diff = (uv - particlePos) * vec2(aspect, 1.0);
        float dist = length(diff);
        float glow = exp(-dist * 600.0) * (0.5 + 0.5 * sin(t * 3.0 + rnd1 * TAU));

        vec3 particleCol = mix(lightColor, vec3(0.7, 0.9, 1.0), rnd1);
        col += particleCol * glow * 0.4;
    }

    // ─── Cinema Post-Processing ──────────────────────────────────────

    // Film grain
    float grain = hash21(fragCoord + fract(iTime) * 999.0) - 0.5;
    col += grain * 0.03;

    // Vignette (oval)
    vec2 vc = (uv - 0.5) * vec2(1.1, 1.0);
    col *= 1.0 - 0.55 * dot(vc, vc);

    // Filmic tone mapping (ACES approximation)
    col = max(col, 0.0);
    col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);

    // Color grading — slight teal shadows, warm highlights
    vec3 shadows = vec3(0.05, 0.08, 0.12);
    vec3 highlights = vec3(1.0, 0.95, 0.88);
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col + shadows * (1.0 - lum) * 0.15,
              col * highlights,
              smoothstep(0.0, 1.0, lum));

    // Subtle chromatic aberration at edges
    float caStrength = dot(vc, vc) * 0.008;
    // We simulate by slightly shifting the color channels based on vignette distance
    col.r *= 1.0 + caStrength;
    col.b *= 1.0 - caStrength;

    // Final gamma
    col = pow(clamp(col, 0.0, 1.0), vec3(0.95, 0.97, 1.0));

    fragColor = vec4(col, 1.0);
}
