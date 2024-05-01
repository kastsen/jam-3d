import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import jam from '../assets/glb/carJamScene.glb';


const scene = new THREE.Scene();

const light = new THREE.DirectionalLight();
light.position.set(30, 400, 10); // позиция света
light.rotateX(-100);
const lightHelper = new THREE.DirectionalLightHelper(light, 5);
scene.add(lightHelper);

// Создаем световой прожектор
const spotlight = new THREE.SpotLight(0xffffff);
spotlight.position.set(30, 400, 10); // позиция света
spotlight.castShadow = true; // включаем отбрасывание тени
scene.add(spotlight);
const spotLightHelper = new THREE.SpotLightHelper(spotlight, 5);
scene.add(spotLightHelper);

// Создание AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Цвет, Интенсивность
scene.add(ambientLight);

// light.castShadow = true;
// light.shadow.mapSize.width = 512;
// light.shadow.mapSize.height = 512;
// light.shadow.camera.near = 0.05;
// light.shadow.camera.far = 200;





const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.z = 100;
camera.position.y = 200;

const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
new OrbitControls(camera, renderer.domElement);

//creating the plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
// const planeMaterial = new THREE.MeshPhongMaterial({
//     map : new THREE.TextureLoader().load(bg)
// });

// planeMaterial.displacementMap = new THREE.TextureLoader().load(bg);
// planeMaterial.normalMap = new THREE.TextureLoader().load(bg);

// const plane = new THREE.Mesh(planeGeometry, planeMaterial );
// plane.rotateX(-Math.PI / 2);
// plane.position.y = -1.75;
// plane.position.z = -2;
// plane.receiveShadow = true;
// scene.add(plane);



window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}

animate();


export const CARS: any = {};
let GRASS: any;

window.onload = function () {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(jam, (gltf) => {
        const root = gltf.scene;

        GRASS = root.children[9];

        scene.add(root);

        root.add(ambientLight);
        root.add(light);
        // root.add(light2);
        // root.add(light3);

        function onWindowResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            // composer.setSize(width, height); // Обновляем размеры композитора постобработки, если используется
        }

        // Добавляем обработчик события изменения размеров окна
        window.addEventListener('resize', onWindowResize);

        // Инициализация размеров рендерера при загрузке страницы
        onWindowResize();
    });


};
