import path from "path";

const getBlock = (url) => {
  const blocks = {
  "listTodos": {
    "name": "listTodos",
    "type": "function",
    "directory": "/home/apps/favs/neoito/appblock/experiments/todo_tooljet/listTodos",
    "middlewares": [],
    "relativeDirectory": "listTodos"
  },
  "addTodo": {
    "name": "addTodo",
    "type": "function",
    "directory": "/home/apps/favs/neoito/appblock/experiments/todo_tooljet/addTodo",
    "middlewares": [],
    "relativeDirectory": "addTodo"
  },
  "removeTodo": {
    "name": "removeTodo",
    "type": "function",
    "directory": "/home/apps/favs/neoito/appblock/experiments/todo_tooljet/removeTodo",
    "middlewares": [],
    "relativeDirectory": "removeTodo"
  }
};

  const block = blocks[url];
  const route = block && path.join(block.directory, "index.js");

  return { route, block };
};

const getFunctionEntryPaths=()=>{
  const blocks = {
  "listTodos": {
    "name": "listTodos",
    "type": "function",
    "directory": "/home/apps/favs/neoito/appblock/experiments/todo_tooljet/listTodos",
    "middlewares": [],
    "relativeDirectory": "listTodos"
  },
  "addTodo": {
    "name": "addTodo",
    "type": "function",
    "directory": "/home/apps/favs/neoito/appblock/experiments/todo_tooljet/addTodo",
    "middlewares": [],
    "relativeDirectory": "addTodo"
  },
  "removeTodo": {
    "name": "removeTodo",
    "type": "function",
    "directory": "/home/apps/favs/neoito/appblock/experiments/todo_tooljet/removeTodo",
    "middlewares": [],
    "relativeDirectory": "removeTodo"
  }
};
  const functionEntryPaths=Object.keys(blocks).map(blockName=>{
    const block=blocks[""+blockName]
   return path.join(block["directory"], "index.js")})

  
  return functionEntryPaths
}



const getMiddlewareBlock = (url) => {
  const blocks = {};

  const block = blocks[url];
  const route = block && path.join(block.directory, "index.js");

  return { route, block };
};

export { getBlock, getMiddlewareBlock,getFunctionEntryPaths };