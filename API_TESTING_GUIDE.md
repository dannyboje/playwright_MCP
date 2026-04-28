# Playwright API Testing Guide

Complete API testing implementation using Playwright's `request` context with schema validation using Ajv.

## 📋 Overview

This guide demonstrates:
- ✅ Sending HTTP GET requests
- ✅ Verifying HTTP status codes
- ✅ Validating response structure
- ✅ Type validation using JSON Schema (Ajv)
- ✅ Comprehensive logging
- ✅ Data extraction and assertions

---

## 🏗️ Test Files

### 1. **api-exploration.spec.ts**
Initial exploration test to understand API response structure.

**Purpose:** Discover endpoint response before writing full tests

**Output:**
```
Response Status: 200
Response Keys: [id, title, price, description, category, image, rating]
Data Types:
  - id: number = 1
  - title: string = Fjallraven - Foldsack No. 1 Backpack...
  - price: number = 109.95
  - category: string = men's clothing
  - description: string = Your perfect pack for everyday use...
```

### 2. **fakestore-api.spec.ts**
Complete API test with comprehensive validation.

**Contains 2 tests:**
- Test 1: Validate response structure and data types
- Test 2: Complete response validation with extended checks

---

## 📊 Test Architecture

### Request Flow

```
┌──────────────────────┐
│ Test Starts          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Send GET Request                 │
│ https://fakestoreapi.com/...     │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Get Response & Parse JSON        │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Validate Status Code (200)       │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Check Required Keys              │
│ (id, title, price, category...)  │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Validate Data Types              │
│ (JSON Schema with Ajv)           │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Log Results to Console           │
│ Title & Price Extraction         │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Test Passes ✅                   │
└──────────────────────────────────┘
```

---

## 🔍 Detailed Test Breakdown

### Test 1: Response Structure & Data Type Validation

#### Step 1: Send GET Request
```typescript
const response = await request.get(apiEndpoint);
```
- Uses Playwright's built-in `request` context
- Makes HTTP GET request to FakeStore API
- Returns response object

#### Step 2: Verify Status Code
```typescript
expect(response.status()).toBe(200);
```
- Confirms successful HTTP response (200 OK)
- Logs: `✓ Status Code: 200`

#### Step 3: Validate Required Keys
```typescript
const requiredKeys = ['id', 'title', 'price', 'category', 'description'];
for (const key of requiredKeys) {
  expect(productData).toHaveProperty(key);
  console.log(`✓ Key "${key}" exists`);
}
```
- Verifies all 5 required fields are present
- Logs each key validation

#### Step 4: Data Type Validation with JSON Schema
```typescript
const ajv = new Ajv();
const validate = ajv.compile(productSchema);
const isValid = validate(productData);
expect(isValid).toBe(true);
```

**JSON Schema Definition:**
```typescript
const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string' },
    rating: {
      type: 'object',
      properties: {
        rate: { type: 'number' },
        count: { type: 'number' }
      }
    }
  },
  required: ['id', 'title', 'price', 'category', 'description'],
  additionalProperties: true
};
```

**Validates:**
- ✓ `id` is a number
- ✓ `title` is a string
- ✓ `price` is a number
- ✓ `category` is a string
- ✓ `description` is a string
- ✓ Response has required fields
- ✓ Additional properties allowed

#### Step 5: Extract & Log Data
```typescript
console.log(`📌 Title: ${productData.title}`);
console.log(`💰 Price: $${productData.price}`);
```

**Output:**
```
📌 Title: Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
💰 Price: $109.95
```

---

## 📦 Response Structure

### Actual API Response

```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest...",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | ✓ | Product identifier |
| `title` | string | ✓ | Product name |
| `price` | number | ✓ | Product cost |
| `category` | string | ✓ | Product category |
| `description` | string | ✓ | Product details |
| `image` | string | ✗ | Product image URL |
| `rating` | object | ✗ | Rating info (rate, count) |

---

## 🔧 Installation & Dependencies

### Install Ajv for Schema Validation
```bash
npm install --save-dev ajv
```

### Playwright (Already Installed)
```bash
npm list @playwright/test
```

---

## ▶️ Running Tests

### Run all API tests
```bash
npm test tests/fakestore-api.spec.ts
```

### Run specific test
```bash
npx playwright test tests/fakestore-api.spec.ts -g "Validate response structure"
```

### Run on specific browser
```bash
npx playwright test tests/fakestore-api.spec.ts --project=chromium
```

### Run with specific reporter
```bash
npx playwright test tests/fakestore-api.spec.ts --reporter=html
```

### View HTML report
```bash
npx playwright show-report
```

---

## 📊 Test Results

```
Running 2 tests using 2 workers

✅ GET /products/1 - Validate response structure and data types
   - Status Code: 200
   - All required keys present
   - JSON Schema validation passed
   - All data types validated
   - Product logged: Title, Price

✅ GET /products/1 - Complete response validation
   - All fields comprehensively validated
   - Response matches JSON Schema
   - Summary logged with rating

2 passed (1.5s)
```

---

## 🎓 Key Concepts

### 1. Request Context
Playwright's built-in API for making HTTP requests without a browser.

```typescript
const response = await request.get(url);
const response = await request.post(url, { data });
const response = await request.put(url, { data });
const response = await request.delete(url);
```

### 2. JSON Schema Validation
Ajv validates that response conforms to a schema.

```typescript
const ajv = new Ajv();
const validate = ajv.compile(schema);
const isValid = validate(data);
```

**Benefits:**
- ✅ Type safety
- ✅ Required field checking
- ✅ Format validation
- ✅ Reusable schemas

### 3. Async/Await
Clean asynchronous code execution.

```typescript
const response = await request.get(url);
const data = await response.json();
```

### 4. Logging
Comprehensive console logging for debugging.

```typescript
console.log(`📌 Title: ${title}`);
console.log(`💰 Price: $${price}`);
```

---

## 🚀 Advanced Features

### Custom Headers
```typescript
const response = await request.get(url, {
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  }
});
```

### Request Body
```typescript
const response = await request.post(url, {
  data: {
    name: 'John',
    email: 'john@example.com'
  }
});
```

### Response Headers
```typescript
const headers = response.headers();
console.log(headers['content-type']);
```

### Error Handling
```typescript
try {
  const response = await request.get(url);
  expect(response.ok()).toBeTruthy();
} catch (error) {
  console.error('API request failed:', error);
}
```

---

## ✅ Validation Checklist

- ✓ HTTP Status Code: 200
- ✓ Response Content-Type: application/json
- ✓ Required Fields Present: id, title, price, category, description
- ✓ Data Types Correct: number, string, object
- ✓ JSON Schema Valid: All properties match schema
- ✓ Value Ranges: price > 0, title/description not empty
- ✓ Product Information: Title and price logged
- ✓ Response Time: Acceptable (<1s)

---

## 🔗 Useful Resources

- **Playwright API Testing:** https://playwright.dev/docs/api-testing
- **Request Context:** https://playwright.dev/docs/api/class-apirequestcontext
- **Ajv JSON Schema:** https://ajv.js.org/
- **FakeStore API:** https://fakestoreapi.com/docs
- **HTTP Status Codes:** https://httpwg.org/specs/rfc7231.html#status.codes

---

## 📝 Summary

This API test implementation demonstrates:
- ✅ Modern API testing with Playwright
- ✅ Comprehensive validation strategies
- ✅ Schema-based validation
- ✅ Professional logging practices
- ✅ Maintainable, reusable test code

Perfect for integration testing and API verification! 🎯
