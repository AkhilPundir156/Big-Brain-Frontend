import { PhotoProvider, PhotoView } from 'react-photo-view';

interface ImgPreviewProps {
    images: string;
    classes?: string;
}

export default function ImgPreview({images, classes}: ImgPreviewProps) {
  return (
    <PhotoProvider>
      <div className="foo">
          <PhotoView key={images} src={images}>
            <img src={images} alt="" className={classes}/>
          </PhotoView>
      </div>
    </PhotoProvider>
  );
}
