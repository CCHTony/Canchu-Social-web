// 引入所需的模組和套件
const express = require('express'); // 引入 Express 框架
const router = express.Router(); // 建立 Express 路由器

const {
  createGroup,
  deleteGroup,
  joinGroup,
  getPendingMembers,
  approveMembership,
  createPost,
  getGroupPosts

} = require('../Controller/groupsController')

// 引入驗證 Access Token 的函式
const verifyAccesstoken = require('../utils/function').verifyAccesstoken;
// 引入自訂的 TryErr 函式，用於處理錯誤並統一回傳格式
const TryErr = require('../utils/TryandError').TryErr;


router.post('/', verifyAccesstoken, (req, res) => TryErr(createGroup(req, res), res));
router.delete('/:group_id', verifyAccesstoken, (req, res) => TryErr(deleteGroup(req, res), res));
router.post('/:group_id/join', verifyAccesstoken, (req, res) => TryErr(joinGroup(req, res), res));
router.get('/:group_id/join', verifyAccesstoken, (req, res) => TryErr(getPendingMembers(req, res), res));
router.post('/:group_id/member/:user_id/agree', verifyAccesstoken, (req, res) => TryErr(approveMembership(req, res), res));
router.post('/:group_id/post', verifyAccesstoken, (req, res) => TryErr(createPost(req, res), res));
router.get('/:group_id/posts', verifyAccesstoken, (req, res) => TryErr(getGroupPosts(req, res), res));


// 匯出這些路由設定
module.exports = router;
