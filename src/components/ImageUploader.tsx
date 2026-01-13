import { ChangeEvent } from "react";
import Tesseract from "tesseract.js";
import { convertPdfToImages } from "./pdfToImage";
import { runMultiPageOCR } from "./ocrMultiPage";

interface Props {
  setText: (text: string) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setImagePreview: (url: string | null) => void;
}

const ImageUploader: React.FC<Props> = ({
  setText,
  setLoading,
  setProgress,
  setImagePreview,
}) => {
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setText("");

    try {
      let images: Blob[];

      if (file.type === "application/pdf") {
        images = await convertPdfToImages(file);
        setImagePreview(URL.createObjectURL(images[0]));
      } else {
        images = [file];
        setImagePreview(URL.createObjectURL(file));
      }

      const text = await runMultiPageOCR(images, ({ percent }) =>
        setProgress(percent)
      );

      setText(text);
    } catch (err) {
      console.error(err);
      alert("OCR failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <input
      type="file"
      accept=".jpg,.jpeg,.png,.pdf"
      className="form-control"
      onChange={handleUpload}
    />
  );
};

export default ImageUploader;
