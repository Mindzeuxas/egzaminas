import { AdCard } from "./AdsCard";

export function AdsList({ data }) {
  return (
    <div className="container">
      <div id="ad" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {data.map((ad) => (
          <AdCard key={ad.id} data={ad} />
        ))}
      </div>
    </div>
  );
}
