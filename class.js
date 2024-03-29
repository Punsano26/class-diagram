class Customer {
  orders = [];
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
  addOrder(order) {
    this.orders.push(order);
  }
}

class Order {
  payment = null;
  OrderDetails = [];
  constructor(date, status) {
    this.date = date;
    this.status = status;
  }
  calcSubTotal() {
    return this.OrderDetails.reduce(
      (total, orderDetail) => total + orderDetail.calcSubTotal(),
      0
    );
  }
  calcTax() {
    let tax = 0;
    for (let i = 0; i < this.OrderDetails.length; i++) {
      tax += this.OrderDetails[i].calcTax();
    }
    return tax;
  }
  calcTotal() {
    return this.calcSubTotal() + this.calcTax();
  }
  calcToTalWeight() {
    let weight = 0;
    for (let i = 0; i < this.OrderDetails.length; i++) {
      weight += this.OrderDetails[i].calcToTalWeight();
    }
    return weight;
  }
  addPayment(payment) {
    this.payment = payment;
  }
  addOrderDetail(orderdetail) {
    this.OrderDetails.push(orderdetail);
  }
  printDetail() {
    for (let i = 0; i < this.OrderDetails.length; i++) {
      console.log(
        "ลำดับที่ " + (i + 1) + " " + this.OrderDetails[i].getDetail()
      );
    }
    console.log(" รวมทั้งหมด " + this.calcTotal() + " บาท");
    this.payment.printDetail();
  }
}

class OrderDetail {
  item = null;
  constructor(quantity, taxStatus) {
    this.quantity = quantity;
    this.taxStatus = taxStatus;
  }
  calcSubTotal() {
    return this.item.getPriceForQuantity(this.quantity) + this.calcTax();
  }
  calcWeight() {
    return this.item.shippingWeight;
  }
  calcTax() {
    return this.item.getTax(this.taxStatus);
  }
  addItem(item) {
    this.item = item;
  }
  getDetail() {
    return (
      this.item.description +
      " จำนวน " +
      this.quantity +
      " รายการ " +
      " ราคา " +
      this.calcSubTotal() +
      " บาท "
    );
  }
}

class Item {
  inStock = true;
  constructor(shippingWeight, description, price) {
    this.shippingWeight = shippingWeight;
    this.description = description;
    this.price = price;
  }
  setInStock(status) {
    this.inStock = status;
  }
  getPriceForQuantity(quantity) {
    return this.price * quantity;
  }
  getTax(taxStatus) {
    if (taxStatus === "tax in cluded") {
      return 0;
    } else {
      return this.price * 0.07;
    }
  }
  inStock() {
    return this.inStock;
  }
}

class Payment {
  constructor(amount) {
    this.amount = amount;
  }
  printDetail(){
    console.log("ชำระด้วย...")
  }
}

