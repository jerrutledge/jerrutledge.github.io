import * as THREE from './three.module.js';

import {
    OrbitControls
} from "./OrbitControls.js";

// CREATE SCENE
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
var canvasDimension = Math.min(500, window.innerWidth, window.innerHeight);
renderer.setSize(canvasDimension, canvasDimension);
document.body.appendChild(renderer.domElement);

// SPHERE
var geometry = new THREE.SphereGeometry(1, 32, 16);
var wireframe = new THREE.WireframeGeometry(geometry);
var sphere = new THREE.LineSegments(wireframe);
sphere.material.depthTest = false;
sphere.material.opacity = 0.25;
sphere.material.transparent = true;
scene.add(sphere);

// CAMERA & LIGHTS
camera.position.z = 3;
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1.4;
controls.maxDistance = 5;
controls.position0.z = 3;
controls.enablePan = false;

// ANIMATION / MOVEMENT
var animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

animate();