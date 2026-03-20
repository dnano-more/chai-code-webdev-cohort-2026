const formatSelect = document.getElementById("format");
const toneSelect = document.getElementById("tone");
const button = document.getElementById("generateBtn");
const pallete = document.getElementById("palette");

function randomRGB(tone) {
  let min = 0;
  let max = 255;

  if (tone === "light") {
    min = 150;
    max = 255;
  }

  if (tone === "dark") {
    min = 0;
    max = 125;
  }

  const r = Math.floor(Math.random() * (max - min) + min);
  const g = Math.floor(Math.random() * (max - min) + min);
  const b = Math.floor(Math.random() * (max - min) + min);

  return { r, g, b };
}

function rgbtoHex(r, g, b) {
  const toHex = (num) => {
    let hex = num.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function generatePallete() {
  // console.log("clicked!")
  // console.log(formatSelect.value)
  // console.log(toneSelect.value)

  pallete.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const { r, g, b } = randomRGB(toneSelect.value);

    let color;

    if (formatSelect.value === "hex") {
      color = rgbtoHex(r, g, b);
    } else {
      color = `rgb(${r}, ${g}, ${b})`;
    }

    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color");

    colorDiv.style.background = color;
    colorDiv.textContent = color;

    colorDiv.addEventListener("click", () => {
      navigator.clipboard.writeText(color);

      colorDiv.textContent = "Copied!";
      colorDiv.style.opacity = "0.6";

      setTimeout(() => {
        colorDiv.textContent = color;
        colorDiv.style.opacity = "1";
      }, 1000);
    });

    pallete.appendChild(colorDiv);
  }
}

button.addEventListener("click", generatePallete);
generatePallete();
