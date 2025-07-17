import { useContext } from "react";
import { Link } from "react-router";
import { CommentsContext } from "../../context/comments/CommentsContext";
import { UserContext } from "../../context/user/UserContext";

export function AdCard({ data }) {
  const { comments, adminDeleteComment } = useContext(CommentsContext);
  const adComments = comments.filter((c) => c.ad_id === data.id);

  const { userId, userIsBanned, role } = useContext(UserContext);

  async function onDeleteComment(commentId) {
    fetch("http://localhost:5445/api/admin/comments/" + commentId, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminDeleteComment(commentId);
        }
      })
      .catch(console.error);
  }

  return (
    <div
      key={data.id}
      className="ad-card"
      style={{
        border: "1px solid #ccc",
        marginBottom: 20,
        padding: 10,
        borderRadius: 6,
      }}
    >
      <img
        src={data.thumbnail}
        alt={data.name}
        className="ad-img"
        style={{ maxWidth: "100%", maxHeight: 200, objectFit: "cover" }}
      />
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <p>
        <strong>Category:</strong> {data.category_name}
      </p>
      <p>
        <strong>Price:</strong> ${data.price}
      </p>

      <button
      // onClick={() => onLike(data.id)} style={{ cursor: "pointer" }}
      >
        {/* {hasLiked ? "★" : "☆"} {data.likedBy.length} */}
      </button>
      {/* 
      {isOwner &&
        !user?.banned && ( // <-- use 'banned' for user here too
          <>
            <button onClick={() => setEditAd(ad)} style={{ marginLeft: 10 }}>
              Edit
            </button>
            <button onClick={() => onDeleteAd(ad._id)} style={{ marginLeft: 10, color: "red" }}>
              Delete
            </button>
          </>
        )} */}

      <div className="comments" style={{ marginTop: 15 }}>
        <h4>Comments</h4>
        {adComments?.length > 0 ? (
          adComments.map((comment) => {
            const commentUserId = comment.user_id;
            const isCommentOwner = userId === commentUserId;
            const isAdOwner = data.user_id === userId;

            return (
              <div key={comment.id} style={{ marginBottom: 6 }}>
                <p style={{ margin: 0 }}>
                  <strong>{comment.user_id || "User"}</strong>: {comment.text}
                  {(isCommentOwner || isAdOwner || role === "admin") && !userIsBanned && (
                    <button
                      onClick={() => onDeleteComment(comment.id)}
                      style={{
                        marginLeft: 10,
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  )}
                </p>
              </div>
            );
          })
        ) : (
          <p>No comments yet.</p>
        )}

        {/* {!user?.banned && !ad.is_banned ? (
          <div className="comment-box" style={{ marginTop: 10 }}>
            <input
              type="text"
              placeholder="Add a comment"
              value={commentTexts[ad._id] || ""}
              onChange={(e) => handleInputChange(e, ad._id)}
              style={{ width: "70%", marginRight: 10 }}
            />
            <button onClick={() => handlePostCommentInternal(ad._id)}>Post</button>
          </div>
        ) : (
          <p style={{ color: "red", fontStyle: "italic" }}>Commenting is disabled.</p>
        )} */}
      </div>
    </div>
  );
}
