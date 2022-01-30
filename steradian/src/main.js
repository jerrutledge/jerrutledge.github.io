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

// ANIMATION / MOVEMENT
var animate = function () {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();