module.exports = app => {
  const mongoose = app.mongoose
  
  const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  })

  return mongoose.model('Notice', NoticeSchema)
}