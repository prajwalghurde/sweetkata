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

  // Create admin user
  const adminPass = await bcrypt.hash("Admin123", 10);
  const admin = await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: adminPass,
    isAdmin: true,
  });
  adminToken = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET);

  // Create normal user
  const userPass = await bcrypt.hash("User123", 10);
  const user = await User.create({
    name: "User",
    email: "user@test.com",
    password: userPass,
    isAdmin: false,
  });
  userToken = jwt.sign({ id: user._id, isAdmin: false }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweets API - Full Tests", () => {

  // ----- CREATE SWEET -----
  it("should allow admin to add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Ladoo", category: "Indian", price: 50, quantity: 20 });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Ladoo");
    sweetId = res.body.data._id;
  });

  it("should forbid normal user from adding a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ name: "Barfi", category: "Indian", price: 40, quantity: 15 });

    expect(res.status).toBe(403);
  });

  // ----- READ SWEETS -----
  it("should fetch all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  // ----- SEARCH SWEETS -----
  it("should search sweets by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Indian")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data[0].category).toBe("Indian");
  });

  it("should search sweets by name and price range", async () => {
    const res = await request(app)
      .get(`/api/sweets/search?name=Ladoo&minPrice=40&maxPrice=60`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data[0].name).toBe("Ladoo");
  });

  // ----- UPDATE SWEET -----
  it("should allow admin to update a sweet", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ price: 60 });

    expect(res.status).toBe(200);
    expect(res.body.data.price).toBe(60);
  });

  it("should forbid normal user from updating a sweet", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ price: 70 });

    expect(res.status).toBe(403);
  });

  // ----- PURCHASE SWEET -----
  it("should allow user to purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.data.quantity).toBe(15);
  });

  it("should prevent purchase exceeding stock", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 100 });

    expect(res.status).toBe(400);
  });

  // ----- RESTOCK SWEET -----
  it("should allow admin to restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 10 });

    expect(res.status).toBe(200);
    expect(res.body.data.quantity).toBe(25);
  });

  it("should forbid non-admin from restocking", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 10 });

    expect(res.status).toBe(403);
  });

  // ----- DELETE SWEET -----
  it("should allow admin to delete a sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Sweet deleted");
  });

  it("should forbid normal user from deleting a sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

});
