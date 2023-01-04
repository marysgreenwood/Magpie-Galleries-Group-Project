const router = require('express').Router();
const multer = require('multer');
const { Art } = require('../../models');
const upload = require("../../utils/upload")

//post route to add new art

router.post ('/upload', upload.single("file"), async (req, res) => {
    try{
        const newArt= req.body;
        newArt.image= req.file;
        const artUpload = await Art.create (newArt);
        res.status(200).json(artUpload);
    } catch(err){
        res.status(400).json(err);
    }
})

//put route to update title and description fields
//delete route to remove work