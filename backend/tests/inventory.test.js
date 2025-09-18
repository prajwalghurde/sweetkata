const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const User = require("../src/models/User");
const Sweet = require("../src/models/Sweet");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let adminToken;
let userToken;
let sweetId;

beforeAll(async () => {

  await mongoose.connect(process.env.MONGO_URI);

  // Clear DB before tests
  await mongoose.connection.db.dropDatabase();

  // Create admin user
  const adminPass = await bcrypt.hash("Admin123", 10);
  const admin = await User.create({
    name: "Admin",
    email: "admin@shop.com",
    password: adminPass,
    isAdmin: true,
  });
  adminToken = jwt.sign(
    { id: admin._id, isAdmin: true },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Create normal user
  const userPass = await bcrypt.hash("User123", 10);
  const user = await User.create({
    name: "User",
    email: "user@shop.com",
    password: userPass,
    isAdmin: false,
  });
  userToken = jwt.sign(
    { id: user._id, isAdmin: false },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Add initial sweet
  const sweet = await Sweet.create({
    name: "Jalebi",
    category: "Indian",
    price: 20,
    quantity: 10,
  });
  sweetId = sweet._id.toString();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Inventory API", () => {
  it("should allow user to purchase a sweet and decrease stock", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 3 });

    expect(res.status).toBe(200);
    expect(res.body.data.quantity).toBe(7); 
  });

  it("should not allow purchase more than stock", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 20 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Insufficient stock");
  });

  it("should allow admin to restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.data.quantity).toBe(12); 
  });

  it("should forbid non-admin from restocking", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(403);
  });
});
