const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPlayList = async (req, res) => {
  try {
    let { userId, name, trackId } = req.body;
    if (!userId || !name) {
      return res.status(404).json({ message: "Insufficent details" });
    }
    let playlist = prisma.playlists.create({
      data: {
        userId,
        name,
        trackId,
      },
      include: {
        tracks: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Playlist created successfully", playlist });
  } catch (error) {}
};
