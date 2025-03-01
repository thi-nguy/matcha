export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
  GENDERQUEER = 'GENDERQUEER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
  OTHER = 'OTHER',
}

export enum ReportReason {
  FAKE_PROFILE = 'FAKE_PROFILE',
  INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT',
  HARASSMENT = 'HARASSMENT',
  SPAM = 'SPAM',
  UNDERAGE = 'UNDERAGE',
  OTHER = 'OTHER',
}

export enum NotificationType {
  FANCY = 'FANCY',
  UNFANCY = 'UNFANCY',
  VIEW = 'VIEW',
  MESSAGE = 'MESSAGE',
  MATCH = 'MATCH',
  UNMATCH = 'UNMATCH',
}

export enum UserStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  AWAY = 'AWAY',
}

export enum SortBy {
  AGE = 'AGE',
  LOCATION = 'LOCATION',
  FAME_RATING = 'FAME_RATING',
  COMMON_TAGS = 'COMMON_TAGS',
  LAST_SEEN = 'LAST_SEEN',
}

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum FameRatingAction {
  PROFILE_COMPLETED = 10,
  RECEIVED_FANCY = 1,
  RECEIVED_VIEW = 1,
  MATCH = 5,
  UNMATCH = -5,
  REPORTED = -10,
  BLOCKED = -5,
}

export enum ValidationMessage {
  REQUIRED_FIELD = 'This field is required',
  INVALID_EMAIL = 'Invalid email address',
  INVALID_PASSWORD = 'Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one special character',
  USERNAME_TAKEN = 'Username is already taken',
  EMAIL_TAKEN = 'Email is already taken',
  INVALID_TOKEN = 'Invalid or expired token',
  MAX_PHOTOS = 'Maximum 5 photos allowed',
  PROFILE_PHOTO_REQUIRED = 'Profile photo is required for this action',
  INVALID_LOCATION = 'Invalid location coordinates',
  BLOCKED_USER = 'You cannot perform this action on a blocked user',
  ALREADY_REPORTED = 'You have already reported this user',
}

export enum UserInteractionType {
  FANCY = 'FANCY',
  BLOCK = 'BLOCK',
  VIEW = 'VIEW',
}

// Database type definitions
export const ENUM_TYPES = [
  {
    name: 'user_status',
    values: Object.values(UserStatus),
  },
  {
    name: 'gender',
    values: Object.values(Gender),
  },
  {
    name: 'notification_type',
    values: Object.values(NotificationType),
  },
  {
    name: 'report_reason',
    values: Object.values(ReportReason),
  },
  {
    name: 'user_interaction_type',
    values: Object.values(UserInteractionType),
  },
];
