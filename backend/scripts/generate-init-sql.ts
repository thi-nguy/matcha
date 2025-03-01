import { ENUM_TYPES } from '../src/types/enums';
import { TABLES } from '../src/db/tables';
import * as fs from 'fs';
import * as path from 'path';

// Types just for SQL generation
type ColumnDefinition = {
  type: string;
  length?: number;
  notNull?: boolean;
  unique?: boolean;
  default?: string;
  references?: {
    table: string;
    column: string;
    onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT';
  };
};

type TableDefinition = {
  name: string;
  columns: Record<string, ColumnDefinition>;
  constraints?: {
    primaryKey?: string[];
    unique?: string[][];
  };
};

// SQL generation functions
const createColumnDefinition = (
  name: string,
  def: ColumnDefinition,
): string => {
  const parts = [name];

  // Type with length if specified
  if (def.type === 'VARCHAR' && def.length) {
    parts.push(`VARCHAR(${def.length})`);
  } else {
    parts.push(def.type);
  }

  if (def.notNull) parts.push('NOT NULL');
  if (def.unique) parts.push('UNIQUE');
  if (def.default) parts.push(`DEFAULT ${def.default}`);

  if (def.references) {
    parts.push(`REFERENCES ${def.references.table}(${def.references.column})`);
    if (def.references.onDelete) {
      parts.push(`ON DELETE ${def.references.onDelete}`);
    }
  }

  return parts.join(' ');
};

const createTableQuery = (table: TableDefinition): string => {
  const parts = [`CREATE TABLE ${table.name} (`];

  // Add columns
  const columns = Object.entries(table.columns).map(
    ([name, def]) => `  ${createColumnDefinition(name, def)}`,
  );

  // Add primary key if specified
  if (table.constraints?.primaryKey) {
    columns.push(`  PRIMARY KEY (${table.constraints.primaryKey.join(', ')})`);
  }

  // Add unique constraints if specified
  if (table.constraints?.unique) {
    table.constraints.unique.forEach((uniqueColumns, index) => {
      columns.push(
        `  CONSTRAINT ${table.name}_unique_${index} UNIQUE(${uniqueColumns.join(', ')})`,
      );
    });
  }

  parts.push(columns.join(',\n'));
  parts.push(')');

  return parts.join('\n');
};

// Generate SQL for database initialization
const sql = [
  '-- Generated initialization SQL\n',
  '-- Create enum types',
  ...ENUM_TYPES.map(
    (type) =>
      `CREATE TYPE ${type.name} AS ENUM (${type.values.map((v) => `'${v}'`).join(', ')});`,
  ),
  '\n-- Create tables',
  ...TABLES.map((table) => createTableQuery(table) + ';'),
].join('\n');

// Save to file
const outputPath = path.join(__dirname, '..', 'docker', 'init-db.sql');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sql);
console.log(`Generated initialization SQL at: ${outputPath}`);
