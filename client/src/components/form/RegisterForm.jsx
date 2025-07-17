import { useState } from "react";
import { useNavigate } from "react-router";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [emailValidationText, setEmailValidationText] = useState("");
  const [emailValidationState, setEmailValidationState] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidationText, setPasswordValidationText] = useState("");
  const [passwordValidationState, setPasswordValidationState] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertStatus, setAlertStatus] = useState("success");
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();

    setAlertText("");
    setAlertStatus("");
    setEmailValidationState("");
    setEmailValidationText("");
    setPasswordValidationState("");
    setPasswordValidationText("");

    fetch("http://localhost:5445/api/public/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === "success") {
          setAlertText("Sėkmingai prisiregistravote! Po 3 sekundžių būsite perkelti į prisijungimo puslapį.");
          setAlertStatus("success");
          setEmailValidationState("is-valid");
          setPasswordValidationState("is-valid");

          setTimeout(() => {
            navigate("/login");
          }, 3000);
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
      <div className="form-check text-start my-3">
        <input className="form-check-input" type="checkbox" value="tos" id="tos" required />
        <label className="form-check-label" htmlFor="tos">
          Agree with Terms of Service
        </label>
      </div>
      <button className="btn btn-primary w-100 py-2" type="submit">
        Register
      </button>
    </form>
  );
}
