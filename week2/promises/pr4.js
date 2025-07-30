let taskA = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Task A completed");
    }, 1000);
});

let taskB = (resultA) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Task B processed: ${resultA}`);
        }, 1500);
    });
};

let taskC = (resultB) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Final result: ${resultB}`);
        }, 500);
    });
};

// Chain the promises
taskA
    .then(resultA => {
        console.log(resultA);
        return taskB(resultA); // pass resultA to taskB
    })
    .then(resultB => {
        console.log(resultB);
        return taskC(resultB); // pass resultB to taskC
    })
    .then(finalResult => {
        console.log(finalResult);
    })
    .catch(err => {
        console.error("Error:", err);
    });
