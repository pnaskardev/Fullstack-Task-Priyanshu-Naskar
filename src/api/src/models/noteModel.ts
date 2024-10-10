import mongoose, { Model, Schema } from "mongoose";

// Define the TodoItem TypeScript type
export type TodoItem = {
  id: mongoose.Types.ObjectId; // Assuming this is for the listId
  task: string;
};

// Define the schema for TodoItem in Mongoose
const todoItemSchema = new Schema<TodoItem>({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
});

// Create and export the TodoItemModel
export const TodoItemModel = mongoose.model<TodoItem>(
  "TodoItem",
  todoItemSchema,
  "TodoItem"
);
