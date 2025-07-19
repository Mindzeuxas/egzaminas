import { useContext } from "react";
import { AdNewForm } from "../../../components/form/AdNew";
import { AdminTitle } from "../../../components/page-title/AdminTitle";
import { UserContext } from "../../../context/user/UserContext";

export function PageNewAd() {
  const { userIsBanned } = useContext(UserContext);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      {userIsBanned ? <AdminTitle title="Banned users can't post new ads " /> : <AdminTitle title="New ad " />}
      {!userIsBanned && <AdNewForm />}
    </main>
  );
}
