import { CategoryEditForm } from "../../../components/form/CategoryEdit";
import { AdminTitle } from "../../../components/page-title/AdminTitle";

export function PageEditCategory() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="Edit category" />
      <CategoryEditForm />
    </main>
  );
}
