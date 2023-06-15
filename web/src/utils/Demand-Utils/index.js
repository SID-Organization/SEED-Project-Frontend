import DEMAND_STATUS from "./JSONs/DemandStatus.json"
import ReactQuillUtils from "../ReactQuill-Utils"

//Translations
import TranslateUtils from "../../utils/Translate-Utils/index.js";

const getDemandStatusByRole = (rawStatus, role = "SOLICITANTE") => {
    let status;
    if (["ANALISTA", "GERENTE", "GESTOR_TI"].includes(role)) {
        status = DEMAND_STATUS[rawStatus].ANALYST[TranslateUtils.getLanguage()]
    } else {
        status = DEMAND_STATUS[rawStatus].REQUESTER[TranslateUtils.getLanguage()]
    }
    return status
}

const getDemandStatusColorByRole = (status, role = "SOLICITANTE") => {
    if (["ANALISTA", "GERENTE", "GESTOR_TI"].includes(role)) {
        return DEMAND_STATUS[status].ANALYST_COLOR
    }

    return DEMAND_STATUS[status].COLOR
}

const getPercentageByStatus = (status) => {
    return DEMAND_STATUS[status].PERCENTAGE
}

function getBenefitCoin(coin) {
    switch (coin) {
        case "REAL":
            return "R$";
        case "DOLAR":
            return "$";
        case "EURO":
            return "€";
    }

    switch (coin) {
        case "R$":
            return "REAL";
        case "$":
            return "DOLAR";
        case "€":
            return "EURO";
        default:
            "REAL";
    }
}

function formatBenefit(benefit, benefitType, formatToCode = false) {
    let tempBenefit;
    if (!formatToCode) {
        tempBenefit = {
            moedaBeneficio: getBenefitCoin(benefit.coin),
            memoriaCalculoBeneficio: ReactQuillUtils.removeHTML(benefit.descriptionHTML),
            memoriaCalculoBeneficioHTML: benefit.descriptionHTML,
            valorBeneficio: benefit.value,
            tipoBeneficio: benefitType,
            idFront: benefit.idFront,
        };
        if (benefit.benefitId) tempBenefit["idBeneficio"] = benefit.benefitId;
    } else if (formatToCode) {
        tempBenefit = {
            benefitId: benefit.idBeneficio,
            value: benefit.valorBeneficio,
            coin: getBenefitCoin(benefit.moedaBeneficio),
            descriptionHTML: benefit.memoriaCalculoBeneficioHTML,
            idFront: benefit.idFront,
        };
    }
    return tempBenefit;
}

export default {
    getDemandStatusByRole,
    getDemandStatusColorByRole,
    getPercentageByStatus,
    formatBenefit
}