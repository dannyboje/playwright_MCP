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
  
  if (!response.ok()) {
    console.error(`❌ API request failed with status ${status}`);
    const responseText = await response.text();
    console.error('Response:', responseText.substring(0, 300));
    throw new Error(`API returned status ${status}`);
  }

  // Check content type
  const contentType = response.headers()['content-type'] || '';
  console.log('📄 Content-Type:', contentType);

  if (!contentType.includes('application/json')) {
    console.error(`❌ Expected JSON, got ${contentType}`);
    const responseText = await response.text();
    console.error('Response text:', responseText.substring(0, 300));
    throw new Error(`Expected JSON response, got ${contentType}`);
  }

  // Get response body with error handling
  let data;
  try {
    data = await response.json();
  } catch (error) {
    console.error('Failed to parse JSON response');
    const responseText = await response.text();
    console.error('Response text:', responseText.substring(0, 500));
    throw error;
  }
  console.log('📦 Response Body:', JSON.stringify(data, null, 2));
  
  // Check keys
  console.log('🔑 Response Keys:', Object.keys(data));
  
  // Check data types
  console.log('📋 Data Types:');
  Object.entries(data).forEach(([key, value]) => {
    console.log(`  - ${key}: ${typeof value} = ${value}`);
  });
});
