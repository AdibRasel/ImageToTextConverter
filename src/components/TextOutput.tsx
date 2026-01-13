interface TextOutputProps {
  text: string;
  loading: boolean;
}

const TextOutput: React.FC<TextOutputProps> = ({ text, loading }) => {
  return (
    <div className="mt-3">
      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "300px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 mb-0">Processing image...</p>
        </div>
      ) : (
        <div
          className="card shadow-sm p-3"
          style={{
            minHeight: "300px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowY: "auto",
          }}
        >
          <p className="mb-0">{text}</p>
        </div>
      )}
    </div>
  );
};

export default TextOutput;
