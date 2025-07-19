import { useContext, useEffect, useState } from "react";
import { initialCommentsContext } from "./initialCommentsContext";
import { UserContext } from "../user/UserContext";
import { CommentsContext } from "./CommentsContext";

export function CommentsContextWrapper(props) {
  const [comments, setComments] = useState(initialCommentsContext.comments);
  const [adminComments, setAdminComments] = useState(initialCommentsContext.adminComments);

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      fetchComments();
      fetchAdminComments();
    }
  }, [isLoggedIn]);

  function fetchComments() {
    fetch("http://localhost:5445/api/public/comments", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCommentsList(data.list);
        }
      })
      .catch(console.error);
  }

  function fetchAdminComments() {
    fetch("http://localhost:5445/api/admin/comments", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setAdminCommentsList(data.list);
        }
      })
      .catch(console.error);
  }

  function setCommentsList(data) {
    setComments(() => data);
  }

  function setAdminCommentsList(data) {
    setAdminComments(() => [...data]);
  }

  function adminRefreshComment() {
    fetchComments();
    fetchAdminComments();
  }

  function adminDeleteComment(id) {
    setComments((list) => list.filter((c) => c.id !== id));
  }

  const value = {
    comments,
    adminComments,
    setCommentsList,
    adminRefreshComment,
    adminDeleteComment,
  };

  return <CommentsContext.Provider value={value}>{props.children}</CommentsContext.Provider>;
}
