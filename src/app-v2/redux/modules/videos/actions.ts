import {DdcParams, SeriesCollection, VideoMetadata} from './types';

const NAMESPACE = '[VIDEOS]';

export class SetVideosLoadingDocument {
  static type = `${NAMESPACE} set-videos-loading-document`;
  static create(loading: boolean) {
    return {
      type: this.type,
      payload: loading,
    };
  }
}

export class SetVideosDocument {
  static type = `${NAMESPACE} set-videos-document`;
  static create(videos: VideoMetadata[]) {
    return {
      type: this.type,
      payload: videos,
    };
  }
}

export class SetVideosErrorDocument {
  static type = `${NAMESPACE} set-videos-error-document`;
  static create(error: Error | null) {
    return {
      type: this.type,
      payload: error,
    };
  }
}

export class SetVideoDdcParamsDocument {
  static type = `${NAMESPACE} set-video-ddc-params-document`;
  static create(params: DdcParams) {
    return {
      type: this.type,
      payload: params,
    };
  }
}

export class SetVideoSeriesLoadingDocument {
  static type = `${NAMESPACE} set-video-series-loading-document`;
  static create(loading: boolean) {
    return {
      type: this.type,
      payload: loading,
    };
  }
}

export class SetVideoSeriesDocument {
  static type = `${NAMESPACE} set-video-series-document`;
  static create(series: SeriesCollection[]) {
    return {
      type: this.type,
      payload: series,
    };
  }
}

export class SetVideoSeriesErrorDocument {
  static type = `${NAMESPACE} set-video-series-error-document`;
  static create(error: Error | null) {
    return {
      type: this.type,
      payload: error,
    };
  }
}
