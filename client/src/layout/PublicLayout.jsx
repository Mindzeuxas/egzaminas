import { Outlet } from "react-router";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

export function PublicLayout() {
  return (
    <>
      <Header isPublicPage={true} />
      <Outlet />
      <Footer isPublicPage={true} />
    </>
  );
}
