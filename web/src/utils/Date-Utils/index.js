const formatDateForDB = (date) => {
    if (!date) return "";
    const newDate = date
        .split("T")[0];

    return newDate;
};

function formatDate(date, addDays = 0) {
    const dateObject = new Date(date);
    if (addDays) dateObject.setDate(dateObject.getDate() + addDays);
    const dateString =
        dateObject.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    return dateString;
}

function formatDateTime(date) {
    const dateObject = new Date(date);
    const dateString =
        dateObject.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        + " - " +
        dateObject.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    return dateString;
}

function formatFromInputToSlash(date) {
    const dateString = date.split("-").reverse().join("/");
    return dateString;
}

export default {
    formatDate,
    formatDateTime,
    formatDateForDB,
    formatFromInputToSlash
}