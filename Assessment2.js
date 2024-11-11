// Assessment 2


// Part 1: Basic MongoDB Commands and Queries

// Objective: Understand and demonstrate basic CRUD operations on collections with relationships.

// Instructions: Write MongoDB scripts for the following tasks:

// 1. Create the Collections and Insert Data:

// o Create two collections: customers and orders.

// o Insert 5 customer documents into the customers collection.

// task 1
db.customers.insertMany([
    { name: "John Doe", email: "johndoe@example.com", address: { street: "123 Main St", city: "Springfield", zipcode: "12345" }, phone: "555-1234", registration_date: new Date("2023-01-01T12:00:00Z") },
    { name: "Jane Smith", email: "janesmith@example.com", address: { street: "456 Elm St", city: "Shelbyville", zipcode: "54321" }, phone: "555-5678", registration_date: new Date("2023-02-15T12:00:00Z") },
    { name: "Alice Johnson", email: "alicej@example.com", address: { street: "789 Oak St", city: "Springfield", zipcode: "12345" }, phone: "555-8765", registration_date: new Date("2023-03-10T12:00:00Z") },
    { name: "Bob Brown", email: "bobbrown@example.com", address: { street: "321 Pine St", city: "Shelbyville", zipcode: "54321" }, phone: "555-4321", registration_date: new Date("2023-04-20T12:00:00Z") },
    { name: "Carol White", email: "carolwhite@example.com", address: { street: "654 Maple St", city: "Springfield", zipcode: "12345" }, phone: "555-6789", registration_date: new Date("2023-05-05T12:00:00Z") }
  ]);
  
// to find the customer id 
db.customers.findOne({ name: "John Doe" })._id
db.customers.findOne({ name: "Jane Smith" })._id
db.customers.findOne({ name: "Alice Johnson" })._id
db.customers.findOne({ name: "Bob Brown" })._id
db.customers.findOne({ name: "Carol White" })._id


// o Insert 5 order documents into the orders collection, each linked to a customer using the customer_id field (the _id of a customer document).
  db.orders.insertMany([
    { 
      _id: ObjectId(), 
      order_id: "ORD123456", 
      customer_id: ObjectId('67320c549ec744648a0d8190'),  // John Doe's ObjectId
      order_date: "2023-05-15", 
      status: "shipped", 
      items: [
        { product_name: "Laptop", quantity: 1, price: 1500 }, 
        { product_name: "Mouse", quantity: 2, price: 25 }
      ], 
      total_value: 1550 
    },
    { 
      _id: ObjectId(), 
      order_id: "ORD123457", 
      customer_id: ObjectId('67320c549ec744648a0d8191'),  
      order_date: "2023-06-01", 
      status: "pending", 
      items: [
        { product_name: "Tablet", quantity: 1, price: 300 }
      ], 
      total_value: 300 
    },
    { 
      _id: ObjectId(), 
      order_id: "ORD123458", 
      customer_id: ObjectId('67320c549ec744648a0d8192'),  
      order_date: "2023-06-10", 
      status: "delivered", 
      items: [
        { product_name: "Keyboard", quantity: 1, price: 100 },
        { product_name: "Monitor", quantity: 1, price: 200 }
      ], 
      total_value: 300 
    },
    { 
      _id: ObjectId(), 
      order_id: "ORD123459", 
      customer_id: ObjectId('67320c549ec744648a0d8193'), 
      order_date: "2023-06-20", 
      status: "shipped", 
      items: [
        { product_name: "Smartphone", quantity: 1, price: 800 }
      ], 
      total_value: 800 
    },
    { 
      _id: ObjectId(), 
      order_id: "ORD123460", 
      customer_id: ObjectId('67320c549ec744648a0d8194'), 
      status: "processing", 
      items: [
        { product_name: "Headphones", quantity: 1, price: 50 },
        { product_name: "Charger", quantity: 1, price: 20 }
      ], 
      total_value: 70 
    }
  ]);
  

//   2. Find Orders for a Specific Customer:

// o Write a script to find all orders placed by a customer with the name “John Doe”. Use the customer’s _id to query the orders collection.
db.orders.find({ customer_id: ObjectId('67320c549ec744648a0d8190') });

// 3. Find the Customer for a Specific Order:

// o Write a script to find the customer information for a specific order (e.g., order_id = “ORD123456”).
db.customers.findOne({ _id: ObjectId('67320c549ec744648a0d8190') });

// 4. Update Order Status:

// o Write a script to update the status of an order to “delivered” where the order_id is “ORD123456”.
db.orders.updateOne(
    { order_id: "ORD123456" },
    { $set: { status: "delivered" } }
  );

//   5. Delete an Order:

//   o Write a script to delete an order where the order_id is “ORD123456”.
db.orders.deleteOne({ order_id: "ORD123456" });
// Part 2: Aggregation Pipeline

