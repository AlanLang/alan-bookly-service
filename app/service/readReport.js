const Service = require('egg').Service
const moment = require('moment');
var ObjectId = require('mongoose').Types.ObjectId;

class ReadReportService extends Service {
  async create(readNumber,timeCount) {
  	const todayMoment = moment().format("YYYYMMDD");
  	const createdUser = this.ctx.state.user.data._id;
    let res = await this.ctx.model.ReadReport.find({"moment":todayMoment,"createdUser":createdUser}).sort({ createdAt: -1 }).exec()
    if(res && res.length > 0){
    	const report = {
    		moment:todayMoment,
    		timeCount:timeCount + parseInt(res[0].timeCount),
    		readNumber:readNumber + parseInt(res[0].readNumber),
    		createdUser:createdUser
    	}
    	return this.ctx.model.ReadReport.findByIdAndUpdate(res[0].id, report)
    }else{
    	let beforeDay = await this.ctx.model.ReadReport.find({"moment":todayMoment-1,"createdUser":createdUser}).sort({ createdAt: -1 }).exec()
    	let continueDay = (beforeDay&&beforeDay.length>0)?beforeDay[0].continueDay+1:1;
    	return this.ctx.model.ReadReport.create({
    		moment:todayMoment,
    		timeCount:timeCount,
    		readNumber:readNumber,
    		createdUser:createdUser,
    		continueDay:continueDay
    	})
    }
  }

  async page(payload) {
    const { currentPage, pageSize, isPaging } = payload
    const createdUser = this.ctx.state.user.data._id;
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(isPaging) {
        res = await this.ctx.model.ReadReport.find({createdUser: createdUser }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        
    } else {
	    res = await this.ctx.model.ReadReport.find({createdUser: createdUser }).sort({ createdAt: -1 }).exec()
    }
    count = await this.ctx.model.ReadReport.find({createdUser: createdUser }).count();

    let sumTime = await this.ctx.model.ReadReport.aggregate(
    		{$match:{createdUser:new ObjectId(createdUser)}},
    		{$group:{_id:"$createdUser", total:{$sum:"$timeCount"}}}
		);
		if(sumTime && sumTime.length > 0){
			sumTime = sumTime[0].total;
		}

    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage),sumTime:sumTime }
  }
}
module.exports = ReadReportService
