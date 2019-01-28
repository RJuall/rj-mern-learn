const obj = {
    name: 'John Doe',
    greet() {
        console.log(`HELLO ${this.name}`);
    }
}
obj.greet();
// Both call and apply are functions that call other
//  functions.
// The call or apply function will change what the `this` variable
//  will be pointing to, chaning it in this case from
//  the 'John Doe' object to the newly-created 'Jane Doe'
//  object.
obj.greet.call({ name: 'Jane Doe' });
// call and apply work exactly the same, except that
//  in the case when there are arguments to be passed
//  to the function. call accepts function arguments as individual
//  arguments separated by commas. apply accepts them as
//  a single array.
obj.greet.apply({ name: 'Todd Doe' });