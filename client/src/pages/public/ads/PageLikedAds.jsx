import { useContext } from "react";
import { PageTitle } from "../../../components/page-title/PageTitle";
import { AdsList } from "../../../components/ads/AdsList";
import { AdsContext } from "../../../context/ads/AdsContext";
// import { UserContext } from "../../../context/user/UserContext";

export function PageLikedAds() {
  const { publicAds } = useContext(AdsContext);
  // const { userId } = useContext(UserContext);
  console.log(publicAds);
  const myAds = publicAds.filter((a) => a.liked === "1");

  return (
    <div className="container">
      <PageTitle title="My liked ads" />

      <AdsList data={myAds} />
    </div>
  );
}
