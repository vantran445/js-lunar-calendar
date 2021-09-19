import { floor, jdToSunlongitude, gregorianToJd, jdToGregorian } from './base-converter.js';
import SolarTermFormatter from './formatter/solar-term-formatter.js';

class SolarTerm
{
    jd;
    sunlongitude;
    term;
    datetimeinput;
    datetimebegin;

    constructor(d, m, Y, H = 0, i = 0, s = 0, timezone = 7) 
    {
        this.jd             = gregorianToJd(d, m, Y, H, i, s);
        this.sunlongitude   = jdToSunlongitude(this.jd, timezone);

        this.datetimeinput = {
            d: d,
            m: m,
            Y: Y,
            H: H,
            i: i,
            s: s,
            timezone: timezone
        };
    }

    getTerm()
    {
        if(this.term == undefined) {
            let offset  = floor(this.sunlongitude / 15);
            this.term    = new SolarTermFormatter(offset);
        }

        return this.term;
    }

    getBeginDateTime()
    {
        if(this.datetimebegin !== undefined) {
            return this.datetimebegin;
        }
        
        let timezone    = this.datetimeinput['timezone'];
        let prevJdDay   = floor(this.jd);
        let preSl       = this.sunlongitude;
        let slBegin     = this.getTerm().getOffset() * 15;

        if(slBegin < 15) {
            while(preSl < 15) {
                prevJdDay  -= 1;
                preSl       = jdToSunlongitude(prevJdDay, timezone);
            }
        } else {
            while(preSl >= slBegin) {
                prevJdDay  -= 1;
                preSl       = jdToSunlongitude(prevJdDay, timezone);
            }
        }

        // Get time start new Term (Using Hours only)
        let jdEarchHours = 1 / 24;

        do {
            prevJdDay   += jdEarchHours;
            preSl        = jdToSunlongitude(prevJdDay, timezone);
        }
        while ((slBegin < 15 && preSl > 15) ||(slBegin > 15 && preSl < slBegin));
        
        this.datetimebegin              = jdToGregorian(prevJdDay);
        this.datetimebegin['timezone']  = timezone;

        return this.datetimebegin;
    }
}

export default SolarTerm;