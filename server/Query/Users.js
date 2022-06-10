const PromiseModule = require("../Promise/PromiseModule");
const Users = { Register, getUser, getByid, UpdatePassword };

async function Register(username, password, usermail) {
  const sqlSearch =
    "INSERT INTO users (username, password,usermail) VALUES (?,?,?)";

  //console.log(data);
  return PromiseModule.createUpdateDelete(
    sqlSearch,
    username,
    password,
    usermail
  );
}
async function getUser(username) {
  const sqlSearch = "SELECT * FROM users WHERE username=?";
  const uname = username;
  return PromiseModule.readDataWithId(sqlSearch, [uname]);
}
async function getByid(id) {
  const sqlSearch = "SELECT * FROM users WHERE id= ?";
  return PromiseModule.readDataWithId(sqlSearch, [id]);
}
async function UpdatePassword(password, username) {
  const sqlSearch = "UPDATE users SET password = ? WHERE username  = ?";
  const data = [password, username];
  console.log(data);
  return PromiseModule.createUpdateDelete(sqlSearch, data);
}
module.exports = Users;
