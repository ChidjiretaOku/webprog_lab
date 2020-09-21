function monthsBetween(d1,m1,y1,d2,m2,y2){
    let start = new Date(y1,m1-1,d1);
    module.exports.date1 = start;
    let end = new Date(y2,m2-1,d2);
    module.exports.date2 = end;
    let diff = end - start;
    return Math.floor(diff/2628000000);
}
module.exports.monthsBetween = monthsBetween;

