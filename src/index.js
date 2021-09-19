import LunarDateTime from "./js/lunar-date-time.js";
import LunarSexagenary from "./js/lunar-sexagenary.js";
import SolarTerm from "./js/solar-term.js";

let d = 18;
let m = 9;
let Y = 2021;
let H = 0;
let i = 0;
let s = 0;
let timezone = 7;
let sexagenaryFromat = '{Ngay} D d, {thang} M m, {nam} Y y, {gio} H h';

let solarTerm = new SolarTerm(d, m, Y, H, i, s, timezone);

console.log(solarTerm.getTerm().getLabel());
console.log(solarTerm.getBeginDateTime());
console.log(solarTerm);