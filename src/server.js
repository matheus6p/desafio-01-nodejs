import http from "node:http";
import { bufferToJson } from "./middlewares/json.js";
import { routes } from "./route.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const app = http.createServer(async (req, res) => {
  const { method, url } = req;

  await bufferToJson(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(routeParams.groups.query) : {};

    return route.handler(req, res);
  }
});

app.listen(3333, () => console.log("server running"));
