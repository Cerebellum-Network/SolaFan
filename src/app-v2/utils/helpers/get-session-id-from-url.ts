export function getSessionIdFromUrl(url?: string): string | undefined {
  if (!url) return;
  const params: string[] = url.split('&');
  let sessionId: string = '';
  for (const param of params) {
    if (param.startsWith('session_id=')) {
      sessionId = param.substring('session_id='.length);
      break;
    }
  }
  return sessionId;
}
