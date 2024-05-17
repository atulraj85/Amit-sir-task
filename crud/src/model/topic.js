import mongoose, { Schema } from "mongoose";

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema); //creates a new model named "Topic"

export { Topic };
