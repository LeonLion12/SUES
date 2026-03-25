#define NUM 12.0
#define SCROLL 0.8
#define SPEED 1.4

float ncos(float x)
{
    return cos(x) / (.5 + .4 * abs(cos(x)));
}

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 s = (fragCoord * 2.0 - u_resolution.xy) / u_resolution.y;
    float v = (s.y + 1.0) * (s.y + 1.0) * 0.25;
    s.y -= 1.2;
    float per = 2.0 / abs(s.y);

    vec3 col = vec3(0);
    for (float z = 0.0; z < 1.0; z += 0.08)
    {
        float d = 1.0 + 0.4 * z;
        vec2 p = vec2(s.x * d, s.y + d) * per;
        vec2 s = p;
        s.y += SCROLL * u_time;
        vec2 c = s - 0.05 * u_time + sin(s * 5.3 + 0.03 * u_time);

        float shift = cos(z / 0.08);
        float wave = ncos(s.y * 1.4) + ncos(s.y * 0.9 + 0.3 * u_time);
        s.x += shift + (wave) / (1.0 + 0.01 * per * per);

        float w = s.x;
        float l = sin(s.y * 0.7 + z / 0.08 + SPEED * u_time * sign(shift));
        float intensity = exp(min(l, -l / 0.3 / (1.0 + 4.0 * w * w)));

        // Cold palette: deep blue -> cyan/ice-white
        vec3 coldA = vec3(0.05, 0.12, 0.45);  // deep navy blue
        vec3 coldB = vec3(0.55, 0.85, 1.0);    // ice cyan
        vec3 tint = mix(coldA, coldB, tanh(shift / 0.1) * 0.5 + 0.5);

        // Subtle purple shimmer on some strands
        tint += vec3(0.15, 0.0, 0.25) * smoothstep(0.3, 0.7, sin(z * 30.0 + u_time * 0.7));

        col += intensity * tint / (abs(w) + 0.01 * per) * per;
    }
    col = tanh(col / 2e1);
    fragColor = vec4(col * col, 1);
}
