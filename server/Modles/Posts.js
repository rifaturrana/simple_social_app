const PostResponseModel = (result) => {
  const newResult = { ...result };

  delete newResult.likesid;
  delete newResult.likescreatedAt;
  delete newResult.likesupdatedAt;
  delete newResult.likesPostId;
  delete newResult.likesUserId;
  delete newResult.commentsid;
  delete newResult.commentBody;
  delete newResult.commentscreatedAt;
  delete newResult.commentsupdatedAt;
  delete newResult.commentsPostId;
  delete newResult.commentusername;

  return newResult;
};

const PostModel = (data) => {
  const likes = [];
  const comments = [];
  data.map((item) => {
    if (item.likesid !== null) {
      const postObject = {
        id: item.likesid,
        createdAt: item.likescreatedAt,
        updatedAt: item.likesupdatedAt,
        PostId: item.likesPostId,
        UserId: item.likesUserId,
      };

      likes.push(postObject);
    } else likes.push();
  });
  data.map((item) => {
    if (item.commentsid !== null) {
      const commentObject = {
        id: item.commentsid,
        Body: item.commentBody,
        createdAt: item.commentscreatedAt,
        updatedAt: item.commentsupdatedAt,
        PostId: item.commentsPostId,
        username: item.commentusername,
      };

      comments.push(commentObject);
    } else comments.push();
  });

  return PostResponseModel({
    ...data[0],
    Likes: likes,
    Comments: comments,
  });
};
module.exports = { PostModel };
