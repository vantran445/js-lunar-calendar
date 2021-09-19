import TermFormatter from "./term-formatter.js";

class HeavenlyStemFormatter extends TermFormatter
{
    term_keys = ['giap', 'at', 'binh', 'dinh', 'mau', 'ky', 'canh', 'tan', 'nham', 'quy'];

    constructor(offset)
    {
        if(offset < 0 || offset > 9) {
            throw 'The offset of Heavenly stem should be 0 through 9.';
        }

        super(offset);
    }
}

export default HeavenlyStemFormatter;