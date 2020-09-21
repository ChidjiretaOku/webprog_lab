function shiftNum(arr, n) {
    let array
    array = arr
    for (let index = 0; index < n; index++) {
        array.push(array.shift())
    }
    return array
}

module.exports.shiftNum = shiftNum;