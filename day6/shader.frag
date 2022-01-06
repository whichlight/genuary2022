
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    
    vec2 uv = gl_FragCoord.xy/u_resolution.xy; 
    uv.x += 0.1 * sin(u_time/1.0 + uv.y * 10.0);
    float numLines = 1. + gl_FragCoord.y * 0.2;
    float colStripes = ceil(sin(uv.x * numLines * 3.0));
    gl_FragColor = vec4(vec3(colStripes,0,colStripes),1.0);


}

