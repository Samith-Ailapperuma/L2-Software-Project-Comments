function FormatDateTime(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = '' + d.getFullYear(),
        hour = '' + d.getHours()
        // mins = d.getMinutes()
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year, hour].join(', ');
}

export default FormatDateTime;