import { useContext } from "react";
import { RegisterForm } from "../../../components/form/RegisterForm";
import { PageTitle } from "../../../components/page-title/PageTitle";
import { UserContext } from "../../../context/user/UserContext";
import { LogoutForm } from "../../../components/form/LogoutForm";

export function PageRegister() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="container">
      <PageTitle title="Register" />
      {isLoggedIn ? <LogoutForm /> : <RegisterForm />}
    </div>
  );
}
