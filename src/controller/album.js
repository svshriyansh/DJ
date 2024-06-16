const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createAlbum = async (req, res) => {
  try {
    let { name, artistId } = req.body;
    if (!name || !artistId) {
      return res.status(404).json({ message: "Details are not found" });
    }

    let artist = await prisma.artists.findUnique({
      where: {
        id: artistId,
      },
    });
    if (!artist) {
      return res.json({ message: "Album already created" });
    }
    albumName = await prisma.albums.create({
      data: {
        name,
        artistId,
      },
    });
    return res
      .status(200)
      .json({ message: "Album created successfully", albumName });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAlbum,
};
