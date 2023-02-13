import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");

      console.log(tasks);

      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      console.log(req.body);

      const { title, description } = req.body;

      const today = new Date().toLocaleString("pt-br");

      const newTask = {
        id: randomUUID(),
        title,
        description,
        created_at: today,
        updated_at: today,
        completed_at: null,
      };

      database.insert("tasks", newTask);
      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      console.log(req.params);
      database.delete('tasks', id)
      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      return res.end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      return res.end();
    },
  },
];
