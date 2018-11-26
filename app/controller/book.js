const Controller = require('egg').Controller
class BookController extends Controller{
  constructor(ctx) {
    super(ctx)

    this.BookCreateTransfer = {
      img: { type: 'string', required: true },
      title: { type: 'string', required: true },
      author: { type: 'string', required: true },
      press: { type: 'string', required: true },
      pageNumber: { type: 'number', required: true },
      readNumber: { type: 'number', required: false},
    }
  }

  // 创建书籍
  async create() {
    const { ctx, service } = this
    ctx.validate(this.BookCreateTransfer)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.book.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }
  // 获取单个书籍
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.book.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取书籍列表
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.book.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }
}
module.exports = BookController
