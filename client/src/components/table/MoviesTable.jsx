// import { MoviesTableRow } from "./MoviesTableRow";

export function MoviesTable({ data }) {
  return (
    <div className="table-responsive small">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Title</th>
            <th scope="col">Url</th>
            <th scope="col">Description</th>
            <th scope="col">Duration</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((item) => (
            <MoviesTableRow key={item.id} movie={item} />
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
