export default "varying lowp float vTime;\n\nlowp float modulo(lowp float num, lowp float divisor) {\n    // [Dividend-{(Dividend/Divisor)*Divisor}]\n    return num - float(((int(num)/int(divisor))*int(divisor)));\n}\n\nlowp vec4 hsl_to_rgb(lowp float h, lowp float s, lowp float l) {\n    lowp float percent_s;\n    lowp float percent_l;\n    lowp float c;\n    lowp float x;\n    lowp float m;\n    lowp float r;\n    lowp float g;\n    lowp float b;\n    percent_s = (s / 100.0);\n    percent_l = (l / 100.0);\n    c = ((1.0 - abs(((2.0 * percent_l) - 1.0))) * percent_s);\n    x = (c * (1.0 - abs((modulo((h / 60.0), 2.0) - 1.0))));\n    m = (1.0 - (c / 2.0));\n    if(((0.0 <= h) && (h < 60.0))) {\n        r = c;\n        g = x;\n        b = 0.0;\n    } else {\n        if(((60.0 <= h) && (h < 120.0))) {\n            r = x;\n            g = c;\n            b = 0.0;\n        } else {\n            if(((120.0 <= h) && (h < 180.0))) {\n                r = 0.0;\n                g = c;\n                b = x;\n            } else {\n                if(((180.0 <= h) && (h < 240.0))) {\n                    r = 0.0;\n                    g = x;\n                    b = c;\n                } else {\n                    if(((240.0 <= h) && (h < 300.0))) {\n                        r = x;\n                        g = 0.0;\n                        b = c;\n                    } else {\n                        if(((300.0 <= h) && (h < 360.0))) {\n                            r = c;\n                            g = 0.0;\n                            b = x;\n                        }\n                    }\n                }\n            }\n        }\n    }\n    return vec4(r, g, b, 1.0);\n}\n\nlowp vec4 get_colour(vec4 pos, lowp float time2) {\n    lowp float tile_size = 0.02;\n    lowp float x1;\n    lowp float y;\n    lowp float offset_x;\n    lowp float offset_y;\n    lowp float intensity_offset_y;\n    lowp float h1;\n    lowp float l1;\n    x1 = ((((pos.x + 1.0) / tile_size) - 50.5) / 200.0);\n    y = ((((pos.y + 1.0) / tile_size) - 50.5) / 200.0);\n    offset_x = (x1 + (time2 / 2.0));\n    offset_y = (y + (time2 / 2.0));\n    intensity_offset_y = (y - (time2 / 2.0));\n    h1 = ((((((((30.0 + (30.0 * sin((offset_x / 16.0)))) + 30.0) + (30.0 * sin((offset_y / 8.0)))) + 30.0) + (30.0 * sin(((offset_x + offset_y) / 16.0)))) + 30.0) + (30.0 * sin((sqrt(((offset_x * offset_x) + (offset_y * offset_y))) / 8.0)))) / 4.0);\n    l1 = ((((((((40.0 + (40.0 * sin((offset_x / 16.0)))) + 40.0) + (40.0 * sin((intensity_offset_y / 8.0)))) + 40.0) + (40.0 * sin(((offset_x + intensity_offset_y) / 16.0)))) + 40.0) + (40.0 * sin((sqrt(((offset_x * offset_x) + (intensity_offset_y * intensity_offset_y))) / 8.0)))) / 4.0);\n    lowp vec4 _expr142 = hsl_to_rgb(modulo((h1 + time2), 360.0), 100.0, (10.0 + l1));\n    return _expr142;\n}\n\nvoid main() {\n  gl_FragColor = get_colour(gl_FragCoord, vTime);\n}";