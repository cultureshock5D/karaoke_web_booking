import { Client, Account, Users, Databases } from "node-appwrite";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "karaoke_booking";
const API_KEY = process.env.APPWRITE_API_KEY || "";
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "karaoke_db";

/**
 * Creates an Appwrite admin client with full API key permissions
 * (Used for user administration, setting labels, server-side data access)
 */
export function createAdminAuthClient() {
  const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

  if (API_KEY) {
    client.setKey(API_KEY);
  }

  return {
    client,
    account: new Account(client),
    users: new Users(client),
    databases: new Databases(client),
    databaseId: DATABASE_ID,
  };
}

/**
 * Creates an Appwrite client scoped to a user's session token stored in an HttpOnly cookie
 */
export function createSessionAuthClient(sessionSecret: string) {
  const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setSession(sessionSecret);

  return {
    client,
    account: new Account(client),
    databases: new Databases(client),
    databaseId: DATABASE_ID,
  };
}
