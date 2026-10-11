import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { Client, Databases, Users } from 'node-appwrite';

async function verify() {
  console.log('🔍 Testing Appwrite API Key & Connectivity...\n');

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'karaoke_db';

  console.log(`Endpoint: ${endpoint}`);
  console.log(`Project ID: ${projectId ? `${projectId.substring(0, 4)}... (length: ${projectId.length})` : 'MISSING'}`);
  console.log(`API Key present: ${apiKey ? `YES (length: ${apiKey.length})` : 'NO'}`);
  console.log(`Database ID: ${databaseId}`);

  if (!projectId || !apiKey) {
    console.error('❌ Project ID or API Key is missing in environment.');
    process.exit(1);
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  const users = new Users(client);
  const databases = new Databases(client);

  // 1. Test Users API scope
  console.log('\n--- 1. Testing Users Service (users.read/write scope) ---');
  try {
    const userList = await users.list();
    console.log(`✓ Users service accessible. Total users in project: ${userList.total}`);
  } catch (err: any) {
    console.error(`✗ Users service test failed: [${err.code}] ${err.message}`);
  }

  // 2. Test Databases API scope
  console.log('\n--- 2. Testing Databases Service (databases.read/write scope) ---');
  try {
    const dbList = await databases.list();
    console.log(`✓ Databases service accessible. Total databases in project: ${dbList.total}`);
    const foundDb = dbList.databases.find(d => d.$id === databaseId);
    if (foundDb) {
      console.log(`✓ Target database "${databaseId}" (${foundDb.name}) exists.`);
      const collections = await databases.listCollections(databaseId);
      console.log(`✓ Collections found in "${databaseId}": ${collections.total}`);
      collections.collections.forEach(c => {
        console.log(`  - ${c.name} (${c.$id})`);
      });
    } else {
      console.log(`ℹ Target database "${databaseId}" not found yet (can be provisioned via setup:db).`);
    }
  } catch (err: any) {
    console.error(`✗ Databases service test failed: [${err.code}] ${err.message}`);
  }

  console.log('\nVerification complete.');
}

verify().catch((err) => {
  console.error('Fatal verification error:', err.message);
  process.exit(1);
});
