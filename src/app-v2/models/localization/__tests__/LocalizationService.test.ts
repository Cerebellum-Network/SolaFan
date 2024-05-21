import {LocaleNotSupportedError} from '../LocaleNotSupportedError';
import {LocalizationService} from '../LocalizationService';
import {UserLocaleStorage} from '../UserLocaleStorage';

describe('LocalizationService', () => {
  let localeStorage: UserLocaleStorage;

  beforeEach(() => {
    localeStorage = {
      setUserLocale: jest.fn(),
      getUserLocale: jest.fn(() => 'locale'),
    };
  });

  it('returns user locale from url', () => {
    // @ts-ignore
    delete window.location;
    window.location = {pathname: 'en/some/path'} as any;
    const service = new LocalizationService(localeStorage, 'default', ['en', 'default']);
    const locale = service.getUserLocale();
    expect(locale).toEqual('en');
    expect(localeStorage.getUserLocale).not.toBeCalled();
  });

  it('returns user locale from local storage if url does not contain supported locale', () => {
    // @ts-ignore
    delete window.location;
    window.location = {pathname: 'some/path'} as any;
    const service = new LocalizationService(localeStorage, 'default', ['en', 'default']);
    const locale = service.getUserLocale();
    expect(locale).toEqual('locale');
    expect(localeStorage.getUserLocale).toBeCalled();
  });

  it('returns default locale if no saved locale found', () => {
    // @ts-ignore
    delete window.location;
    window.location = {pathname: 'some/path'} as any;
    (localeStorage.getUserLocale as jest.Mock).mockImplementationOnce(() => {
      throw new Error();
    });
    const service = new LocalizationService(localeStorage, 'default', ['en', 'default']);
    const locale = service.getUserLocale();
    expect(locale).toEqual('default');
    expect(localeStorage.getUserLocale).toBeCalled();
  });

  it('sets user locale', () => {
    const service = new LocalizationService(localeStorage, 'default', ['en', 'default']);
    service.setUserLocale('en');
    expect(localeStorage.setUserLocale).toBeCalledWith('en');
  });

  it('throws an error if someone tries to set not supported locale', () => {
    const service = new LocalizationService(localeStorage, 'default', ['en', 'default']);
    expect(() => service.setUserLocale('not_supported')).toThrow(LocaleNotSupportedError);
  });
});
