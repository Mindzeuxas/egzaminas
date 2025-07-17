// import { CategoriesTableRow } from "./CategoriesTableRow";

export function CategoriesTable({ data }) {
  return (
    <div className="table-responsive small">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Movies count</th>
            <th scope="col">Url</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((item) => ( */}
          {/* // <CategoriesTableRow key={item.id} category={item} /> */}
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
}
