// The custom helper "format_date" takes in a timestamp
module.exports = {
 format_date: (date) => {
    //return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
 },
};