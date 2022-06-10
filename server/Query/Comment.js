const PromiseModule = require("../Promise/PromiseModule");
const comments = {
  commentInsert,
  getComments,
  deleteComment,
};

async function commentInsert(comment, PostId, username) {
  const sqlSearch =
    "INSERT INTO comments (commentBody,PostId,username)  VALUES (?,?,?)";
  return PromiseModule.createUpdateDelete(sqlSearch, [
    comment,
    PostId,
    username,
  ]);
}
async function getComments(PostId) {
  const sqlSearch = "SELECT * FROM comments WHERE PostId=? ORDER BY id DESC";
  return PromiseModule.createUpdateDelete(sqlSearch, PostId);
}
async function deleteComment(commentId) {
  const sqlSearch = "DELETE FROM comments WHERE id=?";
  return PromiseModule.createUpdateDelete(sqlSearch, commentId);
}

module.exports = comments;
