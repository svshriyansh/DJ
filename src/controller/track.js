const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addTrack = async (req, res) => {
  try {
    let { name, albumId, duration } = req.body;
    if (!name || !albumId || !duration) {
      return res.status(404).json({ message: "Data is insufficient" });
    }

    const newTrack = await prisma.tracks.create({
      data: {
        name,
        albumId,
        duration,
      },
    });

    return res
      .status(200)
      .json({ message: "Track is added successfully", newTrack });
  } catch (error) {
    console.log("message", error.message);
    return res.status(400).json({ Error: error.message });
  }
};

const getTracks = async (req, res) => {
  try {
    const tracks = await prisma.tracks.findMany();
    console.log(tracks);
    return res.status(200).json({ message: "Songs are ", tracks });
  } catch (error) {
    console.log("message", error.message);
    return res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  addTrack,
  getTracks,
};
