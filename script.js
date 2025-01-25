// Check if Speech Synthesis API is supported
if (!window.speechSynthesis) {
    alert("Speech Synthesis API is not supported in your browser.");
} else {
    let speech = new SpeechSynthesisUtterance();
    let voices = [];
    const selectVoices = document.querySelector("select");
    const listenButton = document.querySelector("button");
    const textArea = document.querySelector("textarea");

    // Load available voices and populate the dropdown
    window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            alert("No voices available on your device.");
        } else {
            speech.voice = voices[0];
            voices.forEach((voice, i) => {
                const option = new Option(`${voice.name} (${voice.lang})`, i);
                selectVoices.options[i] = option;
            });
        }
    };

    // Update the selected voice
    selectVoices.addEventListener("change", () => {
        speech.voice = voices[selectVoices.value];
    });

    // Convert text to speech on button click
    listenButton.addEventListener("click", () => {
        if (!textArea.value.trim()) {
            alert("Please enter text to convert to speech.");
        } else {
            speech.text = textArea.value;
            window.speechSynthesis.speak(speech);
        }
    });
}
