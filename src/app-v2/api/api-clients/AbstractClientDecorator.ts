import {TypeGuard} from './types';

export abstract class AbstractClientDecorator {
  protected checkDataAndReturnValidEntries<ReturnType>(
    responseData: unknown,
    typeGuard: TypeGuard,
  ): ReturnType | undefined {
    if (!Array.isArray(responseData)) {
      if (!typeGuard(responseData)) {
        console.error(
          `Response was declined by the type guard: ${typeGuard.name}. Response: ${JSON.stringify(responseData)}`,
        );
        return undefined;
      }
      return responseData as ReturnType;
    }
    const filteredByTypeData = responseData.filter((dataItem) => typeGuard(dataItem));
    if (filteredByTypeData.length !== responseData.length) {
      console.error(
        responseData.length - filteredByTypeData.length,
        `item(s) were excluded by the type guard: ${typeGuard.name}`,
      );
    }
    return filteredByTypeData as unknown as ReturnType;
  }
}
