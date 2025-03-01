import { TableDefinition, commonColumns } from '../../db/utils';

export const photosTable: TableDefinition = {
  name: 'photos',
  columns: {
    id: commonColumns.id,
    user_id: {
      ...commonColumns.userId(),
      references: {
        table: 'users',
        column: 'id',
        onDelete: 'CASCADE',
      },
    },
    url: {
      type: 'VARCHAR',
      length: 255,
      notNull: true,
    },
    is_profile: {
      type: 'BOOLEAN',
      default: 'false',
    },
    created_at: commonColumns.createdAt,
  },
  constraints: {
    primaryKey: ['id'],
    unique: [['user_id', 'is_profile'], ['url']],
  },
};
