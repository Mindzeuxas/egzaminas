import express from "express";
import { getLogout } from "../api/admin/getLogout.js";

import { categoriesPost } from "../api/admin/categoriesPost.js";
import { categoriesDelete } from "../api/admin/categoriesDelete.js";
import { categoriesPut } from "../api/admin/categoriesPut.js";

import { apiUpload } from "../api/admin/apiUpload.js";
import { uploadThumbnailImage } from "../middleware/uploadThumbnail.js";
import { commentDelete } from "../api/user/commentsDelete.js";
import { adDelete } from "../api/user/adDelete.js";
import { adPut } from "../api/user/adPut.js";
import { commentPost } from "../api/user/commentPost.js";
import { adPost } from "../api/user/adPost.js";
import { likesPost } from "../api/user/likesPost.js";
import { getAllUsers } from "../api/admin/usersGet.js";
import { usersPut } from "../api/admin/usersPut.js";
import { getAllAdminAds } from "../api/admin/getAllAdminAds.js";
import { usersAdminPut } from "../api/admin/adAdminPut.js";
import { getAllAdminComments } from "../api/admin/getAllAdminComments.js";
import { commentAdminPut } from "../api/admin/commentAdminPut.js";

export const adminApiRouter = express.Router();

adminApiRouter.get("/logout", getLogout);

adminApiRouter.get("/comments", getAllAdminComments);
adminApiRouter.put("/comments", commentAdminPut);
adminApiRouter.delete("/comments/:id", commentDelete);
adminApiRouter.post("/comment", commentPost);

adminApiRouter.get("/ads/", getAllAdminAds);
adminApiRouter.put("/ads/", usersAdminPut);

adminApiRouter.delete("/ads/:id", adDelete);
adminApiRouter.put("/ads/:id", adPut);
adminApiRouter.post("/ads/", adPost);

adminApiRouter.post("/likes/", likesPost);

adminApiRouter.get("/users", getAllUsers);
adminApiRouter.put("/users", usersPut);

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
