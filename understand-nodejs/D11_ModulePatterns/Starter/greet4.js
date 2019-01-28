function Greetr() {
    this.greeting = "HELLO WORLD 4";
    this.greet = function() {
        console.log(this.greeting);
    }
}
module.exports = Greetr;