import { PDFDocument } from "pdf-lib";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export function getNonEmptyPixels(image) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    canvas.width = image.width;
    canvas.height = image.height;
  
    context.drawImage(image, 0, 0);
  
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const nonEmptyPixels = [];
  
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const alpha = imageData.data[index + 3];
  
        if (alpha > 0) {
          nonEmptyPixels.push({ x, y });
        }
      }
    }
  
    return nonEmptyPixels;
  }
  
  export function getCroppingRect(nonEmptyPixels) {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let maxY = Number.MIN_VALUE;
  
    nonEmptyPixels.forEach((pixel) => {
      minX = Math.min(minX, pixel.x);
      minY = Math.min(minY, pixel.y);
      maxX = Math.max(maxX, pixel.x);
      maxY = Math.max(maxY, pixel.y);
    });
  
    const width = maxX - minX + 1;
    const height = maxY - minY + 1;
  
    return {
      x: minX,
      y: minY,
      width,
      height,
    };
  }
  export function handleScroll(event, numPages, positions, pdfImageSize, thumbnailContainerRef, setCurrentPage, setpositions) {
    const container = event.target;
    if (container) {
      const { scrollTop, scrollHeight } = container;
      const pageHeight = scrollHeight / numPages;
      const currentPage = Math.floor(scrollTop / pageHeight) + 1;
      setCurrentPage(currentPage);
      console.log(pdfImageSize);
      const adjustedTop = positions[currentPage - 1]?.y +  (scrollTop * pdfImageSize.height) / scrollHeight;
      const updatedpositions = [...positions];
      updatedpositions[currentPage - 1] = {
        ...updatedpositions[currentPage - 1],
        y: adjustedTop,
      };
      setpositions(updatedpositions);
      if (thumbnailContainerRef.current) {
        const thumbnailScrollTop = (currentPage - 1) * 100;
        thumbnailContainerRef.current.scrollTo(0, thumbnailScrollTop);
      }
    }
  }

  export function getDimensionsBasedOnScreenSize(){
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      // For smaller screens (e.g., mobile)
      return {
        minWidth: 70,
        minHeight: 27,
        maxWidth: 240,
        maxHeight: 100,
      };
    } else if (screenWidth <= 1024) {
      // For medium-sized screens (e.g., tablets)
      return {
        minWidth: 50,
        minHeight: 30,
        maxWidth: 300,
        maxHeight: 130,
      };
    } else {
      // For larger screens (e.g., desktops)
      return {
        minWidth: 90,
        minHeight: 30,
        maxWidth: 350,
        maxHeight: 150,
      };
    }
  }
//for single
async function generateSignedPdf(pdfFile, drawingData, positions, signatureSize, numPages) {
  try {
    const existingPdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const element = document.querySelector('.tmpid'); 
    const styles = window.getComputedStyle(element);
    const widthWithPaddingAndMargin = parseFloat(styles.width); 
    const heightWithPaddingAndMargin = parseFloat(styles.height);
    for (let i = 0; i < numPages; i++) {
      const page = pages[i];
      const drawingDataURL = drawingData[i + 1];
      if (drawingDataURL) {
        const base64Data = drawingDataURL.split("base64,")[1];
        const drawingImageBytes = new Uint8Array(
          atob(base64Data).split("").map((char) => char.charCodeAt(0))
        );
        const drawingImage = await pdfDoc.embedPng(drawingImageBytes);
        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();
        const xRatio = pageWidth / widthWithPaddingAndMargin;
        const yRatio = pageHeight / heightWithPaddingAndMargin;
        const x = (positions[i].x) * xRatio; 
        const y = (heightWithPaddingAndMargin - positions[i].y - parseFloat(signatureSize[i].height)) * yRatio;
        page.drawImage(drawingImage, {
          x, y,
          width: parseFloat(signatureSize[i].width) * xRatio,
          height: parseFloat(signatureSize[i].height) * yRatio,
        });
      }
    }
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "signed_pdf.pdf";
    downloadLink.click();
  } catch (error) {
    console.error("Error generating signed PDF:", error);
  }
}

export { generateSignedPdf };


export async function generateThumbnails(file) {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result);
      try {
        const pdf = await pdfjs.getDocument(typedArray).promise;
        const numPages = pdf.numPages;
        const thumbnailUrls = [];
        const contentUrls = [];

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.0 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const scale = 1.0;
          canvas.width = viewport.width * scale;
          canvas.height = viewport.height * scale;
          const renderContext = {
            canvasContext: context,
            viewport: page.getViewport({ scale: scale }),
          };
          await page.render(renderContext).promise;
          const thumbnailUrl = canvas.toDataURL();
          thumbnailUrls.push(thumbnailUrl);

          const contentUrl = canvas.toDataURL("image/jpeg");
          contentUrls.push(contentUrl);
        }

        resolve({ thumbnailUrls, contentUrls });
      } catch (error) {
        reject(error);
      }
    };

    fileReader.readAsArrayBuffer(file);
  });
}

export function handleThumbnailClick(pageNumber, mainContainerRef, setCurrentPage,numPages) {
  if (mainContainerRef.current) {
    const scrollableContainer = mainContainerRef.current;
    const containerHeight = scrollableContainer.scrollHeight;
    const pageHeight = containerHeight / numPages;
    const scrollToY = (pageNumber - 1) * pageHeight + 3;
    scrollableContainer.scrollTo({ top: scrollToY, behavior: "smooth" });
  }
  setCurrentPage(pageNumber);
}