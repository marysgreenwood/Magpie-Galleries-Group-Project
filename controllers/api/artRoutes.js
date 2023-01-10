const router = require('express').Router();
const { Users, Art } = require('../../models');
const upload = require("../../utils/upload");
const path = require('path');
const multer = require ('multer');
const { DATE } = require('sequelize');
const { MulterError } = require('multer');
const fs = require ('fs');

//get route to search for work by artist




router.get ('/:username', async (req, res) =>{
    try {
        const searchByUser= await Users.findAll({
            where: {
                username: req.params.username
            },
        
    
           include: [{model: Art}]
        });
        res.status(200).json(searchByUser)
         //HOW TO DISPLAY ALL ART (FOR EACH?)
       //res.sendFile(path.join(`${__dirname}/../views/index.html`));
       console.log(searchByUser);
       
    } catch(err){
        res.status(400).json(err);
    }

})

//get route to search by keyword
router.get ('/:keyword', async (res, req) => {
    try {
        const searchByKeyword = await Art.findAll({
            where: {
             description: {
                [Op.substring]: req.params.keyword
             }
            }
        });
        res.status(200).json(searchByKeyword);
    } catch (err) {
        res.status(400).json(err);
    }
});

//post route to add new art
//add withauth helper, figure out how to access userID for Art.Create
router.post ('/upload', upload.single("file"), async (req, res) => {
    try{
        console.log (req.body);
        console.log (req.file.path);
        const timestamp = new DATE;
        const newArt= {};
        newArt.title= req.body.title;
        newArt.description=req.body.description;
        newArt.type=req.body.type;
        newArt.image= req.file.path;
        console.log(req.session);
        newArt.artist_key= req.session.user_id;
        newArt.date_added= timestamp.toString();
        const artUpload = await Art.create (newArt);
        res.status(200).json(artUpload);
    } catch(err){
        if (err instanceof multer.MulterError) {
            res.json(MulterError);
            console.log(MulterError)
            // A Multer error occurred when uploading.
          } else if (err) {
        res.status(400).json(err);
        console.log (err);
          }
    }
});

//put route to update title and description fields
router.put('/:id', async (req, res) => {
    try {
        var updatedArt= await Art.update(
        req.body,
         {
            where: {
              id: req.params.id,
            },   
    })
    res.status(200).json(updatedArt);
} catch(err) {
    res.status(400).json(err);
}
  

     
    
});

//delete route to remove work
router.delete ('/:id', async (req, res) => {
    try {
        const deletedArt= await Art.destroy ({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deletedArt)

    } catch(err){
        res.status(400).json(err);
    }
});

module.exports= router;