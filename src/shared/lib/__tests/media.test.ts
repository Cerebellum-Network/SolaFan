import {getMediaUrl} from '../media';

const file = {
  url: 'http://original.url',
  alternativeText: 'alternativeText',
  caption: 'caption',
  formats: {
    large: {
      url: 'http://large.url',
      ext: '',
      mime: '',
      size: '',
      name: '',
      width: 0,
      height: 0,
    },
    small: {
      url: 'http://small.url',
      ext: '',
      mime: '',
      size: '',
      name: '',
      width: 0,
      height: 0,
    },
    medium: {
      url: 'http://medium.url',
      ext: '',
      mime: '',
      size: '',
      name: '',
      width: 0,
      height: 0,
    },
    thumbnail: {
      url: 'http://thumbnail.url',
      ext: '',
      mime: '',
      size: '',
      name: '',
      width: 0,
      height: 0,
    },
  },
};

describe('Media Helper', () => {
  it('should return default size URL', async () => {
    expect(getMediaUrl(file)).toEqual('http://small.url');
  });

  it('should return small size URL', async () => {
    expect(getMediaUrl(file, 'small')).toEqual('http://small.url');
  });

  it('should return original size URL', async () => {
    expect(getMediaUrl(file, 'original')).toEqual('http://original.url');
  });

  it('should return thumbnail size URL', async () => {
    expect(getMediaUrl(file, 'thumbnail')).toEqual('http://thumbnail.url');
  });

  it('should return medium size URL', async () => {
    expect(getMediaUrl(file, 'medium')).toEqual('http://medium.url');
  });

  it('should return large size URL', async () => {
    expect(getMediaUrl(file, 'large')).toEqual('http://large.url');
  });
});
