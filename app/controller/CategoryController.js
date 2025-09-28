import CategoryModel from "../model/Category.js"
import slug from "slug";

/**
 * This function handles the creation of a new Category record by extracting
 * the Category name from the request body, generating a slug from the name,
 * and inserting the new Category into the database using CategoryModel.
 *
 * @param {Object} req - Express request object containing Category data in body
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Object} JSON response indicating success or failure of Category creation
 *
 * @example
 * // Request body: { "name": "Nike" }
 * // Response: { "status": "Successfully Category name inserted" }
 */
export const createCategory = async(req, res)=>{
    try{
        const new_category = [];
        new_category.push({
            name: req.body["name"],
            slug: slug(req.body["name"])
        });
        await CategoryModel.insertMany(new_category)
        return res.status(201).json({status:"Successfully Category name inserted"})
    }
    catch(err){
        res.status(400).send({error: "There is a problem"}, err.toString());
    }
}

/**
 * This function searches for a Category using the slug parameter from the request URL.
 * It returns the Category details if found, or an error if the Category doesn't exist
 * or if there's a database issue.
 *
 * @param {Object} req - Express request object containing Category slug in params
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Object} JSON response containing the found Category or error message
 *
 * @example
 * // URL: /Categorys/nike
 * // Response: { "status": "Your selected Category is: ", "result": { ...CategoryData } }
 */
export const selectCategory = async(req, res)=>{
    try{
        let category_slug = req.params.slug
        let result  = await CategoryModel.findOne({"slug": category_slug})
        return res.status(200).json({status: "Your selected Category is: ", result})
    }
    catch(err){
        res.status(400).send({error: "There is a problem"}, err.toString());
    }
}

/**
 * This function locates a Category by its slug parameter and updates both
 * the Category name and the corresponding slug with the new values provided
 * in the request body. The slug is regenerated based on the new name.
 *
 * @param {Object} req - Express request object containing slug in params and new name in body
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Object} JSON response indicating success or failure of the update operation
 *
 * @example
 * // URL: /Categorys/nike
 * // Request body: { "name": "Nike Inc." }
 * // Response: { "status": "Category name updated" }
 */
export const updateCategory = async(req, res)=>{
    try{
        let category_slug = req.params.slug
        await CategoryModel.updateOne({ slug: category_slug }, {name: req.body["name"],
            slug: slug(req.body["name"])
        });
        return res.status(200).json({ status: "Category name updated" });
    }
    catch(err){
        res.status(400).send({error: "There is a problem"}, err.toString());
    }
}

/**
 * This function removes a Category record from the database using the slug
 * parameter provided in the request URL. It performs a hard delete operation
 * and returns a confirmation message upon successful deletion.
 *
 * @param {Object} req - Express request object containing Category slug in params
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Object} JSON response indicating success or failure of deletion
 *
 * @example
 * // URL: /Categorys/nike
 * // Response: { "status": "Category name deleted successfully" }
 */
export const deleteCategory = async(req, res)=>{
    try{
        let category_slug = req.params.slug
        await CategoryModel.deleteOne({ slug: category_slug })
        return res.status(200).json({ status: "Category name deleted successfully" });
    }
    catch(err){
        res.status(400).send({error: "There is a problem"}, err.toString());
    }
}