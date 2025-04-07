import AsyncLock from 'async-lock';
import { Adapter } from './adapter/adapter';
import Process from './process';

export default class Sequencer {
  public adapter: Adapter;
  public agents: any;
  private asyncLock = new AsyncLock();

  constructor({ adapter, agents }: { adapter: Adapter; agents: any }) {
    this.adapter = adapter;
    this.agents = agents;
  }

  async post(params: any) {
    return this.asyncLock.acquire('post', () => this._post(params));
  }

  async _post(params: any) {
    try {
      const process = new Process({ adapter: this.adapter });
      const agent = new this.agents['0x1']('0x1', process);

      await agent.invoke(params.type, params.payload);
      const events = await process.execute();

      const steps = process.steps;

      console.log('Events', events);
      console.log('Steps', steps);

      return {
        input: params,
        events,
        steps
      };
    } catch (e) {
      console.log(e);

      return Promise.reject(e);
    }
  }
}
