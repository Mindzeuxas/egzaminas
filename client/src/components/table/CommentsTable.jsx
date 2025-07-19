import { AdsTableRow } from "./AdsTableRow";
import { CommentsTableRow } from "./CommentsTableRow";

export function CommentsTable({ data }) {
  return (
    <div className="table-responsive small">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Comment</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <CommentsTableRow key={item.commentId} comment={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
