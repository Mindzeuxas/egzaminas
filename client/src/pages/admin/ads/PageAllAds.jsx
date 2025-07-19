import { useContext } from "react";
import { AdminTitle } from "../../../components/page-title/AdminTitle";
import { AdsTable } from "../../../components/table/AdsTable";
import { AdsContext } from "../../../context/ads/AdsContext";

export function PageAllAdminAds() {
  const { adminAds } = useContext(AdsContext);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="All ads " />
      <AdsTable data={adminAds} />
    </main>
  );
}
