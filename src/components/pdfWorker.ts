import * as pdfjsLib from "pdfjs-dist";

// ✅ Vite + pdfjs-dist SAFE worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

export default pdfjsLib;
