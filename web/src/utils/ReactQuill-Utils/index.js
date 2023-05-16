const formatQuillText = (text) => {
    if (!text) return "";
    const txtArr = text.split("\n");
    txtArr.pop();
    const formattedText = txtArr.join(" ");
    return formattedText;
}

const removeHTML = (text) => {
    if (!text) return "";
    const formattedText = text.replace(/<[^>]+>/g, '');
    return formattedText;
}

const colors = [
    "black",
    "white",
    "lightgray",
    "darkgray",
    "gray",

    "red",
    "darkred",

    "blue",
    "lightblue",
    "darkblue",
]



const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: colors }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link"],
    ],
};

const quillStyle = { maxWidth: "43rem" };

export default {
    formatQuillText,
    removeHTML,
    quillModules,
    quillStyle
}