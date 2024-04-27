import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {CreateSceneClass} from "../createScene";
import {PerspectiveCamera, Scene, WebGLRenderer} from "three";

import car from '../../assets/glb/jam.glb';

export class JamScene implements CreateSceneClass {
  constructor() {
    this.createScene = this.createScene.bind(this);
  }
    createScene = async (
      canvas: HTMLCanvasElement
    ): Promise<{ renderer: WebGLRenderer; camera: PerspectiveCamera; scene: Scene }> => {
      // This creates a basic Babylon Scene object (non-mesh)

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 10);

      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
      light.position.set(0, 1, 0);
      scene.add(light);

      const loader = new GLTFLoader();
      loader.load(
        car,
        (gltf: { scene: any; }) => {
          const mesh = gltf.scene;
          mesh.scale.set(10, 10, 10);
          scene.add(mesh);

          const car = mesh.getObjectByName('00_car_red');
          const ground = mesh.getObjectByName('grass');

          // Add event listeners for pointer events
          // window.addEventListener('pointerdown', (event) => this.onPointerDown(event, car, ground, camera));
          // window.addEventListener('pointerup', () => this.onPointerUp(camera));
          // window.addEventListener('pointermove', (event) => this.onPointerMove(event, car, ground));
        },
        undefined,
        (error: any) => console.error(error)
      );

      return { scene, camera, renderer };
    }

    
}
