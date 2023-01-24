const router = require("express").Router();
const { Users, Art } = require("../../models");
const upload = require("../../utils/upload");
const path = require("path");
const multer = require("multer");
const { MulterError } = require("multer");
const { Op } = require("sequelize");
//const fs = require ('fs');

//route to load all artwork

router.get("/all", async (req, res) => {
  try {
    console.log("hello2");
    const allArt = await Art.findAll();
    res.status(200).json(allArt);
  } catch (err) {
    res.status(400).json(err);
  }
});
//get route to search for work by artist
router.get("username/:username", async (req, res) => {
  try {
    const searchByUser = await Users.findAll({
      where: {
        username: req.params.username,
      },

      include: [{ model: Art }],
    });
    res.status(200).json(searchByUser);
    //HOW TO DISPLAY ALL ART (FOR EACH?)
    //res.sendFile(path.join(`${__dirname}/../views/index.html`));
  } catch (err) {
    res.status(400).json(err);
  }
});

//get route to search by keyword
router.get("/keyword/:keyword", async (req, res) => {
  try {
    console.log(req.params.keyword);
    const searchByKeyword = await Art.findAll({
      where: {
        description: {
          [Op.substring]: req.params.keyword,
        },
      },
    });
    console.log(searchByKeyword);
    res.status(200).json(searchByKeyword);
  } catch (err) {
    console.log("NOOOOOOOOOO", err);
    res.status(400).json(err);
    //1/23 9pm, ReferenceError: Op is not defined at /Users/marygreenwood/Documents/bootcamp/Spaghetti-on-the-Wall-Project/controllers/api/artRoutes.js:45:12
  }
});

//post route to add new art
//add withauth helper, figure out how to access userID for Art.Create
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log(req.session);
    const newArt = {};
    newArt.title = req.body.title;
    newArt.description = req.body.description;
    newArt.type = req.body.type;
    newArt.image = req.file.path.split("/").slice(1).join("/");
    newArt.artist_key = req.session.user_id;
    newArt.date_added = req.body.date;
    const artUpload = await Art.create(newArt);
    console.log(artUpload);
    res.render("dashboard");
  } catch (err) {
    if (err instanceof multer.MulterError) {
      res.json(MulterError);
      console.log(MulterError);
      // A Multer error occurred when uploading.
    } else if (err) {
      res.status(400).json(err);
      console.log(err);
    }
  }
});

//put route to update title and description fields
router.put("/:id", async (req, res) => {
  try {
    var updatedArt = await Art.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedArt);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete route to remove work
router.delete("/:id", async (req, res) => {
  try {
    const deletedArt = await Art.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedArt);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
