# 🚀 Express + MongoDB + Mongoose CRUD API

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&duration=3000&pause=1000&color=00D9FF&center=true&vCenter=true&width=700&lines=Building+My+First+Mongoose+CRUD+API;Express.js+%7C+MongoDB+%7C+Mongoose;Learning+Backend+Development+Step+by+Step+%F0%9F%9A%80" alt="Typing Animation" />
</p>

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,js" alt="Tech Stack" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-REST%20API-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-NoSQL-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
</p>

---

## 🌟 About This Project

This project is a small **REST API** that I built while learning backend development with:

* 🟢 **Node.js**
* ⚫ **Express.js**
* 🍃 **MongoDB**
* 🦋 **Mongoose**

The main goal was not to build a huge application.

The goal was to understand how a backend application works from the beginning:

```text
Client
   ↓
Express.js
   ↓
API Route
   ↓
Mongoose
   ↓
MongoDB
   ↓
Database
```

I started with a basic Express server and gradually built a complete **CRUD API for products**.

---

## 🎯 What I Practiced

During this project, I learned and practiced:

* 🚀 Initializing a Node.js project
* ⚡ Creating an Express server
* 🔗 Connecting MongoDB with Mongoose
* 🧩 Creating Mongoose schemas
* 📦 Creating Mongoose models
* 🔐 Using `.env` for database credentials
* 📥 Handling `req.body`
* 🔎 Handling `req.params`
* 📝 Creating REST API routes
* 🔄 CRUD operations
* 🕒 Automatic timestamps
* 🗃️ Custom MongoDB collection names
* 🧠 Using useful Mongoose model methods

---

# 🛠️ Tech Stack

| Technology   | Purpose               |
| ------------ | --------------------- |
| 🟢 Node.js   | JavaScript runtime    |
| ⚫ Express.js | Backend framework     |
| 🍃 MongoDB   | Database              |
| 🦋 Mongoose  | MongoDB ODM           |
| 🔐 dotenv    | Environment variables |
| 📮 Postman   | API testing           |

---

# 📁 Project Structure

```text
📦 Project
 ┣ 📂 models
 ┃ ┗ 📄 product.model.js
 ┣ 📄 .env
 ┣ 📄 .gitignore
 ┣ 📄 package.json
 ┗ 📄 server.js
```

---

# 🚀 1. Initialize the Project

I started by creating a new Node.js project:

```bash
npm init -y
```

This generated the `package.json` file.

---

# 📦 2. Install Dependencies

Then I installed the required packages:

```bash
npm install express mongodb mongoose dotenv
```

### Why these packages?

```text
Express
   ↓
Create the server and API routes

MongoDB
   ↓
Work with MongoDB's native driver if needed

Mongoose
   ↓
Create schemas, models and database operations

dotenv
   ↓
Load environment variables
```

---

# ⚡ 3. Basic Express Server

The first step was creating a simple Express server:

```js
import express from "express";

const app = express();

app.use(express.json());

const port = 5000;

app.get("/", async (req, res) => {
    res.send("hello world!");
});

app.listen(port, () => {
    console.log(`Server is running! http://localhost:${port}`);
});
```

This gave me a basic working backend.

---

# 🗃️ 4. Create the Product Model

I created a `models` folder:

```text
models/
└── product.model.js
```

Then created the Mongoose schema:

```js
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
            type: String
        }
    },
    {
        timestamps: true,
        collection: "my_products"
    }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
```

---

# 🧠 What I Learned From the Schema

### 📌 Schema

The schema defines what a product document should look like:

```text
Product
├── name       → String
├── quantity   → Number
├── price      → Number
└── image      → String
```

### 🕒 Timestamps

I learned that:

```js
timestamps: true
```

automatically adds:

```text
createdAt
updatedAt
```

to my documents.

### 🗂️ Collection Name

I can also define the collection name manually:

```js
collection: "my_products"
```

So my MongoDB structure becomes:

```text
Database
└── my_products
    ├── Product 1
    ├── Product 2
    └── Product 3
```

---

# 🔐 5. Environment Variables

Instead of putting my MongoDB credentials directly inside the source code, I created:

```text
.env
```

Example:

```env
MONGODB_URI=your_mongodb_connection_string
```

Then loaded it with:

```js
import dotenv from "dotenv";

dotenv.config();
```

And accessed the connection string:

```js
const DBURI = process.env.MONGODB_URI;
```

I also added `.env` to `.gitignore` so the database credentials don't get pushed to GitHub.

---

# 🔌 6. Connect MongoDB

I connected Mongoose to MongoDB:

```js
mongoose.connect(DBURI)
    .then(() => {
        console.log("Connected To MongoDB");

        app.listen(port, () => {
            console.log(
                `Server is running! http://localhost:${port}`
            );
        });
    });
```

This made sure the server starts after the database connection is established.

---

# 🔥 7. CRUD Operations

The main part of this project was building CRUD operations.

```text
       CRUD
        │
 ┌──────┼──────┐
 ↓      ↓      ↓