class Cash extends Payment {
  constructor(amount, cashTendered) {
    super(amount);
    this.cashTendered = cashTendered;
  }
  printDetail(){
    console.log("ชำระด้วยเงินสด จำนวน" + this.amount + " บาท");
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
  printDetail(){
    console.log("ชำระด้วยบัตรเครดิต จำนวน" + this.amount + " บาท");
  }
}

class Credit extends Payment {
  constructor(amount, number, type, expDate) {
    super(amount);
    this.number = number;
    this.type = type;
    this.expDate = expDate;
  }
  printDetail(){
    console.log("ชำระด้วยเครดิต จำนวน" + this.amount + " บาท");
  }
  authorized() {
    console.log("200");
  }
}

const main = () => {
  let customer1 = new Customer("Punsan Somkla", "12 M.5");
  let customer2 = new Customer("OOO OOO", "LA");

  //Product Item
  const item1 = new Item(0.3, "ออลอินวันบักเก็ต", 299);
  const item2 = new Item(0.1, "ป๊อปบอมบ์แซ่บ", 299);
  const item3 = new Item(0.4, "เดอะบล็อกซ์ ออลสตาร์", 300);
  const item4 = new Item(0.3, "ชิคแอนด์แชร์ ทีมนักเก็ต", 299);
  const item5 = new Item(0.3, "ข้าวโบข้าวไก่กรอบแกงเขียวหวาน เคเอฟซี", 89);
  const item6 = new Item(0.9, "chicken koki", 25);

  //create order
  const order1 = new Order("8/01/2567", "In process");

  //add order to a customer
  customer1.addOrder(order1);
  customer2.addOrder(order1);

  //create order detail
  const orderdetail1 = new OrderDetail(5, "tax in cluded");
  orderdetail1.addItem(item2);
  const orderdetail2 = new OrderDetail(2, "tax in cluded");
  orderdetail2.addItem(item5);

  //add order detail to an order
  order1.addOrderDetail(orderdetail1);
  order1.addOrderDetail(orderdetail2);

 

  //###################################################################################
  //create order

  const order2 = new Order("9/01/2567", "In process");

  //add order to a customer

  customer1.addOrder(order2);

  //create order detail
  const orderdetail3 = new OrderDetail(5, "tax notin cluded");
  orderdetail3.addItem(item1);
  const orderdetail4 = new OrderDetail(2, "tax notin cluded");
  orderdetail4.addItem(item4);
  const orderdetail5 = new OrderDetail(2, "tax notin cluded");
  orderdetail5.addItem(item5);

  //add order detail to an order
  order2.addOrderDetail(orderdetail3);
  order2.addOrderDetail(orderdetail4);
  order2.addOrderDetail(orderdetail5);

  //###################################################################################
   //payment
   const cash = new Cash(order1.calcTotal(), "");
   customer1.orders[0].addPayment(cash);
 
   const credit = new Credit(
     order2.calcTotal(),
     "1234567895",
     "credit",
     "10/24"
   );
   customer1.orders[1].addPayment(credit);

  //Display
  console.log("ชื่อ : " + customer1.name);
  console.log("จำนวนคำสั่ง : " + customer1.orders.length);
  for (let i = 0; i < customer1.orders.length; i++) {
    console.log("คำสั่งซื้อที่ : " + (i + 1));
    customer1.orders[i].printDetail();

  }
};

main();

// const oldmain = () => {
//   let customer1 = new Customer("Punsan Somkla", "12 M.5");
//   let customer2 = new Customer("OOO OOO", "LA");

//   //Product Item
//   const item1 = new Item(0.3, "ออลอินวันบักเก็ต", 299);
//   const item2 = new Item(0.1, "ป๊อปบอมบ์แซ่บ", 299);
//   const item3 = new Item(0.4, "เดอะบล็อกซ์ ออลสตาร์", 300);
//   const item4 = new Item(0.3, "ชิคแอนด์แชร์ ทีมนักเก็ต", 299);
//   const item5 = new Item(0.3, "ข้าวโบข้าวไก่กรอบแกงเขียวหวาน เคเอฟซี", 89);
//   const item6 = new Item(0.9, "chicken koki", 25);

//   //create order
//   const order1 = new Order("8/01/2567", "In process");

//   //add order to a customer
//   customer1.addOrder(order1);
//   customer2.addOrder(order1);

//   //create order detail
//   const orderdetail1 = new OrderDetail(5, "tax in cluded");
//   orderdetail1.addItem(item2);
//   const orderdetail2 = new OrderDetail(2, "tax in cluded");
//   orderdetail2.addItem(item5);

//   //add order detail to an order
//   order1.addOrderDetail(orderdetail1);
//   order1.addOrderDetail(orderdetail2);

//   //###################################################################################
//   //create order

//   const order2 = new Order("9/01/2567", "In process");

//   //add order to a customer

//   customer1.addOrder(order2);

//   //create order detail
//   const orderdetail3 = new OrderDetail(5, "tax in cluded");
//   orderdetail3.addItem(item1);
//   const orderdetail4 = new OrderDetail(2, "tax in cluded");
//   orderdetail4.addItem(item4);
//   const orderdetail5 = new OrderDetail(2, "tax in cluded");
//   orderdetail5.addItem(item5);

//   //add order detail to an order
//   order2.addOrderDetail(orderdetail3);
//   order2.addOrderDetail(orderdetail4);
//   order2.addOrderDetail(orderdetail5);

//   //###################################################################################
//   console.log("ชื่อ: " + customer2.name);
//   console.log("จำนวนคำสั่งซื้อ : " + customer2.orders.length);
//   for (let i = 0; i < customer2.orders.length; i++) {
//     console.log("คำสั่งซื้อที่ :" + (i + 1));
//     let total = 0;
//     for (let k = 0; k < customer2.orders[i].OrderDetails.length; k++) {
//       const item = customer2.orders[i].OrderDetails[k].item;
//       const quantity = customer2.orders[i].OrderDetails[k].quantity;
//       const subTotal = quantity * item.price;
//       total += subTotal;
//       console.log(
//         "ลำดับที่ " +
//           (k + 1) +
//           " " +
//           item.description +
//           " จำนวน " +
//           quantity +
//           " รายการ " +
//           " ราคา " +
//           subTotal +
//           " บาท "
//       );
//     }
//     console.log("รวมทั้งหมด " + total + " บาท");
//   }
//   console.log(
//     "--------------------------------------------------------------------"
//   );

//   console.log("ชื่อ: " + customer1.name);
//   console.log("จำนวนคำสั่งซื้อ : " + customer1.orders.length);
//   for (let i = 0; i < customer1.orders.length; i++) {
//     console.log("คำสั่งซื้อที่ :" + (i + 1));
//     let total = 0;
//     for (let k = 0; k < customer1.orders[i].OrderDetails.length; k++) {
//       const item = customer1.orders[i].OrderDetails[k].item;
//       const quantity = customer1.orders[i].OrderDetails[k].quantity;
//       const subTotal = quantity * item.price;
//       total += subTotal;
//       console.log(
//         "ลำดับที่ " +
//           (k + 1) +
//           " " +
//           item.description +
//           " จำนวน " +
//           quantity +
//           " รายการ " +
//           " ราคา " +
//           subTotal +
//           " บาท "
//       );
//     }
//     console.log(" รวมทั้งหมด " + total + " บาท");
//   }
// };

// oldmain();

//การบ้าน
//   const main = () => {
//     let customer1 = new Customer("Punsan Somkla", "12 M.5");
//     let customer2 = new Customer("OOO OOO", "LA");

//     //Product Item
//     const item1 = new Item(0.3, "ออลอินวันบักเก็ต", 299);
//     const item2 = new Item(0.1, "ป๊อปบอมบ์แซ่บ", 299);
//     const item3 = new Item(0.4, "เดอะบล็อกซ์ ออลสตาร์", 300);
//     const item4 = new Item(0.3, "ชิคแอนด์แชร์ ทีมนักเก็ต", 299);
//     const item5 = new Item(0.3, "ข้าวโบข้าวไก่กรอบแกงเขียวหวาน เคเอฟซี", 89);
//     const item6 = new Item(0.9, "chicken koki", 25);
//     //create order
//     const order1 = new Order("8/01/2567", "In process");

//     //add order to a customer
//     customer1.addOrder(order1);
//     customer2.addOrder(order1);

//     //create order detail
//     const orderdetail1 = new OrderDetail(5, "tax in cluded");
//     orderdetail1.addItem(item2);
//     const orderdetail2 = new OrderDetail(2, "tax in cluded");
//     orderdetail2.addItem(item5);

//     //add order detail to an order
//     order1.addOrderDetail(orderdetail1);
//     order1.addOrderDetail(orderdetail2);

//       //###################################################################################
//       //create order

//       const order2 = new Order("9/01/2567", "In process");

//       //add order to a customer

//       customer1.addOrder(order2);

//       //create order detail
//       const orderdetail3 = new OrderDetail(5, "tax in cluded");
//       orderdetail3.addItem(item1);
//       const orderdetail4 = new OrderDetail(2, "tax in cluded");
//       orderdetail4.addItem(item4);
//       const orderdetail5 = new OrderDetail(2, "tax in cluded");
//       orderdetail5.addItem(item5);

//       //add order detail to an order
//       order2.addOrderDetail(orderdetail3);
//       order2.addOrderDetail(orderdetail4);
//       order2.addOrderDetail(orderdetail5);

//       //###################################################################################

//       console.log("ชื่อ: " + customer2.name);
//       console.log("จำนวนคำสั่งซื้อ : " + customer1.orders.length);
//       for (let i = 0; i < customer2.orders.length; i++) {
//       console.log("คำสั่งซื้อที่ :" + (i + 1));
//        for (let k = 0; k < customer2.orders[i].OrderDetails.length; k++) {
//         console.log(
//           "ลำดับที่ " +
//             (k + 1) +
//             " " +
//             customer2.orders[i].OrderDetails[k].item.description +
//             " จำนวน " +
//             customer2.orders[i].OrderDetails[k].quantity +
//             " รายการ " +
//             " ราคา " +
//             customer2.orders[i].OrderDetails[k].calcSubTotal() + " บาท"
//         );
//        }
//        console.log("ราคามรวมทั้งหมด "+customer2.orders[i].calcTotal()+" บาท");
//     }

//   }

// main();
