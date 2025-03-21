document.addEventListener("DOMContentLoaded", function () {
  const canvasElements = document.querySelectorAll(".canvas");
  // Hardcoded list of gradients
  const gradients = [
    "gradient_1.jpg",
    "gradient_2.jpg",
    "gradient_3.jpg",
    "gradient_4.jpg",
    "gradient_5.jpg",
    "gradient_6.jpg",
  ];
  canvasElements.forEach((canvas) => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    const selectedGradient = `/assets/gradients/${gradients[randomIndex]}`;
    canvas.style.backgroundImage = `url(${selectedGradient})`;
  });
});
