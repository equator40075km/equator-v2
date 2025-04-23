const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export const getDateTimeFromUTC = (datetime) => {
    const date = new Date(datetime)
    return date.toLocaleString()
}

export const getDateFromUTC = (_date) => {
    const date = new Date(_date)
    return date.toLocaleString().substring(0, 10)
}

export const getYearFromUTC = (_date) => {
    const date = new Date(_date)
    return date.getFullYear()
}

export const getFormatDay = (_date) => {
    const date = new Date(_date)
    return `${date.getUTCDate()} ${months[date.getUTCMonth()]}`
}
