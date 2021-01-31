// Import Mongoose
const mongoose = require("mongoose");
// Import Config
const config = require("config");
// Import Debug
const mongoDebug = require("DEBUG")("app:mongo");
console.log(config.get("mongo").username);
console.log(config.get("mongo").password);

// Connect Mongoose 
const uri = `mongodb+srv://${config.get("mongo").username}:${config.get("mongo").password}@sandbox.vlco9.mongodb.net/playground?retryWrites=true&w=majority`;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(uri)
    .then(result => mongoDebug("Connected to the db"))
    .catch(err => mongoDebug(`Couldn't establish a connection: ${err.message}`));

// Create mongoose schema object
const reviewSchema = mongoose.Schema({
    author: String,
    date: {type: Date, default: Date.now},
    review: String,
    score: Number
});

const Review = mongoose.model("Review", reviewSchema);

// Insert a course
async function createReview(){
    const review = new Review({
        author: "Anand",
        review: "The intructor doesn't seem as knowledgable in the subject as i hoped but still good. ",
        score: 2
    });
    
    const result = await review.save();
    console.log(`Result of the insert: ${result}`);

}

// createReview();
// Create a query function
async function getReviews(){
    const results =  await Review
        .find({score: {$gt: 3}})
        .sort({score: 1, author: 1});
    console.log(results);
}

getReviews();
// Create a counting function
async function getReviewCount(){
    const results =  await Review
        .find()
        .countDocuments();
    console.log(`Number of total documents: ${results}`);
}

getReviewCount();


// Add a method that closes connection on Ctrl + C
process.on('SIGINT', function() {
    mongoose.connection.close(() => {
      mongoDebug('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });