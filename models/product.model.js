import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product Name!"]
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            require: [false],

        },

    },
    {
        timestamps: true,
        collection: "my_products",
    }
) 

const Product = mongoose.model("Product" , ProductSchema);

export default Product;