'use server';

import prisma from '@/app/db/db';

export interface PrismaCreateVideo {
  materia: string
  clase: string
  estilo: string
  parrafos: {
    create: PrismaCreateParrafo[]
  }
  youtube: {
    create: PrismaCreateYoutube
  }
}

export interface PrismaCreateParrafo {
  parrafo: string
  inicio: string
  fin: string
  tiempo: number
  estilo: string[]
}

export interface PrismaCreateYoutube {
  id: string
  title: string
  duration: number
  webpage_url: string
  video_filename: string
  description: string
  subtitles: object
  thumbnail: string
  upload_date: string
  view_count: number
  uploader: string
  like_count: number
  dislike_count: number | null
  average_rating: number | null
  categories: string[]
  tags: string[]
  channel_id: string
  channel_url: string
  age_limit: number
  is_live: boolean
  start_time: string | null
  end_time: string | null
  chapters: string | null
}

export interface PrismaUser {
  id: string
  email: string
  name: string
  videos: PrismaVideo[]
}

export interface PrismaVideo {
  id: number
  materia: string
  clase: string
  estilo: string
  parrafos: PrismaParrafo[]
  youtube: PrismaYoutube
  user: PrismaUser
}

export interface PrismaParrafo {
  id: number
  parrafo: string
  inicio: string
  fin: string
  tiempo: number
  estilo: string[]
  video: PrismaVideo
}

export interface PrismaYoutube {
  id: string
  title: string
  duration: number
  webpage_url: string
  video_filename: string
  description: string
  subtitles: object
  thumbnail: string
  upload_date: string
  view_count: number
  uploader: string
  like_count: number
  dislike_count: number | null
  average_rating: number | null
  categories: string[]
  tags: string[]
  channel_id: string
  channel_url: string
  age_limit: number
  is_live: boolean
  start_time: string | null
  end_time: string | null
  chapters: string | null
  video: PrismaVideo
}

export async function deleteUser(userId: string) {
  const user = await prisma.user.delete({
    where: {
      id: userId
    }
  });
  console.log("User deleted", user)
}

export async function createNewUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  console.log("User found", user);
  if (user) return user;

  const email = `${userId}@anony.mous`;
  const newUser = prisma.user.create({
    data: {
      id: userId,
      email,
    }
  });
  console.log("User created", user);
  return newUser;
}

export async function addVideo(userId: string, video: PrismaCreateVideo) {
  const existingVideo = await prisma.video.findFirst({
    where: {
      youtube: {
        webpage_url: video.youtube.create.webpage_url
      }
    }
  });
  if (existingVideo) {
    console.log("Video already exists", existingVideo);
    return existingVideo;
  }
  const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      videos: {
        create: video
      }
    }
  });
  console.log("User updated", user);
  return video;
}

export async function deleteAllVideos(userId: string) {
  const videos = await prisma.video.findMany({
    where: {
      userId: userId
    }
  });

  await prisma.parrafo.deleteMany({
    where: {
      videoId: {
        in: videos.map((video: PrismaVideo) => video.id)
      }
    }
  });

  await prisma.youtube.deleteMany({
    where: {
      videoId: {
        in: videos.map((video: PrismaVideo) => video.id)
      }
    }
  });

  const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      videos: {
        deleteMany: {}
      }
    }
  });

  console.log("User updated", user);
  return user;
}

export async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      email: true,
      name: true,
      videos: {
        select: {
          id: true,
          materia: true,
          clase: true,
          estilo: true,
          parrafos: {
            select: {
              id: true,
              parrafo: true,
              inicio: true,
              fin: true,
              tiempo: true,
              estilo: true
            }
          },
          youtube: {
            select: {
              id: true,
              title: true,
              duration: true,
              webpage_url: true,
              video_filename: true,
              description: true,
              subtitles: true,
              thumbnail: true,
              upload_date: true,
              view_count: true,
              uploader: true,
              like_count: true,
              dislike_count: true,
              average_rating: true,
              categories: true,
              tags: true,
              channel_id: true,
              channel_url: true,
              age_limit: true,
              is_live: true,
              start_time: true,
              end_time: true,
              chapters: true
            }
          }
        }
      }
    }
  });
  if (user) {
    console.log("User found", user);
    return user;
  } else {
    console.log("User not found");
    return null;
  }
}