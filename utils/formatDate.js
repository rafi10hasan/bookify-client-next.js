function formatDate(date) {
    const day = date.getDate();
    const daySuffix = (day % 10 === 1 && day !== 11) ? 'st' :
                      (day % 10 === 2 && day !== 12) ? 'nd' :
                      (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
    const options = { year: 'numeric', month: 'long' };
    return `${day}${daySuffix} ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
}

export {formatDate}