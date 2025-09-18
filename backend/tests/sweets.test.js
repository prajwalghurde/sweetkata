const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let adminToken;
let userToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await mongoose.connection.db.dropDatabase();

  // admin
  const adminPass = await bcrypt.hash("Admin123", 10);
  const admin = await User.create({ name: "Admin", email: "admin@test.com", password: adminPass, isAdmin: true });
  adminToken = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET);

  // user
  const userPass = await bcrypt.hash("User123", 10);
  const user = await User.create({ name: "User", email: "user@test.com", password: userPass, isAdmin: false });
  userToken = jwt.sign({ id: user._id, isAdmin: false }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweets API", () => {
  let sweetId;

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

  it("should fetch all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should search sweets by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Indian")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data[0].category).toBe("Indian");
  });

  it("should update a sweet (admin only)", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ price: 60 });

    expect(res.status).toBe(200);
    expect(res.body.data.price).toBe(60);
  });

  it("should delete a sweet (admin only)", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Sweet deleted");
  });
});
