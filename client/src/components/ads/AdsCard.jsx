import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CommentsContext } from "../../context/comments/CommentsContext";
import { UserContext } from "../../context/user/UserContext";
import { AdsContext } from "../../context/ads/AdsContext";

export function AdCard({ data }) {
  const { comments, adminDeleteComment, adminRefreshComment } = useContext(CommentsContext);
  const adComments = comments.filter((c) => c.ad_id === data.id);

  const { userId, userIsBanned, role, isLoggedIn } = useContext(UserContext);
  const { publicAds, adminDeleteAd, adIsBanned } = useContext(AdsContext);
  const navigate = useNavigate();

  const [commentTexts, setCommentTexts] = useState({});

  const hasLiked = false;

  const isAdOwner = data.user_id === userId;

  function onDeleteComment(commentId) {
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

  function onDeleteAd(adId) {
    fetch("http://localhost:5445/api/admin/ads/" + adId, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminDeleteAd(adId);
        }
      })
      .catch(console.error);
  }

  function setEditAd(adId) {
    return navigate("/admin/ads/" + adId + "/edit");
  }

  const handleInputChange = (e, adId) => {
    setCommentTexts((prev) => ({ ...prev, [adId]: e.target.value }));
  };

  const handlePostCommentInternal = async (adId) => {
    const text = commentTexts?.[adId]?.trim() || "";

    if (!text) {
      console.error("Comment cannot be empty");
      return;
    }

    const ad = publicAds.filter((a) => a.id === adId);
    if (!ad) return;

    if (ad.is_banned) {
      console.error("Cannot comment on a banned ad.");
      return;
    }

    if (userIsBanned) {
      console.error("You are banned from commenting.");
      return;
    }

    try {
      await handlePostComment(adId);
    } catch {
      console.error("Failed to post comment.");
    }
  };

  const handlePostComment = async (adId) => {
    if (userIsBanned) {
      console.error("Banned users cannot post comments.");
      return;
    }

    const text = commentTexts[adId]?.trim();
    if (!text) {
      console.error("Comment cannot be empty.");
      return;
    }

    try {
      await createComment(adId, text);
    } catch {
      console.error("Failed to post comment.");
    }
  };

  const createComment = async (adId, text) => {
    fetch("http://localhost:5445/api/admin/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        adId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminRefreshComment();
        }
      })
      .catch(console.error);
  };

  return (
    <div
      key={data.id}
      className="card-thumbnail "
      style={{
        border: "1px solid #ccc",
        marginBottom: 20,
        padding: 10,
        borderRadius: 6,
      }}
    >
      <div className="card">
        <img src={data.thumbnail} alt={data.name} className=" card-thumbnail " style={{ height: 225 }} />
      </div>
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

      {isAdOwner && !userIsBanned && (
        <>
          <button onClick={() => setEditAd(data.id)} style={{ marginLeft: 10 }}>
            Edit
          </button>
          <button onClick={() => onDeleteAd(data.id)} style={{ marginLeft: 10, color: "red" }}>
            Delete
          </button>
        </>
      )}

      <div className="comments" style={{ marginTop: 15 }}>
        <h4>Comments</h4>
        {adComments?.length > 0 ? (
          adComments.map((comment) => {
            const commentUserId = comment.user_id;
            const isCommentOwner = userId === commentUserId;

            return (
              <div key={comment.id} style={{ marginBottom: 6 }}>
                <p style={{ margin: 0 }}>
                  <strong>{"User: " + comment.user_id || "User"}</strong>: {comment.text}
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

        {isLoggedIn && !userIsBanned && !adIsBanned ? (
          <div className="comment-box" style={{ marginTop: 10 }}>
            <input
              type="text"
              placeholder="Add a comment"
              value={commentTexts[data.id] || ""}
              onChange={(e) => handleInputChange(e, data.id)}
              style={{ width: "70%", marginRight: 10 }}
            />
            <button onClick={() => handlePostCommentInternal(data.id)}>Post</button>
          </div>
        ) : (
          <p style={{ color: "red", fontStyle: "italic" }}>Commenting is disabled.</p>
        )}
      </div>
    </div>
  );
}
