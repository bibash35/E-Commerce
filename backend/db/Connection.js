
// require('dotenv').config();
// const mongoose = require('mongoose');

// exports.ConnectToDb = async () => {
//     try {
//         const url = process.env.url;
//         await mongoose.connect(url); // ✅ Removed deprecated options
//         console.log("Database connected successfully");
//     } catch (err) {
//         console.error("Database connection error: ", err.message);
//     }
// };

require('dotenv').config();  

const mongoose = require('mongoose');

exports.ConnectToDb = async () => {
    try {
        const url = process.env.url;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error: ", err.message);
    }
};
