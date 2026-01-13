import type { ChangeEvent } from "react";
import Tesseract from "tesseract.js";

interface ImageUploaderProps {
  setText: (text: string) => void;
  setLoading: (loading: boolean) => void;
  setImagePreview: (url: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  setText,
  setLoading,
  setImagePreview,
}) => {
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setLoading(true);

    Tesseract.recognize(file, "ben+eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setText(text);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mb-3 w-100">
      <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUploader;
