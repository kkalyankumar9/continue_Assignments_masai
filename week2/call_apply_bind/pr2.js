function multiplyNumbers (a,b){
    return a * b;
}
const data=multiplyNumbers.apply(null,[2,6])
console.log(data); // Output: 12