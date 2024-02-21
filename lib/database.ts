import mysql, { OkPacketParams, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

const connectionConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export async function query(sql: string, params?: any[]): Promise<RowDataPacket[] | RowDataPacket[][] | OkPacketParams | OkPacketParams[] | ResultSetHeader> {
  const connection = await mysql.createConnection(connectionConfig);
  try {
    const [results] = await connection.execute(sql, params);
    return results as RowDataPacket[] | RowDataPacket[][] | OkPacketParams | OkPacketParams[] | ResultSetHeader;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
}
