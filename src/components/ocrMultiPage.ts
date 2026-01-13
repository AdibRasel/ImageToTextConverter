import Tesseract from "tesseract.js";

interface OcrProgress {
  percent: number;
  status: string;
}

export const runMultiPageOCR = async (
  images: Blob[],
  onProgress: (p: OcrProgress) => void
): Promise<string> => {
  let fullText = "";
  let completed = 0;

  for (let i = 0; i < images.length; i++) {
    const { data } = await Tesseract.recognize(images[i], "ben+eng", {
      logger: (m) => {
        if (m.progress) {
          const base = (completed / images.length) * 100;
          const current = m.progress * (100 / images.length);
          onProgress({
            percent: Math.round(base + current),
            status: m.status,
          });
        }
      },
    });

    fullText += `\n\n--- Page ${i + 1} ---\n\n${data.text}`;
    completed++;
  }

  return fullText;
};
