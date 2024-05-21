export class MissingExpectedFieldError extends Error {
  constructor(missingFieldTitle: string) {
    super();
    this.name = 'GraphQLResponseError';
    this.message = `Received response does not contain expected field: ${missingFieldTitle}`;
  }
}
