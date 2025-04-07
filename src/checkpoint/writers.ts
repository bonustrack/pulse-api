import { register } from '@snapshot-labs/checkpoint/dist/src/register';
import { Discussion, Statement, Vote } from '../../.checkpoint/models';

export async function handleNewDiscussion({ id, author, title, body }) {
  const ts = ~~(Date.now() / 1e3);
  register.setCurrentBlock('hl', BigInt(ts));

  console.log('Handle new discussion', id, author, title, body);

  const discussion = new Discussion(id, 'hl');
  discussion.author = author;
  discussion.title = title;
  discussion.body = body;
  discussion.statement_count = 0;
  discussion.vote_count = 0;
  discussion.created = ~~(Date.now() / 1e3);

  await discussion.save();
}

export async function handleCloseDiscussion({ discussion: d }) {
  const ts = ~~(Date.now() / 1e3);
  register.setCurrentBlock('hl', BigInt(ts));

  console.log('Handle close discussion', d);

  const discussion = await Discussion.loadEntity(d, 'hl');

  if (discussion) {
    discussion.closed = true;

    await discussion.save();
  }
}

export async function handleNewStatement({
  id,
  author,
  discussion: d,
  body: s
}) {
  const ts = ~~(Date.now() / 1e3);
  register.setCurrentBlock('hl', BigInt(ts));

  console.log('Handle new statement', id, author, d, s);

  const statement = new Statement(`${d}/${id}`, 'hl');
  statement.author = author;
  statement.body = s;
  statement.vote_count = 0;
  statement.scores_1 = 0;
  statement.scores_2 = 0;
  statement.scores_3 = 0;
  statement.created = ~~(Date.now() / 1e3);
  statement.statement_id = id;
  statement.discussion_id = d;
  statement.discussion = d;

  await statement.save();

  const discussion = await Discussion.loadEntity(d, 'hl');

  if (discussion) {
    discussion.statement_count += 1;

    await discussion.save();
  }
}

export async function handlePinStatement({ discussion: d, statement: s }) {
  const ts = ~~(Date.now() / 1e3);
  register.setCurrentBlock('hl', BigInt(ts));

  console.log('Handle pin statement vote', d, s);

  const statement = await Statement.loadEntity(`${d}/${s}`, 'hl');

  if (statement) {
    statement.pinned = true;

    await statement.save();
  }
}

export async function handleUnpinStatement({ discussion: d, statement: s }) {
  const ts = ~~(Date.now() / 1e3);
  register.setCurrentBlock('hl', BigInt(ts));

  console.log('Handle unpin statement', d, s);

  const statement = await Statement.loadEntity(`${d}/${s}`, 'hl');

  if (statement) {
    statement.pinned = false;

    await statement.save();
  }
}

export async function handleHideStatement({ discussion: d, statement: s }) {
  const ts = ~~(Date.now() / 1e3);
  register.setCurrentBlock('hl', BigInt(ts));

  console.log('Handle hide statement vote', d, s);

  const statement = await Statement.loadEntity(`${d}/${s}`, 'hl');

  if (statement) {
    statement.hidden = true;

    await statement.save();
  }
}

export async function handleNewVote({
  voter,
  discussion: d,
  statement: s,
  choice
}) {
  const ts = ~~(Date.now() / 1e3);
  register.setCurrentBlock('hl', BigInt(ts));

  console.log('Handle new vote', voter, d, s, choice);

  const id = `${d}/${s}/${voter}`;
  const vote = new Vote(id, 'hl');
  vote.voter = voter;
  vote.choice = choice;
  vote.created = ~~(Date.now() / 1e3);
  vote.discussion_id = d;
  vote.statement_id = s;
  vote.discussion = d;
  vote.statement = s;

  await vote.save();

  const discussion = await Discussion.loadEntity(d, 'hl');
  const statement = await Statement.loadEntity(`${d}/${s}`, 'hl');

  if (discussion && statement) {
    discussion.vote_count += 1;
    statement.vote_count += 1;
    statement[`scores_${choice}`] += 1;

    await discussion.save();
    await statement.save();
  }
}
