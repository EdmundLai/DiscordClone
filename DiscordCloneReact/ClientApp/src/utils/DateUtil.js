import { format, addMinutes } from 'date-fns';

function formatToLocaleString(isoString) {
    try {
        const creationDate = new Date(isoString);

        const offset = new Date().getTimezoneOffset();

        //console.log(`offset: ${offset}`);

        const localeDate = addMinutes(creationDate, offset * -1);

        //console.log(localeDate);

        return format(localeDate, "MM/dd/yyyy");

    } catch (e) {
        // lots of bugs occurring here
        //console.log("bug in formatToLocaleString");
        //console.log(e);
        return isoString;
    }
    
}

export { formatToLocaleString };