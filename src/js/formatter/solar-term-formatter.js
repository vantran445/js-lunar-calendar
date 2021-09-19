import TermFormatter from "./term-formatter.js";

class SolarTermFormatter extends TermFormatter
{
    term_keys = [
        'xuan_phan', 'thanh_minh', 'coc_vu', 'lap_ha', 'tieu_man', 'mang_chung', 'ha_chi', 'tieu_thu',
        'dai_thu', 'lap_thu', 'xu_thu', 'bach_lo', 'thu_phan', 'han_lo', 'suong_giang', 'lap_dong',
        'tieu_tuyet', 'dai_tuyet', 'dong_chi', 'tieu_han', 'dai_han', 'lap_xuan', 'vu_thuy', 'kinh_trap'
    ];

    constructor(offset)
    {
        if(offset < 0 || offset > 23) {
            throw 'The offset of Solar term should be 0 through 23.';
        }

        super(offset);
    }
}

export default SolarTermFormatter;