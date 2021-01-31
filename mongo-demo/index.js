// Get mongoose package
const mongoose = require('mongoose');

// Importing config
const config = require('config');

// Setting up db debugger
const dbDebugger = require('debug')('app:db');

// Importing the uri from atlast
const uri = `mongodb+srv://${config.get("dbUser")}:${config.get("dbPass")}@sandbox.vlco9.mongodb.net/playground?retryWrites=true&w=majority`;

// To use new URL string parse
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(uri)
    .then(result => dbDebugger(`Connected to the MongoDB ...}`))
    .catch(err => dbDebugger(`Couldn't connect to MongoDB: ${err.message}`));


// ---------------------------------------------------------------------------

// Defining a schema

// Schema types: string, number, date, buffer, boolean, object id, array

// Implementing validation
const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true, // uppercase: true
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                // Do some async work
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 1000);
            },
            message: "A course should have atleast 1 tags"
        }
    },
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    }
});

// We have the model course
// We can create instances of the class course and be able to save that to the db
const Course = mongoose.model('Course', courseSchema); // Providing the name of collection and schema

async function createCourse() {
    // Creating an item course
    const course = new Course({
        name: "React JS Course",
        author: "Chris",
        tags: ['tutorial', 'frontend', 'javascript'],
        isPublished: false
    });
    // Add the value to the database
    try{
        const result = await course.save();
        console.log(`Result from the operation: ${result}`);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }

}

// Add a new object to the collection using the command below
createCourse();

// ------------------------------------------------------
// Comparison operators
// eq - equal to
//ne - not equal to
// gt - greater that
// gte - greater than or equal to
// lt - less than
// lte - less than or equal to
// in & nin

// Logical operators
// or
    // .find()
    // .or([{isPublished: true}, {isPublished: false}])
// and
    // .find()
    // .and([{name: "NodeJS Course"}, {name: "MongoDB Course"}])

    // -----------------------------------------------------
// Using regular expressions
// Find author whos name starts with Ritwik
    // .find({author: /^Ritwik/})
// Find author whos name ends with a string. i denotes case desensitivity
    // .find({author: /Divakaruni$/i })
// Find author whos name contains Ritwik
    // .find({author: /.*Ritwik.*/})

// Regular querying documents
async function getCourses() {
    const courses = await Course
        .find({tags: "frontend"})
        // .find({price: {$gte: 10, $lte: 20}})
        // .find({price: {$in: [10,15,20]}})
        .limit(10)
        .sort({author: 1})
        .select({isPublished: 1, date: 1, tags: 1, _id: 0});
    console.log(courses);
}

// getCourses();

// Count available documents
async function countCourses() {
    const count = await Course
        .find({name: "NodeJS Course"})
        .countDocuments();
    console.log(`Data points which match your query: ${count}`);
}

// countCourses();

// Implementing pagination
async function getCoursesPaged() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        .find({name: "NodeJS Course"})
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .sort({author: 1})
        .select({isPublished: 1, date: 1, tags: 1, _id: 0});
    console.log(courses);
}

// Update function
async function updateCourse(id){
    // THis method is good for applying business logic
    // Query first
    // findById()
    // Modify properties
    // Save it
    // const course = await Course.findById(id); 
    // if (!course) return;    
    // course.isPublished = true;
    // course.author = "Ritwik Divakaruni";
    // const result = await course.save();
    // console.log(result);


    // Update first
    // Update directly
    // Get updated document
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Ritwik',
            isPublished: false
        }
    }, {new: true}); // new property returns the latest updated val
    console.log(course);

}

// updateCourse("601605ec1c74ed108fe549d2");

// Remove a document
async function deleteCourse(id){
    const result = await Course.deleteOne({_id: id});
    // Course.findByIdAndRemove(id);
    console.log(result);
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(() => {
      dbDebugger('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });