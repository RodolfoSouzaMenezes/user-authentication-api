import { Pool } from 'pg';

const connectionString = 'postgres://wgoqdtnt:jenUPcMB23WwbQshaj2Yzfd7_1W8ASxr@abul.db.elephantsql.com/wgoqdtnt';
const db = new Pool ({ connectionString });

export default db;