'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  // userAccess
  router.post('/api/user/access/login', controller.userAccess.login)

  router.get('/api/user/access/current', app.jwt, controller.userAccess.current)

  router.get('/api/user/access/logout',app.jwt, controller.userAccess.logout)
  router.put('/api/user/access/resetPsw', app.jwt, controller.userAccess.resetPsw)

  // user
  // router.post('/api/user', controller.user.create)
  // router.delete('/api/user/:id', controller.user.destroy)
  // router.put('/api/user/:id', controller.user.update)
  // router.get('/api/user/:id', controller.user.show)
  // router.get('/api/user', controller.user.index)
  router.delete('/api/user',app.jwt, controller.user.removes)
  router.resources('user', '/api/user',app.jwt, controller.user)
  router.post('/api/register',controller.user.register)


  // upload
  router.post('/api/upload', controller.upload.create)
  router.post('/api/upload/url', controller.upload.url)
  router.post('/api/uploads', controller.upload.multiple)
  router.delete('/api/upload/:id', controller.upload.destroy)
  // router.put('/api/upload/:id', controller.upload.update)
  router.post('/api/upload/:id', controller.upload.update) // Ant Design Pro
  router.put('/api/upload/:id/extra', controller.upload.extra)
  router.get('/api/upload/:id', controller.upload.show)
  router.get('/api/upload', controller.upload.index)
  router.delete('/api/upload', controller.upload.removes)
  // router.resources('upload', '/api/upload', controller.upload)

  router.resources('book','/api/book',app.jwt,controller.book)
  router.resources('readLog','/api/readlog',app.jwt,controller.readLog)
  router.get('/api/readlog/log/:id',app.jwt,controller.readLog.getReadLog)
  router.get('/api/readlog/status/:id',app.jwt,controller.readLog.getReadStatus)
  router.get('/api/readlog/report',app.jwt,controller.readLog.getReadReports)
    //下载文件
  router.get('/image/:id',controller.upload.download)
}