// Objective: Use MongoDB’s aggregation framework to perform more advanced queries, including working with related data across collections.

// Instructions: Use the aggregation framework to solve the following tasks:

// 1. Calculate Total Value of All Orders by Customer:

// o Write a script to calculate the total value of all orders for each customer. This should return each customer’s name and the total order value.
db.orders.aggregate([
    { $group: { _id: "$customer_id", total_spent: { $sum: "$total_value" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", total_spent: 1 } }
  ]);
//   2. Group Orders by Status:

//   o Write a script to group orders by their status (e.g., “shipped”, “delivered”, etc.) and count how many orders are in each status.  
db.orders.aggregate([
    { $group: { _id: "$status", order_count: { $sum: 1 } } }
  ]);
//   3. List Customers with Their Recent Orders:

//   o Write a script to find each customer and their most recent order. Include customer information such as name, email, and order details (e.g., order_id, total_value).  
db.orders.aggregate([
    { $sort: { order_date: -1 } },
    { $group: { _id: "$customer_id", recent_order: { $first: "$$ROOT" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", email: "$customer.email", order_id: "$recent_order.order_id", total_value: "$recent_order.total_value" } }
  ]);
//   4. Find the Most Expensive Order by Customer:

//   o Write a script to find the most expensive order for each customer. Return the customer’s name and the details of their most expensive order (e.g., order_id, total_value). 
db.orders.aggregate([
    { $sort: { total_value: -1 } },
    { $group: { _id: "$customer_id", most_expensive_order: { $first: "$$ROOT" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", order_id: "$most_expensive_order.order_id", total_value: "$most_expensive_order.total_value" } }
  ]);
//   Part 3: Real-World Scenario with Relationships

//   Objective: Apply MongoDB operations to a real-world problem involving two related collections.
  
//   Scenario: You are working as a MongoDB developer for an e-commerce platform. The system needs to track customer orders, including the customer’s name, email, and address, as well as the items they ordered.
  
//   1. Find All Customers Who Placed Orders in the Last Month:
  
//   o Write a script to find all customers who have placed at least one order in the last 30 days. Return the customer name, email, and the order date for their most recent order.  
db.orders.aggregate([
    { $match: { order_date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } } },
    { $group: { _id: "$customer_id", recent_order: { $first: "$$ROOT" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", email: "$customer.email", order_date: "$recent_order.order_date" } }
  ]);
//   2. Find All Products Ordered by a Specific Customer:

//   o Write a script to find all distinct products ordered by a customer with the name “John Doe”. Include the product name and the total quantity ordered.  
db.orders.aggregate([
    { $match: { customer_id: ObjectId('67320c549ec744648a0d8190') } },
    { $unwind: "$items" },
    { $group: { _id: "$items.product_name", total_quantity: { $sum: "$items.quantity" } } }
  ]);
//   3. Find the Top 3 Customers with the Most Expensive Total Orders:

//   o Write a script to find the top 3 customers who have spent the most on orders. Sort the results by total order value in descending order.  
db.orders.aggregate([
    { $group: { _id: "$customer_id", total_spent: { $sum: "$total_value" } } },
    { $sort: { total_spent: -1 } },
    { $limit: 3 },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", total_spent: 1 } }
  ]);
//   4. Add a New Order for an Existing Customer:

// o Write a script to add a new order for a customer with the name “Jane Smith”. The order should include at least two items, such as “Smartphone” and “Headphones”.
db.orders.insertOne({
    order_id: "ORD123461",
    customer_id: ObjectId("67320c549ec744648a0d8191"),
    order_date: new Date("2023-08-01T14:00:00Z"),
    status: "pending",
    items: [
      { product_name: "Smartphone", quantity: 1, price: 700 },
      { product_name: "Headphones", quantity: 2, price: 50 }
    ],
    total_value: 800
  });
//   Part 4: Bonus Challenge

//   Objective: Demonstrate the ability to work with advanced MongoDB operations and complex relationships.
  
//   1. Find Customers Who Have Not Placed Orders:
  
//   o Write a script to find all customers who have not placed any orders. Return the customer’s name and email.  
db.customers.aggregate([
    { $lookup: { from: "orders", localField: "_id", foreignField: "customer_id", as: "orders" } },
    { $match: { "orders": { $size: 0 } } },
    { $project: { name: 1, email: 1 } }
  ]);
//   2. Calculate the Average Number of Items Ordered per Order:

//   o Write a script to calculate the average number of items ordered per order across all orders. The result should return the average number of items.  
db.orders.aggregate([
    { $group: { _id: "$status", order_count: { $sum: 1 } } }
  ]);
//   3. Join Customer and Order Data Using $lookup:

//   o Write a script using the $lookup aggregation operator to join data from the customers collection and the orders collection. Return customer name, email, order details (order_id, total_value), and order date.  
db.orders.aggregate([
    { $group: { _id: "$status", order_count: { $sum: 1 } } }
  ]);
  