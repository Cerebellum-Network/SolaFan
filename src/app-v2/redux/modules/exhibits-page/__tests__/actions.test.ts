import {
  ExhibitsDocument,
  ExhibitsSeoDocument,
  FetchExhibitsCommand,
  FetchExhibitsFinishedEvent,
  FetchExhibitsSeoFinishedEvent,
  FetchExhibitsSeoStartedEvent,
  FetchExhibitsStartedEvent,
} from '../actions';

const EXHIBITS_PAGE = '[EXHIBITS PAGE]';

describe('Exhibits actions', () => {
  it('creates FetchExhibitsCommand', () => {
    expect(FetchExhibitsCommand.create()).toEqual({type: `${EXHIBITS_PAGE} Fetch exhibits`});
  });

  it('creates ExhibitsDocument', () => {
    expect(ExhibitsDocument.create(['exhibit1', 'exhibit2'] as any)).toEqual({
      type: `${EXHIBITS_PAGE} Exhibits`,
      payload: ['exhibit1', 'exhibit2'],
    });
  });

  it('creates ExhibitsFetchingStartedEvent', () => {
    expect(FetchExhibitsStartedEvent.create()).toEqual({
      type: `${EXHIBITS_PAGE} Fetch exhibits started`,
    });
  });

  it('creates ExhibitsFetchingFinishedEvent', () => {
    expect(FetchExhibitsSeoFinishedEvent.create()).toEqual({
      type: `${EXHIBITS_PAGE} Fetch exhibits seo finished`,
    });
  });

  it('creates ExhibitsSeoDocument', () => {
    expect(ExhibitsSeoDocument.create(['exhibitSeo1', 'exhibitSeo2'] as any)).toEqual({
      type: `${EXHIBITS_PAGE} Exhibits seo`,
      payload: ['exhibitSeo1', 'exhibitSeo2'],
    });
  });

  it('creates ExhibitsSeoFetchingStartedEvent', () => {
    expect(FetchExhibitsSeoStartedEvent.create()).toEqual({
      type: `${EXHIBITS_PAGE} Fetch exhibits seo started`,
    });
  });

  it('creates ExhibitsSeoFetchingFinishedEvent', () => {
    expect(FetchExhibitsFinishedEvent.create()).toEqual({
      type: `${EXHIBITS_PAGE} Fetch exhibits finished`,
    });
  });
});
