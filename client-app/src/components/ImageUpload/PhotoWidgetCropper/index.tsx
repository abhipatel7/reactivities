import { FC } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
  setCropper: React.Dispatch<React.SetStateAction<Cropper | undefined>>;
  imagePreview: string;
}

const PhotoWidgetCropper: FC<Props> = ({ imagePreview, setCropper }) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
};

export default PhotoWidgetCropper;
