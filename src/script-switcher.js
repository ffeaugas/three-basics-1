// Keep track of the current script
let currentScript = null;
let activeScriptPath = 'main2.js'; // Default script

// Function to load a script dynamically
function loadScript(scriptPath) {
  // Remove existing script if it exists
  if (currentScript) {
    document.body.removeChild(currentScript);
  }

  // Create a new script element
  currentScript = document.createElement('script');
  currentScript.type = 'module';
  currentScript.src = scriptPath;

  // Append the script to the body
  document.body.appendChild(currentScript);

  // Update active script path
  activeScriptPath = scriptPath;

  // Update UI to show active script
  updateActiveButton(scriptPath);

  console.log(`Loaded script: ${scriptPath}`);

  // You might need to clear the canvas or reset other state
  // depending on your script's behavior
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update the active button in the UI
function updateActiveButton(scriptPath) {
  const buttons = document.querySelectorAll('.script-btn');
  buttons.forEach(button => {
    if (button.dataset.script === scriptPath) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Set up event listeners for all script buttons
function initScriptSwitcher() {
  const buttons = document.querySelectorAll('.script-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const scriptPath = button.dataset.script;
      if (scriptPath !== activeScriptPath) {
        loadScript(scriptPath);
      }
    });
  });

  // Load the default script
  loadScript(activeScriptPath);
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initScriptSwitcher);

// Make sure the canvas is properly sized
function resizeCanvas() {
  const canvas = document.getElementById('c');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

// Handle window resize to adjust canvas dimensions
window.addEventListener('resize', resizeCanvas);
document.addEventListener('DOMContentLoaded', resizeCanvas);
