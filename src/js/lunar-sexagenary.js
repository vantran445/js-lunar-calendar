import LunarDateTime from "./lunar-date-time.js";
import HeavenlyStemFormatter from "./formatter/heavenly-stem-forrmater.js";
import EarthlyBranchFormatter from "./formatter/earthly-branch-formatter.js";

class LunarSexagenary extends LunarDateTime
{
    constructor(d, m, Y, H = 0, i = 0, s = 0, timezone = 7) 
    {
        super(d, m, Y, H, i, s, timezone);

        this.termOffsets = {};
        this.allowKeys   = ['d', 'D', 'm', 'M', 'y', 'Y', 'h', 'H', 'N'];
    }

    /**
     * Get Hours Earthly Branch offset
     * 
     * @returns int
     */
    #getHoursEarthlyBranchOffset()
    {
        let compareH = 23;  // Lunar new day start at 23:00 
        let offset   = 0;   // 0 is Rat/Tý/Zǐ...

        while(compareH != super.get('H')) {
            compareH = (compareH + 1) % 24;

            if(compareH % 2 != 0) {
                offset = (offset + 1) % 12;
            }
        }

        return offset;
    }

    #getBeginDayHoursHeacenlyStemOffset()
    {
        let offset                        = 0;
        let compare                       = 0;
        let currentDailyHeavenStemOffset  = this.#getOffset('D');

        while(compare != currentDailyHeavenStemOffset) {
            compare = (compare + 1) % 10;
            offset  = (offset + 2) % 10;
        }

        return offset;
    }

    #getCurrentHoursHeavenlyStemOffset()
    {
        let beginDayHourlyHeavenStemOffset  = this.#getOffset('N');
        let offset                          = beginDayHourlyHeavenStemOffset;
        let compareH                        = 23;

        while(compareH != super.get('H')) {
            compareH = (compareH + 1) % 24;

            if(compareH % 2 != 0) {
                offset = (offset + 1) % 10;
            }
        }

        return offset;
    }
    /**
     * Calculate & store a Sexagenary term's offset
     * 
     * @param string key 
     * @returns int
     */
    #getOffset(key)
    {
        if(this.termOffsets[key] != undefined) {
            return this.termOffsets[key];
        }

        // Calculate Terms offset
        let offset;
        switch(key) {
            case 'd':
                offset = (super.get('j') + 1) % 12;
                break;
            case 'D':
                offset = (super.get('j') + 9) % 10;
                break;
            case 'm':
                offset = (super.get('m') + 1) % 12;
                break;
            case 'M':
                offset = (super.get('Y') * 12 + super.get('m') + 3) % 10;
                break;
            case 'y':
                offset = (super.get('Y') + 8) % 12;
                break;
            case 'Y':
                offset = (super.get('Y') + 6) % 10;
                break;
            case 'h':
                offset = this.#getHoursEarthlyBranchOffset();
                break;
            case 'N':
                offset = this.#getBeginDayHoursHeacenlyStemOffset();
                break;
            case 'H':
                offset = this.#getCurrentHoursHeavenlyStemOffset();
                break;
            default:
                let keysDesc = '';

                this.allowKeys.forEach(element => {
                    keysDesc += element + ', ';
                });

                keysDesc = keysDesc.slice(0, -2);

                throw "Invalid Sexagenary term key. There keys are allow: " + keysDesc;

        }

        this.termOffsets[key] = offset;
        return offset;
    }

    /**
     * Get a Sexagenary Term object
     * 
     * @param string termKey allow therre keys:
     *                  - d: Return an EarthlyBranchFormatter object of Day
     *                  - D: Return an HeavenlyStemFormatter object of Day
     *                  - m: Return an EarthlyBranchFormatter object of Month
     *                  - M: Return an HeavenlyStemFormatter object of Month
     *                  - y: Return an EarthlyBranchFormatter object of Year
     *                  - Y: Return an HeavenlyStemFormatter object of Year
     *                  - h: Return an EarthlyBranchFormatter object of Current Hours
     *                  - H: Return an HeavenlyStemFormatter object of Current Hours
     *                  - N: Return an HeavenlyStemFormatter object of Hours which begin new Lunar Day
     * @returns object  Abstraction of \TermFormatter (./formatter/term-formatter.js)
     */
    getTerm(termKey)
    {
        let offset;

        try {
            offset = this.#getOffset(termKey);

            return (termKey == termKey.toUpperCase())
                    ? new HeavenlyStemFormatter(offset)
                    : new EarthlyBranchFormatter(offset);

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Format an input string
     * 
     * @param string format      
     * @param int    formatType 
     * @returns 
     */
    format(format, formatType = 2) 
    {
        if(formatType == 1) {
            return super.format(format);
        }

        let unFormat    = [...format.matchAll(/\{(.*?)\}/g)];
        let formatting  = format;

        // Prevent change unformat string
        if(unFormat[0] != undefined) {
            unFormat.forEach((element, index) => {
                formatting = formatting.replace(element[0], '{_' + index + '_}');
            });
        }

        // Find keys should be format
        let formatKeys  = [];
        let counter     = 0;

        this.allowKeys.forEach(element => {
            if(formatting.includes(element)) {
                do {
                    formatKeys[counter] = element;
                    formatting = formatting.replace(element, '[_' + counter + '_]');

                    ++counter;
                } while (formatting.includes(element));
            }
        });

        // Replace keys with label
        if(formatKeys.length > 0) {
            formatKeys.forEach((key, index) => {
                let term   = this.getTerm(key)
                formatting = formatting.replace('[_' + index + '_]', term.getLabel());
            });
        }

        // Restore unformat words
        if(unFormat[0] != undefined) {
            unFormat.forEach((element, index) => {
                formatting = formatting.replace('{_' + index + '_}', element[1]);
            });
        }

        return formatting;
    }
}

export default LunarSexagenary;