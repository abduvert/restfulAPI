document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();
    document.getElementById('createBtn').addEventListener('click', createProduct);
    document.getElementById('updateBtn').addEventListener('click', updateProduct);
    document.getElementById('deleteBtn').addEventListener('click', deleteProduct);
});

function fetchProducts() {
    fetch('http://localhost:4000/products')
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    })
    .catch(error => console.error('Error:', error));
}

function displayProducts(products) {
    const productDataDiv = document.getElementById('productData');
    productDataDiv.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `<b>ID:</b> ${product.id}, <b>Product:</b> ${product.product}, <b>Company:</b> ${product.company}`;
        productDataDiv.appendChild(productDiv);
    });
}

function createProduct() {
    // Implement create product functionality if needed
}

function updateProduct() {
    const id = document.getElementById('id').value;
    const product = document.getElementById('product').value;
    const company = document.getElementById('company').value;

    fetch(`http://localhost:4000/products/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product: product,
            company: company
        })
    })
    .then(response => response.json())
    .then(data => {
        fetchProducts(); // Fetch and display updated product list
    })
    .catch(error => console.error('Error:', error));
}

function deleteProduct() {
    // Implement delete product functionality if needed
}
