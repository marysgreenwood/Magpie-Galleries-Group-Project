const router = require('express').Router();
const multer = require('multer');
const { Art } = require('../../models');
const upload = multer({ dest: "../assets/user-art"});

//post route to add new art

/*app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}*/

//put route to update title and description fields
//delete route to remove work