import { test } from '@playwright/test';

/**
 * API Exploration: Test FakeStoreAPI endpoint
 * Purpose: Understand response structure before writing full test
 */
test('Explore FakeStoreAPI response structure', async ({ request }) => {
  const apiUrl = 'https://fakestoreapi.com/products/1';
  
  console.log('🔍 Testing API endpoint:', apiUrl);
  
  // Send GET request
  const response = await request.get(apiUrl);
  
  // Check status
  const status = response.status();
  console.log('📊 Response Status:', status);
  
  // Get response body
  const data = await response.json();
  console.log('📦 Response Body:', JSON.stringify(data, null, 2));
  
  // Check keys
  console.log('🔑 Response Keys:', Object.keys(data));
  
  // Check data types
  console.log('📋 Data Types:');
  Object.entries(data).forEach(([key, value]) => {
    console.log(`  - ${key}: ${typeof value} = ${value}`);
  });
});
