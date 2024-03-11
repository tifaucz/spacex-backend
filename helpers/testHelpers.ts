import * as supertest from 'supertest';
import { db } from '../models';
import fetch from 'node-fetch';

const cleanDb = async () => {
  await db.sequelize.query('USE `spacex`');
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
  await db.sequelize.drop();
  await db.sequelize.sync();
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
};

const checkApolloResponse = (response: supertest.Response) => {
  try {
    expect(response.error).toBe(false);
    expect(response.body.errors).toBeUndefined();
  } catch (error) {
    console.error(JSON.stringify(response.body.errors, null, 2));
    console.error(JSON.stringify(response.error, null, 2));
    throw error;
  }
};

const postQuery = async (query) => {
  const response = await fetch('https://spacex-production.up.railway.app/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query }),
  });
  const { data } = await response.json();
  return data;
}

export { cleanDb, checkApolloResponse, postQuery };
