import { hashPassword } from "@/lib/utils";
import prisma from "../db";
import { CreateUser, UpdateProfile } from "@/common.types";

export const userExistEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

export const userExistPhone = async (phone: string) => {
  const user = await prisma.user.findUnique({
    where: {
      phone: phone,
    },
  });

  return user;
};

export const createUser = async (user: CreateUser) => {
  const hash = hashPassword(user.password);

  const fetchUser = await prisma.user.create({
    data: {
      isActive: true,
      role: "USER",
      password: hash,
      name: user.name,
      email: user.email,
      phone: user.phone,
      username: user.username,
      image: user.image || "",
    },
  });

  return fetchUser;
};

export const updateUserImage = async (id: string, image: string) => {
  await prisma.user.update({
    where: { id: id },
    data: {
      image: image,
    },
  });
};

export const getUserEmailCreditials = async (email: string) => {
  const fetchUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      isActive: true,
      role: true,
      name: true,
      phone: true,
      email: true,
      username: true,
      createdAt: true,
      password: true, // to be used in credtials authentication
    },
  });

  return fetchUser;
};

export const getUserSession = async (email: string) => {
  const fetchUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      urlsLimit: true,
    },
  });

  return fetchUser;
};

export const fetchUserProfile = async (id: string) => {
  const fetchUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      phone: true,
      email: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return fetchUser;
};

export const updateUserProfile = async (id: string, data: UpdateProfile) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      username: data.username,
      image: data.image,
    },
  });
};

export const getUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      password: true,
    },
  });
};

export const updateUserPassword = async (id: string, newPassword: string) => {
  const hash = hashPassword(newPassword);
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: hash,
    },
  });
};
