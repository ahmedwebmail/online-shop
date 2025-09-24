import mongoose from "mongoose";

/**
 * Product Schema and Model
 * -------------------------
 * This schema defines the structure for product documents in the MongoDB database.
 * It includes product details such as name, slug, price, discount, stock, and references
 * to related categories and brands.
 *
 * Fields:
 * - name: Unique product name (required)
 * - slug: URL-friendly identifier (required)
 * - price: Base price of the product (required)
 * - discount: Percentage discount applied (default: 0)
 * - discount_price: Final price after applying discount (default: 0)
 * - image: URL of the product image (default: null)
 * - stock: Number of items available in inventory (required)
 * - star: Product rating (default: null)
 * - remark: Additional notes about the product (default: null)
 * - category_id: Reference to product category (required)
 * - brand_id: Reference to product brand (required)
 *
 * The schema also uses:
 * - timestamps: To automatically store createdAt and updatedAt fields
 * - versionKey: Disabled for cleaner documents
 *
 * Model:
 * ProductModel maps the schema to the "products" collection in MongoDB.
 */
const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true},
        price: {type: Number, required: true},
        discount: {type: Number, default: 0},
        discount_price: {type: Number, default: 0},
        image: {type: String, default: null},
        stock: {type: Number, required: true},
        star:{type: String, default: null},
        remark: {type: String, default: null},
        category_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'categories'},
        brand_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'brands'},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const ProductModel = mongoose.model("products", ProductSchema);