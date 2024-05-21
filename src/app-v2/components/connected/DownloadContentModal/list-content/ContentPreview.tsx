import {ImageSquare} from '../../../primitives/ImageSquare';

export interface ContentPreviewProps {
  src: string;
}

/**
 * Preview a piece of content from the DDC. This should return the appropriate component, depending on the file type.
 */
export const ContentPreview = ({src}: ContentPreviewProps) => {
  return <ImageSquare image={src} />;
};
