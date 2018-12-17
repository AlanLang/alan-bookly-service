const Controller = require('egg').Controller
class ReadLogController extends Controller{
  constructor(ctx) {
    super(ctx)

    this.ReadLogCreateTransfer = {
      book: { type: 'string', required: true }
    }
    this.UserUpdateTransfer = {
      readNumber: { type: 'number', required: true }
    }
  }

  // 创建阅读记录
  async create() {
    const { ctx, service } = this
    ctx.validate(this.ReadLogCreateTransfer)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.readLog.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

    // 获取所有阅读记录
  async getReadLog() {
    const { ctx, service } = this
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.readLog.getReadLog(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  async getReadReports(){
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.readReport.page(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

    // 更新阅读记录
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.UserUpdateTransfer)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.readLog.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  async destroy(){
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.readLog.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  async getReadStatus(){
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.readLog.getReadStatus(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }
}
module.exports = ReadLogController
