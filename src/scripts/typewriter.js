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

  function getHTMLUpToIndex(idx) {
    return [...text.slice(0, idx)].reduce((acc, char, i) => {
      let current = '';
      if (boldWords.some((bw) => i === bw.start)) {
        current += '<span class="font-bold">';
      }
      current += char;
      if (boldWords.some((bw) => i === bw.end - 1)) {
        current += '</span>';
      }
      return acc + current;
    }, '');
  }

  function typeWriter() {
    if (!isDeleting && charIndex < text.length) {
      // Stop cursor blinking while typing
      cursorElement.style.animationPlayState = 'paused';
      cursorElement.style.opacity = '1';

      // Typing forward with bold spans
      typewriterElement.innerHTML = getHTMLUpToIndex(charIndex + 1);

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
