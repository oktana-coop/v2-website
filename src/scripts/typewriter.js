// Typewriter Effect
function initTypewriter() {
  const text = 'Edit Fearlessly. Collaborate Asynchronously.';
  const typewriterElement = document.getElementById('typewriter-text');
  const cursorElement = document.getElementById('typewriter-cursor');
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  // Words to bold and their positions
  const boldWords = [
    {
      word: 'Fearlessly',
      start: text.indexOf('Fearlessly'),
      end: text.indexOf('Fearlessly') + 'Fearlessly'.length,
    },
    {
      word: 'Asynchronously',
      start: text.indexOf('Asynchronously'),
      end: text.indexOf('Asynchronously') + 'Asynchronously'.length,
    },
  ];

  function getCurrentHTML(idx) {
    let html = '';
    let i = 0;
    while (i < idx) {
      // Check if at start of a bold word
      const bold = boldWords.find((bw) => i === bw.start);
      if (bold) {
        html += '<span class="font-bold">';
      }
      html += text[i];
      // Check if at end of a bold word
      const boldEnd = boldWords.find((bw) => i === bw.end - 1);
      if (boldEnd) {
        html += '</span>';
      }
      i++;
    }
    return html;
  }

  function typeWriter() {
    if (!isDeleting && charIndex < text.length) {
      // Stop cursor blinking while typing
      cursorElement.style.animationPlayState = 'paused';
      cursorElement.style.opacity = '1';

      // Typing forward with bold spans
      typewriterElement.innerHTML = getCurrentHTML(charIndex + 1);

      charIndex++;
      typeSpeed = Math.random() * 100 + 50; // Variable typing speed for more natural effect

      setTimeout(typeWriter, typeSpeed);
    } else if (charIndex === text.length) {
      // Finished typing, resume cursor blinking
      cursorElement.style.animationPlayState = 'running';
      return;
    }
  }

  // Start the typewriter effect after a short delay
  setTimeout(() => {
    typeWriter();
  }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTypewriter);
