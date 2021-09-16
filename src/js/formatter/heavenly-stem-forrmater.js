import TermFormatter from "./term-formatter.js";

class HeavenlyStemFormatter extends TermFormatter
{
    term_keys   = ['giap', 'at', 'binh', 'dinh', 'mau', 'ky', 'canh', 'tan', 'nham', 'quy'];
    term_labels = [];

    constructor(offset)
    {
        try {
            if(offset < 0 || offset > 9) {
                throw 'The offset of Heavenly stem should be 0 through 9.';
            }
            
            super(offset);
        } 
        catch (error) {
            console.error(error);
        }
    }
}