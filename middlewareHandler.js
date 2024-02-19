import { getMiddlewareBlock } from "./utils.js";

const executeMiddleware = async (middlewareList, event) => {
  for (const middlewareName of middlewareList) {
    const isDev = process.env.NODE_ENV !== "production";
    const { block, route } = getMiddlewareBlock(middlewareName);
    if (!block) {
      console.log("No block found for ", middlewareName);
      continue;
    }

    const importPath = isDev ? route + "?update=" + Date.now() : route;
    const middlewareHandler = await import(importPath);
    
    const continueNext = await middlewareHandler.default(event);
    if (!continueNext) return false
  }

  return true
};

export default executeMiddleware;