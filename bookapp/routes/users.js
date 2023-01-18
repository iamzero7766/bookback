const router = require('koa-router')()
const sql = require("../mysql/db")
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', async function (ctx, next) {
  const result = await sql.query("SELECT * FROM user_info")
  ctx.body = result;
})

module.exports = router
