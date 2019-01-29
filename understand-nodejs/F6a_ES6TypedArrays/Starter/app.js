const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
view[0] = 5;
view[1] = 15;
console.log(view);