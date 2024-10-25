import jwt from "jsonwebtoken";
import { prisma } from "./db";
import { Context } from "koa";

interface JwtPayload {
  userId: string;
}

export async function createContext(ctx: Context): Promise<{
  user: { id: string; email: string } | null;
  cookies: typeof ctx.cookies;
}> {
  try {
    const token = ctx.cookies.get("token");

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
