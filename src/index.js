import LunarDateTime from "./js/lunar-date-time.js";

/**
 * Translate
 * 
 * @since 1.0
 * @param {string} key Key to check and translate
 */
function trans(key)
{
    let trans = window.trans;

    if(typeof trans == undefined) {
        return key;
    }

    if(key in trans) {
        return trans[key];
    }
    else {
        return key;
    }
}

var lunar = new LunarDateTime(17, 9, 2021, 0, 0, 0, 7);
//console.log(lunar);
console.log(lunar.format('d/m/Y H:i:s j z l'));

console.log(trans('earthly_stem_0'));