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

    }catch(err){
        res.status(400).json(err);
    }
});