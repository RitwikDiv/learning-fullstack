// Ways to deal with async results
// Callbacks 
console.log(`Before`);

getUser(1, (user) => {
    console.log("User retrieved: ", user);
    getRepositories(user.github, (repos) => {
        console.log("Repos: ", repos);
        getCommits(repos[0], (commits) =>{
            console.log("Commits: ", commits);
        })
    });
});

console.log(`After`);

function getUser(id, callback) {
    setTimeout(() => {
        console.log(`Getting user with id ${id}`);
        callback({id: id, github: 'ritwikdiv'});
    }, 2000);
}

// Get repository for the users 
function getRepositories(username, callback) {
    setTimeout(() => {
        console.log(`Retrieving repos for the user: ${username}`);
        callback(['repo1', 'repo2', 'repo3']);
    }, 3000);
}

// Get commits for the first repo
function getCommits(repo, callback){
    setTimeout(() => {
        console.log(`Retrieving commits for repo: ${repo}`);
        callback(['Updated feature 1', 'Updated feature 2']);
    }, 200);
}

// Due to the nested structure of callbacks, 
// they can easily turn into unmaintainable hell called callbackhell or christmas tree prob


// Sync implementation
// It is far better to read this

// console.log(`Before`);
// const user = getUser(1);
// const repos = getRepositories(user.github);
// console.log(`After`);


// Solving call back hell
// Replace anonymous functions with named function
function displayCommits(commits){
    console.log(commits);
}

function getCommits(repos){
    getCommits(repos[0], displayCommits);
}

function getRepositories(user){
    getRepositories(user.github, getCommits);
}

getUser(1, getRepositories);


// This is fucking confusing as hell