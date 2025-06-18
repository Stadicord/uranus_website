document.getElementById("startBtn").addEventListener("click", () => {
  const canvas = document.getElementById("simCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 測試畫面：畫一輛高速移動的車
  let x = 0;
  const carWidth = 100;
  const carHeight = 40;
  const speed = 5;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#10b981"; // 車子顏色
    ctx.fillRect(x, canvas.height / 2 - carHeight / 2, carWidth, carHeight);

    x += speed;
    if (x > canvas.width) x = -carWidth;

    requestAnimationFrame(draw);
  }

  draw();
});

