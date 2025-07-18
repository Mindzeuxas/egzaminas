import { useContext, useEffect, useState } from "react";
import { PageTitle } from "../../../components/page-title/PageTitle";
import { AdsList } from "../../../components/ads/AdsList";
import { AdsContext } from "../../../context/ads/AdsContext";
import { CategoriesContext } from "../../../context/categories/CategoriesContext";

export function PageAllAds() {
  const { publicAds } = useContext(AdsContext);
  const { categories } = useContext(CategoriesContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [filteredAds, setFilteredAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e?.preventDefault();

    const query = searchQuery.toLowerCase();

    const filtered = publicAds.filter((ad) => {
      const matchesCategory = !selectedCategory || ad.category_name === selectedCategory;

      const matchesSearch =
        !query || ad.name.toLowerCase().includes(query) || ad.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    setFilteredAds(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory, searchQuery, publicAds]);

  return (
    <div className="container">
      <PageTitle title="All Ads" />

      <form onSubmit={handleSearch} className="form-control" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleSearch();
          }}
        >
          <option value="">Choose category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search ads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <AdsList data={filteredAds} />
    </div>
  );
}
