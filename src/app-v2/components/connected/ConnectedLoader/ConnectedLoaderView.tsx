import {Typography} from '@material-ui/core';

export const ConnectedLoaderView = (params: {visible: boolean; text?: string}) => {
  return params.visible ? (
    <div id="cover-spin" className="fixed inset-0 bg-black bg-opacity-70 z-50">
      <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-white">
        <div className="flex flex-row gap-2 items-center justify-content-center">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
          {params?.text && <Typography variant="body1">{params.text}</Typography>}
        </div>
      </div>
    </div>
  ) : null;
};
