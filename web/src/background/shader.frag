varying lowp float vTime;

lowp float modulo(lowp float num, lowp float divisor) {
    // [Dividend-{(Dividend/Divisor)*Divisor}]
    return num - float(((int(num)/int(divisor))*int(divisor)));
}

lowp vec4 hsl_to_rgb(lowp float h, lowp float s, lowp float l) {
    lowp float percent_s;
    lowp float percent_l;
    lowp float c;
    lowp float x;
    lowp float m;
    lowp float r;
    lowp float g;
    lowp float b;
    percent_s = (s / 100.0);
    percent_l = (l / 100.0);
    c = ((1.0 - abs(((2.0 * percent_l) - 1.0))) * percent_s);
    x = (c * (1.0 - abs((modulo((h / 60.0), 2.0) - 1.0))));
    m = (1.0 - (c / 2.0));
    if(((0.0 <= h) && (h < 60.0))) {
        r = c;
        g = x;
        b = 0.0;
    } else {
        if(((60.0 <= h) && (h < 120.0))) {
            r = x;
            g = c;
            b = 0.0;
        } else {
            if(((120.0 <= h) && (h < 180.0))) {
                r = 0.0;
                g = c;
                b = x;
            } else {
                if(((180.0 <= h) && (h < 240.0))) {
                    r = 0.0;
                    g = x;
                    b = c;
                } else {
                    if(((240.0 <= h) && (h < 300.0))) {
                        r = x;
                        g = 0.0;
                        b = c;
                    } else {
                        if(((300.0 <= h) && (h < 360.0))) {
                            r = c;
                            g = 0.0;
                            b = x;
                        }
                    }
                }
            }
        }
    }
    return vec4(r, g, b, 1.0);
}

lowp vec4 get_colour(vec4 pos, lowp float time2) {
    lowp float tile_size = 0.02;
    lowp float x1;
    lowp float y;
    lowp float offset_x;
    lowp float offset_y;
    lowp float intensity_offset_y;
    lowp float h1;
    lowp float l1;
    x1 = ((((pos.x + 1.0) / tile_size) - 50.5) / 200.0);
    y = ((((pos.y + 1.0) / tile_size) - 50.5) / 200.0);
    offset_x = (x1 + (time2 / 2.0));
    offset_y = (y + (time2 / 2.0));
    intensity_offset_y = (y - (time2 / 2.0));
    h1 = ((((((((30.0 + (30.0 * sin((offset_x / 16.0)))) + 30.0) + (30.0 * sin((offset_y / 8.0)))) + 30.0) + (30.0 * sin(((offset_x + offset_y) / 16.0)))) + 30.0) + (30.0 * sin((sqrt(((offset_x * offset_x) + (offset_y * offset_y))) / 8.0)))) / 4.0);
    l1 = ((((((((40.0 + (40.0 * sin((offset_x / 16.0)))) + 40.0) + (40.0 * sin((intensity_offset_y / 8.0)))) + 40.0) + (40.0 * sin(((offset_x + intensity_offset_y) / 16.0)))) + 40.0) + (40.0 * sin((sqrt(((offset_x * offset_x) + (intensity_offset_y * intensity_offset_y))) / 8.0)))) / 4.0);
    lowp vec4 _expr142 = hsl_to_rgb(modulo((h1 + time2), 360.0), 100.0, (10.0 + l1));
    return _expr142;
}

void main() {
  gl_FragColor = get_colour(gl_FragCoord, vTime);
}