const PromiseModule = require("../Promise/PromiseModule");
const Likes = {
  likeInsert,
  likes,
  deletlikes,
};
async function likes(postid, userid) {
  const sqlSearch = "SELECT * FROM  likes WHERE PostId=? AND UserId=? LIMIT 1 ";

  return PromiseModule.createUpdateDelete(sqlSearch, [postid, userid]);
}
async function likeInsert(postid, userid) {
  const sqlSearch = "INSERT INTO likes (PostId,UserId) VALUES (?,?)";
  return PromiseModule.createUpdateDelete(sqlSearch, [postid, userid]);
}
async function deletlikes(postid, userid) {
  const sqlSearch = "DELETE FROM likes WHERE PostId=? AND UserId=?";

  return PromiseModule.createUpdateDelete(sqlSearch, [postid, userid]);
}
module.exports = Likes;
