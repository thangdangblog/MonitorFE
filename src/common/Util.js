class Utils {
    static getStartAndEndOfMonth() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        // Calculate the start of the month
        const startDate = new Date(year, month, 1);

        // Calculate the end of the month
        const endDate = new Date(year, month + 1, 0);

        return {
            start: startDate,
            end: endDate
        };
    }

    static getWeekRange(date = new Date()) {
        const startDate = new Date(date);
        const endDate = new Date(date);

        // Set the start date to the first day of the week (Sunday)
        startDate.setDate(date.getDate() - date.getDay());

        // Set the end date to the last day of the week (Saturday)
        endDate.setDate(startDate.getDate() + 6);

        return {
            start: startDate.toISOString(),
            end: endDate.toISOString()
        };
    }
}

export default Utils;