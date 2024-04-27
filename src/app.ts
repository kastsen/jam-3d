// import {Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, Clock, PointLight} from 'three';
// import {Brick} from "./brick";
//
// import jam from '../assets/glb/jam.glb'
// import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
//
// export class App {
//   private readonly timer = new Clock();
//   private readonly scene = new Scene();
//   private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
//   private readonly renderer = new WebGLRenderer({
//     antialias: true,
//     canvas: document.getElementById('renderCanvas') as HTMLCanvasElement,
//   });
//
//   private brick: Brick;
//   private model: any; 
//  
//
//   constructor() {
//     this.brick = new Brick(100, new Color('rgb(255,0,0)'));
//       const {scene, camera, renderer} = this;
//       this.scene.add(this.brick);
//
//       let _this = this;
//
//       const loader = new GLTFLoader();
//       loader.load(
//           jam,
//           (glb) => {
//               sword = gltf.scene;  // sword 3D object is loaded
//               sword.scale.set(2, 2, 2);
//               sword.position.y = 4;
//           },
//           function (xhr) {
//               console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//           },
//           function (error) {
//               console.log("An error happened:", error);
//           }
//       );
//
//
//
//
//       const pointLight = new PointLight(0xffffff, 1, 1000);
//       pointLight.position.set(200, 200, 200); // Положение света
//       this.scene.add(pointLight); // Добавляем свет в сцену
//
//
//
//
//       this.camera.position.set(200, 200, 200);
//     this.camera.lookAt(new Vector3(0, 0, 0));
//
//     this.renderer.setSize(innerWidth, innerHeight);
//     // this.renderer.setClearColor(new Color('rgb(0,0,0)'));
//
//     this.render();
//   }
//
//   private adjustCanvasSize() {
//     this.renderer.setSize(innerWidth, innerHeight);
//     this.camera.aspect = innerWidth / innerHeight;
//     this.camera.updateProjectionMatrix();
//   }
//
//   private render() {
//     const delta = this.timer.getDelta();
//
//     this.renderer.render(this.scene, this.camera);
//     requestAnimationFrame(() => this.render());
//     this.adjustCanvasSize();
//     this.brick.rotateY(3 * delta);
//   }
// }
