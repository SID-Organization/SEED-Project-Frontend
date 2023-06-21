import TranslateUtils from "../Translate-Utils";

const formatting_options = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
}

const formatCurrency = (currency) => {
    if (!currency) return null;
    let currencyString = new Intl.NumberFormat(TranslateUtils.getLanguage(), formatting_options);
    return currencyString.format(currency);
}


export default {
    formatCurrency
}