import trans_keys from "./language/default.json";

class JsLunarTranslator
{
    trans(key) 
    {
        return (trans_keys[key] != undefined)
                    ? trans_keys[key]
                    : key;
    }

    setLocalization(jsonTransData)
    {
        let data = JSON.parse(jsonTransData);
        
        for(const[key, val] of Object.entries(data)) {
            trans_keys['${key}'] = '${val}';
        }
    }
}

export default JsLunarTranslator;