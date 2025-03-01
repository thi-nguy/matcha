# Matcha Backend

A dating application backend built with Express, TypeScript, and PostgreSQL.

## Features

### User Interactions

- **Fancy Someone**: Show interest in another user (replaces traditional "likes")
- **Block Users**: Prevent unwanted interactions
- **View Profiles**: Browse other users' profiles
- **Match System**: When two users fancy each other, they match
- **Unfancy**: Remove your interest in someone

### User Management

- Profile creation and editing
- Gender preferences and matching
- Location-based matching
- Fame rating system
- Online status tracking

### Notifications

- Receive notifications for:
  - When someone fancies you
  - When someone unfancies you
  - Profile views
  - New messages
  - New matches
  - Unmatches

### Safety Features

- User blocking
- Profile reporting
- Email verification
- Secure password handling

## Getting Started

1. Start the database:

```bash
pnpm service:start
```

2. Initialize the database:

```bash
pnpm service:init
```

3. Start the development server:

```bash
pnpm dev
```

## Database Schema

### Main Tables

- `users`: User profiles and preferences
- `user_interactions`: Tracks fancies, blocks, and views between users
- `messages`: Chat messages between matched users
- `notifications`: System notifications
- `photos`: User photos
- `reports`: User reports for safety
- `tags`: Interest tags
- `user_tags`: Links between users and their interests

## API Documentation

[Coming soon]
