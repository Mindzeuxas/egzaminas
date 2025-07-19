import { useEffect, useState } from "react";
import { initialUserContext } from "./initialUserContext";
import { UserContext } from "./UserContext";

export function UserContextWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialUserContext.isLoggedIn);
  const [role, setRole] = useState(initialUserContext.role);
  const [email, setEmail] = useState(initialUserContext.email);
  const [userId, setUserId] = useState(initialUserContext.userId);
  const [userIsBanned, setUserIsBanned] = useState(initialUserContext.userIsBanned);
  const [users, setUsers] = useState(initialUserContext.users);

  useEffect(() => {
    fetchUsers(),
      fetch("http://localhost:5445/api/public/login", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            login(data.user);
          }
        })
        .catch(console.error);
  }, [role, isLoggedIn]);

  function login(data) {
    setIsLoggedIn(() => true);
    setRole(() => data.role);
    setEmail(() => data.email);
    setUserId(() => data.id);
    setUserIsBanned(() => data.isBanned);
  }

  function logout() {
    setIsLoggedIn(() => initialUserContext.isLoggedIn);
    setRole(() => initialUserContext.role);
    setEmail(() => initialUserContext.email);
    setUserId(() => initialUserContext.userId);
    setUserIsBanned(() => initialUserContext.isBanned);
  }

  function fetchUsers() {
    fetch("http://localhost:5445/api/admin/users", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUsersList(data.list);
        }
      })
      .catch(console.error);
  }

  function setUsersList(data) {
    setUsers(() => [...data]);
  }

  function refreshUsers() {
    fetchUsers();
  }

  const value = {
    isLoggedIn,
    role,
    email,
    userId,
    userIsBanned,
    users,
    login,
    logout,
    refreshUsers,
  };

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}
