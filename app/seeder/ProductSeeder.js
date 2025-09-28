import { MongoClient } from 'mongodb';
import {DATABASE_CONN} from "../settings/config.js";
import { faker } from '@faker-js/faker';

/**
 * Database Setup for eShopping Application
 * -----------------------------------------
 * 1. Connects to the MongoDB database using the provided connection string.
 * 2. Initializes the `eshopping` database and the `products` collection.
 * 3. Retrieves all documents from the `brands` and `categories` collections:
 *    - Extracts their `_id` values into arrays for reference.
 *
 * This setup is useful for:
 * - Populating dropdowns (e.g., brand/category filters).
 * - Establishing relationships between products, brands, and categories.
 * - Ensuring consistent usage of brand and category IDs throughout the app.
 */
const dbName = "eshopping";
const collectionName = "products";

const client = new MongoClient(DATABASE_CONN);
await client.connect();
const db = client.db(dbName);
const collection = db.collection(collectionName);

const brand_list = await db.collection("brands").find({}).toArray();
const brand_id =  brand_list.map((brand) => brand._id);

const category_list = await db.collection("categories").find({}).toArray();
const category_id =  category_list.map((category) => category._id);

/**
 * Generates a random integer within a specified range.
 *
 * @param {number} [min=1000] - The minimum value of the range (inclusive).
 * @param {number} [max=50000] - The maximum value of the range (inclusive).
 * @returns {number} A random integer between the given min and max values.
 *
 * @example
 * getRandomNum();       // returns a number between 1000 and 50000
 * getRandomNum(10, 20); // returns a number between 10 and 20
 */
function getRandomNum(min=1000, max=50000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates an array of mock product records for testing or seeding a database.
 *
 * @function create_product
 * @param {number} [count=10] - The number of product records to generate.
 * @returns {Array<Object>} An array of product objects with randomized attributes.
 *
 * Each product record includes:
 * - name: Randomized product name with capitalization applied.
 * - slug: URL-friendly slug generated from lorem words.
 * - image: Placeholder image URL.
 * - price: Randomly generated price using `getRandomNum()`.
 * - stock: Random stock quantity between 20 and 200 units.
 * - star: Random product rating between 1.0 and 5.0 (1 decimal place).
 * - remark: Short lorem-based remark string.
 * - category_id: Random category identifier from the `category_id` array.
 * - brand_id: Random brand identifier from the `brand_id` array.
 *
 * This function is useful for generating sample data during development,
 * testing, or populating a staging database.
 */
function create_product(count=10) {

    const records = [];
    for (let i = 1;  i <= count; i++) {
        records.push({
              name: `Product ${i}`,
              slug: faker.helpers.slugify(`Product ${i}`).toLowerCase(),
              image: "https://example.com/images/product1.jpg",
              price: getRandomNum(),
              stock: getRandomNum(20, 200),
              star: getRandomNum(1.0, 5.0).toFixed(1),
              remark: faker.lorem.lines(1),
              category_id: category_id[Math.floor(Math.random() * category_id.length)],
              brand_id: brand_id[Math.floor(Math.random() * brand_id.length)]
        })
    }
    return records;
}

/**
 * Asynchronously inserts multiple product records into the "products" collection.
 *
 * - Generates product records using the `create_product` function.
 * - Inserts the generated records into MongoDB with `insertMany`.
 * - Logs the number of successfully inserted products.
 * - Handles and logs errors gracefully if insertion fails.
 * - Ensures the database client is closed in all cases.
 *
 * This function is useful for seeding or bulk inserting product data.
 */
async function run() {
    try {
        const record = create_product(2)
        const result = await db.collection("products").insertMany(record)
        console.log(`${result.insertedCount} product name inserted.`);
    } catch (e) {
        console.error("Error inserting documents:", e);
    } finally {
        await client.close();
    }
}

run();
