import { useContext } from "react";
import { Outlet } from "react-router";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { PageTitle } from "../components/page-title/PageTitle";
import { LoginForm } from "../components/form/LoginForm";
import { UserContext } from "../context/user/UserContext";
import { Sidebar } from "../components/sidebar/Sidebar";

export function PrivateLayout() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <Header />
      {isLoggedIn ? (
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="container">
          <PageTitle title="Unuathorized access" />
          <PageTitle title="Login first" />
          <LoginForm />
        </div>
      )}
      <Footer isPublicPage={false} />
    </>
  );
}
