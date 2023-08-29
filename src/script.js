import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import * as dat from "lil-gui";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 });
// gui.close();
const guiParameters = {
  // Lights Color
  ambientLightColor: "#528b4b",
  directionalLightColor: "#4f1769",
  hemisphereLightSkyColor: "#2b00ff",
  hemisphereLightGroundColor: "#00ff62",
  pointLightColor: "#fff700",
  rectAreaLightColor: "#00ffb3",
  spotLightColor: "#b840ba",

  // Remove Lights
  removeAmbientLight() {
    if (scene.children.includes(ambientLight)) scene.remove(ambientLight);
    else {
      scene.add(ambientLight);
    }
  },
  removeDirectionalLight() {
    if (scene.children.includes(directionalLight))
      scene.remove(directionalLight, directionalLightHelper);
    else {
      scene.add(directionalLight, directionalLightHelper);
    }
  },
  removeHemisphereLight() {
    if (scene.children.includes(hemisphereLight))
      scene.remove(hemisphereLight, hemisphereLightHelper);
    else {
      scene.add(hemisphereLight, hemisphereLightHelper);
    }
  },
  removePointLight() {
    if (scene.children.includes(pointLight))
      scene.remove(pointLight, pointLightHelper);
    else {
      scene.add(pointLight, pointLightHelper);
    }
  },
  removeRectAreaLight() {
    if (scene.children.includes(rectAreaLight)) scene.remove(rectAreaLight);
    else {
      scene.add(rectAreaLight);
    }
  },
  removeSpotLight() {
    if (scene.children.includes(spotLight))
      scene.remove(spotLight, spotLightHelper);
    else {
      scene.add(spotLight, spotLightHelper);
    }
  },
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes Helper
const axesHelper = new THREE.AxesHelper(6);
// scene.add(axesHelper);

/**
 * Lights
 */
// Ambient Light
const ambientLight = new THREE.AmbientLight(
  `${guiParameters.ambientLightColor}`,
  0.5
);
scene.add(ambientLight);

gui
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Ambient Light Intensity");
gui
  .addColor(guiParameters, "ambientLightColor")
  .name("Ambient Light Color")
  .onChange(
    () =>
      (ambientLight.color = new THREE.Color(guiParameters.ambientLightColor))
  );
gui.add(guiParameters, "removeAmbientLight").name("Remove Ambient Light");

// Directional Light
const directionalLight = new THREE.DirectionalLight(
  `${guiParameters.directionalLightColor}`,
  1
);
directionalLight.position.set(3, 1, 0);
scene.add(directionalLight);

gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Directional Light Intensity");
gui
  .addColor(guiParameters, "directionalLightColor")
  .name("Directional Light Color")
  .onChange(
    () =>
      (directionalLight.color = new THREE.Color(
        guiParameters.directionalLightColor
      ))
  );
gui
  .add(guiParameters, "removeDirectionalLight")
  .name("Remove Directional Light");

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.5
);
scene.add(directionalLightHelper);

// Hemishphere Light
const hemisphereLight = new THREE.HemisphereLight(
  `${guiParameters.hemisphereLightSkyColor}`,
  `${guiParameters.hemisphereLightGroundColor}`,
  0.7
);
scene.add(hemisphereLight);

gui
  .add(hemisphereLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Hemisphere Light Intensity");
gui
  .addColor(guiParameters, "hemisphereLightSkyColor")
  .name("Hemisphere Light Sky Color")
  .onChange(
    () =>
      (hemisphereLight.color = new THREE.Color(
        guiParameters.hemisphereLightSkyColor
      ))
  );
gui
  .addColor(guiParameters, "hemisphereLightGroundColor")
  .name("Hemisphere Light Ground Color")
  .onChange(
    () =>
      (hemisphereLight.groundColor = new THREE.Color(
        guiParameters.hemisphereLightGroundColor
      ))
  );
gui.add(guiParameters, "removeHemisphereLight").name("Remove Hemisphere Light");

const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.3
);
scene.add(hemisphereLightHelper);

// Point Light
const pointLight = new THREE.PointLight(
  `${guiParameters.pointLightColor}`,
  0.5,
  12,
  0.3
);
pointLight.position.set(2, 0, -2);
scene.add(pointLight);

gui
  .add(pointLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Point Light Intensity");
gui
  .addColor(guiParameters, "pointLightColor")
  .name("Point Light Color")
  .onChange(
    () => (pointLight.color = new THREE.Color(guiParameters.pointLight))
  );

gui.add(guiParameters, "removePointLight").name("Remove Point Light");

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
scene.add(pointLightHelper);

// RectArea Light
const rectAreaLight = new THREE.RectAreaLight(
  `${guiParameters.rectAreaLightColor}`,
  0.5,
  3,
  3
);
rectAreaLight.position.set(-1.5, 0, -1.5);
rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(rectAreaLight);

gui
  .add(rectAreaLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("RectArea Light Intensity");

gui
  .addColor(guiParameters, "rectAreaLightColor")
  .name("RectArea Light Color")
  .onChange(
    () =>
      (rectAreaLight.color = new THREE.Color(guiParameters.rectAreaLightColor))
  );
gui.add(guiParameters, "removeRectAreaLight").name("Remove RectArea Light");

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

// Spot Light
const spotLight = new THREE.SpotLight(
  `${guiParameters.spotLightColor}`,
  1.2,
  12,
  Math.PI / 2,
  0.25,
  1
);
spotLight.position.set(0, 2, 3);
scene.add(spotLight.target);
spotLight.target.position.x = -0.75;
scene.add(spotLight);

gui
  .add(spotLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Spot Light Intensity");
gui
  .addColor(guiParameters, "spotLightColor")
  .name("Spot Light Color")
  .onChange(
    () => (spotLight.color = new THREE.Color(guiParameters.spotLightColor))
  );
gui.add(guiParameters, "removeSpotLight").name("Remove Spot Light");

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), material);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.75;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
