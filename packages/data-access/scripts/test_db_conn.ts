import { Client } from 'pg';

const connectionString = 'postgresql://neondb_owner:npg_fN4iE1kZHzVp@ep-cool-lab-ano5semv-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function testConnection() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected successfully');
    const res = await client.query('SELECT NOW()');
    console.log('Result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection();
