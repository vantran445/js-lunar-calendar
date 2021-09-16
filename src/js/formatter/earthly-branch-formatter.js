import TermFormatter from "./term-formatter.js";

class EarthlyBranchFormatter extends TermFormatter
{
    term_keys = ['ty', 'suu', 'dan', 'mao', 'thin', 'ti', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi'];

    constructor(offset)
    {
        try {
            if(offset < 0 || offset > 11) {
                throw 'The offset of Earthly branch should be 0 through 11.';
            }
            
            super(offset);
        } 
        catch (error) {
            console.error(error);
        }
    }
}