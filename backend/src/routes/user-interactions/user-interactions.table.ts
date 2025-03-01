import { TableDefinition, commonColumns } from '../../db/utils';

export const userInteractionsTable: TableDefinition = {
  name: 'user_interactions',
  columns: {
    user_id: {
      ...commonColumns.userId(),
      references: {
        table: 'users',
        column: 'id',
        onDelete: 'CASCADE',
      },
    },
    target_id: {
      ...commonColumns.userId(),
      references: {
        table: 'users',
        column: 'id',
        onDelete: 'CASCADE',
      },
    },
    action: {
      type: 'user_interaction_type',
      notNull: true,
    },
    created_at: commonColumns.createdAt,
  },
  constraints: {
    primaryKey: ['user_id', 'target_id', 'action'],
  },
};
