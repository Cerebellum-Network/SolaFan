export class FetchCreatorByIdError extends Error {
  constructor(creatorId: string) {
    super();
    this.name = 'FetchCreatorByIdError';
    this.message = `Cannot load a creator with id = ${creatorId}`;
  }
}
