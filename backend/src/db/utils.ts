import {
  UserStatus,
  Gender,
  NotificationType,
  ReportReason,
  UserInteractionType,
} from '../types/enums';

// More specific column types
type NumericType = 'SERIAL' | 'INTEGER' | 'DECIMAL' | 'BIGINT';
type TextType = 'VARCHAR' | 'TEXT';
type BooleanType = 'BOOLEAN';
type TimestampType = 'TIMESTAMP' | 'TIMESTAMP WITH TIME ZONE';
type ArrayType = `${string}[]`;

// Map our enum types to their PostgreSQL type names
type EnumTypeMap = {
  user_status: typeof UserStatus;
  gender: typeof Gender;
  notification_type: typeof NotificationType;
  report_reason: typeof ReportReason;
  user_interaction_type: typeof UserInteractionType;
};

type EnumType = keyof EnumTypeMap;

type ColumnType =
  | NumericType
  | TextType
  | BooleanType
  | TimestampType
  | ArrayType
  | EnumType;

type OnDeleteAction = 'CASCADE' | 'SET NULL' | 'RESTRICT';

export interface ColumnDefinition {
  type: ColumnType;
  length?: number;
  precision?: number;
  scale?: number;
  notNull?: boolean;
  unique?: boolean;
  default?: string;
  check?: string;
  references?: {
    table: string;
    column: string;
    onDelete?: OnDeleteAction;
  };
}

export interface TableDefinition {
  name: string;
  columns: Record<string, ColumnDefinition>;
  constraints?: {
    unique?: string[][];
    primaryKey?: string[];
    check?: string[];
    foreignKey?: Array<{
      columns: string[];
      references: {
        table: string;
        columns: string[];
        onDelete?: OnDeleteAction;
      };
    }>;
  };
}

// Common column definitions
export const commonColumns = {
  id: {
    type: 'SERIAL' as const,
    notNull: true,
  },
  createdAt: {
    type: 'TIMESTAMP WITH TIME ZONE' as const,
    notNull: true,
    default: 'CURRENT_TIMESTAMP',
  },
  updatedAt: {
    type: 'TIMESTAMP WITH TIME ZONE' as const,
    notNull: true,
    default: 'CURRENT_TIMESTAMP',
  },
  userId: (onDelete: OnDeleteAction = 'CASCADE') => ({
    type: 'INTEGER' as const,
    notNull: true,
    references: {
      table: 'users',
      column: 'id',
      onDelete,
    },
  }),
} as const;
