import { floor, jdToSunlongitude, gregorianToJd } from './base-converter.js';

class LunarDateTime
{
    constructor(d, m, Y, H = 0, i = 0, s = 0, timezone = 0)
    {
        this.input = {
            d: d, m: m, Y:Y, H: H, i: i, s: s, timezone: timezone
        };

        this.output = this.#getOutput();
    }

    /**
     * Get Julian day count of new moon
     * 
     * @param integer k 
     * @returns integer
     */
    #getJdNewMoon(k)
    {
        let T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;

        T   = k/1236.85; // Time in Julian centuries from 1900 January 0.5
        T2  = T * T;
        T3  = T2 * T;
        dr  = Math.PI/180;
        Jd1 = 2415020.75933 + 29.53058868*k + 0.0001178*T2 - 0.000000155*T3;
        Jd1 = Jd1 + 0.00033*Math.sin((166.56 + 132.87*T - 0.009173*T2)*dr); // Mean new moon
        M   = 359.2242 + 29.10535608*k - 0.0000333*T2 - 0.00000347*T3; // Sun's mean anomaly
        Mpr = 306.0253 + 385.81691806*k + 0.0107306*T2 + 0.00001236*T3; // Moon's mean anomaly
        F   = 21.2964 + 390.67050646*k - 0.0016528*T2 - 0.00000239*T3; // Moon's argument of latitude
        C1  =(0.1734 - 0.000393*T)*Math.sin(M*dr) + 0.0021*Math.sin(2*dr*M);
        C1  = C1 - 0.4068*Math.sin(Mpr*dr) + 0.0161*Math.sin(dr*2*Mpr);
        C1  = C1 - 0.0004*Math.sin(dr*3*Mpr);
        C1  = C1 + 0.0104*Math.sin(dr*2*F) - 0.0051*Math.sin(dr*(M+Mpr));
        C1  = C1 - 0.0074*Math.sin(dr*(M-Mpr)) + 0.0004*Math.sin(dr*(2*F+M));
        C1  = C1 - 0.0004*Math.sin(dr*(2*F-M)) - 0.0006*Math.sin(dr*(2*F+Mpr));
        C1  = C1 + 0.0010*Math.sin(dr*(2*F-Mpr)) + 0.0005*Math.sin(dr*(2*Mpr+M));

        if (T < -11) {
            deltat= 0.001 + 0.000839*T + 0.0002261*T2 - 0.00000845*T3 - 0.000000081*T*T3;
        } 
        else {
            deltat= -0.000278 + 0.000265*T + 0.000262*T2;
        }

        JdNew = Jd1 + C1 - deltat;
    
        return JdNew;
    }

    #getJdLunarNovemberNewMoon(Y) {
        let jd, off, k, nm, sl;
        
        jd      = gregorianToJd(31, 12, Y);
        off     = jd - 2415021;
        k       = floor(off / 29.530588853);
        nm      = this.#getJdNewMoon(k);
        sl      = floor(jdToSunlongitude(nm, this.timezone) / 30);

        return (sl >= 9)
                ? this.#getJdNewMoon(k - 1)
                : nm;
    }

    #getLeapMonthOffset(a11) 
    {
        let k, last, i, arc;

        k       = floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        last    = 0;
        i       = 1;
        arc     = floor(jdToSunlongitude(this.getJdNewMoon(k + i), this.timezone) / 30);

        do {
            ++i;
            last = arc;
            arc  = floor(jdToSunlongitude(this.getJdNewMoon(k + i), this.timezone) / 30);
            
        } while(arc != last && i < 14);
    }

    #getJdNewDay()
    {
        let jd = gregorianToJd(
            this.input.d,
            this.input.m,
            this.input.Y
        );

        if(this.input.H === 23) {
            ++jd;
        }

        return jd;
    }

    #getOutput()
    {
        let dayNumber, k, monthStart;

        dayNumber   = this.#getJdNewDay();
        k           = floor((dayNumber - 2415021.076998695) / 29.530588853);
        monthStart  = this.#getJdNewMoon(k + 1);

        if(monthStart > dayNumber) {
            monthStart = this.#getJdNewMoon(k);
        }

        let a11, b11, lunarYear;
        a11 = this.#getJdLunarNovemberNewMoon(this.input.Y);
        b11 = a11;

        if(a11 >= monthStart) {
            lunarYear   = this.input.Y;
            a11         = this.#getJdLunarNovemberNewMoon(this.input.Y - 1);
        }
        else {
            lunarYear   = this.input.Y + 1;
            b11         = this.#getJdLunarNovemberNewMoon(this.input.Y + 1);
        }

        let lunarDay, diff, lunarLeap, lunarMonth, leapMonthDiff;
        lunarDay    = dayNumber - monthStart + 1;
        diff        = floor((monthStart - a11) / 29);
        lunarLeap   = 0;
        lunarMonth  = diff + 11;

        if(b11 - a11 > 365) {
            leapMonthDiff = this.#getLeapMonthOffset(a11);

            if(diff >= leapMonthDiff) {
                lunarMonth = diff + 10;

                if(diff == leapMonthDiff) {
                    lunarLeap = 1;
                }
            }
        }

        if(lunarMonth > 12) {
            lunarMonth -= 12;
        }

        if(lunarMonth >= 11 && diff < 4) {
            lunarYear -= 1;
        }

        let datetime = {
            d: floor(lunarDay),
            m: lunarMonth,
            Y: lunarYear,
            l: lunarLeap, 
            j: dayNumber,
        };

        return datetime;
    }

    /**
     * Get Lunar date time
     * 
     * @param string key 
     * @returns mixed
     */
    get(key)
    {
        switch(key) {
            case 'd':
            case 'D':
                return this.output.d;
            
            case 'm':
            case 'M':
                return this.output.m;
            
            case 'y':
            case 'Y':
                return this.output.Y;

            case 'l':
                return this.output.l;

            case 'j':
            case 'J':
                return this.output.j;

            case 'h':
            case 'H':
                return this.input.H;
            
            case 'i':
            case 'I':
                return this.input.i;

            case 's':
            case 'S':
                return this.input.s;

            case 'z':
            case 'Z':
                return this.input.timezone;

            default:
                throw 'Invalid key.';
        }
    }

    /**
     * Format date time
     * 
     * @param string format EX: d/m/Y, m-d-Y...
     * @returns string
     */
    format(format)
    {
        let validKeys = ['d', 'D', 'm', 'M', 'y', 'Y', 'j', 'J', 'h', 'H', 'i', 'I', 's', 'S', 'z', 'Z', 'l'];

        for (const key of validKeys) {
            if(format.includes(key)) {
                let replacer = this.get(key);
                if(key == 'd' || key == 'D' || key == 'm' || key == 'M') {
                    if(replacer < 10) {
                        replacer = '0' + replacer;
                    }
                }

                do {
                    format = format.replace(key, replacer);
                } while (format.includes(key));
            }
        }

        return format;
    }
}

export default LunarDateTime;