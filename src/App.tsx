import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageUploader from "./components/ImageUploader";
import TextOutput from "./components/TextOutput";

const App: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light p-5 pt-2" style={{ fontFamily: "Arial, sans-serif", }}>
      <div className="w-100" style={{ maxWidth: "100%" }}>
        <h1 className="text-center mb-5">Image to Text Converter</h1>

        <div className="row g-4">
          {/* Left Side: Image Upload + Preview */}
          <div className="col-md-5 d-flex flex-column align-items-center">
            <ImageUploader
              setText={setText}
              setLoading={setLoading}
              setImagePreview={setImagePreview}
            />

            {imagePreview && (
              <div className="border p-2 mt-3 rounded shadow-sm w-100 text-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-fluid rounded"
                />
              </div>
            )}
          </div>

          {/* Right Side: OCR Output */}
          <div className="col-md-7">
            {imagePreview && (
              <TextOutput text={text} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
