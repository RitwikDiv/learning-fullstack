function log(req,res, next){
    console.log(`Logging...`);
    next(); // not going to the next middleware function leads to  hanging
}


module.exports = log;