const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controller/auth");
const { createArtist, updateArtist } = require("../controller/artist");
const { createAlbum } = require("../controller/album");
const { addTrack, getTracks } = require("../controller/track");

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.post("/newAlbum", createAlbum);
router.post("/newArtist", createArtist);
router.post("/updateArtist", updateArtist);
router.post("/addTrack", addTrack);
router.get("/getSongs", getTracks);
router.get("/", (req, res) => {
  res.status(200).json({ message: `Response at /api/v1` });
});

module.exports = router;
