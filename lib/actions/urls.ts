import prisma from "../db";
import { nanoid } from "nanoid";
// list all urls
export async function listUrls() {
  return await prisma.url.findMany();
}

// list user urls
export async function listUserUrls(userId: string) {
  return await prisma.url.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// get url by uuid
export async function getUrl(uuid: string) {
  const url = await prisma.url.findUnique({
    where: {
      uuid,
      isActive: true,
    },
    select: {
      originalUrl: true,
    },
  });
  if (url) {
    await prisma.url.update({
      where: {
        uuid,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }
  return url ? url.originalUrl : null;
}
// create url
export async function createUrl(
  userId: string,
  data: {
    originalUrl: string;
    title: string;
    description: string;
  },
) {
  const uuid = await nanoid(8);
  return await prisma.url.create({
    data: {
      originalUrl: data.originalUrl,
      title: data.title,
      description: data.description,
      uuid: uuid,
      userId,
    },
  });
}
// update url
export async function updateUrl(
  id: string,
  data: { originalUrl: string; title: string; description: string },
) {
  return await prisma.url.update({
    where: {
      id,
    },
    data: data,
  });
}
// delete url
export async function deleteUrl(id: string) {
  return await prisma.url.delete({
    where: {
      id,
    },
  });
}
