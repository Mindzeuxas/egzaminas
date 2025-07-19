import { useContext } from "react";
import { AdminTitle } from "../../../components/page-title/AdminTitle";
import { CommentsTable } from "../../../components/table/CommentsTable";
import { CommentsContext } from "../../../context/comments/CommentsContext";

export function PageAdminAllComments() {
  const { adminComments } = useContext(CommentsContext);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="All Comments " />
      <CommentsTable data={adminComments} />
    </main>
  );
}
