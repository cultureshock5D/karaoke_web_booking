import { Client, Databases, Users, Teams, Storage, Messaging } from 'node-appwrite';
import { APPWRITE_CONFIG } from './config';

export interface AdminAppwriteServices {
  client: Client;
  databases: Databases;
  users: Users;
  teams: Teams;
  storage: Storage;
  messaging: Messaging;
}

/**
 * Creates an Appwrite server client with full admin API Key privileges.
 * Used for booking orchestration, slot hold transactions, payment webhooks, and venue provisioning.
 */
export function createAdminClient(): AdminAppwriteServices {
  if (!APPWRITE_CONFIG.apiKey) {
    throw new Error('APPWRITE_API_KEY is not defined in server environment variables.');
  }

  const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId)
    .setKey(APPWRITE_CONFIG.apiKey);

  return {
    client,
    databases: new Databases(client),
    users: new Users(client),
    teams: new Teams(client),
    storage: new Storage(client),
    messaging: new Messaging(client),
  };
}

/**
 * Creates a scoped Appwrite server client using a user's session token.
 * Used for staff and admin operations with Appwrite Row-Level Security (RLS) enforcement.
 */
export function createSessionClient(sessionToken: string): {
  client: Client;
  databases: Databases;
  teams: Teams;
} {
  const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId)
    .setSession(sessionToken);

  return {
    client,
    databases: new Databases(client),
    teams: new Teams(client),
  };
}
