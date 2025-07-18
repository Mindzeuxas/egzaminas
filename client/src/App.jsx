import { BrowserRouter, Route, Routes } from "react-router";
import { UserContextWrapper } from "./context/user/UserContextWrapper";

import { PublicLayout } from "./layout/PublicLayout";
import { PrivateLayout } from "./layout/PrivateLayout";

import { PageHome } from "./pages/public/home/PageHome";
import { PageNotFound } from "./pages/PageNotFound";

import { PageAllAds } from "./pages/public/ads/PageAds";

import { PageCategories } from "./pages/public/categories/PageCategories";

import { PageLogin } from "./pages/public/auth/PageLogin";
import { PageRegister } from "./pages/public/auth/PageRegister";

import { PageDashboard } from "./pages/admin/PageDashboard";

import { PageAllCategories } from "./pages/admin/categories/PageAllCategories";
import { PageNewCategory } from "./pages/admin/categories/PageNewCategory";
import { PageEditCategory } from "./pages/admin/categories/PageEditCategory";

import { PageAllMovies } from "./pages/admin/ads/PageAllMovies";
import { PageNewMovie } from "./pages/admin/ads/PageNewMovie";
import { PageEditAd } from "./pages/admin/ads/PageEditAd";

import { CategoriesContextWrapper } from "./context/categories/CategoriesContextWrapper";
import { AdsContextWrapper } from "./context/ads/AdsContextWrapper";
import { CommentsContextWrapper } from "./context/comments/CommentsContextWrapper";
import { PageMyAds } from "./pages/public/ads/PageMyAds";
import { PageNewAd } from "./pages/admin/ads/PageNewAd";
import { PageLikedAds } from "./pages/public/ads/PageLikedAds";

export function App() {
  return (
    <UserContextWrapper>
      <CategoriesContextWrapper>
        <AdsContextWrapper>
          <CommentsContextWrapper>
            <BrowserRouter>
              <Routes>
                <Route Component={PublicLayout}>
                  <Route index path="/" element={<PageHome />} />
                  <Route path="/ads" element={<PageAllAds />} />
                  <Route path="/my-posted-ads" element={<PageMyAds />} />
                  <Route path="/my-liked-ads" element={<PageLikedAds />} />
                  <Route path="/add-ad" element={<PageNewAd />} />
                  <Route path="/admin/ads/:adId/edit" element={<PageEditAd />} />

                  <Route path="/categories" element={<PageCategories />} />
                  <Route path="/register" element={<PageRegister />} />
                  <Route path="/login" element={<PageLogin />} />
                </Route>
                <Route Component={PrivateLayout}>
                  <Route path="/admin" element={<PageDashboard />} />

                  <Route path="/admin/categories" element={<PageAllCategories />} />
                  <Route path="/admin/categories/new" element={<PageNewCategory />} />
                  <Route path="/admin/categories/:category/edit" element={<PageEditCategory />} />

                  <Route path="/admin/users" element={<PageAllCategories />} />

                  {/* <Route path="/categories/:category" element={<PageCategoryInner />} /> */}
                  {/* <Route path="/movies/:movie" element={<PageMovieInner />} /> */}
                  {/* <Route path="/admin/movies" element={<PageAllMovies />} />
                  <Route path="/admin/movies/new" element={<PageNewMovie />} /> */}
                </Route>
                <Route Component={PublicLayout}>
                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CommentsContextWrapper>
        </AdsContextWrapper>
      </CategoriesContextWrapper>
    </UserContextWrapper>
  );
}
