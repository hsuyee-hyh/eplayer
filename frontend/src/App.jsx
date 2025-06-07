import { useEffect, useState } from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState(null);

  // connect to php
  useEffect(() => {
    fetch("http://localhost/esound/backend/data.php")
      .then((response) => response.json())
      .then((data) => setData(data.message));
  }, []);

  // count with sideEffects to show count for every time Render happens
  const [count, setCount] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setCount(count * 2);
    }, 10000);
  }, [count]);

  // count with sideEffects
  // when the count's State change
  const [count1, setCount1] = useState(0);
  function handleCount() {
    setCount1(count1 + 1);
  }
  useEffect(() => {
    setTimeout(() => {
      // alert(`Do you wanna continue to update count? if yes, click on 'Update Count'
      // button`);
    }, 1000);
  }, [count1]);

  // user form data
  const userData = {
    email: "john@gmail.com",
    password: "password",
  };
  const [username, setUserName] = useState("");
  const submitForm = (formData) => {
    // convert into javascript object
    const formObject = Object.fromEntries(formData);

    // set username
    setUserName(formData.get("username"));

    alert(`formdata is ${formData.get("username")}`);
    console.log(formObject);

    // connect to php
    const response = fetch("http://localhost/esound/backend/data.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject), // convert JS Object into JSON string
    })
      .then((response) => response.json())
      .then((data) => alert(data.message))
      .catch((error) => alert(`error is ${error}`));
  };

  function submitHandle(formData) {
    //state update
    // setName(formData.get("name"));
    //connect to php
    // const response = fetch("http://localhost/esound/backend/data.php", {
    // method: "POST",
    // headers: {
    // "Content-Type": "application/json",
    // },
    // body: JSON.stringify(formData),
    // });
    // alert(response.json());
    // alert("FormData sent!");
    // useEffect(()=>{
    // fetch("http://localhost/esound/backend/data.php")
    // .then((response)=> response.json())
    // .then((data)=>)
    // })
    // const response = axios.post("http://localhost/esound/backend/data.php", {
    // name,
    // });
    // console.log(response);
  }

  return (
    <>
      <div className="h3 mx-3 mt-3">{data ? data : "Loading..."}</div>
      <div className="h5 mx-3 mt-3">{username ? username : "error..."}</div>

      <div className="flex flex-row justify-content-center">
        <p className="text-center">Count happens in every Render: {count}</p>
        <p className="text-center">
          Count happens when the count's State change: {count1}
        </p>
        <button className="btn btn-primary text-center" onClick={handleCount}>
          Update Count
        </button>
      </div>

      {/* user-input-form */}
      <div className="container center" style={{ width: "600px" }}>
        <form
          className="form-control"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            submitForm(formData);
          }}
        >
          <input
            type="text"
            name="username"
            className="form-control my-2"
            id=""
            placeholder="name"
          />
          <button className="btn btn-primary text-white">Submit</button>
        </form>
        <p>Your Input Name is : {username}</p>
      </div>
    </>
  );
}

export default App;
