import * as THREE from './three.module.js';

import {
    OrbitControls
} from "./OrbitControls.js";

// CREATE SCENE
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.localClippingEnabled = true;
var canvasDimension = Math.min(900, window.innerWidth-90, window.innerHeight-90);
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

// CONE
// this h represents the height of the cone, not the height of the cap
var h = 1-(1/(2*Math.PI)); // should be about 0.840845
var r = (1-h ** 2) ** (1/2); // height of the cap = 0.1591549
var geometry = new THREE.ConeGeometry(r, h, 64, 1, true);
var material = new THREE.MeshPhongMaterial({
    color: 0xFA83E2
});
var cone = new THREE.Mesh(geometry, material);
cone.lookAt(0, 5, 0);
cone.position.z = (h/2);
scene.add(cone);

// CONE CAP
const clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 3),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 3),
    new THREE.Plane(new THREE.Vector3(0, 0, 1), -h)
];
var geometry = new THREE.SphereGeometry(1.001, 64, 32); // 1.001 to prevent clipping between cone and cap
var material = new THREE.MeshPhongMaterial({
    clippingPlanes: clipPlanes,
    clipIntersection: false,
    color: 0xFA83E2
});
var cap = new THREE.Mesh(geometry, material);
scene.add(cap);

// CAMERA & LIGHTS
camera.position.x = 3;
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1.4;
controls.maxDistance = 5;
controls.position0.x = 3;
controls.enablePan = false;
// light
const light = new THREE.HemisphereLight(0xffffff, 0x111111, 1.7);
// light.position.set(1.5, 1.5, -1.25);
scene.add(light);

// ANIMATION / MOVEMENT
var animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

animate();