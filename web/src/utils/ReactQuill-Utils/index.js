const formatQuillText = (text) => {
    const txtArr = text.split("\n");
    txtArr.pop();
    const formattedText = txtArr.join(" ");
    return formattedText;
}

export default {
    formatQuillText,
}