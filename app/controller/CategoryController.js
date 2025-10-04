import {
    addNewCategory,
    categoryList,
    modifyCategory,
    removeCategory,
    selectSingleCategory
} from "../service/CategoryService.js";

/**
 * Creates a new category in the system
 * @async
 * @function createCategory
 * @param {Object} req - Express request object containing category name in body
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response containing the newly created category data
 */
export const createCategory = async(req, res)=>{
    let data = await addNewCategory(req.body.name)
    return res.json({data: data})
}

/**
 * Retrieves a single category by its slug identifier
 * @async
 * @function selectCategory
 * @param {Object} req - Express request object containing category slug in params
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response containing the requested category data
 */
export const selectCategory = async(req, res)=>{
    let data = await selectSingleCategory(req.params.slug)
    return res.json({data})
}

/**
 * Updates an existing category identified by slug with new data
 * @async
 * @function updateCategory
 * @param {Object} req - Express request object containing category slug in params and new name in body
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response containing the updated category data
 */
export const updateCategory = async(req, res)=>{
    console.log(req.params.slug)
    let data = await modifyCategory(req.params.slug, req.body.name)
    return res.json({data: data})
}

/**
 * Permanently deletes a category identified by slug
 * @async
 * @function deleteCategory
 * @param {Object} req - Express request object containing category slug in params
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response indicating successful deletion status
 */
export const deleteCategory = async(req, res)=>{
    await removeCategory(req.params.slug)
    return res.json(true)
}

/**
 * Retrieves all brands from the database
 * @async
 * @function getAllCategory
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response containing all category records
 * @throws {Error} If database query fails
 */
export const getAllCategory = async(req, res)=>{
    let result= await categoryList()
    return res.json(result)
}