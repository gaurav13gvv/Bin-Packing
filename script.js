// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("white");
document.getElementById("container").appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// Define the coordinates of inner boxes
const innerBoxCoordinates = [
  // ... (your inner box coordinates here)
  {
    x: [5.0, 5.0, 5.0, 5.0, 13.0, 13.0, 13.0, 13.0],
    y: [20.0, 20.0, 25.0, 25.0, 20.0, 20.0, 25.0, 25.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  },
  {
    x: [0.0, 0.0, 0.0, 0.0, 8.0, 8.0, 8.0, 8.0],
    y: [25.0, 25.0, 30.0, 30.0, 25.0, 25.0, 30.0, 30.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  },
  {
    x: [14.0, 14.0, 14.0, 14.0, 22.0, 22.0, 22.0, 22.0],
    y: [0.0, 0.0, 5.0, 5.0, 0.0, 0.0, 5.0, 5.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  },
  {
    x: [0.0, 0.0, 0.0, 0.0, 8.0, 8.0, 8.0, 8.0],
    y: [13.0, 13.0, 18.0, 18.0, 13.0, 13.0, 18.0, 18.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  },
  {
    x: [0.0, 0.0, 0.0, 0.0, 8.0, 8.0, 8.0, 8.0],
    y: [0.0, 0.0, 5.0, 5.0, 0.0, 0.0, 5.0, 5.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  },
  {
    x: [25.0, 25.0, 25.0, 25.0, 30.0, 30.0, 30.0, 30.0],
    y: [22.0, 22.0, 30.0, 30.0, 22.0, 22.0, 30.0, 30.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  },
  {
    x: [8.0, 8.0, 8.0, 8.0, 16.0, 16.0, 16.0, 16.0],
    y: [25.0, 25.0, 30.0, 30.0, 25.0, 25.0, 30.0, 30.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  },
  {
    x: [5.0, 5.0, 5.0, 5.0, 10.0, 10.0, 10.0, 10.0],
    y: [5.0, 5.0, 13.0, 13.0, 5.0, 5.0, 13.0, 13.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  },
  {
    x: [0.0, 0.0, 0.0, 0.0, 5.0, 5.0, 5.0, 5.0],
    y: [5.0, 5.0, 13.0, 13.0, 5.0, 5.0, 13.0, 13.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  },
  {
    x: [22.0, 22.0, 22.0, 22.0, 30.0, 30.0, 30.0, 30.0],
    y: [0.0, 0.0, 5.0, 5.0, 0.0, 0.0, 5.0, 5.0],
    z: [0.0, 3.0, 0.0, 3.0, 0.0, 3.0, 0.0, 3.0],
  }
];

// Calculate the dimensions of the large bin based on inner boxes
let maxX = -Infinity,
  maxY = -Infinity,
  maxZ = -Infinity,
  minX = Infinity,
  minY = Infinity,
  minZ = Infinity;

innerBoxCoordinates.forEach((coordinates) => {
  const maxXBox = Math.max(...coordinates.x);
  const maxYBox = Math.max(...coordinates.y);
  const maxZBox = Math.max(...coordinates.z);
  const minXBox = Math.min(...coordinates.x);
  const minYBox = Math.min(...coordinates.y);
  const minZBox = Math.min(...coordinates.z);

  maxX = Math.max(maxX, maxXBox);
  maxY = Math.max(maxY, maxYBox);
  maxZ = Math.max(maxZ, maxZBox);
  minX = Math.min(minX, minXBox);
  minY = Math.min(minY, minYBox);
  minZ = Math.min(minZ, minZBox);
});

// Add a small padding to the dimensions of the large bin
const padding = 2;

// Calculate bin dimensions based on min and max coordinates
const binWidth = maxX - minX + padding * 2;
const binHeight = maxY - minY + padding * 2;
const binDepth = maxZ - minZ + padding * 2;

// Create materials for the six sides with colors
const xPlaneMaterial = new THREE.MeshBasicMaterial({
  color: "lavender",
  side: THREE.BackSide,
});
const yPlaneMaterial = new THREE.MeshBasicMaterial({
  color: "aqua",
  side: THREE.BackSide,
});
const zPlaneMaterial = new THREE.MeshBasicMaterial({
  color: "white",
  side: THREE.BackSide,
});

// Create a BoxGeometry for the large bin
const binGeometry = new THREE.BoxGeometry(
  binWidth,
  binHeight,
  binDepth,
  1,
  1,
  1
);

// Create materials for the large bin
const materials = [
  xPlaneMaterial, // Right (positive x)
  xPlaneMaterial, // Left (negative x)
  yPlaneMaterial, // Top (positive y)
  yPlaneMaterial, // Bottom (negative y)
  zPlaneMaterial, // Front (positive z)
  zPlaneMaterial, // Back (negative z)
];

// Create a MeshFaceMaterial to apply materials to faces
const binMaterial = new THREE.MeshFaceMaterial(materials);

// Create the large bin
const bin = new THREE.Mesh(binGeometry, binMaterial);

// Set the position of the bin at the center
bin.position.set((maxX + minX) / 2, (maxY + minY) / 2, (maxZ + minZ) / 2);

// Add the bin to the scene
scene.add(bin);

// Adjust camera position based on the new bin dimensions
camera.position.z = Math.max(binWidth, binHeight, binDepth) * 1.5;

// Function to create cuboidal boxes based on given coordinates
function createBoxFromCoordinates(coordinates) {
  const x = (Math.min(...coordinates.x) + Math.max(...coordinates.x)) / 2;
  const y = (Math.min(...coordinates.y) + Math.max(...coordinates.y)) / 2;
  const z = (Math.min(...coordinates.z) + Math.max(...coordinates.z)) / 2;

  const boxWidth = Math.max(...coordinates.x) - Math.min(...coordinates.x);
  const boxHeight = Math.max(...coordinates.y) - Math.min(...coordinates.y);
  const boxDepth = Math.max(...coordinates.z) - Math.min(...coordinates.z);

  const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const boxMaterial = new THREE.MeshBasicMaterial({
    color: Math.random() * 0xffffff,
  });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);

  box.position.set(x, y, z);

  bin.add(box);
}

// Create cuboidal boxes based on the given coordinates
for (const coordinates of innerBoxCoordinates) {
  createBoxFromCoordinates(coordinates);
}

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
}

window.addEventListener("resize", onWindowResize);

let isRotating = false;
let previousMouseX = 0;

renderer.domElement.addEventListener("mousedown", (event) => {
  isRotating = true;
  previousMouseX = event.clientX;
});

document.addEventListener("mouseup", () => {
  isRotating = false;
});

renderer.domElement.addEventListener("mousemove", (event) => {
  if (isRotating) {
    const delta = event.clientX - previousMouseX;
    bin.rotation.y += delta * 0.01;
    previousMouseX = event.clientX;
  }
});

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();

