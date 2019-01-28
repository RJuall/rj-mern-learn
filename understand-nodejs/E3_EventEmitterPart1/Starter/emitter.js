function Emitter() {
    this.events = {};
}

// It's common JS practice to call listeners 'on'
// This code puts functions into an array sorted
//  into event type properties.
Emitter.prototype.on = function(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
}

// The event emitter takes an event type
//  and goes thorough the event[type] array
//  executing its functions
Emitter.prototype.emit = function(type) {
    if (this.events[type]) {
        this.events[type].forEach(listener => {
            listener();
        });
    }
}

module.exports = Emitter;