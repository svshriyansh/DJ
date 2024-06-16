const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @route POST v1/auth/createArtist
 * @desc create a artist
 * @access Public
 */

const createArtist = async (req, res) => {
  try {
    let { name, genere } = req.body;
    console.log("name ", name, " genere ", genere);
    if (!name || !genere) {
      return res.status(404).json({ message: "Details are missing" });
    }
    const artist = await prisma.artists.create({
      data: {
        name,
        genere,
      },
    });
    return res.status(200).json({
      message: "Artist created successfully",
      artist,
    });
  } catch (error) {
    console.log("message", error.message);
    return res.status(400).json({ Error: error.message });
  }
};

/**
 * @route PUT v1/auth/updateArtist:id
 * @desc create a artist
 * @access Public
 */
const updateArtist = async (req, res) => {
  try {
    let { name, genere } = req.body;
    let user = await prisma.artists.findUnique({
      where: {
        name,
      },
    });
    if (!name) {
      return res.status(404).json({ message: "Artis not found" });
    }
    user = await prisma.users.update({
      where: {
        id: req.params?.id,
      },
      data: {
        genere,
      },
    });
    user = await prisma.artists.findUnique({
      where: {
        name,
      },
    });

    return res
      .status(200)
      .json({ message: "Message has been successfully updated", user });
  } catch (error) {
    console.log("Error is", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  createArtist,
  updateArtist,
};
