const express = require("express");
const app = express();

const userRoutes = require("./routes/User")
const groupRoutes = require("./routes/Group")
const cardRoutes = require("./routes/Card")
const investRoutes = require("./routes/Investment")

const fileUpload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");
const database = require("./config/database");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
database.connect();


app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

//middleware add krne h 
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
//cloud se connect krna h 
cloudinary.cloudinaryConnect();


app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/group",groupRoutes);
app.use("/api/v1/card",cardRoutes);
app.use("/api/v1/transaction",investRoutes);


app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});