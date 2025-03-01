import { UserStatus } from '../types/enums';
import { TableDefinition, commonColumns } from './utils';
import { userTable } from '../routes/user/user.table';
import { photosTable } from '../routes/photos/photos.table';
import { tagsTable, userTagsTable } from '../routes/tags/tags.table';
import { userInteractionsTable } from '../routes/user-interactions/user-interactions.table';
import { reportsTable } from '../routes/reports/reports.table';
import { messagesTable } from '../routes/messages/messages.table';
import { notificationsTable } from '../routes/notifications/notifications.table';

export const TABLES = [
  userTable,
  photosTable,
  tagsTable,
  userTagsTable,
  userInteractionsTable,
  reportsTable,
  messagesTable,
  notificationsTable,
];
