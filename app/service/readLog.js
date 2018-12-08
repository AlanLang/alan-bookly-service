const Service = require('egg').Service
class ReadLogService extends Service {

  async create(payload) {
    let res = await this.ctx.model.ReadLog.find({"isRead":0}).sort({ createdAt: -1 }).exec()
    if(res && res.length > 0){
      this.ctx.throw(501, '有未处理的阅读记录,请先处理')
    }
    payload.createdUser = this.ctx.state.user.data._id
    return this.ctx.model.ReadLog.create(payload)
  }

  async index(payload){
    let res = await this.ctx.model.ReadLog.find({"isRead":1}).sort({ createdAt: -1 }).exec()
    let count = await this.ctx.model.ReadLog.count({"isRead":1}).exec()
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { count: count, list: data}
  }

  // show======================================================================================================>
  async show(_id) {
    const book = await this.ctx.service.book.find(_id)
    if (!book) {
      this.ctx.throw(404, 'user not found')
    }
    return book
  }
  // 获取指定书籍正在阅读的进度
  async getReadLog(book){
    let res = await this.ctx.model.ReadLog.find({
      "book":book,
      "isRead":1
    }).sort({ createdAt: -1 }).exec()
    return res;
  }

  // 更新阅读记录
  async update(_id, payload) {
    const { ctx, service } = this
    const readLog = await ctx.service.readLog.find(_id)
    if (!readLog) {
      ctx.throw(404, '不存在的阅读记录')
    }
    payload.stopTime = new Date()
    payload.timeArea = parseInt((payload.stopTime.getTime() - readLog.startTime.getTime())/1000)
    payload.isRead = 1
    const readReport = await this.ctx.service.readReport.create(payload.readNumber,payload.timeArea);
    return this.ctx.model.ReadLog.findByIdAndUpdate(_id, payload)
  }

   async getReadStatus(_id){
    let count = 0;
    let num = 0;
    let logs = await this.ctx.model.ReadLog.find({"book":_id}).exec()
    for(let log of logs){
      count += log.timeArea
      num += log.readNumber
    }

    let res = await this.ctx.model.ReadLog.find({
      "book":_id
    }).sort({ createdAt: -1 }).exec()
    if(res && res.length > 0){
      return {type:res[0].isRead == 1?0:1,msg:"正在阅读",count:count,log:res[0],num:num}
    }else{
      return {type:0,msg:"未阅读",count:count,num:num}
    }
   }

  async find(id) {
    return this.ctx.model.ReadLog.findById(id)
  }
}
module.exports = ReadLogService
