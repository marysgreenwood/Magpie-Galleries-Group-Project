const router = require('express').Router();
const { User, Art } = require('../../models');
const upload = require("../../utils/upload");
const path = require('path');

//get route to search for work by artist


router.get ('/:username', async (req, res) =>{
    try {
        const searchByUser= await Users.findAll({
            where: {
                username: req.params.username
            }
        }, 
        {
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
        const newArt= req.body;
        console.log(req.file);
        newArt.image= req.file;
        newArt.artist_key= req.session.user_id;
        const artUpload = await Art.create (newArt);
        res.status(200).json(artUpload);
    } catch(err){
        res.status(400).json(err);
    }
});

//put route to update title and description fields
router.put('/:id', (req, res) => {
  Art.update(
    {
      title: req.body.title,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedArt) => {
      res.json(updatedArt);
    })
    .catch((err) => res.json(err));
});

//delete route to remove work
router.delete (':id', async (req, res) => {
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