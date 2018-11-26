const Service = require('egg').Service
class BookService extends Service {
  async create(payload) {
    payload.createdUser = this.ctx.state.user.data._id
    return this.ctx.model.Book.create(payload) 
  }

  async index(payload){
    const createdUser = this.ctx.state.user.data._id
    let res = await this.ctx.model.Book.find({createdUser:createdUser}).sort({ createdAt: -1 }).exec()
    let count = await this.ctx.model.Book.count({createdUser:createdUser}).exec()
    // 整理数据源
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

  async find(id) {
    return this.ctx.model.Book.findById(id)
  }
}
module.exports = BookService
