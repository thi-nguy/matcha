import bcrypt from 'bcrypt';
import { query } from '../../db/connection';
import { Gender, UserStatus, SortBy, OrderBy } from '../../types/enums';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  gender?: Gender;
  gender_preferences?: Gender[];
  biography?: string;
  fame_rating: number;
  last_connection?: Date;
  is_online: boolean;
  status: UserStatus;
  is_verified: boolean;
  verification_token?: string;
  reset_token?: string;
  latitude?: number;
  longitude?: number;
  location_name?: string;
  created_at: Date;
}

export interface IUserCreate {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface IUserUpdate {
  gender?: Gender;
  gender_preferences?: Gender[];
  biography?: string;
  latitude?: number;
  longitude?: number;
  location_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface IUserSearch {
  minAge?: number;
  maxAge?: number;
  minFameRating?: number;
  maxFameRating?: number;
  latitude?: number;
  longitude?: number;
  maxDistance?: number;
  tags?: string[];
  gender?: Gender;
  gender_preferences?: Gender[];
  sortBy?: SortBy;
  orderBy?: OrderBy;
}

export class UserModel {
  static async findByEmail(email: string): Promise<IUser | null> {
    const users = await query<IUser>('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return users[0] || null;
  }

  static async findById(id: number): Promise<IUser | null> {
    const users = await query<IUser>('SELECT * FROM users WHERE id = $1', [id]);
    return users[0] || null;
  }

  static async create(
    data: IUserCreate,
  ): Promise<Omit<IUser, 'password_hash'>> {
    const passwordHash = await bcrypt.hash(data.password, 10);

    const users = await query<IUser>(
      `INSERT INTO users (
        username, email, password_hash, first_name, last_name,
        fame_rating, is_online, is_verified, status
      )
      VALUES ($1, $2, $3, $4, $5, 0, false, false, $6)
      RETURNING *`,
      [
        data.username,
        data.email,
        passwordHash,
        data.first_name,
        data.last_name,
        UserStatus.OFFLINE,
      ],
    );

    const { password_hash, ...user } = users[0];
    return user;
  }

  static async updateProfile(
    userId: number,
    data: IUserUpdate,
  ): Promise<Omit<IUser, 'password_hash'>> {
    const setClause = Object.entries(data)
      .map(([key, value], index) => {
        // Handle array of sexual preferences
        if (key === 'gender_preferences') {
          return `${key} = $${index + 2}::gender[]`;
        }
        return `${key} = $${index + 2}`;
      })
      .join(', ');

    const values = Object.values(data);

    const users = await query<IUser>(
      `UPDATE users
       SET ${setClause}
       WHERE id = $1
       RETURNING *`,
      [userId, ...values],
    );

    const { password_hash, ...user } = users[0];
    return user;
  }

  static async verifyEmail(token: string): Promise<boolean> {
    const result = await query<IUser>(
      `UPDATE users
       SET is_verified = true, verification_token = NULL
       WHERE verification_token = $1
       RETURNING *`,
      [token],
    );
    return result.length > 0;
  }

  static async updateLocation(
    userId: number,
    latitude: number,
    longitude: number,
    locationName: string,
  ): Promise<void> {
    await query(
      `UPDATE users
       SET latitude = $2, longitude = $3, location_name = $4
       WHERE id = $1`,
      [userId, latitude, longitude, locationName],
    );
  }

  static async updateOnlineStatus(
    userId: number,
    status: UserStatus,
  ): Promise<void> {
    await query(
      `UPDATE users
       SET status = $2, is_online = $3, last_connection = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [userId, status, status === UserStatus.ONLINE],
    );
  }

  static async updateFameRating(
    userId: number,
    increment: number,
  ): Promise<void> {
    await query(
      `UPDATE users
       SET fame_rating = fame_rating + $2
       WHERE id = $1`,
      [userId, increment],
    );
  }

  static async searchUsers(
    params: IUserSearch,
  ): Promise<Omit<IUser, 'password_hash'>[]> {
    let queryString = `
      SELECT DISTINCT u.*
      FROM users u
      LEFT JOIN user_tags ut ON u.id = ut.user_id
      LEFT JOIN tags t ON ut.tag_id = t.id
      WHERE 1=1
    `;

    const values: any[] = [];
    let paramIndex = 1;

    if (params.minFameRating !== undefined) {
      queryString += ` AND u.fame_rating >= $${paramIndex++}`;
      values.push(params.minFameRating);
    }

    if (params.maxFameRating !== undefined) {
      queryString += ` AND u.fame_rating <= $${paramIndex++}`;
      values.push(params.maxFameRating);
    }

    if (params.latitude && params.longitude && params.maxDistance) {
      queryString += `
        AND (
          point($${paramIndex++}, $${paramIndex++}) <@>
          point(u.latitude, u.longitude)
        ) <= $${paramIndex++}
      `;
      values.push(params.latitude, params.longitude, params.maxDistance);
    }

    if (params.tags && params.tags.length > 0) {
      queryString += ` AND t.name = ANY($${paramIndex++})`;
      values.push(params.tags);
    }

    if (params.gender) {
      queryString += ` AND u.gender = $${paramIndex++}`;
      values.push(params.gender);
    }

    if (params.gender_preferences && params.gender_preferences.length > 0) {
      queryString += ` AND u.gender = ANY($${paramIndex++}::gender[])`;
      values.push(params.gender_preferences);
    }

    // Add sorting
    const sortField = params.sortBy || SortBy.FAME_RATING;
    const sortOrder = params.orderBy || OrderBy.DESC;
    queryString += ` ORDER BY u.${sortField} ${sortOrder}`;

    const users = await query<IUser>(queryString, values);
    return users.map(({ password_hash, ...user }) => user);
  }
}
