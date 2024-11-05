-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "materia" TEXT NOT NULL,
    "clase" TEXT NOT NULL,
    "estilo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parrafo" (
    "id" SERIAL NOT NULL,
    "parrafo" TEXT NOT NULL,
    "inicio" TEXT NOT NULL,
    "fin" TEXT NOT NULL,
    "tiempo" INTEGER NOT NULL,
    "estilo" TEXT[],
    "videoId" INTEGER NOT NULL,

    CONSTRAINT "Parrafo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Youtube" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "webpage_url" TEXT NOT NULL,
    "video_filename" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subtitles" JSONB NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "upload_date" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL,
    "uploader" TEXT NOT NULL,
    "like_count" INTEGER NOT NULL,
    "dislike_count" INTEGER,
    "average_rating" INTEGER,
    "categories" TEXT[],
    "tags" TEXT[],
    "channel_id" TEXT NOT NULL,
    "channel_url" TEXT NOT NULL,
    "age_limit" INTEGER NOT NULL,
    "is_live" BOOLEAN NOT NULL,
    "start_time" TEXT,
    "end_time" TEXT,
    "chapters" TEXT,
    "videoId" INTEGER NOT NULL,

    CONSTRAINT "Youtube_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Youtube_videoId_key" ON "Youtube"("videoId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parrafo" ADD CONSTRAINT "Parrafo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Youtube" ADD CONSTRAINT "Youtube_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
