import BrandModel from "../model/Brand.js";
import slug from "slug";

/**
 * Fetches and returns a list of all brands from the database
 *
 * This function performs an asynchronous database query to retrieve all brand records.
 * It handles both success and error scenarios with appropriate response formatting.
 *
 * @async
 * @function brandList
 * @returns {Promise<Object>} Response object containing:
 * @returns {number} status - HTTP status code (200 for success, 400 for error)
 * @returns {string} message - Descriptive message about the operation result
 * @returns {Array|string} [brands] - Array of brand objects on success
 * @returns {string} [err] - Error description string when operation fails
 *
 * @example
 * // Successful response
 * {
 *   status: 200,
 *   message: "Brand list loaded successfully",
 *   brands: [...]
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
export const brandList = async()=>{
    try{
        let brands = await BrandModel.find();
        return {
            status: 200,
            message: "Brand list loaded successfully",
            brands: brands
        }
    }
    catch(err){
        return {
            status: 400,
            message: "There is a problem",
            err: err.toString()
        }
    }
}

/**
 * Fetches a single brand from the database based on the provided brand slug
 *
 * This function queries the BrandModel to find brands matching the given slug.
 * It returns a standardized response object containing the status, message,
 * and either the found brand data or error information.
 *
 * @param {Object} brand_slug - Object containing the brand slug identifier
 * @param {string} brand_slug.slug - Unique slug identifier for the brand
 *
 * @returns {Promise<Object>} Response object with the following structure:
 * @returns {number} returns.status - HTTP status code (200 for success, 400 for error)
 * @returns {string} returns.message - Human-readable result message
 * @returns {Array|string} returns.brands/err - Brand data array on success, error string on failure
 *
 * @example
 * // Successful response
 * {
 *   status: 200,
 *   message: "Brand loaded successfully",
 *   brands: [{...}]
 * }
 *
 * @example
 * // Error response
 * {
 *   status: 400,
 *   message: "There is a problem",
 *   err: "Error message string"
 * }
 */
export const selectSingleBrand = async(brand_slug)=>{
    try{
        let brands = await BrandModel.find({slug: brand_slug.slug});
        return {
            status: 200,
            message: "Brand loaded successfully",
            brands: brands
        }
    }
    catch(err){
        return {
            status: 400,
            message: "There is a problem",
            err: err.toString()
        }
    }
}

/**
 * Creates a new brand in the database
 *
 * This function takes brand data, processes it by generating a slug from the name,
 * and inserts the new brand record into the database using the BrandModel.
 *
 * @param {Object} brand_data - The brand data object containing brand information
 * @param {string} brand_data.name - The name of the brand to be created
 *
 * @returns {Promise<Object>} Response object containing operation result
 * @returns {number} return.status - HTTP status code (201 for success, 400 for error)
 * @returns {string} return.message - Descriptive message about the operation outcome
 * @returns {Array|string} return.brands|return.err - Created brand data on success or error details on failure
 *
 * @throws {Error} Propagates database errors caught during the insert operation
 *
 * @example
 * // Successful response
 * {
 *   status: 201,
 *   message: "Brand list loaded successfully",
 *   brands: [{ name: "Nike", slug: "nike" }]
 * }
 *
 * // Error response
 * {
 *   status: 400,
 *   message: "There is a problem to create a new brand",
 *   err: "Error: Duplicate key error"
 * }
 */
export const addNewBrand = async(brand_data)=>{
    try{
        const new_brand = [];
        new_brand.push({
            name: brand_data.name,
            slug: slug(brand_data.name),
        });
        await BrandModel.insertMany(new_brand)
        return {
            status: 201,
            message: "Brand list loaded successfully",
            brands: new_brand
        }
    }
    catch(err){
        return {
            status: 400,
            message: "There is a problem to create a new brand",
            err: err.toString()
        }
    }
}

/**
 * Updates an existing brand's name and automatically regenerates the slug
 *
 * This function performs a database update operation to modify a brand's name
 * and corresponding slug. The slug is automatically generated from the new brand name
 * using a slugification utility.
 *
 * @param {Object} brand_data - The original brand data object containing current brand information
 * @param {Object} updated_name - Object containing the new brand name to be set
 * @param {string} updated_name.name - The new name for the brand
 *
 * @returns {Object} Response object indicating operation status
 * @returns {number} return.status - HTTP status code (200 for success, 400 for error)
 * @returns {string} return.message - Human readable result message
 * @returns {string} [return.err] - Error description if operation fails
 *
 * @example
 * // Successful update
 * const result = await modifyBrand(
 *   { slug: 'old-brand-name' },
 *   { name: 'New Brand Name' }
 * );
 * // Returns: { status: 200, message: "Brand name updated successfully" }
 *
 * @throws {Object} Returns error response object if database operation fails
 */
export const modifyBrand = async(brand_data, updated_name)=>{
    try{
        await BrandModel.updateOne({slug: brand_data.slug}, {
            name: updated_name.name,
            slug: slug(updated_name.name)
        })
        return {
            status: 200,
            message: "Brand name updated successfully",
        }
    }

    catch(err){
        return {
            status: 400,
            message: "There is a problem to update brand name",
            err: err.toString()
        }
    }
}

/**
 * Removes a brand from the database by its slug identifier
 *
 * This function performs a soft delete operation on the brand collection
 * using the brand's slug as the unique identifier for deletion
 *
 * @param {Object} brand - The brand object to be removed
 * @param {string} brand.slug - The unique slug identifier of the brand
 *
 * @returns {Promise<Object>} Response object indicating operation status
 * @returns {number} return.status - HTTP status code (200 for success, 400 for error)
 * @returns {string} return.message - Human readable result message
 * @returns {string} [return.err] - Error description if operation fails
 *
 * @example
 * // Successful deletion
 * const result = await removeBrand({ slug: 'nike' });
 * // Returns: { status: 200, message: "Brand removed successfully" }
 *
 * @example
 * // Failed deletion
 * const result = await removeBrand({ slug: 'invalid-slug' });
 * // Returns: { status: 400, message: "There is a problem to delete a brand", err: "Error message" }
 *
 * @throws {Error} May throw database connection errors or validation errors
 */
export const removeBrand = async(brand)=>{
    try{
        await BrandModel.deleteOne({ slug: brand.slug })
        return {
            status: 200,
            message: "Brand removed successfully",
        }
    }
    catch(err){
        return {
            status: 400,
            message: "There is a problem to delete a brand",
            err: err.toString()
        }
    }
}