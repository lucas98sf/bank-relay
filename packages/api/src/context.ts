import jwt from "jsonwebtoken";
import { prisma } from "./db";
import { Context } from "koa";
import cookie from "cookie";

interface JwtPayload {
  userId: string;
}

export async function createContext(ctx: Context): Promise<{
  user: { id: string; email: string } | null;
  cookies: typeof ctx.cookies;
}> {
  try {
    const cookies = cookie.parse(ctx.headers.cookie || "");
    const token = cookies.token; // Retrieve the token from cookies

    if (!token) {
      return { user: null, cookies: ctx.cookies }; // Include cookies in the context
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
      },
    });

    return { user, cookies: ctx.cookies };
  } catch (error) {
    console.error(error);
    return { user: null, cookies: ctx.cookies };
  }
}
