function checkEvenNumber(num){
    return new Promise((res,rej)=>{
   
    if(num % 2 === 0){
        res(`${num} is even`);
    }else{
        rej(`${num} is odd`);
    }

});
}


let callPro=checkEvenNumber(5);

callPro
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });