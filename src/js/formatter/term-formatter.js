class TermFormatter
{
    term_keys      = ['key_1', 'key_2', 'key_3'];
    term_labels    = ['Label 1', 'Lable 2', 'Label 3'];

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
        return (this.term_keys[this.offset != undefined])
                        ? this.term_keys[this.offset]
                        : '_key_' + this.offset;
    }

    /**
     * Get display label of Term
     * 
     * @returns string
     */
    getLabel() {
        if(window.trans != undefined) {
            let trans = window.trans;
            let key   = this.getKey();

            if(trans[key] != undefined ) {
                return trans[key];
            }
        }

        return (this.term_labels[this.offset] != undefined)
                        ? this.term_labels[this.offset]
                        : this.getKey();
    }

}

export default TermFormatter;