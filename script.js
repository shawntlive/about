const terminal = document.getElementById("terminal");
const inputLine = document.getElementById("input-line");
const cmdInput = document.getElementById("cmd");

let history = [];
let historyIndex = -1;

const commands = {
  help: `Available commands:
  help      - Show this message
  bio       - About me
  projects  - My work
  contact   - Get in touch
  clear     - Clear the screen`,

  bio: `Hi, I'm [Your Name]! 👨‍💻
An embedded systems engineer passionate about hardware/software integration, startups, and innovation.`,

  projects: `Projects:
- 🔊 MEMS microphone array
- 🌱 IoT forest monitoring
- ⚡ Embedded firmware for startups`,

  contact: `Contact me:
- Email: youremail@example.com
- LinkedIn: linkedin.com/in/yourprofile
- GitHub: github.com/yourgithub`,

  clear: "clear"
};

function typeWriter(text, callback) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      terminal.innerHTML += text.charAt(i);
      terminal.scrollTop = terminal.scrollHeight;
      i++;
      setTimeout(typing, 20);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

const bootText = `
[BOOT] Initializing system...
[OK] Loading kernel modules...
[OK] Starting services...
[OK] Environment ready.

Welcome to My Retro Terminal 👋
Type 'help' to see available commands.
`;

window.onload = () => {
  typeWriter(bootText, () => {
    inputLine.style.display = "flex";
    cmdInput.focus();
  });
};

cmdInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const input = cmdInput.value.trim();
    terminal.innerHTML += `\n$ ${input}\n`;

    if (input) {
      history.push(input);
      historyIndex = history.length;
    }

    if (commands[input]) {
      if (input === "clear") {
        terminal.innerHTML = "";
      } else {
        typeWriter(commands[input] + "\n");
      }
    } else {
      typeWriter(`Command not found: ${input}\nType 'help' to see available commands.\n`);
    }

    cmdInput.value = "";
  }

  if (event.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      cmdInput.value = history[historyIndex];
    }
  }
  if (event.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      cmdInput.value = history[historyIndex];
    } else {
      cmdInput.value = "";
    }
  }
});