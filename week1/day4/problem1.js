var age = 10;

function displayAge() {
    function changeAge() {
        age = 20;
        console.log(age);
    }
    changeAge();
}

displayAge();
