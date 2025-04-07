import agents from './agents';
import Highlight from '../highlight';
// import { MemoryAdapter } from '../highlight/adapter/memory';
import { RedisAdapter } from '../highlight/adapter/redis';

export const sequencer = new Highlight({
  agents,
  // adapter: new MemoryAdapter()
  adapter: new RedisAdapter({ url: process.env.HIGHLIGHT_DATABASE_URL })
});
