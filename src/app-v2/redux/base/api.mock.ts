type MockApiConfig = {
  dataToReturn?: any;
  errorToThrowConstructor?: any;
  errorMessage?: string;
  shouldFail?: boolean;
};

export const mockApi = ({dataToReturn, errorToThrowConstructor, errorMessage, shouldFail}: MockApiConfig) => {
  return () =>
    new Promise((resolve, reject) => {
      if (shouldFail) {
        reject(new errorToThrowConstructor!(errorMessage));
        return;
      }
      resolve(dataToReturn);
    });
};
