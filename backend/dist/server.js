"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield prisma.task.findMany();
    res.json(tasks);
}));
app.post("/task/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body.body;
    const priority = +req.body.priority;
    if (!body || !priority) {
        return res.status(400).send({
            error: "Request payload is not valid. Body and priority are required.",
        });
    }
    const newTask = yield prisma.task.create({
        data: {
            body: body,
            priority: priority,
            completed: false,
        },
    });
    return res.send(newTask);
}));
app.patch("/task/edit/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const completed = req.body.completed;
    if (completed === undefined) {
        return res
            .status(400)
            .send({ error: "Request payload is not valid. Completed is required." });
    }
    const result = yield prisma.task.update({
        where: {
            id: +id,
        },
        data: {
            completed,
        },
    });
    return res.send(result);
}));
app.patch("/task/update-status/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.body.status;
    try {
        const result = yield prisma.task.update({
            where: { id: +id },
            data: {
                status,
                completed: status === 'done'
            }
        });
        return res.send(result);
    }
    catch (error) {
        return res.status(400).send({ error: "Failed to update task status" });
    }
}));
// Add delete endpoint
app.delete("/task/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield prisma.task.delete({
            where: {
                id: +id,
            },
        });
        return res.status(200).send({ message: "Task deleted successfully" });
    }
    catch (error) {
        return res.status(400).send({ error: "Failed to delete task" });
    }
}));
app.listen(port, () => {
    console.log(`API Service is running on http://localhost:${port}`);
});
