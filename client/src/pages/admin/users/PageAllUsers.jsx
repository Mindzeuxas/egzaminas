import { useContext } from "react";
import { AdminTitle } from "../../../components/page-title/AdminTitle";
import { CategoriesTable } from "../../../components/table/CategoriesTable";
import { UserContext } from "../../../context/user/UserContext";

export function PageAllUsers() {
  const { categories } = useContext(UserContext);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="All categories" />
      <CategoriesTable data={categories} />
    </main>
  );
}
