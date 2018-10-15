module.exports = app => {
  const { router, controller, swagger } = app
  swagger.post('/api/user/access/login',{
    tags:['access'],
    summary:'系统登录',
    description:'系统登录',
    parameters:[
    {
      in:'string',
      name:'mobile',
      description: '登录账户',
    },
    {
      in:'string',
      name:'password',
      description: '密码',
    }]
  })

  swagger.get('/api/user/access/current',
    {
      tags:['access'],
      summary:'查看登录的用户信息',
      description:'查看登录的用户信息',
    })

}