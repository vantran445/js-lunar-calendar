class TermFormatter
{
    term_keys = ['key_1', 'key_2', 'key_3'];

    constructor(offset)
    {
        this.offset = offset;
    }

    getOffset() { 
        return this.offset;
    }

    getKey() {
        return (this.term_keys[this.offset != undefined])
                        ? this.term_keys[this.offset]
                        : '_key_' + this.offset;
    }

}

export default TermFormatter;