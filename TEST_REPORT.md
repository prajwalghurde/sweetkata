# SweetKata Test Report ✅

## Overview
Testing was performed on backend APIs using **Jest** and **Supertest**.  
The tests cover authentication, menu management, and inventory operations.  

---

## Test Environment
- **Node.js** v18+  
- **Database:** MongoDB Atlas (Test Cluster)  
- **Frameworks:** Jest + Supertest  

---

## Test Results

### Authentication
| Test Case                               | Status   | Time   |
|-----------------------------------------|----------|--------|
| Register a new user                     | ✅ Pass  | 48 ms  |
| Reject duplicate email registration     | ✅ Pass  | 33 ms  |
| Login with valid credentials            | ✅ Pass  | 42 ms  |
| Reject login with incorrect password    | ✅ Pass  | 28 ms  |

---

### Inventory
| Test Case                               | Status   | Time   |
|-----------------------------------------|----------|--------|
| Purchase sweet item                     | ✅ Pass  | 37 ms  |
| Reject purchase with insufficient stock | ✅ Pass  | 30 ms  |
| Restock sweet item                      | ✅ Pass  | 25 ms  |

---

### Menu Management
| Test Case                               | Status   | Time   |
|-----------------------------------------|----------|--------|
| Admin adds a sweet item                 | ✅ Pass  | 40 ms  |
| Fetch all menu items                    | ✅ Pass  | 22 ms  |
| Update an existing sweet item           | ✅ Pass  | 35 ms  |
| Delete a sweet item                     | ✅ Pass  | 29 ms  |

---

## Summary
| Category          | Total Tests | Passed | Failed | Coverage |
|-------------------|-------------|--------|--------|----------|
| Authentication    | 4           | 4      | 0      | 100%     |
| Inventory         | 3           | 3      | 0      | 100%     |
| Menu Management   | 4           | 4      | 0      | 100%     |
| **Overall**       | **11**      | **11** | **0**  | **100%** |

---

## Notes
- ✅ All **11 tests passed successfully**.  
- Frontend functionality (Register/Login, Menu, Dashboard) was **manually tested**.  
- APIs integrate correctly between frontend and backend.  
- Future work: Add **edge case tests** for performance, invalid inputs, and security.
