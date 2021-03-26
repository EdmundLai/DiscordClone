import { format, addMinutes } from 'date-fns';

function formatToLocaleString(isoString) {
    const creationDate = new Date(isoString);

    const offset = new Date().getTimezoneOffset();

    const localeDate = addMinutes(creationDate, offset * -1);

    return format(localeDate, "MM/dd/yyyy");
}

export { formatToLocaleString };