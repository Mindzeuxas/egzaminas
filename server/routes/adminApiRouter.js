import express from "express";
import { getLogout } from "../api/admin/getLogout.js";

import { moviesPost } from "../api/admin/moviesPost.js";
import { moviesPut } from "../api/admin/moviesPut.js";
import { moviesDelete } from "../api/admin/moviesDelete.js";

import { categoriesPost } from "../api/admin/categoriesPost.js";
import { categoriesDelete } from "../api/admin/categoriesDelete.js";
import { categoriesPut } from "../api/admin/categoriesPut.js";

import { apiUpload } from "../api/admin/apiUpload.js";
import { uploadThumbnailImage } from "../middleware/uploadThumbnail.js";

export const adminApiRouter = express.Router();

adminApiRouter.get("/logout", getLogout);

adminApiRouter.post("/movies", moviesPost);
adminApiRouter.put("/movies/:id", moviesPut);
adminApiRouter.delete("/movies/:id", moviesDelete);

adminApiRouter.post("/categories", categoriesPost);
adminApiRouter.put("/categories/:id", categoriesPut);
adminApiRouter.delete("/categories/:id", categoriesDelete);

adminApiRouter.post("/upload", uploadThumbnailImage.single("thumbnail"), apiUpload);

adminApiRouter.all("*error", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No such admin API route exists",
  });
});
