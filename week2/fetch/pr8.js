async function fetchData() {
  try {
    let res = await fetch(`https://fakestoreapi.com/products`);
    res = await res.json();

    // List of Products:
    let products=res.forEach((product, index) => {
        console.log(`${index + 1}. ${product.title} - $${product.price}`);
        });
  
    let priceData = res.map((product) => product.price);
 
    console.log("Total Price:", sumPrice(priceData),);
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
}
function sumPrice(prices) {
  return prices.reduce((acc, cur) => acc + cur, 0);
}
fetchData();
