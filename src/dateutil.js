const imported = true;

export const month = (function () {

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const monthNamesShort = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    return {
        getName: function (m) {
            return monthNames[m] ?? 'the what?!';
        },

        getShortName: function (m) {
            return monthNamesShort[m] ?? 'the what?!';
        }
    };
})();

export default imported;