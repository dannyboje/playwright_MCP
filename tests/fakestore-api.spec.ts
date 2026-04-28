import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

/**
 * API Test: FakeStore Product Endpoint
 * 
 * Scenario:
 * 1. Send GET request to https://fakestoreapi.com/products/1
 * 2. Verify response status is 200
 * 3. Validate response contains: id, title, price, category, description
 * 4. Validate data types using JSON Schema
 * 5. Log product title and price to console
 */

// Define JSON Schema for product response
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

test('GET /products/1 - Validate response structure and data types', async ({ request }) => {
  const apiEndpoint = 'https://fakestoreapi.com/products/1';
  const requiredKeys = ['id', 'title', 'price', 'category', 'description'];

  console.log('\n========== FakeStore API Test ==========');
  console.log('🔍 Endpoint:', apiEndpoint);
  console.log('📋 Required Keys:', requiredKeys.join(', '));

  // Step 1: Send GET request
  console.log('\n📤 Step 1: Sending GET request...');
  const response = await request.get(apiEndpoint);
  
  // Step 2: Verify response status is 200
  console.log('\n✅ Step 2: Verifying response status...');
  expect(response.status()).toBe(200);
  console.log(`✓ Status Code: ${response.status()}`);

  // Get response body
  const productData = await response.json();
  console.log('\n📦 Response Body:', JSON.stringify(productData, null, 2));

  // Step 3: Validate response contains required keys
  console.log('\n🔑 Step 3: Validating required keys...');
  for (const key of requiredKeys) {
    expect(productData).toHaveProperty(key);
    console.log(`✓ Key "${key}" exists`);
  }

  // Step 4: Validate data types using JSON Schema with Ajv
  console.log('\n📊 Step 4: Validating data types with JSON Schema...');
  const ajv = new Ajv();
  const validate = ajv.compile(productSchema);
  const isValid = validate(productData);

  if (isValid) {
    console.log('✓ JSON Schema validation passed');
  } else {
    console.log('✗ JSON Schema validation failed');
    console.log('Validation errors:', validate.errors);
  }
  expect(isValid).toBe(true);

  // Validate individual field types
  console.log('\n📝 Field Type Validation:');
  expect(typeof productData.id).toBe('number');
  console.log(`✓ id is number: ${productData.id}`);
  
  expect(typeof productData.title).toBe('string');
  console.log(`✓ title is string`);
  
  expect(typeof productData.price).toBe('number');
  console.log(`✓ price is number: ${productData.price}`);
  
  expect(typeof productData.category).toBe('string');
  console.log(`✓ category is string: ${productData.category}`);
  
  expect(typeof productData.description).toBe('string');
  console.log(`✓ description is string`);

  // Step 5: Log product title and price
  console.log('\n💼 Step 5: Product Information:');
  console.log(`📌 Title: ${productData.title}`);
  console.log(`💰 Price: $${productData.price}`);

  // Additional validation - check value ranges
  console.log('\n🎯 Additional Validations:');
  expect(productData.price).toBeGreaterThan(0);
  console.log(`✓ Price is greater than 0`);
  
  expect(productData.title.length).toBeGreaterThan(0);
  console.log(`✓ Title is not empty`);
  
  expect(productData.description.length).toBeGreaterThan(0);
  console.log(`✓ Description is not empty`);

  console.log('\n✅ All validations passed!');
  console.log('=========================================\n');
});

test('GET /products/1 - Complete response validation', async ({ request }) => {
  const apiEndpoint = 'https://fakestoreapi.com/products/1';

  console.log('\n========== Extended API Test ==========');

  // Send request
  const response = await request.get(apiEndpoint);
  const productData = await response.json();

  // Verify all required keys with meaningful assertions
  const requiredKeys = {
    id: 'numeric product identifier',
    title: 'product name',
    price: 'product cost',
    category: 'product category',
    description: 'product details'
  };

  console.log('\n🔬 Comprehensive Field Validation:');
  for (const [key, description] of Object.entries(requiredKeys)) {
    expect(productData[key]).toBeDefined();
    console.log(`✓ ${key} (${description}): ${productData[key]}`);
  }

  // Verify the response structure matches expected schema
  const ajv = new Ajv();
  const validate = ajv.compile(productSchema);
  expect(validate(productData)).toBe(true);
  console.log('\n✓ Response matches JSON Schema');

  // Log summary
  console.log('\n📊 Response Summary:');
  console.log(`- Product ID: ${productData.id}`);
  console.log(`- Product Title: ${productData.title}`);
  console.log(`- Product Price: $${productData.price}`);
  console.log(`- Category: ${productData.category}`);
  console.log(`- Rating: ${productData.rating?.rate}/5 (${productData.rating?.count} reviews)`);

  console.log('\n✅ Extended validation completed!');
  console.log('========================================\n');
});
