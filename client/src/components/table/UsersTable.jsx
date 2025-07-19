import { CategoriesTableRow } from "./CategoriesTableRow";
import { UsersTableRow } from "./UsersTableRow";

export function UsersTable({ data }) {
  return (
    <div className="table-responsive small">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <UsersTableRow key={item.id} user={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
