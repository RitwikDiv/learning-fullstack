// Get customer function
function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ 
              id: id, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000);
    });  
}

// Get top movies function
function getTopMovies() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);
    });
}

// Send email function
function sendEmail(email, movies) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve();
          }, 4000);
    });
}

// Async await calling
async function displayDetails(){
    try{
        const customer = await getCustomer(1);
        console.log('Customer: ', customer);
        if (customer.isGold){
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            await sendEmail(customer.email, movies);
            console.log('Email sent...');
        }
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

displayDetails();