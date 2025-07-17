import { CategoryCard } from "./CategoryCard";

export function CategoriesList({ data }) {
  return (
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      {data.map((item) => (
        <CategoryCard key={item.name} data={item} />
      ))}
    </div>
  );
}
