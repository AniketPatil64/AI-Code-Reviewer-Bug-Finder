import mongoose, { Schema, Document, Types } from "mongoose";

export interface IHistory extends Document {
  userId: Types.ObjectId;
  inputCode: string;
  language: string;
  aiResponse: {
    title: string;
    bugs: {
      line: number;
      severity: "low" | "medium" | "high";
      description: string;
    }[];
    fixes: {
      line: number;
      suggestion: string;
    }[];
    explanation: {
      line: number;
      text: string;
    }[];
    complexity: {
      time: string;
      space: string;
      explanation: string;
    };
    finalCode: string;
  };
  createdAt: Date;
}

const HistorySchema = new Schema<IHistory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    inputCode: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    aiResponse: {
      title: { type: String, required: true },
      bugs: [
        {
          line: Number,
          severity: {
            type: String,
            enum: ["low", "medium", "high"],
          },
          description: String,
        },
      ],

      fixes: [
        {
          line: Number,
          suggestion: String,
        },
      ],

      explanation: [
        {
          line: Number,
          text: String,
        },
      ],

      complexity: {
        time: String,
        space: String,
        explanation: String,
      },

      finalCode: String,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const History =
  mongoose.models.History ||
  mongoose.model<IHistory>("History", HistorySchema);
