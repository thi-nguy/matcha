import { TableDefinition, commonColumns } from '../../db/utils';

export const messagesTable: TableDefinition = {
  name: 'messages',
  columns: {
    id: commonColumns.id,
    sender_id: {
      ...commonColumns.userId(),
      references: {
        table: 'users',
        column: 'id',
        onDelete: 'CASCADE',
      },
    },
    receiver_id: {
      ...commonColumns.userId(),
      references: {
        table: 'users',
        column: 'id',
        onDelete: 'CASCADE',
      },
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    is_read: {
      type: 'BOOLEAN',
      default: 'false',
    },
    created_at: commonColumns.createdAt,
  },
  constraints: {
    primaryKey: ['id'],
    unique: [['sender_id', 'receiver_id', 'created_at']],
  },
};
