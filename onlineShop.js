class OnlineShop {
  constructor(warehouseSpace) {
    this.warehouseSpace = warehouseSpace;
    this.products = [];
    this.sales = [];
    this.counter = 0;
  }

  loadingStore(product, quantity, spaceRequired) {
    if (this.warehouseSpace < spaceRequired) {
      throw new Error(`Not enough space in the warehouse.`);
    }
    let currentProduct = {
      product,
      quantity,
    };
    this.warehouseSpace -= spaceRequired;
    this.products.push(currentProduct);
    return `The ${product} has been successfully delivered in the warehouse.`;
  }
  quantityCheck(product, minimalQuantity) {
    let currentProduct = this.products.find((o) => o.product === product);

    if (!currentProduct) {
      throw new Error(`There is no ${product} in the warehouse.`);
    }

    if (minimalQuantity <= 0) {
      throw new Error("The quantity cannot be zero or negative.");
    }
    if (minimalQuantity <= currentProduct.quantity) {
      return `You have enough from product ${product}.`;
    } else {
      let diff = minimalQuantity - currentProduct.quantity;
      currentProduct.quantity = minimalQuantity;
      return `You added ${diff} more from the ${product} products.`;
    }
  }

  sellProduct(product) {
    let currentProduct = this.products.find((o) => o.product === product);
    let buff = "";
    if (!currentProduct) {
      throw new Error(`There is no ${product} in the warehouse.`);
    } else {
      this.counter += 1;
      currentProduct.quantity -= 1;

      buff += `The ${product} has been successfully sold.`;
    }
    return buff;
  }
  revision() {
    let result = [];
    if (this.counter === 0) {
      return `There are no sales today!`;
    } else {
      result.push(`You sold ${this.counter} products today!`);

      result.push(`Products in the warehouse:`);
      this.products.map((x) =>
        result.push(`${x.product}-${x.quantity} more left`)
      );
      return result.join("\n");
    }
  }
}

const myOnlineShop = new OnlineShop(500);

console.log(myOnlineShop.loadingStore("headphones", 10, 200));

console.log(myOnlineShop.loadingStore("laptop", 5, 200));

console.log(myOnlineShop.quantityCheck("headphones", 10));

console.log(myOnlineShop.quantityCheck("laptop", 10));

console.log(myOnlineShop.quantityCheck("TV", 40));



