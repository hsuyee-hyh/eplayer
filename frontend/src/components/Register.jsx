import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  /** submit via Form 
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;

    if (password !== confirmPassword) {
      setError(true);
      setSuccess(false);
      return;
    }

    // Simulate a successful registration
    setError(false);
    setSuccess(true);

    // Redirect to the login page after a short delay
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }
    **/

  function handleSubmit(event) {
    event.preventDefault();
    //get formdata
    const formElement = event.target;
    const formData = new FormData(formElement);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Password does not Match");
      setSuccess(false);
      return;
    }

    // define api route
    fetch("http://localhost/esound/backend/router.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "register",
        username: username,
        email: email,
        password: password,
      }),
    }) //end of fetch()
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "error") {
          setError(true);
          setErrorMessage(data.message);
        } else {
          setError(false);
          setErrorMessage(null);
          navigate("/");
        }
        console.log(data.status);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        {/* error alert */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}
        {/* success alert */}
        {success && (
          <div className="alert alert-success" role="alert">
            Registration successful!
          </div>
        )}

        <h2 className="text-center mb-4">Register</h2>
        <form
          // action="http://localhost/esound/backend/router.php?action=register"
          className="d-flex flex-column gap-3"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className="form-control"
            placeholder="Confirm Password"
            required
          />
          <button className="btn btn-success mt-4">Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
