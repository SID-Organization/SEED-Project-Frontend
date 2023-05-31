import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

let key = "1f6f5b0d4547433998320a5af21e3d8a";
let endpoint = "https://api.cognitive.microsofttranslator.com";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
// let location = "<YOUR-RESOURCE-LOCATION>";

export default async function AzureTranslate(text, language) {
    return await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            // location required if you're using a multi-service or regional (not global) resource.
            // 'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': 'pt',
            'to': ['en', 'de']
        },
        data: [{
            'text': 'Trying to use Azure Translator API!'
        }],
        responseType: 'json'
    }).then(function (response) {
        console.log(JSON.stringify(response.data, null, 4));
    })
};