/**
 * Round down a decimal number
 * 
 * @param {float} number 
 * @returns 
 */
export function floor(number)
{
    return Math.floor(number);
}

/**
 * Convert a Gregorian date time to Julian Day count
 * 
 * @param   {int} day 
 * @param   {int} month 
 * @param   {int} Year 
 * @param   {int} Hour 
 * @param   {int} minute 
 * @param   {int} second 
 * @returns {float}
 */
export function gregorianToJd(day, month, Year, Hour = 0, minute = 0, second = 0)
{
    let a, y, m, jd;

	a   = floor((14 - month) / 12);
	y   = Year + 4800 - a;
	m   = month + 12 * a - 3;
	jd  = day + floor((153 * m + 2) / 5) + 365 * y + floor(y / 4) - floor(y / 100) + floor(y / 400) - 32045;

	if (jd < 2299161) {
		jd = day + floor((153 * m + 2) / 5) + 365 * y + floor(y / 4) - 32083;
	}

    jd += (Hour + minute / 60 + second / 3600) / 24;

	return jd;
}

/**
 * Convert Julian Day Count to Sunlongitude by Degees
 * 
 * @param   {float} jd        Julian Day Count
 * @param   {float} timezone  Float timezone, ex: '+0730' should be convert to 7.5
 * @returns {float}
 */
export function jdToSunlongitude(jd, timezone = 0)
{
    let T, dr, L, G, ec, lambda, sl;

    T      = (jd - 2451545.5 - timezone / 24) / 36525;
    dr     = Math.PI / 180;
    L      = 280.460 + 36000.770 * T;
    G      = 357.528 + 35999.050 * T;
    ec     = 1.915 * Math.sin(dr * G) + 0.020 * Math.sin(dr * 2 * G);
    lambda = L + ec;  
    sl     = lambda - 360 * (floor(lambda / (360)));

    return sl;
}


