# Lung Disease Detector (COVID-19, Pneumonia, Tuberculosis)

A web-based AI application that analyzes chest X-ray images to detect lung diseases. It features voice interaction for a seamless user experience.

## 🚀 Features

- **Multi-Disease Detection**: Classifies X-ray images into four categories:
  - COVID-19
  - Normal
  - Pneumonia
  - Tuberculosis
- **Voice Interaction**:
  - **Input**: Activate prediction using voice commands (e.g., "Which disease is this?").
  - **Output**: The application reads out the prediction result loud and clear.
- **User-Friendly Interface**: Simple web interface built with HTML/CSS.
- **Privacy-Focused**: Images are processed around the server session and not permanently stored.
- **Efficient AI Model**: Uses a quantized TensorFlow Lite model (MobileNetV2 based) for fast inference on CPU.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Web Speech API for voice features).
- **Backend**: Flask (Python).
- **Machine Learning**: TensorFlow, TensorFlow Lite, NumPy, Pillow.

## 📦 Installation & Setup

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Python 3.10 or higher
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Vaidiasri/lungs-detector.git
cd lungs-detector
```

### 2. Create a Virtual Environment

It's recommended to use a virtual environment to manage dependencies.

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## 🏃‍♂️ Running the Application

1.  Start the Flask server:
    ```bash
    python app.py
    ```
2.  Open your web browser and go to:
    ```
    http://127.0.0.1:5000
    ```

## 📖 Usage Guide

1.  **Upload Image**: Click the "Choose File" button and select a chest X-ray image (JPEG or PNG).
2.  **Voice Command**:
    - Click the **🎤 Speak** button.
    - Allow microphone access if prompted.
    - Ask a question like **"Which disease is this?"** or **"What disease?"**.
3.  **Predict**:
    - Once the system recognizes your question, click the **📤 Predict** button.
4.  **Result**:
    - The result will be displayed on the screen.
    - The application will also speak the result (e.g., "The predicted disease is Normal").

## 📂 Project Structure

```
lungs-detector/
├── folder/                 # (Optional) Training images or data
├── static/                 # Static assets (CSS, JS, Images)
├── templates/
│   └── index.html          # Main HTML interface
├── app.py                  # Main Flask application logic
├── model_quantized.tflite  # Pre-trained TFLite model
├── requirements.txt        # Python dependencies
├── verify_env.py           # Script to verify environment setup
└── README.md               # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
