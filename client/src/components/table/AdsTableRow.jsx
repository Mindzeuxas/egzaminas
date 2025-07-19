import { useContext } from "react";
import { Link } from "react-router";
import { BadgeDanger } from "../badge/BadgeDanger";
import { BadgeDraft } from "../badge/BadgeDraft";
import { BadgeSuccess } from "../badge/BadgeSuccess";
import defaultImg from "../../assets/default.webp";

import { AdsContext } from "../../context/ads/AdsContext";

export function AdsTableRow({ ad }) {
  const { adminRefreshAds } = useContext(AdsContext);
  const img = ad.thumbnail ? ad.thumbnail : defaultImg;

  function handleBanClick() {
    putBan(1);
  }

  function handleUnbanClick() {
    putBan(0);
  }

  function putBan(banValue) {
    fetch("http://localhost:5445/api/admin/ads/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({
        adId: ad.id,
        isBanned: banValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminRefreshAds();
        }
      })
      .catch(console.error);
  }

  return (
    <tr>
      <td>{ad.id}</td>
      <td>
        <img style={{ maxWidth: "5rem", maxHeight: "5rem" }} src={img} alt="ad thumbnail" />
      </td>
      <td>{ad.name}</td>

      <td>{ad.description}</td>
      <td>{ad.price}</td>
      <td>{ad.banned ? <BadgeDanger text="Banned" /> : <BadgeSuccess text="active" />}</td>
      <td>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          {ad.banned ? (
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
