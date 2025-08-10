// Typewriter Effect
function initTypewriter() {
  const text = "Edit Fearlessly. Collaborate Asynchronously.";
  const typewriterElement = document.getElementById("typewriter-text");
  const cursorElement = document.getElementById("typewriter-cursor");
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeWriter() {
    if (!isDeleting && charIndex < text.length) {
      // Stop cursor blinking while typing
      cursorElement.style.animationPlayState = "paused";
      cursorElement.style.opacity = "1";

      // Typing forward
      const currentChar = text.charAt(charIndex);
      typewriterElement.innerHTML += currentChar;

      // Add highlight spans for "Fearlessly" and "Asynchronously"
      if (
        typewriterElement.innerHTML.includes("Fearlessly") &&
        !typewriterElement.innerHTML.includes("<span>Fearlessly</span>")
      ) {
        typewriterElement.innerHTML = typewriterElement.innerHTML.replace(
          "Fearlessly",
          "<span>Fearlessly</span>"
        );
      }
      if (
        typewriterElement.innerHTML.includes("Asynchronously") &&
        !typewriterElement.innerHTML.includes("<span>Asynchronously</span>")
      ) {
        typewriterElement.innerHTML = typewriterElement.innerHTML.replace(
          "Asynchronously",
          "<span>Asynchronously</span>"
        );
      }

      charIndex++;
      typeSpeed = Math.random() * 100 + 50; // Variable typing speed for more natural effect

      setTimeout(typeWriter, typeSpeed);
    } else if (charIndex === text.length) {
      // Finished typing, resume cursor blinking
      cursorElement.style.animationPlayState = "running";
      return;
    }
  }

  // Start the typewriter effect after a short delay
  setTimeout(() => {
    typeWriter();
  }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initTypewriter);
