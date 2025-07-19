import { AdsTableRow } from "./AdsTableRow";

export function AdsTable({ data }) {
  return (
    <div className="table-responsive small">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price $</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <AdsTableRow key={item.id} ad={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
