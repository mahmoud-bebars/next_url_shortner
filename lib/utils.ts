import { type ClassValue, clsx } from "clsx";
import crypto from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ALOGORITHM = process.env.ALOGORITHM || "";
const SECRET_KEY = process.env.SECRET_KEY || "";

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALOGORITHM, SECRET_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash: { iv: string; content: string }) => {
  const decipher = crypto.createDecipheriv(
    ALOGORITHM,
    SECRET_KEY,
    Buffer.from(hash.iv, "hex"),
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

const PASS_SECRET = process.env.PASS_SECRET || "";
const HAMC = process.env.HAMC || "";
const SALT = process.env.SALT || "";

export const hashPassword = (password: string) => {
  return crypto
    .createHmac(HAMC, [SALT, password].join("/"))
    .update(PASS_SECRET)
    .digest("hex");
};

export const comparePassword = (password: string, hash: string) => {
  const hashed = crypto
    .createHmac(HAMC, [SALT, password].join("/"))
    .update(PASS_SECRET)
    .digest("hex");

  if (hashed === hash) {
    return true;
  } else {
    return false;
  }
};

export const testPassword = (password: string) => {
  const regex = /^[a-zA-Z0-9_-]+$/;
  const result = regex.test(password);
  if (!result) {
    return {
      error: true,
      message:
        "The password must only contain letters, numbers, dashes and underscores.",
    };
  }

  if (password.length < 6) {
    return {
      error: true,
      message: "The password must be at least 6 characters.",
    };
  }
  return true;
};

export const humanize = (str: string) => {
  // Split the input string by underscores
  const words = str.split("_");

  // Capitalize each word and join them with spaces
  const transformed = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return transformed;
};

export const uuid = () => {
  const randomString = Math.random().toString(36).substring(2, 15);

  return randomString;
};
