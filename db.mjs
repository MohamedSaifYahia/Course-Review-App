import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

const reviewSchema = new mongoose.Schema({
  courseNumber: String,
  courseName: String,
  semester: String,
  year: Number,
  professor: String,
  review: String
});

const Review = mongoose.model('Review', reviewSchema);

export { Review };