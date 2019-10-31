export const getTruncatedArray = (arr, startIndex, count) => {
    let newArray = [];
    if(arr.length > 0) {
        for(let i=0; i < count; i++) {
            newArray.push(arr[startIndex + i]);
        }
    }
    return newArray;
}