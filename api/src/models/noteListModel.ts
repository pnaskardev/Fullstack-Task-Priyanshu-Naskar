import mongoose, { Schema } from "mongoose";

export type TodoList = {
    id: string
    task: string
}

const schema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

export const TodoListModel = mongoose.model<TodoList>("TodoList", schema, "TodoList");