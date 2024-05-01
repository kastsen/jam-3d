import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import steamCar from '../assets/glb/sedanSports.glb';
import bg from '../assets/bg.png';


const scene = new THREE.Scene();

const lightL = new THREE.DirectionalLight( 0xffffff, 1 );
lightL.position.set( 100, 15, 0 ); //default; light shining from top
lightL.rotateX(100);
lightL.castShadow = true; // default false
lightL.shadow.mapSize.width = 512; // default
lightL.shadow.mapSize.height = 512; // default
lightL.shadow.camera.near = 0.5; // default
lightL.shadow.camera.far = 500; // default
scene.add( lightL );

const lightR = new THREE.DirectionalLight( 0xffffff, 1 );
lightR.position.set( -100, 20, 0 ); //default; light shining from top
lightR.rotateX(-100);
lightR.castShadow = true; // default false
scene.add( lightR );

//Set up shadow properties for the light


const lightHelper = new THREE.DirectionalLightHelper(lightR, 5);
scene.add(lightHelper);

const spotlight = new THREE.SpotLight(0xffffff, 3);
spotlight.position.set(-130, 400, 10); // позиция света
spotlight.rotateX(-100);
spotlight.castShadow = true; // включаем отбрасывание тени
scene.add(spotlight);
const spotLightHelper = new THREE.SpotLightHelper(spotlight, 5);
// scene.add(spotLightHelper);

// Создание AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Цвет, Интенсивность
scene.add(ambientLight);

var width = window.innerWidth; // Ширина окна браузера
var height = window.innerHeight; // Высота окна браузера
var aspectRatio = width / height;

const camera = new THREE.PerspectiveCamera(
    60,
    aspectRatio,
    1,
    2000);
camera.position.z = 60;
camera.position.y = 0;
camera.lookAt(new THREE.Vector3(0,0,20));

const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
new OrbitControls(camera, renderer.domElement);

//creating the plane
const planeGeometry = new THREE.PlaneGeometry(200, 200);
const planeMaterial = new THREE.MeshPhongMaterial({
    map : new THREE.TextureLoader().load(bg)
});

planeMaterial.displacementMap = new THREE.TextureLoader().load(bg);
planeMaterial.normalMap = new THREE.TextureLoader().load(bg);

const plane = new THREE.Mesh(planeGeometry, planeMaterial );
plane.rotateX(-Math.PI / 2);
plane.receiveShadow = true;
scene.add(plane);

window.onload = function () {
    const gltfLoader = new GLTFLoader();
    
    gltfLoader.load(steamCar, (gltf) => {
        const steamCar = gltf.scene;
        steamCar.scale.set(5, 5, 5);
        steamCar.position.y = 8.2;
        scene.add(steamCar);
        steamCar.add(ambientLight);
        // steamCar.add(lightL);
        steamCar.add(lightR);
        steamCar.add(spotlight);
    });
    
    
};


window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

onWindowResize();

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}

animate();