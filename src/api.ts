import _ from 'lodash';
import { wss } from './';
import * as writers from './checkpoint/writers';
import { justsaying, sendErrorResponse, sendResponse } from './helpers/ws';
import { sequencer } from './highlight/client';

export async function broadcast(params, tag, ws) {
  // @TODO verify sig and format

  try {
    const execution = await sequencer.post(params);

    for (const event of execution.events) {
      const fn = _.camelCase(`handle_${event.key}`);
      if (writers[fn]) writers[fn](event.data);
      wss.clients.forEach(ws => justsaying(ws, event.key, event.data));
    }

    return sendResponse(ws, tag, execution);
  } catch (e: any) {
    console.log(e);

    return sendErrorResponse(ws, tag, e?.message);
  }
}

export async function subscribe(params, tag, ws) {
  if (!ws.subcribed) ws.subcribed = [];

  ws.subcribed.push(params);

  return sendResponse(ws, tag, 'subscribed');
}

export function heartbeat(_params, tag, ws) {
  return sendResponse(ws, tag, ~~(Date.now() / 1e3));
}
