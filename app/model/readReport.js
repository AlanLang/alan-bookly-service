module.exports = app => {
  const mongoose = app.mongoose
  
  const ReadReportSchema = new mongoose.Schema({
    continueDay: { type: Number, required: true ,default: 1},
    moment: { type: Number, required: true ,default: 0},
    timeCount: { type: Number, required: true ,default: 0},
    readNumber: { type: Number, required: true ,default: 0 },
    createdAt: { type: Date, default: Date.now },
    createdUser:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })

  return mongoose.model('ReadReport', ReadReportSchema)
}