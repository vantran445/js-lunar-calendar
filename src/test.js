import * as converter from './js/base-converter.js';

let jd = converter.gregorianToJd(10, 9, 2021, 12);
let sl = converter.jdToSunlongitude(jd, 7);
console.log(jd);
console.log(sl);