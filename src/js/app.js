import style from '../styles/index.scss';
import 'polyfill';
import * as THREE from 'three';
import Stats from 'stats.js'
import GLTFLoader from "./GLTFLoader";
var OrbitControls = require('three-orbit-controls')(THREE);

// Stats tracking
var stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

// Set canvas
var ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Renderer Elements
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set camera
var camera = new THREE.PerspectiveCamera(50,window.innerWidth / window.innerHeight,0.1,5000);
camera.rotation.y = 45 / 180 * Math.PI;
camera.position.set(1000, 300, -1000);

// Set scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// Set OrbitControls
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 1;

// Lights
var ambientLight = new THREE.AmbientLight(0x404040, 100);
scene.add(ambientLight);

var directionLight = new THREE.DirectionalLight(0xffffff, 100);
directionLight.position.set(0, 1, 0);
directionLight.castShadow = true;
scene.add(directionLight);

var pointLight1 = new THREE.PointLight(0xc4c4c4, 10);
pointLight1.position.set(0, 300, 500);
scene.add(pointLight1);

var pointLight2 = new THREE.PointLight(0xc4c4c4, 10);
pointLight2.position.set(500, 100, 0);
scene.add(pointLight2);

var pointLight3 = new THREE.PointLight(0xc4c4c4, 10);
pointLight3.position.set(0, 300, -500);
scene.add(pointLight3);

var pointLight4 = new THREE.PointLight(0xc4c4c4, 10);
pointLight4.position.set(-500, 300, 0);
scene.add(pointLight4);

// LTF Loader
var loader = new THREE.GLTFLoader();

loader.load('../assets/car/scene.gltf', function(gltf) {
  var car = gltf.scene.children[0];
  car.scale.set(.5, .5, .5);
  scene.add(gltf.scene);
  renderer.render(scene, camera);
  animate();
});

// Animation
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
