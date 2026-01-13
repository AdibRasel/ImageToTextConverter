import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageUploader from "./components/ImageUploader";
import TextOutput from "./components/TextOutput";
import { AnimatedBackground } from "animated-backgrounds";

const App: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);
  const year = new Date().getFullYear();

  // Scroll listener for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 🔹 Background Layer */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <AnimatedBackground animationName="particleNetwork" />
      </div>

      {/* 🔹 Content Layer */}
      <div
        className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          className="container bg-white bg-opacity-75 rounded-4 shadow-lg p-4 p-md-5"
          style={{ maxWidth: "1100px" }}
        >
          <h1 className="text-center mb-5 fw-bold" style={{color:"#495057"}}>Image to Text Converter</h1>

          <div className="row g-4 align-items-start">
            {/* Left: Upload + Preview */}
            <div className="col-md-5 text-center">

              <ImageUploader
                setText={setText}
                setLoading={setLoading}
                setProgress={setProgress}
                setImagePreview={setImagePreview}
              />
                <small className="text-muted d-block mt-2" style={{float:"inline-start"}}>
                * Supported formats: JPG, PNG & PDF
              </small>



              {imagePreview && (
                <div className="mt-4 p-3 border rounded-3 shadow-sm bg-light">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-fluid rounded"
                  />
                </div>
              )}
            </div>

            {/* Right: OCR Result */}
            <div className="col-md-7">
              {imagePreview && (
                <TextOutput text={text} loading={loading} progress={progress} />
              )}
            </div>
          </div>

          {/* 🔹 Glass Footer */}
          <footer
            style={{
              position: "relative",
              zIndex: 1,
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.25)",
              borderTop: "1px solid rgba(255,255,255,0.3)",
            }}
            className="py-3 mt-5"
          >
            <div className="container text-center small">
              <div className="fw-semibold mb-1">
                Developed & Maintained by{" "}
                <span className="fw-bold">Rasal Hossain</span>
              </div>

              <div className="mb-2">
                01934544352 | rasal.hossain.dev@gmail.com
              </div>

              <div className="text-muted">© {year} All rights reserved</div>

              <div className="mt-2">
                <a
                  href="https://github.com/adibrasel"
                  target="_blank"
                  className="me-3 social-icon text-decoration-none"
                >
                  GitHub
                </a>
                <a
                  href="https://rasalhossain.com"
                  target="_blank"
                  className="social-icon text-decoration-none"
                >
                  Portfolio
                </a>
              </div>
            </div>
          </footer>

          {/* 🔹 Icon Hover Animation */}
          <style>
            {`
              .social-icon {
                transition: transform 0.3s ease, color 0.3s ease;
              }
              .social-icon:hover {
                transform: translateY(-4px) scale(1.1);
                color: #0d6efd;
              }

              /* Back-to-Top Button */
              #back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 999;
                background-color: #0d6efd;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 6px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.3s ease, background-color 0.3s ease;
              }
              #back-to-top:hover {
                transform: translateY(-4px) scale(1.1);
                background-color: #0b5ed7;
              }
            `}
          </style>

          {showTopBtn && (
            <button id="back-to-top" onClick={scrollToTop} title="Back to Top">
              ↑
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
