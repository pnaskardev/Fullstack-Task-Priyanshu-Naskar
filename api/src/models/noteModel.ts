import mongoose, { Model, Schema } from "mongoose";
import { getConfig } from "../config";

// Define the TodoItem TypeScript type
export type TodoItem = {
  id: mongoose.Types.ObjectId; // Assuming this is for the listId
  task: string;
};

// Define the schema for TodoItem in Mongoose
const todoItemSchema = new Schema<TodoItem>(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    task: {
      type: String,
      required: true,
    },
  },
  {
    collection: "assignment_Priyanshu_N",
  }
);

// Create and export the TodoItemModel
export const TodoItemModel = mongoose.model<TodoItem>(
  "TodoItem",
  todoItemSchema,
);
