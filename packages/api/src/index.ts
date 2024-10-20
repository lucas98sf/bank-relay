import Koa from "koa";
import { schema } from "./schema";
import { createYoga } from "graphql-yoga";
import { createContext } from "./context";

const app = new Koa();

const yoga = createYoga<Koa.ParameterizedContext>({
  schema,
  context: createContext,
  graphiql: true,
});

app.use(async (ctx) => {
  const response = await yoga.handleNodeRequestAndResponse(
    ctx.req,
    ctx.res,
    ctx
  );

  ctx.status = response.status;

  response.headers.forEach((value, key) => {
    ctx.append(key, value);
  });

  ctx.body = response.body;
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphiql`);
});
