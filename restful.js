const express = require("express");
const app = express();
app.use(express.json());

let products = [
    {
        "id": "001",
        "product": "Laptop",
        "company": "hp"
    },
    {
        "id": "002",
        "product": "Smartphone",
        "company": "Samsung"
    },
    {
        "id": "003",
        "product": "Headphones",
        "company": "Sony"
    },
    {
        "id": "004",
        "product": "Tablet",
        "company": "Apple"
    },
    {
        "id": "005",
        "product": "Camera",
        "company": "Canon"
    },
    {
        "id": "006",
        "product": "TV",
        "company": "LG"
    },
    {
        "id": "007",
        "product": "Gaming Console",
        "company": "Microsoft"
    },
    {
        "id": "008",
        "product": "Smartwatch",
        "company": "Fitbit"
    },
    {
        "id": "009",
        "product": "Router",
        "company": "Cisco"
    },
    {
        "id": "010",
        "product": "Printer",
        "company": "Epson"
    }
];

// Function to find a product by ID
function findProductById(id) {
    return products.find(product => product.id === id);
}

// Function to generate a new product ID
function generateProductId() {
    const id = (products.length + 1).toString().padStart(3, '0');
    if (products.find(product => product.id === id)) {
        // If the generated ID already exists, recursively call the function to generate a new one
        return generateProductId();
    }
    return id;
}


// Get all products
app.get("/products", function (req, res) {
    res.json(products);
});

// Get a product by ID
app.get("/products/:id", function (req, res) {
    const product = findProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

// Create a new product
app.post("/products", function (req, res) {
    const { product, company } = req.body;
    const id = generateProductId();
    const newProduct = { id, product, company };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update a product by ID
app.put("/products/:id", function (req, res) {
    const id = req.params.id;
    const { product, company } = req.body;
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
        if (product) products[index].product = product;
        if (company) products[index].company = company;
        res.json(products[index]);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

// Delete a product by ID
app.delete("/products/:id", function (req, res) {
    const id = req.params.id;
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

app.listen(5000, function () {
    console.log("Server is running on port 4000");
});
