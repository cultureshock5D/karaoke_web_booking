import { Client, Databases, Account, Storage, Teams } from 'appwrite';
import { APPWRITE_CONFIG } from './config';

const client = new Client();

if (APPWRITE_CONFIG.endpoint && APPWRITE_CONFIG.projectId) {
  client
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);
}

export const appwriteClient = client;
export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const teams = new Teams(client);

/**
 * Ensures an anonymous customer session exists so the user can interact
 * with Appwrite client-side features without creating an account.
 */
export async function ensureGuestSession() {
  try {
    return await account.get();
  } catch {
    // If not authenticated, create an anonymous session
    return await account.createAnonymousSession();
  }
}

/**
 * Subscribe to Realtime slot updates for a specific room or venue.
 */
export function subscribeToSlotUpdates(
  databaseId: string,
  slotsCollectionId: string,
  callback: (response: any) => void
) {
  const channel = `databases.${databaseId}.collections.${slotsCollectionId}.documents`;
  return client.subscribe(channel, callback);
}
