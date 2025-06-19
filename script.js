// script.js
let beta = 0.0;

const betaSlider = document.getElementById("betaSlider");
const betaLabel = document.getElementById("betaLabel");
const langElements = {
  "zh-TW": {
    title: "特勒爾效應模擬器",
    lorentzDesc: "洛倫茲收縮示意",
    terrellDesc: "特勒爾視覺效應示意",
    explanation:
      "Lorentz 收縮：物體長度依 $$L = L_0\\sqrt{1-\\beta^2}$$ 收縮；<br>Terrell 效應：觀測者會因光速有限，看到物體似乎旋轉。",
  },
  en: {
    title: "Terrell Effect Simulator",
    lorentzDesc: "Lorentz Contraction",
    terrellDesc: "Terrell Visual Effect",
    explanation:
      "Lorentz contraction: Object shrinks by $$L = L_0\\sqrt{1-\\beta^2}$$;<br>Terrell effect: object appears rotated due to light delay.",
  },
};

function setLang(lang) {
  document.getElementById("title").textContent = langElements[lang].title;
  document.getElementById("lorentzDesc").textContent = langElements[lang].lorentzDesc;
  document.getElementById("terrellDesc").textContent = langElements[lang].terrellDesc;
  document.getElementById("explanation").innerHTML = langElements[lang].explanation;
  if (window.MathJax) MathJax.typeset();
}

betaSlider.addEventListener("input", () => {
  beta = parseFloat(betaSlider.value);
  betaLabel.textContent = `β = ${beta.toFixed(2)}`;
  updateCubes();
});

// === THREE.js setup for both canvases ===
const lorentzRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("lorentzCanvas"), alpha: true });
lorentzRenderer.setSize(300, 300);
const lorentzScene = new THREE.Scene();
const lorentzCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
lorentzCamera.position.z = 5;
const lorentzCube = createCube();
lorentzScene.add(lorentzCube);
lorentzScene.add(new THREE.AmbientLight(0xffffff));

const terrellRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("terrellCanvas"), alpha: true });
terrellRenderer.setSize(300, 300);
const terrellScene = new THREE.Scene();
const terrellCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
terrellCamera.position.z = 5;
const terrellCube = createCube();
terrellScene.add(terrellCube);
terrellScene.add(new THREE.AmbientLight(0xffffff));

function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x44aa88, wireframe: false });
  return new THREE.Mesh(geometry, material);
}

function updateCubes() {
  const gamma = Math.sqrt(1 - beta * beta);
  lorentzCube.scale.x = gamma; // Lorentz contraction
  lorentzCube.rotation.y += 0.01;

  // Terrell effect: simulate rotation illusion due to light delay
  const skew = beta * 0.5; // exaggeration for visual
  terrellCube.rotation.y = skew;
}

function animate() {
  requestAnimationFrame(animate);
  updateCubes();
  lorentzRenderer.render(lorentzScene, lorentzCamera);
  terrellRenderer.render(terrellScene, terrellCamera);
}

animate();
