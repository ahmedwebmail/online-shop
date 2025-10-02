import {addNewBrand, brandList, modifyBrand, removeBrand, selectSingleBrand} from "../service/BrandService.js";

/**
 * Creates a new brand in the system
 *
 * @async
 * @function createBrand
 * @param {Object} req - Express request object containing brand data in body
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response containing the newly created brand object
 *
 */
export const createBrand = async(req, res)=>{
    let new_brand = await addNewBrand(req.body)
    return res.json(new_brand);
}

/**
 * Updates an existing brand with the provided data
 *
 * Extracts brand identifier from URL parameters and update data from request body,
 * then delegates to the modifyBrand service function to perform the actual update operation
 *
 * @async
 * @function updateBrand
 * @param {Object} req - Express request object containing URL parameters and request body
 * @param {Object} req.params - Route parameters containing brand identifier
 * @param {Object} req.body - Request body containing brand data to update
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response containing the updated brand data
 * @throws {Error} May throw errors from database operations or validation failures
 */
export const updateBrand = async(req, res)=>{
    let brand = await modifyBrand(req.params, req.body)
    return res.json(brand);
}

/**
 * Deletes a brand from the system asynchronously
 *
 * This handler:
 * - Extracts brand identifier from request parameters
 * - Invokes the brand removal service with the provided parameters
 * - Returns a standardized success response upon completion
 *
 * @async
 * @function deleteBrand
 * @param {Object} req - Express request object containing brand parameters
 * @param {Object} res - Express response object for sending the operation result
 * @returns {Promise<Object>} JSON response indicating successful deletion
 * @throws {Error} May propagate errors from the removeBrand service layer
 */
export const deleteBrand = async(req, res)=>{
    await removeBrand(req.params)
    return res.json({success:true})
}

/**
 * Retrieves all brands from the database
 * @async
 * @function getAllBrand
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response containing all brand records
 * @throws {Error} If database query fails
 */
export const getAllBrand = async(req, res)=>{
    let result= await brandList()
    return res.json(result)
}

/**
 * Retrieves a specific brand by ID from request parameters
 * @async
 * @function getSpecificBrand
 * @param {Object} req - Express request object containing brand ID in params
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response containing the requested brand data
 * @throws {Error} If brand not found or database query fails
 */
export const getSpecificBrand = async(req, res)=>{
    let result  = await selectSingleBrand(req.params)
    return res.json(result)
}