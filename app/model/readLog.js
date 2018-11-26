module.exports = app => {
  const mongoose = app.mongoose
  
  const ReadLogSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    startTime: { type: Date, default: Date.now },
    stopTime: { type: Date, default: Date.now },
    timeArea: { type: Number, required: false ,default: 0},
    isRead: { type: Number, required: false ,default: 0},
    readNumber: { type: Number, required: false ,default: 0 },
    createdAt: { type: Date, default: Date.now },
    createdUser:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })

  return mongoose.model('ReadLog', ReadLogSchema)
}