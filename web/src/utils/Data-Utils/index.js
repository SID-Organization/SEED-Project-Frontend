const transformDate = (date) => {
    const newDate = date
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
    return newDate;
};

export default {
    transformDate,
}