# Karminetra – The Eye of the Artisan

**Team:** TechTwist Duo | **Demo Link:** https://karminetra.vercel.app/

## Overview

Karminetra is an AI-powered mobile application designed to empower Indian artisans with low digital literacy to sell their products online. It uses a photo-first, voice-first approach to eliminate technological and language barriers, turning a single photograph into a complete e-commerce listing and allowing store management through simple voice commands in local languages like Kannada.

## Key Features

* **AI-Powered Cataloguing:** Instantly generates a product title, description, keywords, and a fair market price from a single photo using the Gemini API.
* **Voice-First Management:** Artisans can update stock, check orders, and manage their store using natural language voice commands via Dialogflow and the Speech-to-Text API.
* **Multilingual Support:** All generated content and UI elements are available in both English and the artisan's native language.
* **Mini Digital Store:** Automatically creates a shareable, professional-looking store page with a QR code for easy sharing on WhatsApp and social media.

## Technology Stack

* **AI & Machine Learning:**
    * **Google Gemini 2.5 Flash:** For multimodal (image-to-text) catalog generation.
    * **Dialogflow CX & Speech-to-Text/Text-to-Speech:** For the conversational voice assistant.
    * **Google Translate API:** For real-time language translation.
* **Backend & Infrastructure:**
    * **Firebase:** For Authentication (Phone OTP), Firestore (Database), and Storage.
    * **Cloud Functions:** For serverless backend logic.
* **Frontend:**
    * **React & Tailwind CSS:** For a responsive, mobile-first user interface.

## Local Setup

### Prerequisites
* Node.js
* Firebase Project with necessary APIs enabled.

### Installation & Running
1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd [repo-name]
    ```
2.  **Configure Firebase:**
    * Set up your Firebase configuration object in the main application file. For the Gemini API, ensure your API key is configured.
3.  **Install dependencies and run:**
    ```bash
    npm install
    npm start
    ```

## 🛣️ Future Scope
Our roadmap includes full order management with UPI integration, AI-driven demand insights for artisans, and a QR-based authenticity seal for products.
