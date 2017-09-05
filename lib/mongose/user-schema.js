const mongoose = require('mongoose');
const env = process.env.NODE_ENV;
let uri;
let options = {
    useMongoClient: true
};
if (env === "test") {
    // options = {
    //     useMongoClient: true,
    //     user: 'admin',
    //     pass: 'admin',
    // };
    uri = "mongodb://admin:admin@192.168.1.92/test";
} else {
    uri = "mongodb://localhost/test"
}
console.log('connect mongodb', uri)

let db = mongoose.connect(uri, options);
let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: String,
    sex: String,
    age: String,
    phone: String,
    email: String,
    university: String,
    education: String,
    year: String,
    data: String,
    evaluate: String,
    source: String,
    date: Date,
    interview_assessment: String,
    entry_time: Date,
    end_result: String,
});


userSchema.add({ time: 'string', interview_times: 'string', statu: 'string' });
userSchema.add({ job:'string'})
let Hr = mongoose.model('hr', userSchema);
exports.Hr = Hr;
