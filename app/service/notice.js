const Service = require('egg').Service
class NoticeService extends Service {
  async create(payload) {
    return this.ctx.model.Notice.create(payload) 
  }
  async index(payload){
    let res = await this.ctx.model.Notice.find({}).sort({ createdAt: -1 }).exec()
    let count = await this.ctx.model.Notice.count({}).exec()
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { count: count, list: data}
  }
}
module.exports = NoticeService
