import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import sceneModel from '../assets/glb/carJamScene.glb';
import bg from '../assets/grass.jpg';


const scene = new THREE.Scene();

const lightL = new THREE.DirectionalLight( 0xffffff, 0.8 );
lightL.position.set( 100, 45, 0 );
lightL.rotateX(100);
lightL.castShadow = true; // default false
lightL.shadow.mapSize.width = 512; // default
lightL.shadow.mapSize.height = 512; // default
lightL.shadow.camera.near = 0.5; // default
lightL.shadow.camera.far = 500; // default
lightL.shadow.radius=0.2;
lightL.shadow.blurSamples=2;
scene.add( lightL );
const lightLHelper = new THREE.DirectionalLightHelper(lightL, 5);
scene.add(lightLHelper);

const lightR = new THREE.DirectionalLight( 0xffffff, 0.6 );
lightR.position.set( -100, 40, 0 );
lightR.rotateX(-100);
scene.add( lightR );
const lightRHelper = new THREE.DirectionalLightHelper(lightR, 5);
scene.add(lightRHelper);
//Set up shadow properties for the light




const spotlight = new THREE.SpotLight(0xffffff, 1);
spotlight.position.set(-130, 400, 10); // позиция света
spotlight.rotateX(-100);
spotlight.castShadow = true; // включаем отбрасывание тени
scene.add(spotlight);
const spotLightHelper = new THREE.SpotLightHelper(spotlight, 5);
scene.add(spotLightHelper);

// Создание AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Цвет, Интенсивность
scene.add(ambientLight);

var width = window.innerWidth; // Ширина окна браузера
var height = window.innerHeight; // Высота окна браузера
var aspectRatio = width / height;

const camera = new THREE.PerspectiveCamera(
    30,
    aspectRatio,
    1,
    1000);
camera.position.set(33,51,24)
// camera.position.y = 0;
// camera.lookAt(new THREE.Vector3(33,41,24));
camera.rotateX(-Math.PI / 2);

const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const orbitControls = new OrbitControls(camera, renderer.domElement);

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
    
    gltfLoader.load(sceneModel, (gltf) => {
        const steamCar = gltf.scene;
        steamCar.scale.set(0.5, 0.5, 0.5);
        steamCar.position.y = -4.7;
        scene.add(steamCar);
        steamCar.add(ambientLight);
        steamCar.add(lightL);
        steamCar.add(lightR);
        steamCar.add(spotlight);

        steamCar.traverse((child) => {
            
            if (child.name) {
                if (child.name.match('car') || child.name.match('tree')) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.add(lightL);
                    child.add(lightR);
                    child.add(ambientLight);
                    child.add(spotlight);
                    
                    child.receiveShadow = false; //default
                }
            }
            
            
        })
    });
};


window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
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