Create Read   Update
        │
        ↓
      Delete
```

---

## 🟢 CREATE — POST

### Endpoint

```http
POST /api/products
```

### Code

```js
app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
```

### Example Request

```json
{
    "name": "Laptop",
    "quantity": 5,
    "price": 50000
}
```

Mongoose creates the product document in MongoDB.

---

# 🔵 READ — Get All Products

### Endpoint

```http
GET /api/products
```

### Code

```js
app.get("/api/products", async (req, res) => {
    const products = await Product.find({});

    res.send(products);
});
```

The important Mongoose method here is:

```js
Product.find({})
```

It retrieves the products from the collection.

---

# 🔎 READ — Get One Product

### Endpoint

```http
GET /api/products/:id
```

### Code

```js
app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    const productById = await Product.findById(id);

    res.send(productById);
});
```

Here I learned how route parameters work:

```js
const { id } = req.params;
```

And I used:

```js
Product.findById(id)
```

to find a specific product.

---

# 🟠 UPDATE — Update a Product

### Endpoint

```http
PUT /api/products/:id
```

### Code

```js
app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const query = req.body;

    await Product.findByIdAndUpdate(id, query);

    const updatedProduct = await Product.findById(id);

    res.send(updatedProduct);
});
```

The useful method I learned here:

```js
Product.findByIdAndUpdate(id, query)
```

It makes updating a document much simpler.

---

# 🔴 DELETE — Delete a Product

### Endpoint

```http
DELETE /api/products/:id
```

### Code

```js
app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Product.findByIdAndDelete(id);

        res.send(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
```

The main method here is:

```js
Product.findByIdAndDelete(id)
```

---

# 🧠 Mongoose Methods I Learned

This was one of the most useful parts of this practice.

```js
Product.create(data);

Product.find({});

Product.findById(id);

Product.findByIdAndUpdate(id, data);

Product.findByIdAndDelete(id);
```

Before learning these methods, I was more familiar with basic MongoDB operations where I had to manually create filters and queries.

For example:

```js
collection.deleteOne({
    _id: id
});
```

With Mongoose, I can use:

```js
Product.findByIdAndDelete(id);
```

This makes common operations much easier to read and write. 🚀

---

# 📊 API Overview

|   Method  | Endpoint            | Operation | Mongoose Method               |
| :-------: | ------------------- | --------- | ----------------------------- |
|  🟢 POST  | `/api/products`     | Create    | `Product.create()`            |
|   🔵 GET  | `/api/products`     | Read all  | `Product.find()`              |
|   🔎 GET  | `/api/products/:id` | Read one  | `Product.findById()`          |
|   🟠 PUT  | `/api/products/:id` | Update    | `Product.findByIdAndUpdate()` |
| 🔴 DELETE | `/api/products/:id` | Delete    | `Product.findByIdAndDelete()` |

---

# 🧪 Testing

I tested the API endpoints using **Postman**.

The basic flow was:

```text
Create Product
      ↓
Get Products
      ↓
Get Product by ID
      ↓
Update Product
      ↓
Delete Product
```

---

# 💡 What I Understand Better Now

This project helped me understand the relationship between the different parts of a backend:

```text
                 CLIENT
                   │
                   ▼
              EXPRESS.JS
                   │
                   ▼
              API ROUTES
                   │
                   ▼
               MONGOOSE
                   │
                   ▼
               MONGODB
                   │
                   ▼
                DATABASE
```

Express handles the requests.

Mongoose handles the interaction between my application and MongoDB.

MongoDB stores the actual data.

---

# 📈 My Learning Progress

```text
Node.js              ████████████████████ 100%
Express.js            ████████████████████ 100%
REST API              ████████████████████ 100%
MongoDB Basics        ████████████████████ 100%
Mongoose Basics       ████████████████████ 100%
CRUD Operations       ████████████████████ 100%
Environment Variables ████████████████████ 100%
```

This doesn't mean I know everything about these technologies.

It means I completed this **basic CRUD practice** and now have a better understanding of how these pieces work together. 💪

---

# 🚀 Next Step

This project gave me a basic understanding of building APIs with:

**Node.js + Express + MongoDB + Mongoose**

Now I can move toward more real-world backend concepts such as:

* 🔐 Authentication
* 👤 Authorization
* 🛡️ Protected routes
* ✅ Validation
* ❌ Better error handling
* 🔍 Filtering
* 📄 Pagination
* 🔎 Searching
* 📦 More complex MongoDB queries
* 🏗️ Better project architecture

---

## ⭐ Final Note

This was a small project, but it was an important step in my backend learning journey.

I started with:

```text
npm init -y
```

and ended with a working:

```text
REST API
   +
MongoDB
   +
Mongoose
   +
CRUD
```

One step at a time. 🚀

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:00D9FF,100:7C3AED&height=120&section=footer" />
</p>

<p align="center">
  <b>Built while learning backend development 💻🔥</b>
</p>
