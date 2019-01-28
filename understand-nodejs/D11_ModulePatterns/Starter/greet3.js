function Greetr() {
    this.greeting = "HELLO WORLD 3";
    this.greet = function() {
        console.log(this.greeting);
    }
}
module.exports = new Greetr();