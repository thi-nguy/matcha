import { TableDefinition, commonColumns } from '../../db/utils';

export const reportsTable: TableDefinition = {
  name: 'reports',
  columns: {
    id: commonColumns.id,
    reporter_id: {
      ...commonColumns.userId(),
      references: {
        table: 'users',
        column: 'id',
        onDelete: 'CASCADE',
      },
    },
    reported_id: {
      ...commonColumns.userId(),
      references: {
        table: 'users',
        column: 'id',
        onDelete: 'CASCADE',
      },
    },
    reason: {
      type: 'report_reason',
      notNull: true,
    },
    created_at: commonColumns.createdAt,
  },
  constraints: {
    primaryKey: ['id'],
    unique: [['reporter_id', 'reported_id', 'reason']],
  },
};
