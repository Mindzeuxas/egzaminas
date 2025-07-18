import { AdEditForm } from "../../../components/form/AdEdit";
import { AdminTitle } from "../../../components/page-title/AdminTitle";

export function PageEditAd() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="Edit ad " />
      <AdEditForm />
    </main>
  );
}
