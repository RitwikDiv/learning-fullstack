// Async / Await
// Built on top of promises
// Decorating a function with async

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

// Need to write the keyword async before the method to use await
async function displayCommits() {
    // Helps you write async code like sync code
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.github);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

displayCommits();
