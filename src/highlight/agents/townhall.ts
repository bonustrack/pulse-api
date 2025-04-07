import zod from 'zod';
import Agent from '../agent';

export default class Townhall extends Agent {
  async discussion(params) {
    const { author, title, body } = params;
    this.assert(!author, 'author is required');
    this.assert(!zod.string().safeParse(author).success, 'author wrong type');
    this.assert(!title, 'title is required');
    this.assert(!zod.string().safeParse(title).success, 'title wrong type');
    this.assert(!zod.string().safeParse(body).success, 'body wrong type');

    const id: number = (await this.get('discussions:id')) || 1;

    this.write('discussions:id', id + 1);
    this.emit('new_discussion', { id, author, title, body });
  }

  async close_discussion(params) {
    const { discussion } = params;
    this.emit('close_discussion', { discussion });
  }

  async statement(params) {
    const { author, discussion, statement: body } = params;

    // @TODO: reject the statement if it was already proposed

    this.assert(!zod.string().safeParse(author).success, 'author wrong type');
    this.assert(!author, 'author is required');
    this.assert(
      !zod.number().safeParse(discussion).success,
      'discussion wrong type'
    );
    this.assert(!discussion, 'discussion is required');
    this.assert(!zod.string().safeParse(body).success, 'body wrong type');
    this.assert(!body, 'body is required');

    const id: number =
      (await this.get(`discussion:${discussion}:statements:id`)) || 1;

    this.write(`discussion:${discussion}:statements:id`, id + 1);
    this.emit('new_statement', { id, author, discussion, body });
  }

  async hide_statement(params) {
    const { discussion, statement } = params;

    // @TODO: reject if not the author of the discussion

    this.emit('hide_statement', { discussion, statement });
  }

  async pin_statement(params) {
    const { discussion, statement } = params;

    // @TODO: reject if not the author of the discussion

    this.emit('pin_statement', { discussion, statement });
  }

  async unpin_statement(params) {
    const { discussion, statement } = params;

    // @TODO: reject if not the author of the discussion

    this.emit('unpin_statement', { discussion, statement });
  }

  async vote(params) {
    const { voter, discussion, statement, choice } = params;

    this.assert(!zod.string().safeParse(voter).success, 'voter wrong type');
    this.assert(!voter, 'voter is required');
    this.assert(
      !zod.number().safeParse(discussion).success,
      'discussion wrong type'
    );
    this.assert(!discussion, 'discussion is required');
    this.assert(
      !zod.number().safeParse(statement).success,
      'statement wrong type'
    );
    this.assert(!statement, 'statement is required');
    this.assert(!zod.number().safeParse(choice).success, 'choice wrong type');

    const votes: string[] =
      (await this.get(`discussion:${discussion}:voter:${voter}`)) || [];

    this.assert(votes.includes(statement), 'already voted');
    votes.push(statement);

    this.write(`discussion:${discussion}:voter:${voter}`, votes);
    this.emit('new_vote', { voter, discussion, statement, choice });
  }
}
