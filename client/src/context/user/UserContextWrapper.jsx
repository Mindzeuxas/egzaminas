import { useEffect, useState } from "react";
import { initialUserContext } from "./initialUserContext";
import { UserContext } from "./UserContext";

export function UserContextWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialUserContext.isLoggedIn);
  const [role, setRole] = useState(initialUserContext.role);
  const [email, setEmail] = useState(initialUserContext.email);
  const [userId, setUserId] = useState(initialUserContext.userId);

  useEffect(() => {
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
  }, []);

  function login(data) {
    setIsLoggedIn(() => true);
    setRole(() => "admin");
    setEmail(() => data.email);
    setUserId(() => data.id);
  }

  function logout() {
    setIsLoggedIn(() => initialUserContext.isLoggedIn);
    setRole(() => initialUserContext.role);
    setEmail(() => initialUserContext.email);
    setUserId(() => initialUserContext.userId);
  }

  const value = {
    isLoggedIn,
    role,
    email,
    userId,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}
