import axios from "axios";


const Translate = async (textToTranslate) => {
    // const bodyConfigs = JSON.stringify({
    //     q: textToTranslate,
    //     source: "pt",
    //     target: "de",
    //     format: "text",
    //     api_key: ""
    // });

    // const contentType = { "Content-Type": "application/json" };

    // return await axios.post("https://libretranslate.com/translate", bodyConfigs, contentType)
    const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: textToTranslate,
            source: "pt",
            target: "de",
            format: "text",
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    return data.translatedText;
}

export default Translate;
