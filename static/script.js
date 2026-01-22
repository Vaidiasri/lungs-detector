document.addEventListener("DOMContentLoaded", () => {
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("image");
  const fileNameDisplay = document.getElementById("file-name");
  const micBtn = document.getElementById("mic-btn");
  const voiceStatus = document.getElementById("voice-status");
  const predictBtn = document.getElementById("predict-btn");
  const resultCard = document.getElementById("result-card");
  const predictionValue = document.getElementById("prediction-value");

  let uploadedFile = null;
  let voiceReady = false;

  // File Upload Handling
  uploadArea.addEventListener("click", () => fileInput.click());

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      handleFile(e.target.files[0]);
    }
  });

  function handleFile(file) {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    uploadedFile = file;
    fileNameDisplay.textContent = file.name;
    fileNameDisplay.classList.remove("hide");
    uploadArea.style.borderColor = "#28a745";

    // Reset states
    voiceReady = false;
    voiceStatus.textContent = "Tap microphone to ask a question";
    resultCard.style.display = "none";
    predictBtn.disabled = false;
  }

  // Voice Interaction
  micBtn.addEventListener("click", () => {
    if (!uploadedFile) {
      alert("Please upload an X-ray image first.");
      return;
    }

    const recognition = new (
      window.SpeechRecognition || window.webkitSpeechRecognition
    )();
    recognition.lang = "en-US";

    recognition.onstart = () => {
      micBtn.classList.add("listening");
      voiceStatus.textContent = "Listening...";
    };

    recognition.onend = () => {
      micBtn.classList.remove("listening");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      voiceStatus.textContent = `You said: "${transcript}"`;

      if (
        transcript.includes("disease") ||
        transcript.includes("what") ||
        transcript.includes("tell")
      ) {
        voiceReady = true;
        predictBtn.click(); // Auto-trigger predict for smoother UX
      } else {
        voiceStatus.textContent = `Not a valid command. Try "What disease is this?"`;
      }
    };

    recognition.start();
  });

  // Prediction
  predictBtn.addEventListener("click", async () => {
    if (!uploadedFile) {
      alert("Please upload an image first.");
      return;
    }

    // Optional: Enforce voice command?
    // For better UX, let's allow button click OR voice
    // But the user prompt implied voice is part of the flow.
    // Let's keep it flexible.

    predictBtn.textContent = "Analyzing...";
    predictBtn.disabled = true;

    const formData = new FormData();
    formData.append("image", uploadedFile);

    try {
      const response = await fetch("/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      // Display Result
      resultCard.style.display = "block";
      predictionValue.textContent = data.prediction;

      // Speak Result
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(
        `The analysis indicates: ${data.prediction}`,
      );
      synth.speak(utter);
    } catch (error) {
      console.error(error);
      alert("An error occurred during analysis.");
    } finally {
      predictBtn.textContent = "Predict Disease";
      predictBtn.disabled = false;
    }
  });
});
