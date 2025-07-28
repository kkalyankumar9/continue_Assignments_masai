function deepcopy(obj){
    console.log("Original Object:", obj);
    newObj=JSON.parse(JSON.stringify(obj));
    newObj.hobbies.push("coding");
    console.log(newObj);
   

}
deepcopy({ name: "Alice", hobbies: ["reading", "traveling"] })

