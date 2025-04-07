import fs from 'fs';
import path from 'path';
import Checkpoint, { LogLevel } from '@snapshot-labs/checkpoint';
import config from './config.json';
import { NoopIndexer } from './noopindexer';
import { sequencer } from '../highlight/client';

const dir = __dirname.endsWith('dist/src') ? '../' : '';
const schemaFile = path.join(__dirname, `${dir}./schema.gql`);
const schema = fs.readFileSync(schemaFile, 'utf8');

if (process.env.CA_CERT) {
  process.env.CA_CERT = process.env.CA_CERT.replace(/\\n/g, '\n');
}

const indexer = new NoopIndexer();
const checkpoint = new Checkpoint(schema, {
  logLevel: LogLevel.Info,
  prettifyLogs: true,
  dbConnection: process.env.CHECKPOINT_DATABASE_URL
});

checkpoint.addIndexer('hl', config, indexer);

async function run() {
  await checkpoint.reset();
  await checkpoint.resetMetadata();
  await sequencer.adapter.reset();
  console.log('Checkpoint ready');
}

run();

export const graphql = checkpoint.graphql;
