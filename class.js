class Customer {
  orders = [];
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
  addOrder(order){
    this.orders.push(order);
  }
}

class Order {
  payment=null;
  OrderDetails=null;
  constructor(date, status) {
    this.date = date;
    this.status = status;
  }
  calcSubTotal() {
    console.log("say-hello");
  }
  calcTax() {
    console.log("say-hi");
  }
  calcTotal() {
    console.log("say-ho");
  }
  calcToTalWeight() {
    console.log("say-hey");
  }
  addPatment(payment) {
    this.payment = payment;
  } 
  addOrderDetail(orderdetail){
    this.orderdetails.push(orderdetail);
  }
}

class OrderDetail {
  item = null;
  constructor(quantity, taxStatus) {
    this.quantity = quantity;
    this.taxStatus = taxStatus;
  }
  calcSubTotal() {
    console.log("say-yo");
  }
  calcWeight() {
    console.log("plane");
  }
  calcTax() {
    console.log("230");
  }
  addItem(item) {
    this.item = item;
  }
}

class Item {
  constructor(shippingWeight, description, price) {
    this.shippingWeight = shippingWeight;
    this.description = description;
    this.price = price;
  }
  getPriceForQuantity() {
    console.log("20");
  }
  getTax() {
    console.log("40");
  }
  inStock() {
    console.log("say");
  }
}

class Payment {
  constructor(amount) {
    this.amount = amount;
  }
}

class Cash extends Payment {
  constructor(amount, cashTendered) {
    super(amount);
    this.cashTendered = cashTendered;
  }
}
class Check extends Payment {
  constructor(amount, name, bankID) {
    super(amount);
    this.name = name;
    this.bankID = bankID;
  }
  authorized() {
    console.log("see");
  }
}

class Credit extends Payment {
  constructor(amount, number, type, expDate) {
    super(amount);
    this.number = number;
    this.type = type;
    this.expDate = expDate;
  }
  authorized() {
    console.log("200");
  }
}
