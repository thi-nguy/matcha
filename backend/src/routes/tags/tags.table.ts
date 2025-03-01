import { TableDefinition, commonColumns } from '../../db/utils';

export const tagsTable: TableDefinition = {
  name: 'tags',
  columns: {
    id: commonColumns.id,
    name: {
      type: 'VARCHAR',
      length: 50,
      notNull: true,
      unique: true,
    },
    created_at: commonColumns.createdAt,
  },
  constraints: {
    primaryKey: ['id'],
  },
};

export const userTagsTable: TableDefinition = {
  name: 'user_tags',
  columns: {
    user_id: {
      ...commonColumns.userId(),
      references: {
        table: 'users',
        column: 'id',
        onDelete: 'CASCADE',
      },
    },
    tag_id: {
      type: 'INTEGER',
      notNull: true,
      references: {
        table: 'tags',
        column: 'id',
        onDelete: 'CASCADE',
      },
    },
    created_at: commonColumns.createdAt,
  },
  constraints: {
    primaryKey: ['user_id', 'tag_id'],
  },
};
