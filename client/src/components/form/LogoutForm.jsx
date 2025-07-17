import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";

export function LogoutForm() {
  const { logout } = useContext(UserContext);

  function handleLogoutClick() {
    fetch("http://localhost:5445/api/admin/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          logout();
        }
      })
      .catch(console.error);
  }

  return (
    <>
      <p>
        Einamuoju metu prisijungę vartotojai negali prisijungti prie kitos paskyros. Norėdami tą atlikti, visų pirma
        atsijunkite nuo esamos paskyros.
      </p>
      <button onClick={handleLogoutClick} className="btn btn-danger">
        Log out
      </button>
    </>
  );
}
