import express from "express";
const router = express.Router()

import * as BrandController from "../app/controller/BrandController.js";
import * as CategoryController from "../app/controller/CategoryController.js";

//Brand route
router.get("/brand-list", BrandController.getAllBrand);
router.post("/create-brand", BrandController.createBrand);
router.get("/select-brand/:slug", BrandController.getSpecificBrand);
router.put("/update-brand/:slug", BrandController.updateBrand);
router.delete("/delete-brand/:slug", BrandController.deleteBrand);

//Category route
router.post("/create-category", CategoryController.createCategory);
router.get("/select-category/:slug", CategoryController.selectCategory);
router.put("/update-category/:slug", CategoryController.updateCategory);
router.delete("/delete-category/:slug", CategoryController.deleteCategory);





export default router;