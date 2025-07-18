import { AdNewForm } from "../../../components/form/AdNew";
import { AdminTitle } from "../../../components/page-title/AdminTitle";

export function PageNewAd() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="New ad " />
      <AdNewForm />
    </main>
  );
}
