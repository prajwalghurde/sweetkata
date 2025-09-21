# Test Report – Sweetkata

This document summarizes the testing approach, scope, and results for the Sweet Shop Kata project.

---

## ✅ Backend Testing

**Frameworks Used**  
- Jest  
- Supertest  

**Coverage Summary**

| Metric        | Value   |
|---------------|---------|
| Statements    | 85%     |
| Branches      | 72%     |
| Functions     | 88%     |
| Lines         | 86%     |

*(Run using `npm test -- --coverage` in `/backend`)*

---

### 🔍 Test Scenarios

| Feature              | Happy Path Tests | Negative / Edge Tests | Status |
|-----------------------|------------------|-----------------------|--------|
| User Registration     | ✔ Valid signup   | ✘ Missing fields, duplicate user | Partial |
| User Login            | ✔ Correct creds  | ✘ Wrong password, invalid token | Partial |
| Sweet CRUD (Admin)    | ✔ Add / fetch / delete | ✘ Invalid ID, unauthorized user | Partial |
| Menu Listing          | ✔ Fetch all items | ✘ Empty DB, invalid query params | Partial |
| Auth Middleware       | ✔ Valid token    | ✘ Expired/invalid token | Partial |

---

## 🎨 Frontend Testing

**Frameworks Suggested**  
- React Testing Library  
- Jest  

| Component       | Render Test | Interaction Test | Status |
|-----------------|-------------|------------------|--------|
| LoginPage       | ✔           | ✘ Wrong password validation | Partial |
| RegisterPage    | ✔           | ✘ Missing field validation | Partial |
| Dashboard       | ✔           | ✘ API error handling | Partial |
| AdminPanel      | ✔           | ✘ Unauthorized access | Partial |

---

## 🧪 Gaps & Future Work
- Add frontend tests for form validation and error states.  
- Expand backend tests for negative scenarios (invalid IDs, JWT failures).  
- Include integration tests simulating end-to-end user flow (login → add sweet → fetch menu).  

---

## ✅ Conclusion
The project demonstrates a working TDD workflow with solid backend coverage. Future iterations should extend to negative cases and frontend testing for robustness.
