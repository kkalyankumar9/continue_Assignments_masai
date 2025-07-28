function personInfo (){
console.log(this.name + " is " + this.age);
}
personInfo.call({"name":"kalyan","age":22});