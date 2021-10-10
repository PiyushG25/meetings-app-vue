const dateFilter = ( isoDate, format ) => {
    const d = new Date( isoDate );
    if( format === 'local' ) {
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    } else {
        return d.toDateString();
    }
};


/*const currentDateFilter = ( isoDate, format ) => {
    const currentDate = new Date( isoDate)
    if( format === 'local' ) {
        return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}}`;
    } else {
        return currentDate.toDateString();
    }
};
export default currentDateFilter;*/
export default dateFilter;
