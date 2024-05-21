export class EventFetchError extends Error {
  constructor() {
    super();
    this.name = 'EventFetchError';
    this.message = 'Cannot fetch event. Please, try again later';
  }
}

export class MoreExhibitsFetchError extends Error {
  constructor() {
    super();
    this.name = 'MoreExhibitsFetchError';
    this.message = 'Cannot fetch more exhibits. Please, try again later';
  }
}

export class NftTicketsFetchError extends Error {
  constructor() {
    super();
    this.name = 'NftTicketsFetchError';
    this.message = 'Cannot fetch nft tickets. Please, try again later';
  }
}
