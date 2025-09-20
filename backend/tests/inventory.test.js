const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/User");
const Sweet = require("../src/models/Sweet");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let adminToken, userToken, sweetId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await mongoose.connection.db.dropDatabase();

  // Admin user
  const adminPass = await bcrypt.hash("Admin123", 10);
  const admin = await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: adminPass,
    isAdmin: true,
  });
  adminToken = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET);

  // Normal user
  const userPass = await bcrypt.hash("User123", 10);
  const user = await User.create({
    name: "User",
    email: "user@test.com",
    password: userPass,
    isAdmin: false,
  });
  userToken = jwt.sign({ id: user._id, isAdmin: false }, process.env.JWT_SECRET);

  // Create a sweet
  const sweet = await Sweet.create({ name: "Ladoo", category: "Indian", price: 50, quantity: 20 });
  sweetId = sweet._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Inventory API", () => {

  it("should allow user to purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.data.quantity).toBe(15); // 20 - 5
    expect(res.body.message).toBe("Purchase successful");
  });

  it("should not allow purchase more than stock", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 100 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Not enough stock");
  });

  it("should allow admin to restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 10 });

    expect(res.status).toBe(200);
    expect(res.body.data.quantity).toBe(25); // 15 + 10
    expect(res.body.message).toBe("Restocked successfully");
  });

  it("should forbid non-admin from restocking", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 10 });

    expect(res.status).toBe(403);
  });

});
