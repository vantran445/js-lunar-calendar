import LunarDateTime from "./js/lunar-date-time.js";

/**
 * Translate
 * 
 * @since 1.0
 * @param {string} key Key to check and translate
 */
function trans(key)
{
    if(typeof trans === 'undefined') {
        return key;
    }

    if(key in trans) {
        return trans[key];
    }
    else
    {
        return key;
    }
}

var lunar = new LunarDateTime(17, 9, 2021, 0, 0, 0, 7);
//console.log(lunar);
console.log(lunar.format('d/m/Y H:i:s j z l'));

class ABC
{
    abf = [1,2,3];
}

class DEF
{
    abf = [4, 5, 6]
}

let t = new DEF();

console.log(t.abf[0]);