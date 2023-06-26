import moment from 'moment/moment';

export const ucwords = (str) => {
    if (str == null) { // test for null or undefined
        return "";
    }

    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export const isEmailValid = (value) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return value && mailformat.test(value);
}

export const checkObjectProperties = (obj) => {
    for (const key in obj) {
        if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
            return true
        }
    }
    return false;
}

export const isFirstDateSameOrBefore = (startDate, endDate) => {
    if (startDate === undefined) {
        return false
    }

    if (endDate === undefined) {
        return false
    }


    var mStart = moment(startDate);
    var mEnd = moment(endDate);

    // console.log('mStart ', mStart);
    //console.log('mEnd ', mEnd);
    //console.log('mStart.isSame(mEnd) || mStart.isBefore(mEnd) ', mStart.isSame(mEnd) || mStart.isBefore(mEnd));
    return mStart.isSame(mEnd) || mStart.isBefore(mEnd);
}

export const onGetFileInfo = (data) => {
    var objbuilder = '';
    objbuilder += ('<object width="100%" height="100%" data = "data:application/pdf;base64,');
    objbuilder += (data);
    objbuilder += ('" type="application/pdf" class="internal">');
    objbuilder += ('<embed src="data:application/pdf;base64,');
    objbuilder += (data);
    objbuilder += ('" type="application/pdf"  />');
    objbuilder += ('</object>');
    var windo = window.open("#", "_blank");
    windo.document.write('<html><title>' + 'Download' + '</title><body style="margin-top: 0px; margin - left: 0px; margin - right: 0px; margin - bottom: 0px; ">');
    windo.document.write(objbuilder);
    windo.document.write('</body></html>');
}

export function getChatFormattedDate(date) {
    var day = ['Mon', 'Thu', 'Wen', 'Tur', 'Fri', 'Sat', 'Sun'];
    var d = new Date(date);

    return  d.getHours() + ':' + d.getMinutes();
}

export function getFormattedDate(date) {
    var month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12'];
    var d = new Date(date);

    return d.getDate() + '-' + month[d.getMonth()] + '-' + d.getFullYear();
}