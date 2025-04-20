# OCR Screenshot Text Extractor

This project is a lightweight JavaScript application that extracts text from screenshots using Optical Character Recognition (OCR). It leverages Tesseract.js to recognize text from up to 10 uploaded images (via file selection or drag-and-drop), formats the text into a clean, readable output, and displays it with an engaging typewriter effect inside a beautifully styled card. A loading spinner (rolling doughnut) provides feedback during processing.

## Features

- **OCR Extraction:** Uses [Tesseract.js](https://github.com/naptha/tesseract.js) to extract text from images.
- **Multiple File Upload:** Supports both file picker selection and drag-and-drop for uploading up to 10 images at once.
- **Text Cleanup & Formatting:** Cleans OCR output by removing extra spaces/newlines and appends punctuation if required.
- **Loader Indicator:** Displays a rolling doughnut spinner while images are being processed.
- **Typewriter Animation:** Reveals the final, combined text gradually with a typewriter effect.
- **Responsive and Modern UI:** Features a stylized hero section and a neat output card to display the extracted text.

## Tech Tools & Technologies Used

- **HTML5:**  
  Provides the structure and semantic elements of the application.

- **CSS3:**  
  Styles the user interface including the hero section, drag-and-drop area, output card, and the loader spinner. Custom animations (keyframes) are used to create the typewriter effect and rolling doughnut loader.

- **Vanilla JavaScript:**  
  Handles user interactions (file selection, drag-and-drop), manages OCR processing with asynchronous functions, and controls the typewriter animation for displaying the text.

- **Tesseract.js:**  
  A powerful JavaScript OCR engine that converts image content into text. It automatically segments pages for optimal extraction.

## How It Works

1. **Image Uploading:**
    - Users can select image files through a traditional file picker or simply drag and drop images into the designated area.
    - The application limits the number of images to a maximum of 10.

2. **OCR Processing:**
    - Each image is processed sequentially using Tesseract.js with an automatic page segmentation mode.
    - Extracted text from each image is cleaned up for extra whitespace and formatting inconsistencies.

3. **Loading & Animation:**
    - A rolling doughnut loader is displayed while images are being processed.
    - Once processing is complete, a typewriter effect gradually reveals the final, concatenated text inside a styled card.

4. **Final Display:**
    - The cleaned and merged text outputs are rendered inside a neat square card, enhancing readability.

## Installation & Usage

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
