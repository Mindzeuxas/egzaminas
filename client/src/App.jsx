import { BrowserRouter, Route, Routes } from "react-router";
import { UserContextWrapper } from "./context/user/UserContextWrapper";

import { PublicLayout } from "./layout/PublicLayout";
import { PrivateLayout } from "./layout/PrivateLayout";

import { PageHome } from "./pages/public/home/PageHome";
import { PageNotFound } from "./pages/PageNotFound";

import { PageMovies } from "./pages/public/movies/PageMovies";
import { PageMovieInner } from "./pages/public/movies/PageMovieInner";

import { PageCategories } from "./pages/public/categories/PageCategories";
import { PageCategoryInner } from "./pages/public/categories/PageCategoryInner";

import { PageLogin } from "./pages/public/auth/PageLogin";
import { PageRegister } from "./pages/public/auth/PageRegister";

import { PageDashboard } from "./pages/admin/PageDashboard";

import { PageAllCategories } from "./pages/admin/categories/PageAllCategories";
import { PageNewCategory } from "./pages/admin/categories/PageNewCategory";
import { PageEditCategory } from "./pages/admin/categories/PageEditCategory";

import { PageAllMovies } from "./pages/admin/movies/PageAllMovies";
import { PageNewMovie } from "./pages/admin/movies/PageNewMovie";
import { PageEditMovie } from "./pages/admin/movies/PageEditMovie";

import { CategoriesContextWrapper } from "./context/categories/CategoriesContextWrapper";
import { MoviesContextWrapper } from "./context/movies/MoviesContextWrapper";

export function App() {
  return (
    <UserContextWrapper>
      {/* <CategoriesContextWrapper> */}
      {/* <MoviesContextWrapper> */}
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path="/" element={<PageHome />} />
            <Route path="/movies" element={<PageMovies />} />
            {/* <Route path="/movies/:movie" element={<PageMovieInner />} /> */}
            <Route path="/categories" element={<PageCategories />} />
            {/* <Route path="/categories/:category" element={<PageCategoryInner />} /> */}

            <Route path="/register" element={<PageRegister />} />
            <Route path="/login" element={<PageLogin />} />
          </Route>
          <Route Component={PrivateLayout}>
            <Route path="/admin" element={<PageDashboard />} />

            <Route path="/admin/categories" element={<PageAllCategories />} />
            <Route path="/admin/categories/new" element={<PageNewCategory />} />
            <Route path="/admin/categories/:category/edit" element={<PageEditCategory />} />

            <Route path="/admin/movies" element={<PageAllMovies />} />
            <Route path="/admin/movies/new" element={<PageNewMovie />} />
            <Route path="/admin/movies/:movie/edit" element={<PageEditMovie />} />
          </Route>
          <Route Component={PublicLayout}>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </MoviesContextWrapper> */}
      {/* </CategoriesContextWrapper> */}
    </UserContextWrapper>
  );
}
