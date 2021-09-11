import Test1 from './js/test1.js';

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

var t = new Test1();
console.log(t);