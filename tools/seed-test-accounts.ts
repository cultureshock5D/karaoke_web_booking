import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { Client, Users, ID, Query } from "node-appwrite";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "karaoke_booking";
const API_KEY = process.env.APPWRITE_API_KEY || "";

if (!API_KEY) {
  console.error("❌ Error: APPWRITE_API_KEY is not defined in the environment.");
  console.error("   Ensure your .env.local file has a valid server API key with users.write permissions.");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const users = new Users(client);

interface DemoAccountConfig {
  email: string;
  name: string;
  password: string;
  labels: string[];
}

const DEMO_ACCOUNTS: DemoAccountConfig[] = [
  {
    email: "admin@encore.test",
    name: "Encore Venue Admin",
    password: "Admin#Demo2026",
    labels: ["admin"],
  },
  {
    email: "customer@encore.test",
    name: "Encore Customer Demo",
    password: "Customer#Demo2026",
    labels: [],
  },
];

async function seedAccount(account: DemoAccountConfig) {
  try {
    const existing = await users.list([Query.equal("email", account.email)]);

    if (existing.total > 0 && existing.users[0]) {
      const user = existing.users[0];
      console.log(`ℹ Account '${account.email}' exists (ID: ${user.$id}). Updating labels & verification...`);
      await users.updateLabels(user.$id, account.labels);
      await users.updateEmailVerification(user.$id, true);
      await users.updatePassword(user.$id, account.password);
      console.log(`✓ Account '${account.email}' updated successfully.`);
    } else {
      console.log(`Creating new demo account: '${account.email}'...`);
      const user = await users.create(
        ID.unique(),
        account.email,
        undefined,
        account.password,
        account.name
      );
      if (account.labels.length > 0) {
        await users.updateLabels(user.$id, account.labels);
      }
      await users.updateEmailVerification(user.$id, true);
      console.log(`✓ Account '${account.email}' created with ID: ${user.$id}.`);
    }
  } catch (err: any) {
    console.error(`❌ Failed to seed '${account.email}':`, err.message);
  }
}

async function main() {
  console.log("🌱 Seeding ENCORE Test Accounts (Idempotent)...");
  console.log(`   Endpoint: ${ENDPOINT}`);
  console.log(`   Project:  ${PROJECT_ID}\n`);

  for (const account of DEMO_ACCOUNTS) {
    await seedAccount(account);
  }

  console.log("\n🎉 Test account seeding complete!");
  console.log("--------------------------------------------------");
  console.log("Admin:    admin@encore.test    / Admin#Demo2026");
  console.log("Customer: customer@encore.test / Customer#Demo2026");
  console.log("--------------------------------------------------");
}

main().catch((err) => {
  console.error("Fatal seeding error:", err);
  process.exit(1);
});
