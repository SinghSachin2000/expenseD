const express = require("express");
const app = express();

const database = require("./config/database");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 4000;

dotenv.config();

database.connect();

app.use(express.json());

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

//middleware add krne h 
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
//cloud se connect krna h 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();


app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});