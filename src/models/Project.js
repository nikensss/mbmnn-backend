import { Schema } from 'mongoose';
import mongoose from '../database/mongodb';

const Project = new Schema({
  title: { type: String, required: [true, 'title is required'], index: { unique: true } },
  description: { type: String, required: [true, 'description is required'] },
  texts: { type: [String] },
  mainImage: { data: Buffer, contentType: String },
  images: [{data: Buffer, contentType: String}]
});

export default mongoose.model('Project', Project);
