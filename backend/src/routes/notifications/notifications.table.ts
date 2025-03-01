import { TableDefinition, commonColumns } from '../../db/utils';

export const notificationsTable: TableDefinition = {
  name: 'notifications',
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
    type: {
      type: 'notification_type',
      notNull: true,
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    is_read: {
      type: 'BOOLEAN',
      default: 'false',
    },
    related_user_id: {
      ...commonColumns.userId('SET NULL'),
      notNull: false,
      references: {
        table: 'users',
        column: 'id',
        onDelete: 'SET NULL',
      },
    },
    created_at: commonColumns.createdAt,
  },
  constraints: {
    primaryKey: ['id'],
    unique: [['user_id', 'type', 'related_user_id', 'created_at']],
  },
};
