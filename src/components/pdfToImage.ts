import pdfjsLib from "./pdfWorker";

export const convertPdfToImages = async (file: File): Promise<Blob[]> => {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

  const images: Blob[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;

    const blob: Blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/png")
    );

    images.push(blob);
  }

  return images;
};
