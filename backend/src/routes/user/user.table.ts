import { TableDefinition, commonColumns } from '../../db/utils';
import { UserStatus, Gender } from '../../types/enums';

export const userTable: TableDefinition = {
  name: 'users',
  columns: {
    id: commonColumns.id,
    username: {
      type: 'VARCHAR',
      length: 255,
      notNull: true,
      unique: true,
    },
    email: {
      type: 'VARCHAR',
      length: 255,
      notNull: true,
      unique: true,
    },
    password_hash: {
      type: 'VARCHAR',
      length: 255,
      notNull: true,
    },
    first_name: {
      type: 'VARCHAR',
      length: 255,
      notNull: true,
    },
    last_name: {
      type: 'VARCHAR',
      length: 255,
      notNull: true,
    },
    gender: {
      type: 'gender',
      notNull: true,
    },
    gender_preferences: {
      type: 'gender[]',
      default: `ARRAY[${Object.values(Gender)
        .map((g) => `'${g}'`)
        .join(', ')}]::gender[]`,
    },
    biography: {
      type: 'TEXT',
    },
    fame_rating: {
      type: 'INTEGER',
      default: '0',
    },
    last_connection: {
      type: 'TIMESTAMP WITH TIME ZONE',
    },
    is_online: {
      type: 'BOOLEAN',
      default: 'false',
    },
    status: {
      type: 'user_status',
      default: `'${UserStatus.OFFLINE}'`,
    },
    is_verified: {
      type: 'BOOLEAN',
      default: 'false',
    },
    verification_token: {
      type: 'VARCHAR',
      length: 255,
    },
    reset_token: {
      type: 'VARCHAR',
      length: 255,
    },
    latitude: {
      type: 'DECIMAL',
      length: 10,
    },
    longitude: {
      type: 'DECIMAL',
      length: 11,
    },
    location_name: {
      type: 'VARCHAR',
      length: 255,
    },
    created_at: commonColumns.createdAt,
  },
  constraints: {
    primaryKey: ['id'],
  },
};
