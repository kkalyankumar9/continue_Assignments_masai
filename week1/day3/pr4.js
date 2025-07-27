const checkout = {
  items: [],
  total: 0,

  addItem(item) {
    const price = parseFloat(item.price);

    if (isNaN(price)) {
      console.log("Invalid price.");
      return;
    }

    item.price = price; // Coerce to number
    this.items.push(item);
    this.total += price;
  },

  getTotal() {
    return `Total: $${this.total.toFixed(2)}`;
  }
};

// Test Cases
checkout.addItem({ name: "Coffee Maker", price: "99.95" }); // string price
checkout.addItem({ name: "Milk", price: 3.50 });            // number price

console.log(checkout.getTotal()); // Output: Total: $103.45
