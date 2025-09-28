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
const collectionName = "product_details";

const client = new MongoClient(DATABASE_CONN);
await client.connect();
const db = client.db(dbName);
const collection = db.collection(collectionName);

const product_list = await db.collection("products").find({}).toArray();
const product_id =  product_list.map((product) => product._id);


async function run() {
    try {
        const product_description = [];

        for (let i=0; i<product_id.length; i++) {
            product_description.push({
                product_id: product_id[i],
                description: faker.lorem.paragraph(),
            })
        }
        const result = await db.collection("product_details").insertMany(product_description);
        console.log(`${result.insertedCount} data inserted`)
    }
    catch (error) {
        console.error('Error creating dummy data:', error);
    }
    finally {
        await client.close();
    }
}

run();
