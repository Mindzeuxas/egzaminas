import { useContext } from "react";
import { LoginForm } from "../../../components/form/LoginForm";
import { PageTitle } from "../../../components/page-title/PageTitle";
import { UserContext } from "../../../context/user/UserContext";
import { LogoutForm } from "../../../components/form/LogoutForm";

export function PageLogin() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="container">
      <PageTitle title="Login" />
      {isLoggedIn ? <LogoutForm /> : <LoginForm />}
    </div>
  );
}
