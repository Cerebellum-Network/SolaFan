export class NoSuchModuleError extends Error {
  constructor(moduleName: string) {
    super();
    this.name = 'NoSuchModuleError';
    this.message = `No such module: ${moduleName}. Add this module to the store before accessing it.`;
  }
}
