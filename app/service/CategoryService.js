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
export const addNewCategory = async(category)=>{
    try{
        const new_category = [];
        new_category.push({
            name: category,
            slug: slug(category),
        });
        await CategoryModel.insertMany(new_category)
        return {
            status: 201,
            message: "Category created successfully",
            category: new_category
        }
    }
    catch(err){
        return {
            status: 400,
            message: "There is a problem to create a new category",
            err: err.toString()
        }
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
export const selectSingleCategory = async(slug)=>{
    try{
        let category_slug = slug
        let result  = await CategoryModel.findOne({"slug": category_slug})
        return {
            status: 200,
            message: "Your selected Category is: ",
            category: result
        }
    }
    catch(err){
        return {
            status: 400,
            message: "There is a problem to select category",
            err: err.toString()
        }
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
export const modifyCategory = async(category_data, updated_name)=>{
    try{
        await CategoryModel.updateOne({slug: category_data}, {
            name: updated_name,
            slug: slug(updated_name),
        })
        return {
            status: 200,
            message: "Category name updated successfully",
            category: updated_name
        }
    }

    catch(err){
        return {
            status: 400,
            message: "There is a problem to update category name",
            err: err.toString()
        }
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
export const removeCategory = async(category_data)=>{
    try{
        let category_slug = category_data
        await CategoryModel.deleteOne({ slug: category_slug })
        return {
            status: 200,
            message: "Category deleted successfully",
            category: category_slug
        }
    }
    catch(err){
        return {
            status: 400,
            message: "There is a problem to delete a category",
            err: err.toString()
        }
    }
}

/**
 * Fetches and returns a list of all categories from the database
 *
 * This function performs an asynchronous database query to retrieve all brand records.
 * It handles both success and error scenarios with appropriate response formatting.
 *
 * @async
 * @function categoryList
 * @returns {Promise<Object>} Response object containing:
 * @returns {number} status - HTTP status code (200 for success, 400 for error)
 * @returns {string} message - Descriptive message about the operation result
 * @returns {Array|string} [categories] - Array of category objects on success
 * @returns {string} [err] - Error description string when operation fails
 *
 * @example
 * // Successful response
 * {
 *   status: 200,
 *   message: "Category list loaded successfully",
 *   categories: [...]
 * }
 *
 * @example
 * // Error response
 * {
 *   status: 400,
 *   message: "There is a problem",
 *   err: "Error message details"
 * }
 */
export const categoryList = async()=>{
    try{
        let categories = await CategoryModel.find();
        return {
            status: 200,
            message: "Category list loaded successfully",
            category: categories
        }
    }
    catch(err){
        return {
            status: 400,
            message: "There is a problem fetch category list",
            err: err.toString()
        }
    }
}