document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const fileInput = document.getElementById('file-input');
  const processButton = document.getElementById('process-button');
  const dropArea = document.getElementById('drop-area');
  const loader = document.getElementById('loader');

  // Array to hold images added via drag & drop
  let filesQueue = [];

  // Drag & Drop handlers
  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
  });

  dropArea.addEventListener('dragleave', (e) => {
    dropArea.classList.remove('drag-over');
  });

  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    const droppedFiles = Array.from(e.dataTransfer.files);
    // Keep only image files
    const images = droppedFiles.filter(file => file.type.startsWith('image/'));
    filesQueue = filesQueue.concat(images);

    if (filesQueue.length > 10) {
      filesQueue = filesQueue.slice(0, 10);
      alert("Only 10 images are allowed. Extra files have been ignored.");
    }
    output.textContent = `${filesQueue.length} image(s) queued for processing.`;
  });

  // Utility function to clean up OCR text for readability
  function cleanText(text) {
    if (!text) return "";
    let cleaned = text.trim();

    // Replace one or more newlines with a single space
    cleaned = cleaned.replace(/[\r\n]+/g, ' ');

    // Replace multiple spaces with a single space
    cleaned = cleaned.replace(/\s+/g, ' ');

    // Add a full stop if needed.
    if (!/[.!?]$/.test(cleaned)) {
      cleaned += '.';
    }
    return cleaned;
  }

  // Function that simulates the typewriter effect.
  function typeWriter(text, element, index = 0) {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => typeWriter(text, element, index + 1), 30);
    }
  }

  processButton.addEventListener('click', async () => {
    // Clear previous content and show loader
    output.textContent = "";
    loader.style.display = "block";

    // Use dropped files (if any) or the file input selection.
    let filesToProcess = filesQueue.length > 0 ? filesQueue : Array.from(fileInput.files);

    if (!filesToProcess || filesToProcess.length === 0) {
      output.textContent = 'No image selected.';
      loader.style.display = "none";
      return;
    }

    if (filesToProcess.length > 10) {
      output.textContent = 'Please select up to 10 images only.';
      loader.style.display = "none";
      return;
    }

    let finalText = '';

    // Process images sequentially
    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      const imageUrl = URL.createObjectURL(file);

      try {
        // Extract text from the image using Tesseract.js.
        const { data: { text } } = await Tesseract.recognize(imageUrl, 'eng', {
          tessedit_pageseg_mode: Tesseract.PSM.AUTO
        });

        // Clean and format the extracted text.
        const formattedText = cleanText(text);
        finalText += formattedText + "\n\n";
      } catch (err) {
        finalText += `[Error processing ${file.name}: ${err.message}]\n\n`;
      }
    }

    // Hide the loader when processing is complete.
    loader.style.display = "none";

    // Start with an empty output card.
    output.textContent = "";

    // Use typewriter effect to gradually display the final text.
    typeWriter(finalText, output);

    // Reset queue and file input for another run.
    filesQueue = [];
    fileInput.value = "";
  });
});
