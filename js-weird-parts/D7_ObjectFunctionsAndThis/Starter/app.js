console.log(this);

function a() {
    console.log(this);
    this.newvariable = "HELLO";
}

var b = function () {
    console.log(this);
}

a();
console.log(newvariable);
b();

var c = {
    name: "The c object",
    log: function() {
        this.name = "Updated c object";
        console.log(this);

        var setName = function(newName) {
            this.name = newName;
        }
        setName('Updated again! The c object');
        console.log(this);
    }
}

var d = {
    name: 'The d object',
    log: function() {
        var self = this;
        self.name = 'Updated d object';
        console.log(self);
        var setName = function(newName) {
            self.name = newName;
        }
        setName('Updated again! The d object');
        console.log(self);
    }
}

c.log();
d.log();