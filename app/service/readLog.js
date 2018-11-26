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
  // 获取阅读报表
  async getReadReports(){
    const createdUser = this.ctx.state.user.data._id
    let res = await this.ctx.model.ReadLog.find({
      "createdUser":createdUser,
      "isRead":1
    }).sort({ createdAt: -1 }).exec()
    let re = {
      week:[],
      days:0,
      all:0
    }
    const myDate = new Date();
    for(let i = 6; i >= 0; i --){
      let today = new Date();
      let targetday_milliseconds=today.getTime() - 1000*60*60*24*i;
      today.setTime(targetday_milliseconds);
      re.week.push({
        name:today.getDate(),
        value:0
      })
    }
    let containDays = 0;
    let upDays = 0;
    for(let item of res){
      re.all += item.timeArea
      let days = Math.floor((myDate.getTime() - item.stopTime.getTime())/(24*3600*1000))
      if(days === upDays || days - upDays == 1){
        if((days - upDays) === 1){
          containDays++
        }
        if(days === 0 && upDays === 0){
          containDays++
        }
        upDays = days
      }
      if(days < 7){
        let readDay = re.week.find(function(x) {
          return x.name == item.stopTime.getDate();
        })
        if(readDay){
          readDay.value += item.readNumber
        }
      }
    }
    re.days = containDays
    return re
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
