interface Props {
  text: string;
  loading: boolean;
  progress: number;
}

const TextOutput: React.FC<Props> = ({ text, loading, progress }) => {
  if (!loading && !text) return null;

  return (
    <div className="card p-4 shadow-sm">
      {loading && (
        <>
          <div className="mb-2 fw-semibold">Processing... {progress}%</div>
          <div className="progress mb-3">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
      {!loading && <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>}
    </div>
  );
};

export default TextOutput;
