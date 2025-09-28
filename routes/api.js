import express from "express";
const router = express.Router()

import * as BrandController from "../app/controller/BrandController.js";

//Brand route
router.post("/create-brand", BrandController.createBrand);
router.post("/select-brand/:slug", BrandController.selectBrand);
router.put("/update-brand/:slug", BrandController.updateBrand);
router.delete("/delete-brand/:slug", BrandController.deleteBrand);








export default router;