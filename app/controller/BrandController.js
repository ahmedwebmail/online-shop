import BrandModel from "../model/Brand.js"
import slug from "slug";

export const createBrand = async(req, res)=>{
    try{
        const new_brand = [];
        new_brand.push({
            name: req.body["name"],
            slug: slug(req.body["name"])
        });
        await BrandModel.insertMany(new_brand)
        return res.status(201).json({status:"Successfully brand name inserted"})
    }
    catch(err){
        res.status(400).send({error: "There is a problem"}, err.toString());
    }
}

export const selectBrand = async(req, res)=>{
    try{
        let brand_slug = req.params.slug
        let result  = await BrandModel.findOne({"slug": brand_slug})
        return res.status(200).json({status: "Your selected brand is: ", result})
    }
    catch(err){
        res.status(400).send({error: "There is a problem"}, err.toString());
    }
}

export const updateBrand = async(req, res)=>{
    try{
        let brand_slug = req.params.slug
        await BrandModel.updateOne({ slug: brand_slug }, {name: req.body["name"],
            slug: slug(req.body["name"])
        });
        return res.status(200).json({ status: "Brand name updated" });
    }
    catch(err){
        res.status(400).send({error: "There is a problem"}, err.toString());
    }
}

export const deleteBrand = async(req, res)=>{
    try{
        let brand_slug = req.params.slug
        await BrandModel.deleteOne({ slug: brand_slug })
        return res.status(200).json({ status: "Brand name deleted successfully" });
    }
    catch(err){
        res.status(400).send({error: "There is a problem"}, err.toString());
    }
}