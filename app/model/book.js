module.exports = app => {
  const mongoose = app.mongoose
  
  const BookSchema = new mongoose.Schema({
    img: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    press: { type: String, required: true },
    pageNumber: { type: Number, required: true },
    readNumber: { type: Number, required: false ,default: 0 },
    createdAt: { type: Date, default: Date.now },
    createdUser:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })

  return mongoose.model('Book', BookSchema)
}