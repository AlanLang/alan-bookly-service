const Controller = require('egg').Controller
class NoticeController extends Controller{
  constructor(ctx) {
    super(ctx)

    this.NoticeCreateTransfer = {
      title: { type: 'string', required: true, allowEmpty: false },
      message: { type: 'string', required: true, allowEmpty: false }
    }
  }

  async create() {
    const { ctx, service } = this
    ctx.validate(this.NoticeCreateTransfer)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.notice.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.notice.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }
}
module.exports = NoticeController
