import { useContext, useEffect, useState } from "react";
import { initialCategoriesContext } from "./initialCategoriesContext";
import { CategoriesContext } from "./CategoriesContext";
import { UserContext } from "../user/UserContext";

export function CategoriesContextWrapper(props) {
  const [categories, setCategories] = useState(initialCategoriesContext.categories);

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      fetchcategories();
    }
  }, [isLoggedIn]);

  function fetchcategories() {
    fetch("http://localhost:5445/api/public/categories", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCategoriesList(data.list);
        }
      })
      .catch(console.error);
  }

  function setCategoriesList(data) {
    setCategories(() => data);
  }

  function adminRefreshCategory() {
    fetchcategories();
  }

  function adminDeleteCategory(id) {
    setCategories((list) => list.filter((c) => c.id !== id));
  }

  const value = {
    categories,
    setCategoriesList,
    adminRefreshCategory,
    adminDeleteCategory,
  };

  return <CategoriesContext.Provider value={value}>{props.children}</CategoriesContext.Provider>;
}
