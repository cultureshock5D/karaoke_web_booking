export interface RoomValidationErrors {
  [key: string]: string | undefined;
  name?: string;
  slug?: string;
  capacityMin?: string;
  capacityMax?: string;
  baseHourlyRate?: string;
  description?: string;
  amenities?: string;
}

export interface ValidateRoomInput {
  name: string;
  slug: string;
  capacityMin: number | string;
  capacityMax: number | string;
  baseHourlyRate: number | string;
  description?: string;
  amenities?: string[] | string;
}

export function validateRoomInput(input: ValidateRoomInput): {
  isValid: boolean;
  errors: RoomValidationErrors;
  sanitized: {
    name: string;
    slug: string;
    capacityMin: number;
    capacityMax: number;
    baseHourlyRate: number;
    description: string;
  };
} {
  const errors: RoomValidationErrors = {};

  // Name: required, 2 to 60 characters
  const trimmedName = typeof input.name === "string" ? input.name.trim() : "";
  if (!trimmedName) {
    errors.name = "Room name is required.";
  } else if (trimmedName.length < 2) {
    errors.name = "Room name must be at least 2 characters.";
  } else if (trimmedName.length > 60) {
    errors.name = "Room name cannot exceed 60 characters.";
  }

  // Slug: required, lowercase letters, numbers, and hyphens
  const trimmedSlug = typeof input.slug === "string" ? input.slug.trim().toLowerCase() : "";
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!trimmedSlug) {
    errors.slug = "URL slug is required.";
  } else if (!slugRegex.test(trimmedSlug)) {
    errors.slug = "Slug must contain only lowercase letters, numbers, and single hyphens (e.g. barkada-room).";
  } else if (trimmedSlug.length > 64) {
    errors.slug = "Slug cannot exceed 64 characters.";
  }

  // Capacity Min: whole number >= 1
  const minVal = Number(input.capacityMin);
  if (isNaN(minVal) || !Number.isInteger(minVal) || minVal < 1) {
    errors.capacityMin = "Minimum capacity must be an integer of at least 1 guest.";
  }

  // Capacity Max: whole number >= minimum, <= 50
  const maxVal = Number(input.capacityMax);
  if (isNaN(maxVal) || !Number.isInteger(maxVal)) {
    errors.capacityMax = "Maximum capacity must be an integer.";
  } else if (maxVal > 50) {
    errors.capacityMax = "Maximum capacity cannot exceed 50 guests.";
  } else if (!errors.capacityMin && maxVal < minVal) {
    errors.capacityMax = `Maximum capacity must be greater than or equal to minimum capacity (${minVal}).`;
  }

  // Base Hourly Rate: number from 100 to 100,000
  const rateVal = Number(input.baseHourlyRate);
  if (isNaN(rateVal)) {
    errors.baseHourlyRate = "Hourly rate must be a valid number.";
  } else if (rateVal < 100) {
    errors.baseHourlyRate = "Base hourly rate must be at least ₱100.";
  } else if (rateVal > 100000) {
    errors.baseHourlyRate = "Base hourly rate cannot exceed ₱100,000.";
  }

  // Description: up to 500 characters
  const trimmedDesc = typeof input.description === "string" ? input.description.trim() : "";
  if (trimmedDesc.length > 500) {
    errors.description = "Description cannot exceed 500 characters.";
  }

  // Amenity tags validation if provided
  if (input.amenities) {
    const amenityList = Array.isArray(input.amenities)
      ? input.amenities
      : input.amenities.split(",").map((a) => a.trim()).filter(Boolean);

    if (amenityList.length > 6) {
      errors.amenities = "At most 6 amenity tags are allowed.";
    } else {
      for (const tag of amenityList) {
        if (tag.length > 30) {
          errors.amenities = `Amenity tag "${tag}" exceeds 30 characters.`;
          break;
        }
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name: trimmedName,
      slug: trimmedSlug,
      capacityMin: isNaN(minVal) ? 1 : minVal,
      capacityMax: isNaN(maxVal) ? 1 : maxVal,
      baseHourlyRate: isNaN(rateVal) ? 0 : rateVal,
      description: trimmedDesc,
    },
  };
}
