import { MovieEditForm } from "../../../components/form/MovieEdit";
import { AdminTitle } from "../../../components/page-title/AdminTitle";

export function PageEditMovie() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="Edit " />
      <MovieEditForm />
    </main>
  );
}
