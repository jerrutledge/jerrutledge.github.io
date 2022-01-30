import * as THREE from './three.module.js';

import {
    GUI
} from './lil-gui.module.min.js';

import {
    OrbitControls
} from "./OrbitControls.js";

// these are the parameters changed by the gui controls
const params = {
    h: 1-(1/(2*Math.PI)), // start off by default at one steradian
    // should be about 0.840845
};

// CREATE SCENE
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.localClippingEnabled = true;
var canvasDimension = Math.min(900, window.innerWidth-90, window.innerHeight-90);
renderer.setSize(canvasDimension, canvasDimension);
document.getElementById("demo").appendChild(renderer.domElement);

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
var geometry = new THREE.ConeGeometry(1, 1, 64, 1, true); // automatically consults h param
const coneMaterial = new THREE.MeshPhongMaterial({
    color: 0xD254F0
});
const cone = new THREE.Mesh(geometry, coneMaterial);
cone.lookAt(0, 5, 0); // rotate 90
updateConeShape();
scene.add(cone);

// CONE CAP
const clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 3),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 3),
    new THREE.Plane(new THREE.Vector3(0, 0, 1), -params.h)
];
var geometry = new THREE.SphereGeometry(1.001, 64, 32); // 1.001 to prevent clipping between cone and cap
var material = new THREE.MeshPhongMaterial({
    clippingPlanes: clipPlanes,
    clipIntersection: false,
    color: 0x3C9BFA
});
var cap = new THREE.Mesh(geometry, material);
scene.add(cap);

// CAMERA & LIGHTS
camera.position.x = 2;
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1.4;
controls.maxDistance = 5;
controls.position0.x = 2;
controls.enablePan = false;
controls.autoRotate = true;
// light
const light = new THREE.HemisphereLight(0xffffff, 0x111111, 1.7);
// light.position.set(1.5, 1.5, -1.25);
scene.add(light);

// ANIMATION / MOVEMENT
var animate = function () {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
};

// GUI CONTROLS
const gui = new GUI();

gui.add(params, 'h', -1, 1).name('cone height (h)').onChange(function (value) {
    // make a new cone and replace it
    updateConeShape();
    clipPlanes[2].constant = -params.h;
});

function updateConeShape() {
    cone.geometry.dispose();
    var r = (1-params.h ** 2) ** (1/2); // pythagorean theorum
    cone.geometry = new THREE.ConeGeometry(r, params.h, 64, 1, true);
    cone.position.z = (params.h/2); // move point to center

    // also update the params in the html
    document.getElementById("steradians").innerHTML = (Math.PI * 2 * (1-params.h)).toFixed(5);
    document.getElementById("polarAngle").innerHTML = (Math.asin(r)).toFixed(5);
    document.getElementById("coneHeight").innerHTML = (params.h).toFixed(5);
    document.getElementById("capArea").innerHTML = (Math.PI * 2 * (1-params.h)).toFixed(5);
}

animate();