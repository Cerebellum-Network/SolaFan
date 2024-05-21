export const copyToClipboard = (
  event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLElement> | React.MouseEvent<SVGSVGElement>,
  input: string,
  cb: Function,
) => {
  event.preventDefault();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(input).then(
      () => {
        console.log('Copied to clipboard successfully.');
        cb();
      },
      (err) => {
        console.log('Failed to copy the text to clipboard.', err);
      },
    );
  }
};
