
let person = { name: "John" };
function greet() {
    console.log("Hello, " + this.name);
}
let greetPerson = greet.bind(person);
greetPerson();
