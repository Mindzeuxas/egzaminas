import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/user/UserContext";

export function LoginForm() {
  const [email, setEmail] = useState("chuck@norris.lt");
  const [emailValidationText, setEmailValidationText] = useState("");
  const [emailValidationState, setEmailValidationState] = useState("");
  const [password, setPassword] = useState("chuck@norris.lt");
  const [passwordValidationText, setPasswordValidationText] = useState("");
  const [passwordValidationState, setPasswordValidationState] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertStatus, setAlertStatus] = useState("success");
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  function handleFormSubmit(e) {
    e.preventDefault();

    setAlertText("");
    setAlertStatus("");
    setEmailValidationState("");
    setEmailValidationText("");
    setPasswordValidationState("");
    setPasswordValidationText("");

    fetch("http://localhost:5445/api/public/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setAlertText(data.msg);
          setAlertStatus("success");
          setEmailValidationState("is-valid");
          setPasswordValidationState("is-valid");

          login(data.user);

          navigate("/admin");
        } else {
          if (typeof data.msg === "string") {
            setAlertText(data.msg);
            setAlertStatus("danger");
          } else {
            if (data.msg.email) {
              setEmailValidationState("is-invalid");
              setEmailValidationText(data.msg.email);
            } else {
              setEmailValidationState("is-valid");
            }

            if (data.msg.password) {
              setPasswordValidationState("is-invalid");
              setPasswordValidationText(data.msg.password);
            } else {
              setPasswordValidationState("is-valid");
            }
          }
        }
      })
      .catch(console.error);
  }

  return (
    <form onSubmit={handleFormSubmit} className="col-12 col-md-10 col-lg-6 col-xl-5 col-xxl-4">
      {alertText && (
        <div className={`alert alert-${alertStatus} alert-dismissible fade show`} role="alert">
          {alertText}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <div className="form-floating">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(() => e.target.value)}
          className={`form-control ${emailValidationState}`}
          placeholder="name@example.com"
          required
        />
        <label htmlFor="email">Email address</label>
        <div className="invalid-feedback">{emailValidationText}</div>
      </div>
      <div className="form-floating">
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(() => e.target.value)}
          className={`form-control ${passwordValidationState}`}
          placeholder="Password"
          required
        />
        <label htmlFor="password">Password</label>
        <div className="invalid-feedback">{passwordValidationText}</div>
      </div>
      <button className="btn btn-primary w-100 py-2" type="submit">
        Login
      </button>
    </form>
  );
}
