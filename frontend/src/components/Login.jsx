import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

function Login() {
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // get FormData
    const formElement = event.target;
    const formData = new FormData(formElement);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch("http://localhost/esound/backend/router.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "login",
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "error") {
          setError(true);
          setErrMessage(data.message);
          navigate("/");
        } else {
          setError(false);
          setErrMessage(null);
          //store JWT in clien's localStorage
          if (data.data.token) {
            localStorage.setItem("jwtToken", data.data.token);
            navigate(`home?userid=${data.data.foundUser.id}`, { state: { user: data } }); //navigate with data
          } else {
            navigate("/");
          }
        }

        console.log(data.token);
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      });
  }
  return (
    <>
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <div>
          <h2 className="text-center mb-4">Login</h2>
        </div>
        {error && (
          <div className="alert alert-danger text-center">{errMessage}</div>
        )}
        <form
          // action="http://localhost/esound/backend/router.php?action=login"
          method="POST"
          className="d-flex flex-column gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Password"
          />
          <button className="btn btn-success mt-3">Login</button>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
