import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { Server } from 'ws';
import * as api from './api';
import { graphql } from './checkpoint';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ limit: '4mb', extended: false }));
app.use(cors({ maxAge: 86400 }));
app.use(graphql);

export const server = app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);

export const wss = new Server({ server });

wss.on('connection', ws => {
  console.log('Got connection from new peer');

  ws.on('error', () => console.log('Error on connection with peer'));

  ws.on('close', () => console.log('Connection with peer closed'));

  ws.on('message', async message => {
    try {
      const call = JSON.parse(message);
      if (call[0] && call[0] === 'request' && call[1] && call[1].command) {
        const { command, params, tag } = call[1];
        console.log(command);

        await api[command](params, tag, ws, wss);
      }
    } catch (e) {
      console.error(e);
    }
  });
});
