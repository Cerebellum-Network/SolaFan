const PREVIOUS_URL = 'previous-url';
export class NavigationStorage {
  static setPreviousUrl(previousUrl: string): void {
    localStorage.setItem(PREVIOUS_URL, previousUrl);
  }

  static removePreviousUrl(): void {
    localStorage.removeItem(PREVIOUS_URL);
  }

  static getPreviousUrl(): string | null {
    return localStorage.getItem(PREVIOUS_URL);
  }
}
