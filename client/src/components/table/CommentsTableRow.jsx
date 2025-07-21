import { useContext } from "react";
import { Link } from "react-router";
import { BadgeDanger } from "../badge/BadgeDanger";
import { BadgeDraft } from "../badge/BadgeDraft";
import { BadgeSuccess } from "../badge/BadgeSuccess";
import defaultImg from "../../assets/default.webp";

import { AdsContext } from "../../context/ads/AdsContext";
import { CommentsContext } from "../../context/comments/CommentsContext";

export function CommentsTableRow({ comment }) {
  const { adminRefreshComment } = useContext(CommentsContext);
  const img = comment.thumbnail ? comment.thumbnail : defaultImg;

  function handleBanClick() {
    putBan(1);
  }

  function handleUnbanClick() {
    putBan(0);
  }

  function putBan(banValue) {
    fetch("http://localhost:5445/api/admin/comments/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({
        commentId: comment.commentId,
        isBanned: banValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminRefreshComment();
        }
      })
      .catch(console.error);
  }

  return (
    <tr>
      <td>{comment.commentId}</td>
      <td>
        <img style={{ maxWidth: "5rem", maxHeight: "5rem" }} src={img} alt="comment thumbnail" />
      </td>
      <td>{comment.name}</td>
      <td>{comment.category_name}</td>

      <td>{comment.description}</td>
      <td>{comment.text}</td>
      <td>{comment.isBanned ? <BadgeDanger text="Banned" /> : <BadgeSuccess text="active" />}</td>
      <td>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          {comment.isBanned ? (
            <button onClick={handleUnbanClick} className="btn btn-danger" type="button">
              Unban comment
            </button>
          ) : (
            <button onClick={handleBanClick} className="btn btn-primary" type="button">
              Ban comment
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
