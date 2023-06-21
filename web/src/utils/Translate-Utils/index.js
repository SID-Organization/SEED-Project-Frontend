const getLanguage = () => {
    return JSON.parse(localStorage.getItem("configs"))?.language || "pt-br";
}

const setLanguage = (languageCode) => {
    localStorage.setItem("configs", JSON.stringify({ language: languageCode }))
}

const getChildrenText = (children) => {
    return children.find(item => typeof item === "object").props.children
}

export default {
    getChildrenText,
    getLanguage,
    setLanguage
}