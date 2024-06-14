-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "profileImage" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artists" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "genere" VARCHAR(50) NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Albums" (
    "id" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "releaseDate" DATE NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "albumId" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlists" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist_Track" (
    "id" SERIAL NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Playlist_Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trackId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaylistsToTracks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Albums_name_key" ON "Albums"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistsToTracks_AB_unique" ON "_PlaylistsToTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistsToTracks_B_index" ON "_PlaylistsToTracks"("B");

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "Albums_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "Tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlists" ADD CONSTRAINT "Playlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist_Track" ADD CONSTRAINT "Playlist_Track_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Tracks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistsToTracks" ADD CONSTRAINT "_PlaylistsToTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistsToTracks" ADD CONSTRAINT "_PlaylistsToTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
