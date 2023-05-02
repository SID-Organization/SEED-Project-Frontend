const formatQuillText = (text) => {
    if(!text) return "";
    const txtArr = text.split("\n");
    txtArr.pop();
    const formattedText = txtArr.join(" ");
    return formattedText;
}

const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["image", "link"],
    ],
};

const quillStyle = { maxWidth: "43rem" };

export default {
    formatQuillText,
    quillModules,
    quillStyle
}