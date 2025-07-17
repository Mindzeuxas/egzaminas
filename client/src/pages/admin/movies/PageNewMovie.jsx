import { MovieNewForm } from "../../../components/form/MovieNew";
import { AdminTitle } from "../../../components/page-title/AdminTitle";

export function PageNewMovie() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="New movie" />
      <MovieNewForm />
    </main>
  );
}
