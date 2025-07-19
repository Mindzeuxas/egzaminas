import { useContext } from "react";
import { BadgeDanger } from "../badge/BadgeDanger";
import { BadgeSuccess } from "../badge/BadgeSuccess";
import { UserContext } from "../../context/user/UserContext";

export function UsersTableRow({ user }) {
  const { refreshUsers } = useContext(UserContext);

  function handleBanClick() {
    putBan(1);
  }

  function handleUnbanClick() {
    putBan(0);
  }

  function putBan(banValue) {
    fetch("http://localhost:5445/api/admin/users/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({
        userId: user.id,
        isBanned: banValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          refreshUsers();
        }
      })
      .catch(console.error);
  }

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.isBanned ? <BadgeDanger text="Banned" /> : <BadgeSuccess text="active" />}</td>

      <td>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          {user.isBanned ? (
            <button onClick={handleUnbanClick} className="btn btn-danger" type="button">
              Unban
            </button>
          ) : (
            <button onClick={handleBanClick} className="btn btn-primary" type="button">
              Ban
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
