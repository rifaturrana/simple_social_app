import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import Links from "../../helpers/Links";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${Links.BasicInfo}/${id}`).then((response) => {
      if (response.data.length === 0) {
        alert("No user");
        history.push("/login");
      } else {
        setUsername(response.data[0].username);
        setUsermail(response.data[0].usermail);
      }
    });

    axios.get(`${Links.Posts}/byuserId/${id}`).then((response) => {
      console.log(response.data);
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        {" "}
        <h2> Username: {username} </h2>
        <h3>Usermail: {usermail}</h3>
        {authState.username === username && (
          <button
            onClick={() => {
              history.push("/changepassword");
            }}
          >
            {" "}
            Change My Password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label>Total Likes: {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
