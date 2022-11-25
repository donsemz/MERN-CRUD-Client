import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [listOfFriends, setListOfFriends] = useState([]);

  //get data to show when app starts
  useEffect(() => {
    axios
      .get("https://tame-gold-sweatpants.cyclic.app/getFriends")
      .then((response) => {
        console.log(response);
        setListOfFriends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //send data to backend
  //addFriend
  const addFriend = () => {
    axios
      .post("https://tame-gold-sweatpants.cyclic.app/addFriend", {
        name: name,
        age: age,
        description: description,
      })
      .then((response) => {
        alert("Friend added successfully");
        setListOfFriends([
          ...listOfFriends,
          { _id:response.data._id, name: name, age: age, description: description },
        ]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //updateFriend
  const updateFriend = (id) => {
    const newAge = prompt("Enter the New Age:");
    axios
      .put("https://tame-gold-sweatpants.cyclic.app/updateFriend", {
        newAge: newAge,
        id: id,
      })
      .then(() => {
        setListOfFriends(
          listOfFriends.map((val) => {
            return val._id === id
              ? {
                  _id: id,
                  name: val.name,
                  age: newAge,
                  description: val.description,
                }
              : val;
          })
        );
      });
  };

  //deleteFriend
  const deleteFriend = (id) => {
    axios.delete(`https://tame-gold-sweatpants.cyclic.app/deleteFriend/${id}`).then(
      setListOfFriends(listOfFriends.filter((val)=>{
        return val._id !==id;
      }))
    );
  };

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Friend's Name..."
        />
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
          placeholder="Friend's Age..."
        />
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          placeholder="Friend's Description..."
        />
        <button onClick={addFriend}>Add Friend</button>
      </div>
      <h1>My list of Friends</h1>
      <hr />
      <div className="friendDisplay">
        {listOfFriends.map((friend, i) => {
          return (
            <div className="friend" key={i}>
              <h2>Name: {friend.name}</h2>
              <h2>Age: {friend.age}</h2>
              <h2>Description: {friend.description}</h2>
              <button
                className="edit"
                onClick={() => {
                  updateFriend(friend._id);
                }}
              >
                Update
              </button>
              <button
                className="delete"
                onClick={() => {
                  deleteFriend(friend._id);
                }}
              >
                Delete
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
