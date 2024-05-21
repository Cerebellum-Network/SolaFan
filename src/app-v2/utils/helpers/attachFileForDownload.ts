export const attachFileForDownload = (url: string, name = 'cere'): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  document.body.removeChild(link);
};
