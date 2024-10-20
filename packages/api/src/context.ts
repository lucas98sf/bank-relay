import jwt from "jsonwebtoken";
import { prisma } from "./db";
import { Context } from "koa";

interface JwtPayload {
  userId: string;
}

export async function createContext(ctx: Context) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token = (ctx.headers?.headersInit as any)?.["authorization"]?.split(
      " "
    )[1];

    if (!token) {
      return { user: null };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
      },
    });

    return { user };
  } catch (error) {
    console.error(error);
    return { user: null };
  }
}
