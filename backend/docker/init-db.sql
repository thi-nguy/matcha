-- Generated initialization SQL

-- Create enum types
CREATE TYPE user_status AS ENUM ('ONLINE', 'OFFLINE', 'AWAY');
CREATE TYPE gender AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'GENDERQUEER', 'PREFER_NOT_TO_SAY', 'OTHER');
CREATE TYPE notification_type AS ENUM ('FANCY', 'UNFANCY', 'VIEW', 'MESSAGE', 'MATCH', 'UNMATCH');
CREATE TYPE report_reason AS ENUM ('FAKE_PROFILE', 'INAPPROPRIATE_CONTENT', 'HARASSMENT', 'SPAM', 'UNDERAGE', 'OTHER');
CREATE TYPE user_interaction_type AS ENUM ('FANCY', 'BLOCK', 'VIEW');

-- Create tables
CREATE TABLE users (
  id SERIAL NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  gender gender NOT NULL,
  gender_preferences gender[] DEFAULT ARRAY['MALE', 'FEMALE', 'NON_BINARY', 'GENDERQUEER', 'PREFER_NOT_TO_SAY', 'OTHER']::gender[],
  biography TEXT,
  fame_rating INTEGER DEFAULT 0,
  last_connection TIMESTAMP WITH TIME ZONE,
  is_online BOOLEAN DEFAULT false,
  status user_status DEFAULT 'OFFLINE',
  is_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  reset_token VARCHAR(255),
  latitude DECIMAL,
  longitude DECIMAL,
  location_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE photos (
  id SERIAL NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL,
  is_profile BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT photos_unique_0 UNIQUE(user_id, is_profile),
  CONSTRAINT photos_unique_1 UNIQUE(url)
);
CREATE TABLE tags (
  id SERIAL NOT NULL,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE user_tags (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, tag_id)
);
CREATE TABLE user_interactions (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action user_interaction_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, target_id, action)
);
CREATE TABLE reports (
  id SERIAL NOT NULL,
  reporter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reported_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason report_reason NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT reports_unique_0 UNIQUE(reporter_id, reported_id, reason)
);
CREATE TABLE messages (
  id SERIAL NOT NULL,
  sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT messages_unique_0 UNIQUE(sender_id, receiver_id, created_at)
);
CREATE TABLE notifications (
  id SERIAL NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  related_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT notifications_unique_0 UNIQUE(user_id, type, related_user_id, created_at)
);