const formatDate = (date) => {
    const newDate = date
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
    return newDate;
};

const formatDateFromDB = (date) => {
    const newDate = date
        .split("T")[0]
    
    return newDate;
};

export default {
    formatDate,
    formatDateFromDB
}