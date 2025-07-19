import { useContext } from "react";
import { AdminTitle } from "../../../components/page-title/AdminTitle";
import { UserContext } from "../../../context/user/UserContext";
import { UsersTable } from "../../../components/table/UsersTable";

export function PageAllUsers() {
  const { users } = useContext(UserContext);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="All users" />
      <UsersTable data={users} />
    </main>
  );
}
