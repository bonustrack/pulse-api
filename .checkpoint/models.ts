import { Model } from '@snapshot-labs/checkpoint';

export class Discussion extends Model {
  static tableName = 'discussions';

  constructor(id: string, indexerName: string) {
    super(Discussion.tableName, indexerName);

    this.initialSet('id', id);
    this.initialSet('title', "");
    this.initialSet('body', null);
    this.initialSet('author', "");
    this.initialSet('statement_count', 0);
    this.initialSet('vote_count', 0);
    this.initialSet('created', 0);
    this.initialSet('closed', false);
    this.initialSet('statements', "[]");
    this.initialSet('votes', "[]");
    this.initialSet('_indexer', "");
  }

  static async loadEntity(id: string, indexerName: string): Promise<Discussion | null> {
    const entity = await super._loadEntity(Discussion.tableName, id, indexerName);
    if (!entity) return null;

    const model = new Discussion(id, indexerName);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get title(): string {
    return this.get('title');
  }

  set title(value: string) {
    this.set('title', value);
  }

  get body(): string | null {
    return this.get('body');
  }

  set body(value: string | null) {
    this.set('body', value);
  }

  get author(): string {
    return this.get('author');
  }

  set author(value: string) {
    this.set('author', value);
  }

  get statement_count(): number {
    return this.get('statement_count');
  }

  set statement_count(value: number) {
    this.set('statement_count', value);
  }

  get vote_count(): number {
    return this.get('vote_count');
  }

  set vote_count(value: number) {
    this.set('vote_count', value);
  }

  get created(): number {
    return this.get('created');
  }

  set created(value: number) {
    this.set('created', value);
  }

  get closed(): boolean {
    return this.get('closed');
  }

  set closed(value: boolean) {
    this.set('closed', value);
  }

  get statements(): string[] {
    return JSON.parse(this.get('statements'));
  }

  set statements(value: string[]) {
    this.set('statements', JSON.stringify(value));
  }

  get votes(): string[] {
    return JSON.parse(this.get('votes'));
  }

  set votes(value: string[]) {
    this.set('votes', JSON.stringify(value));
  }

  get _indexer(): string {
    return this.get('_indexer');
  }

  set _indexer(value: string) {
    this.set('_indexer', value);
  }
}

export class Statement extends Model {
  static tableName = 'statements';

  constructor(id: string, indexerName: string) {
    super(Statement.tableName, indexerName);

    this.initialSet('id', id);
    this.initialSet('body', "");
    this.initialSet('author', "");
    this.initialSet('scores_1', 0);
    this.initialSet('scores_2', 0);
    this.initialSet('scores_3', 0);
    this.initialSet('vote_count', 0);
    this.initialSet('pinned', false);
    this.initialSet('hidden', false);
    this.initialSet('created', 0);
    this.initialSet('discussion_id', 0);
    this.initialSet('statement_id', 0);
    this.initialSet('discussion', "");
    this.initialSet('votes', "[]");
    this.initialSet('_indexer', "");
  }

  static async loadEntity(id: string, indexerName: string): Promise<Statement | null> {
    const entity = await super._loadEntity(Statement.tableName, id, indexerName);
    if (!entity) return null;

    const model = new Statement(id, indexerName);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get body(): string {
    return this.get('body');
  }

  set body(value: string) {
    this.set('body', value);
  }

  get author(): string {
    return this.get('author');
  }

  set author(value: string) {
    this.set('author', value);
  }

  get scores_1(): number {
    return this.get('scores_1');
  }

  set scores_1(value: number) {
    this.set('scores_1', value);
  }

  get scores_2(): number {
    return this.get('scores_2');
  }

  set scores_2(value: number) {
    this.set('scores_2', value);
  }

  get scores_3(): number {
    return this.get('scores_3');
  }

  set scores_3(value: number) {
    this.set('scores_3', value);
  }

  get vote_count(): number {
    return this.get('vote_count');
  }

  set vote_count(value: number) {
    this.set('vote_count', value);
  }

  get pinned(): boolean {
    return this.get('pinned');
  }

  set pinned(value: boolean) {
    this.set('pinned', value);
  }

  get hidden(): boolean {
    return this.get('hidden');
  }

  set hidden(value: boolean) {
    this.set('hidden', value);
  }

  get created(): number {
    return this.get('created');
  }

  set created(value: number) {
    this.set('created', value);
  }

  get discussion_id(): number {
    return this.get('discussion_id');
  }

  set discussion_id(value: number) {
    this.set('discussion_id', value);
  }

  get statement_id(): number {
    return this.get('statement_id');
  }

  set statement_id(value: number) {
    this.set('statement_id', value);
  }

  get discussion(): string {
    return this.get('discussion');
  }

  set discussion(value: string) {
    this.set('discussion', value);
  }

  get votes(): string[] {
    return JSON.parse(this.get('votes'));
  }

  set votes(value: string[]) {
    this.set('votes', JSON.stringify(value));
  }

  get _indexer(): string {
    return this.get('_indexer');
  }

  set _indexer(value: string) {
    this.set('_indexer', value);
  }
}

export class Vote extends Model {
  static tableName = 'votes';

  constructor(id: string, indexerName: string) {
    super(Vote.tableName, indexerName);

    this.initialSet('id', id);
    this.initialSet('voter', "");
    this.initialSet('choice', 0);
    this.initialSet('created', 0);
    this.initialSet('discussion_id', 0);
    this.initialSet('statement_id', 0);
    this.initialSet('discussion', "");
    this.initialSet('statement', "");
    this.initialSet('_indexer', "");
  }

  static async loadEntity(id: string, indexerName: string): Promise<Vote | null> {
    const entity = await super._loadEntity(Vote.tableName, id, indexerName);
    if (!entity) return null;

    const model = new Vote(id, indexerName);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get voter(): string {
    return this.get('voter');
  }

  set voter(value: string) {
    this.set('voter', value);
  }

  get choice(): number {
    return this.get('choice');
  }

  set choice(value: number) {
    this.set('choice', value);
  }

  get created(): number {
    return this.get('created');
  }

  set created(value: number) {
    this.set('created', value);
  }

  get discussion_id(): number {
    return this.get('discussion_id');
  }

  set discussion_id(value: number) {
    this.set('discussion_id', value);
  }

  get statement_id(): number {
    return this.get('statement_id');
  }

  set statement_id(value: number) {
    this.set('statement_id', value);
  }

  get discussion(): string {
    return this.get('discussion');
  }

  set discussion(value: string) {
    this.set('discussion', value);
  }

  get statement(): string {
    return this.get('statement');
  }

  set statement(value: string) {
    this.set('statement', value);
  }

  get _indexer(): string {
    return this.get('_indexer');
  }

  set _indexer(value: string) {
    this.set('_indexer', value);
  }
}
