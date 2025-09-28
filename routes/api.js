import express from "express";
const router = express.Router()

import * as BrandController from "../app/controller/BrandController.js";
import * as CategoryController from "../app/controller/CategoryController.js";

//Brand route
router.post("/create-brand", BrandController.createBrand);
router.post("/select-brand/:slug", BrandController.selectBrand);
router.put("/update-brand/:slug", BrandController.updateBrand);
router.delete("/delete-brand/:slug", BrandController.deleteBrand);

//Category route
router.post("/create-category", CategoryController.createCategory);
router.get("/select-category/:slug", CategoryController.selectCategory);
router.put("/update-category/:slug", CategoryController.updateCategory);
router.delete("/delete-category/:slug", CategoryController.deleteCategory);





export default router;