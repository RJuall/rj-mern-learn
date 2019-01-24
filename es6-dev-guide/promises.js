let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 3000);
});

promise
    .then(() => {
        console.log("Finally Finished!");
    }).then(() => {
        console.log("Also me!");
    }).catch(() => {
        console.log("Oh no.");
    });

url = "https://jsonplaceholder.typicode.com/posts123456/";
fetch(url)
    .then(data => console.log(data))
    .catch(error => console.log('BAD', error));