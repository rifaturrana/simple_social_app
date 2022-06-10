const PromiseModule = require("../Promise/PromiseModule");

const Posts = {
  getAllLikedPosts,

  getAllPosts,
  getById,
  getPostsById,
  InsertPosts,
  UpdateTitle,
  UpdateBody,
  DeletePost,
};
async function InsertPosts(title, postText, username, UserId) {
  const sqlSearch =
    "INSERT INTO posts (title,postText,username,UserId) VALUES (?,?,?,?)";

  return PromiseModule.createUpdateDelete(
    sqlSearch,
    title,
    postText,
    username,
    UserId
  );
}
async function getAllPosts() {
  //const sqlSearch =
  //"		SELECT `posts`.`id`, `posts`.`title`, `posts`.`postText`, `posts`.`username`, `posts`.`createdAt`, `posts`.`updatedAt`, `posts`.`UserId`, `likes`.`id` AS `likesid`, `likes`.`createdAt` AS `likescreatedAt`, `likes`.`updatedAt` AS `likesupdatedAt`, `likes`.`PostId` AS `likesPostId`, `likes`.`UserId`  AS `likesUserId` FROM `posts` AS posts LEFT OUTER JOIN `likes` AS `likes` ON `posts`.`id` = `likes`.`PostId`  ORDER BY `posts`.`createdAt` DESC ";
  const sqlSearch =
    "	SELECT `posts`.`id`, `posts`.`title`, `posts`.`postText`, `posts`.`username`, `posts`.`createdAt`, `posts`.`updatedAt`, `posts`.`UserId`, `likes`.`id` AS `likesid`, `likes`.`createdAt` AS `likescreatedAt`, `likes`.`updatedAt` AS `likesupdatedAt`, `likes`.`PostId` AS `likesPostId`, `likes`.`UserId`  AS `likesUserId` ,`comments`.`id` AS `commentsid`, `comments`.`commentBody` AS `commentBody`,`comments`.`username` AS `commentusername`, `comments`.`createdAt` AS `commentscreatedAt`, `comments`.`updatedAt` AS `commentsupdatedAt`, `comments`.`PostId` AS `commentsPostId`FROM `posts` AS posts LEFT OUTER JOIN `likes` AS `likes` ON `posts`.`id` = `likes`.`PostId`  LEFT outer join `comments` AS `comments` ON `posts`.`id` = `comments`.`PostId`";
  return PromiseModule.readData(sqlSearch);
}

async function getAllLikedPosts(id) {
  const sqlSearch = "SELECT * FROM likes WHERE UserId=?";
  const UserId = id;
  return PromiseModule.readDataWithId(sqlSearch, [UserId]);
}
async function getPostsById(id) {
  const sqlSearch = "SELECT * FROM posts WHERE id= ?";

  return PromiseModule.readDataWithId(sqlSearch, id);
}
async function getById(id) {
  const sqlSearch =
    "SELECT `posts`.`id`, `posts`.`title`, `posts`.`postText`, `posts`.`username`, `posts`.`createdAt`, `posts`.`updatedAt`, `posts`.`UserId`, `likes`.`id` AS `likesid`, `likes`.`createdAt` AS `likescreatedAt`, `likes`.`updatedAt` AS `likesupdatedAt`, `likes`.`PostId` AS `likesPostId`, `likes`.`UserId`  AS `likesUserId` FROM `posts` AS posts LEFT OUTER JOIN `likes` AS `likes` ON `posts`.`id` = `likes`.`PostId` WHERE  `posts`.`UserId`=? ORDER BY `posts`.`createdAt` DESC";

  return PromiseModule.readDataWithId(sqlSearch, [id]);
}
async function UpdateTitle(text, id) {
  const sqlSearch = "UPDATE posts SET title= ? WHERE id= ?";
  const data = [text, id];
  return PromiseModule.createUpdateDelete(sqlSearch, data);
}
async function UpdateBody(text, id) {
  const sqlSearch = "UPDATE posts SET postText= ? WHERE id= ?";
  const data = [text, id];
  return PromiseModule.createUpdateDelete(sqlSearch, data);
}
async function DeletePost(id) {
  const sqlSearch = "DELETE FROM posts WHERE id=?";
  return PromiseModule.createUpdateDelete(sqlSearch, [id]);
}

module.exports = Posts;
