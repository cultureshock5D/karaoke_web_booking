export interface AdminRoom {
  $id: string;
  venueId: string;
  name: string;
  slug: string;
  capacityMin: number;
  capacityMax: number;
  baseHourlyRate: number;
  description: string;
  isActive: boolean;
  sortOrder: number;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface RoomInputData {
  name: string;
  slug: string;
  capacityMin: number;
  capacityMax: number;
  baseHourlyRate: number;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

export interface RoomActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string | undefined>;
  roomId?: string;
}

