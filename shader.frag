// ═══════════════════════════════════════════════════════════════════════
// "虚空回廊 · Void Corridor"  —  Infinite Morphing Tunnel
// Non-repeating volumetric raymarch with evolving geometry,
// multi-palette color drift, particle systems, and cinematic grading
// ═══════════════════════════════════════════════════════════════════════
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
// Copyright (c) 2026 @WorkingClassHacker
// Based on Abstract Shine by @Frostbyte
// [LICENSE] https://creativecommons.org/licenses/by-nc-sa/4.0/

// ─── Compact 2D rotation (cos-only approximation) ────────────────────
#define R(a) mat2(cos(a + vec4(0, 33, 11, 0)))
#define PI  3.14159265
#define TAU 6.28318530

// ─── Hash functions ──────────────────────────────────────────────────
float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

float hash11(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

// ─── Value noise with quintic interpolation ──────────────────────────
float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float a = hash21(i), b = hash21(i + vec2(1, 0));
    float c = hash21(i + vec2(0, 1)), d = hash21(i + vec2(1, 1));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// ─── FBM (4 octaves) ────────────────────────────────────────────────
float fbm4(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(0.86, 0.5, -0.5, 0.86);
    for (int i = 0; i < 4; i++) {
        v += a * vnoise(p);
        p = m * p * 2.0 + vec2(1.7, 9.2);
        a *= 0.5;
    }
    return v;
}

// ─── Color Palettes ─────────────────────────────────────────────────
// IQ's cosine palette (MIT) — https://www.shadertoy.com/view/ll2GD3

// Warm ember palette
vec3 palWarm(float t) {
    vec3 a = vec3(0.50, 0.38, 0.26);
    vec3 b = vec3(0.50, 0.35, 0.25);
    vec3 c = vec3(1.00, 1.00, 1.00);
    vec3 d = vec3(0.00, 0.12, 0.25);
    return a + b * cos(TAU * (c * t + d));
}

// Cool aurora palette
vec3 palCool(float t) {
    vec3 a = vec3(0.743, 0.909, 0.960);
    vec3 b = vec3(-0.711, 0.275, -0.052);
    vec3 c = vec3(1.000, 1.855, 1.000);
    vec3 d = vec3(0.180, 0.091, 0.380);
    return a + b * cos(TAU * (c * t + d));
}

// Deep ocean palette
vec3 palDeep(float t) {
    vec3 a = vec3(0.20, 0.15, 0.45);
    vec3 b = vec3(0.35, 0.40, 0.55);
    vec3 c = vec3(1.00, 0.70, 0.40);
    vec3 d = vec3(0.00, 0.15, 0.60);
    return a + b * cos(TAU * (c * t + d));
}

// Neon electric palette
vec3 palNeon(float t) {
    vec3 a = vec3(0.50, 0.50, 0.50);
    vec3 b = vec3(0.50, 0.50, 0.50);
    vec3 c = vec3(2.00, 1.00, 0.00);
    vec3 d = vec3(0.50, 0.20, 0.25);
    return a + b * cos(TAU * (c * t + d));
}

// Blend between all four palettes based on slow evolving time
vec3 palette(float t, float phase) {
    // phase cycles through [0,4) slowly using incommensurate frequencies
    float p = mod(phase, 4.0);
    vec3 c;
    if (p < 1.0)      c = mix(palWarm(t), palCool(t), p);
    else if (p < 2.0) c = mix(palCool(t), palDeep(t), p - 1.0);
    else if (p < 3.0) c = mix(palDeep(t), palNeon(t), p - 2.0);
    else               c = mix(palNeon(t), palWarm(t), p - 3.0);
    return c;
}

// ─── Tunnel cross-section shape (evolving) ──────────────────────────
// Returns distance from center to tunnel wall for a given angle
float tunnelShape(float angle, float z, float time) {
    // Base radius
    float r = 10.0;

    // Morph between circle, triangle, square, pentagon
    // Use incommensurate frequencies so shapes blend unpredictably
    float morph1 = sin(time * 0.0731) * 0.5 + 0.5;  // ~86s period
    float morph2 = sin(time * 0.0397) * 0.5 + 0.5;  // ~158s period
    float morph3 = sin(time * 0.0523) * 0.5 + 0.5;  // ~120s period

    // Polygon distortions at different frequencies
    float tri  = 0.12 * morph1 * cos(angle * 3.0 + z * 0.003 + time * 0.11);
    float quad = 0.08 * morph2 * cos(angle * 4.0 - z * 0.005 + time * 0.07);
    float pent = 0.06 * morph3 * cos(angle * 5.0 + z * 0.004 - time * 0.13);
    float hex  = 0.04 * sin(time * 0.0613) * cos(angle * 6.0 - z * 0.002);

    // Organic warping from noise
    float warp = fbm4(vec2(angle * 0.5 + time * 0.02, z * 0.008)) * 0.15;

    // Breathing — slow expansion / contraction
    float breathe = sin(time * 0.0419 + z * 0.001) * 0.8
                  + sin(time * 0.0673) * 0.4;

    return r + tri + quad + pent + hex + warp * r + breathe;
}

// ─── Distance field for organic interior structures ─────────────────
float interiorSDF(vec3 p, float time) {
    // Slowly morphing internal tendrils / lattice
    float freq1 = 0.0317;  // ~198s
    float freq2 = 0.0571;  // ~110s

    float s1 = sin(p.x * 0.3 + time * freq1) *
               cos(p.y * 0.4 - time * freq2) *
               sin(p.z * 0.01 + time * 0.02);

    float s2 = sin(p.y * 0.5 + time * 0.043) *
               cos(p.z * 0.008 - time * 0.031) *
               sin(p.x * 0.35 + time * 0.027);

    float blend = sin(time * 0.0211) * 0.5 + 0.5;
    return mix(s1, s2, blend);
}

// ═══════════════════════════════════════════════════════════════════════
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 u = fragCoord.xy;
    vec2 uv = (u - 0.5 * iResolution.xy + 0.5) / iResolution.y;

    // ─── Time bases (incommensurate → no visible repeat for ~30min+) ──
    // Golden ratio and sqrt(2) ensure near-irrational frequency ratios
    float t    = iTime;
    float tSlow  = t * 0.1;                       // slow evolution
    float tDrift = t * 0.618033988;                // golden ratio drift
    float tWobble = t * 0.414213562;               // sqrt(2)-1 drift
    float tPulse = sin(t * 0.0731) + sin(t * 0.0419); // compound pulse

    // Palette phase — cycles through 4 palettes over ~55s
    float palPhase = t * 0.0727;

    // ─── Camera ray ─────────────────────────────────────────────────
    vec3 rd = normalize(vec3(2.0 * u - iResolution.xy, iResolution.y));

    // Camera roll — slowly varies
    float roll = sin(t * 0.0347) * 0.3 + sin(t * 0.0191) * 0.15;
    rd.xy *= R(roll);

    // Camera sway — gentle lateral motion
    float swayX = sin(t * 0.0523) * 1.5 + sin(t * 0.0317) * 0.8;
    float swayY = cos(t * 0.0419) * 1.2 + cos(t * 0.0271) * 0.6;

    // Starting position (forward motion)
    vec3 ro = vec3(swayX, swayY, t * 4.0);

    // ─── Raymarch (volumetric accumulation) ─────────────────────────
    vec4 acc = vec4(0.0);
    float totalDist = 0.0;
    float i;

    for (i = 0.0; i < 40.0; i++) {
        vec3 p = ro + rd * totalDist;

        // ── Tunnel rotation (evolving corkscrew) ──
        float twistRate = 0.008 + sin(t * 0.0293) * 0.004;
        float twistPhase = t * 0.03 + sin(t * 0.0179) * 0.5;
        p.xy *= R(-p.z * twistRate - twistPhase);

        // ── Cross-section distance ──
        float angle = atan(p.y, p.x);
        float radius = length(p.xy);
        float wallDist = tunnelShape(angle, p.z, t) - radius;

        // ── Step size ──
        float s = 0.5;
        s = max(s, 3.0 * wallDist);

        // ── Organic energy field ──
        float interior = interiorSDF(p, t);

        // Traveling waves — multiple incommensurate speeds
        float wave1 = sin(t * 0.97 - p.x * 0.5 + p.z * 0.003) * 0.85;
        float wave2 = sin(tDrift - p.y * 0.3 + p.z * 0.005) * 0.45;
        float wave3 = sin(tWobble + length(p.xy) * 0.2 - p.z * 0.004) * 0.35;

        // Combine into distance offset
        s += abs(
            p.y * 0.004 +
            wave1 + wave2 * interior +
            wave3 +
            0.8
        );

        // Additional geometric features — ribs / rings
        float ribs = sin(p.z * 0.15 + t * 0.2) * 0.3 *
                     smoothstep(8.0, 5.0, radius);
        s += abs(ribs) * 0.5;

        // Lattice-like structures that appear and disappear
        float latticeStrength = sin(t * 0.0211) * 0.5 + 0.5;
        float lattice = sin(p.x * 1.5) * sin(p.y * 1.5) * sin(p.z * 0.05);
        s += abs(lattice) * latticeStrength * 0.4;

        totalDist += s;

        // ── Volumetric glow accumulation ──
        float glow = 1.0 / (s * 0.18 + 0.01);

        // Depth-dependent color temperature shift
        float depthColor = length(p) * 0.001 + tSlow;

        // Wall proximity glow (brighter near walls)
        float wallGlow = exp(-wallDist * 0.3) * 0.5;

        // Accumulate with depth fade
        float fade = exp(-totalDist * 0.002);
        acc.rgb += (glow + wallGlow) * fade *
                   palette(depthColor, palPhase + wallGlow * 0.5);
        acc.a += glow * fade;
    }

    // ─── Color & Tone ───────────────────────────────────────────────

    // Base color from accumulated volumetrics
    vec3 col = acc.rgb;

    // Apply evolving palette based on total accumulated light
    float intensity = length(col);
    float palIdx = intensity * 0.01 + tSlow;
    col *= palette(palIdx, palPhase);

    // ─── Shimmer / Interference Layer ───────────────────────────────
    // Evolving screen-space pattern (not just pulsing dots)
    float shimmerPhase = sin(t * 0.0613) * 0.5 + 0.5;

    // Multiple interference patterns at incommensurate frequencies
    float pattern1 = length(sin(uv * 180.0 + t * 0.3) / 1.5);
    float pattern2 = length(sin(uv * 120.0 * R(t * 0.01) + tDrift * 0.2) / 1.8);
    float pattern = mix(pattern1, pattern2, shimmerPhase);

    float shimmerEdge = abs(sin(t * 3.7 + sin(t * 0.29) * 2.0));
    shimmerEdge = mix(shimmerEdge, abs(sin(t * 2.1 + sin(t * 0.17) * 3.0)), 0.5);

    col -= 18.0 * smoothstep(
        0.001,
        shimmerEdge,
        0.7 - pattern - abs(uv.y) + 0.2
    ) * (0.5 + 0.5 * sin(t * 0.0523));  // fade shimmer in/out

    // ─── Brightness normalization ───────────────────────────────────
    col /= 80.0;

    // ─── Particle / spark system ────────────────────────────────────
    for (float p = 0.0; p < 20.0; p++) {
        float rnd1 = hash11(p * 13.73);
        float rnd2 = hash11(p * 7.31 + 5.0);
        float rnd3 = hash11(p * 3.17 + 11.0);

        // Particles travel in spirals with evolving parameters
        float pTime = t * (0.3 + rnd1 * 0.7) + rnd3 * TAU;
        float pRadius = 0.1 + rnd2 * 0.35;
        float pAngle = pTime * (0.5 + rnd1) + rnd2 * TAU;

        vec2 particlePos = vec2(
            cos(pAngle) * pRadius,
            sin(pAngle) * pRadius
        );

        // Drift outward then reset
        float drift = fract(t * 0.05 * (1.0 + rnd1) + rnd3);
        particlePos *= 0.3 + drift * 2.0;

        vec2 diff = uv - particlePos;
        float dist = length(diff);

        // Sparkle with varying intensity
        float sparkle = sin(pTime * 5.0) * 0.5 + 0.5;
        float glow = exp(-dist * 400.0) * sparkle * (1.0 - drift);

        vec3 sparkCol = palette(rnd1 + tSlow * 0.3, palPhase);
        col += sparkCol * glow * 0.5;
    }

    // ─── Radial gradient & vignette ─────────────────────────────────
    float l = length(uv);
    col *= 1.2 - l;

    // ─── Center glow (palette-driven, evolving) ────────────────────
    vec3 centerCol = palette(l - 0.23 + tSlow * 0.5, palPhase);
    float centerMix = (1.0 - smoothstep(0.01, 0.95, l)) * smoothstep(0.0, 0.3, intensity * 0.01);
    col = mix(col, centerCol * col, centerMix);

    // ─── Anamorphic lens flare (horizontal streak) ─────────────────
    float flareStrength = exp(-abs(uv.y) * 8.0) * exp(-l * 2.0);
    float flareFlicker = sin(t * 1.7 + sin(t * 0.31) * 3.0) * 0.3 + 0.7;
    vec3 flareCol = palette(0.5 + tSlow, palPhase) * 0.3;
    col += flareCol * flareStrength * flareFlicker;

    // ─── Film grain (animated, subtle) ──────────────────────────────
    float grain = hash21(fragCoord + fract(t) * 999.0) - 0.5;
    col += grain * 0.02;

    // ─── Chromatic aberration (subtle, at edges) ────────────────────
    float caStrength = l * l * 0.012;
    col.r *= 1.0 + caStrength;
    col.b *= 1.0 - caStrength;

    // ─── Soft highlight compression ─────────────────────────────────
    col = tanh(col + col);

    // ─── Color grading — evolving temperature ───────────────────────
    float warmth = sin(t * 0.0347) * 0.5 + 0.5;
    vec3 grade = mix(vec3(0.95, 0.98, 1.05), vec3(1.05, 0.98, 0.92), warmth);
    col *= grade;

    fragColor = vec4(max(col, 0.0), 1.0);
}
