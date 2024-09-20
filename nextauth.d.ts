import { UserSession } from "./common.types";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: UserSession;
  }
}
