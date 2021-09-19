import JsLunarTranslator from "../translator.js";

class TermFormatter
{
    term_keys = ['key_1', 'key_2', 'key_3'];

    constructor(offset)
    {
        this.offset = offset;
    }

    /**
     * Get Term's offset
     * 
     * @returns int
     */
    getOffset() { 
        return this.offset;
    }

    /**
     * Get Term's key
     * @returns string
     */
    getKey() {
        return (this.term_keys[this.offset] != undefined)
                        ? this.term_keys[this.offset]
                        : '_key_' + this.offset;
    }

    /**
     * Get display label of Term
     * 
     * @returns string
     */
    getLabel() {
        return (new JsLunarTranslator()).trans(this.getKey());
    }

}

export default TermFormatter;