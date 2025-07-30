
function timer(duration, onComplete) {
  setTimeout(() => {
    onComplete(`Timer of ${duration} ms finished`);
  }, duration);
}


console.log("Timer started...");

timer(3000, function(message) {
  console.log(message); 
});
