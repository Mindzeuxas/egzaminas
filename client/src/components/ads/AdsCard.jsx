import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CommentsContext } from "../../context/comments/CommentsContext";
import { UserContext } from "../../context/user/UserContext";
import { AdsContext } from "../../context/ads/AdsContext";

export function AdCard({ data }) {
  const { comments, adminDeleteComment, adminRefreshComment } = useContext(CommentsContext);
  const adComments = comments.filter((c) => c.ad_id === data.id);
  const { userId, userIsBanned, role, isLoggedIn } = useContext(UserContext);
  const { publicAds, adminDeleteAd, adIsBanned, adminRefreshAds } = useContext(AdsContext);
  const navigate = useNavigate();
  

  const [commentTexts, setCommentTexts] = useState({});
  const [liked, setLiked] = useState(data.liked === "1");

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

  const handleLike = async () => {
    const action = liked ? -1 : 1;
    const newLiked = !liked;

    setLiked(newLiked);

    if (!isLoggedIn) return;
    try {
      await fetch("http://localhost:5445/api/admin/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ad_id: data.id,
          user_id: userId,
          is_liked: action,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            adminRefreshAds();
          }
        });
    } catch (err) {
      console.error("Nepavyko atnaujinti like:", err);
      // Atstatyk į pradinę būseną, jei nepavyko
      setLiked(!newLiked);
    }
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
      {isLoggedIn && !userIsBanned && !adIsBanned && (
        <button onClick={() => handleLike()} style={{ 
          color: "orange",
          border: "none",
          backgroundColor: "transparent",
          fontSize: "1.1em",
          cursor: "pointer"
           }}>
          {liked ? "★ liked" : "☆ like"}
        </button>
      )}

      {isAdOwner && !userIsBanned && (
        <>
          <button onClick={() => setEditAd(data.id)} style={{ 
            marginLeft: 10,
            borderRadius: "2rem",
            backgroundColor: "blue",
            color: "white"}}>
            Edit
          </button>
          <button onClick={() => onDeleteAd(data.id)} style={{ marginLeft: 10, 
          borderRadius: "2rem",
            backgroundColor: "red",
            color: "white"}}>
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
                        backgroundColor: "red",
                        borderRadius: "2rem",
                        color: "white",
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
              placeholder="Your comment"
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
