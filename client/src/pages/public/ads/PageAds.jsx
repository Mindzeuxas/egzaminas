import { useContext } from "react";
import { PageTitle } from "../../../components/page-title/PageTitle";
import { AdsList } from "../../../components/ads/AdsList";
import { AdsContext } from "../../../context/ads/AdsContext";

export function PageAllAds() {
  const { publicAds } = useContext(AdsContext);

  return (
    <div className="container">
      <PageTitle title="All Ads" />

      <AdsList data={publicAds} />
    </div>
  );
}
