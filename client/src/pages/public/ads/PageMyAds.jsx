import { useContext } from "react";
import { PageTitle } from "../../../components/page-title/PageTitle";
import { AdsList } from "../../../components/ads/AdsList";
import { AdsContext } from "../../../context/ads/AdsContext";
import { UserContext } from "../../../context/user/UserContext";

export function PageMyAds() {
  const { publicAds } = useContext(AdsContext);
  const { userId } = useContext(UserContext);
  const myAds = publicAds.filter((a) => a.user_id === userId);

  return (
    <div className="container">
      <PageTitle title="My posted ads" />

      <AdsList data={myAds} />
    </div>
  );
}
