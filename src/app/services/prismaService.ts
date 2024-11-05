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
}

export interface PrismaParrafo {
  id: number
  parrafo: string
  inicio: string
  fin: string
  tiempo: number
  estilo: string[]
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

export async function addVideo(userId: string, video: PrismaCreateVideo): Promise<PrismaVideo> {
  const existingVideo = await prisma.video.findFirst({
    where: {
      youtube: {
        webpage_url: video.youtube.create.webpage_url
      }
    },
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
      },
    }
  });
  if (existingVideo) {
    console.log("Video already exists", existingVideo);
    if (!existingVideo.youtube) {
      throw new Error("El video existente no tiene información de YouTube.");
    }
    return existingVideo as PrismaVideo;
  }
  const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      videos: {
        create: video
      }
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
  console.log("User updated", user);
  return user.videos[user.videos.length - 1] as PrismaVideo;
}

export async function deleteAllVideos(userId: string) {
  const videos = await prisma.video.findMany({
    where: {
      userId: userId
    },
  });

  const videoIds = videos.map((video) => video.id);
  await prisma.parrafo.deleteMany({
    where: {
      videoId: {
        in: videoIds
      }
    }
  });

  await prisma.youtube.deleteMany({
    where: {
      videoId: {
        in: videoIds
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

export async function getVideo(videoId: number): Promise<PrismaVideo | null> {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
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
  });
  if (video) {
    console.log("Video found", video);
    if (!video.youtube) {
      throw new Error("El video existente no tiene información de YouTube.");
    }
    return video as PrismaVideo;
  } else {
    console.log("Video not found");
    return null;
  }
}

export async function getUser(userId: string): Promise<PrismaUser | null> {
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
    return user as PrismaUser;
  } else {
    console.log("User not found");
    return null;
  }
}