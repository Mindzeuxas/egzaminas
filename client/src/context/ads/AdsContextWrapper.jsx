import { useContext, useEffect, useState } from "react";
import { initialAdsContext } from "./initialAdsContext";
import { UserContext } from "../user/UserContext";
import { AdsContext } from "./AdsContext";

export function AdsContextWrapper(props) {
  const [publicAds, setPublicAds] = useState(initialAdsContext.publicAds);
  const [adIsBanned, setAdIsBanned] = useState(initialAdsContext.adIsBanned);

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetchPublicAds();
  }, [isLoggedIn]);

  function fetchPublicAds() {
    fetch("http://localhost:5445/api/public/ads", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPublicAdsList(data.list);
        }
      })
      .catch(console.error);
  }

  function setPublicAdsList(data) {
    setPublicAds(() => data);
  }

  function adminDeleteAd(id) {
    setPublicAds((list) => list.filter((m) => m.id !== id));
  }

  function adminRefreshAds() {
    fetchPublicAds();
  }

  const value = {
    publicAds,
    adIsBanned,
    setPublicAds,
    adminDeleteAd,
    adminRefreshAds,
  };

  return <AdsContext.Provider value={value}>{props.children}</AdsContext.Provider>;
}
