// Powerful when dealing with async code
// When a promise is typically called it triggers an async operation
// The operation is either fullfilled or rejected

const prom = new Promise((resolve,reject) => {
    // Kick off some async work
    // ...
    // When work completes we will have resolve or reject
    setTimeout(() => {
        resolve(1); // pending to resolved/fullfilled
        // reject(new Error('You messed up')); // pending to rejected
    }, 2000);
});

prom
    .then(result => console.log(`Result: ${result}`))
    .catch(err => console.log("Error:", err.message));

// -------------------------------------------------------------
// Resolving the callback hell from the previous slide
function getUser(id){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(`Getting user with id ${id}`);
            resolve({id: id, github: 'ritwikdiv'});
        }, 2000);
    });
}

// Get repository for the users 
function getRepositories(username) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(`Retrieving repos for the user: ${username}`);
            resolve(['repo1', 'repo2', 'repo3']);
        }, 3000);
    });
}

// Get commits for the first repo
function getCommits(repo){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(`Retrieving commits for repo: ${repo}`);
            resolve(['Updated feature 1', 'Updated feature 2']);
        }, 200);
    });
}

getUser(1)
    .then(user => getRepositories(user.github))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits))
    .catch(err => console.log(`Error: ${err.message}`));

// -------------------------------------------------------------
// Creating a resolved promise for testing purposes
const resolvedPromise = Promise.resolve({id: 1});
resolvedPromise.then(result => console.log(result));

const rejectedPromise = Promise.reject(new Error('You messed up!'));
rejectedPromise.catch(err => console.log(err));


// ------------------------------------------------------------
// Running promises in parallel
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`Async Operation 1`);
        resolve(1); 
        // reject(new Error("Something failed with 1"));
    }), 5000;
})


const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`Async Operation 2`);
        resolve(2); 
        // reject(new Error("Something failed with 1"));
    }), 5000;
})

// Kick of both of these operations and do something when both are resolved
Promise.all([p1,p2])
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err.message));

// If you want to get the result of the first promise that gets fullfilled
Promise.race([p1,p2])
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err.message));




