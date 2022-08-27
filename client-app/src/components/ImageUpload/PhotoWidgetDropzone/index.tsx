import { CSSProperties, FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

interface Props {
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

const dropzoneStyles: CSSProperties = {
  border: "dashed 3px #eee",
  borderColor: "#eee",
  borderRadius: 5,
  paddingTop: 30,
  textAlign: "center",
  height: 200,
};

const dropzoneActiveStyles: CSSProperties = {
  borderColor: "green",
};

const PhotoWidgetDropzone: FC<Props> = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropzoneStyles, ...dropzoneActiveStyles }
          : dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
};

export default PhotoWidgetDropzone;
