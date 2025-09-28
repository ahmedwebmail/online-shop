import BrandModel from "../model/Brand.js"
import slug from "slug";

/**
 * This function handles the creation of a new brand record by extracting
 * the brand name from the request body, generating a slug from the name,
 * and inserting the new brand into the database using BrandModel.
 *
 * @param {Object} req - Express request object containing brand data in body
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Object} JSON response indicating success or failure of brand creation
 *
 * @example
 * // Request body: { "name": "Nike" }
 * // Response: { "status": "Successfully brand name inserted" }
 */
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

/**
 * This function searches for a brand using the slug parameter from the request URL.
 * It returns the brand details if found, or an error if the brand doesn't exist
 * or if there's a database issue.
 *
 * @param {Object} req - Express request object containing brand slug in params
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Object} JSON response containing the found brand or error message
 *
 * @example
 * // URL: /brands/nike
 * // Response: { "status": "Your selected brand is: ", "result": { ...brandData } }
 */
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

/**
 * This function locates a brand by its slug parameter and updates both
 * the brand name and the corresponding slug with the new values provided
 * in the request body. The slug is regenerated based on the new name.
 *
 * @param {Object} req - Express request object containing slug in params and new name in body
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Object} JSON response indicating success or failure of the update operation
 *
 * @example
 * // URL: /brands/nike
 * // Request body: { "name": "Nike Inc." }
 * // Response: { "status": "Brand name updated" }
 */
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

/**
 * This function removes a brand record from the database using the slug
 * parameter provided in the request URL. It performs a hard delete operation
 * and returns a confirmation message upon successful deletion.
 *
 * @param {Object} req - Express request object containing brand slug in params
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Object} JSON response indicating success or failure of deletion
 *
 * @example
 * // URL: /brands/nike
 * // Response: { "status": "Brand name deleted successfully" }
 */
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