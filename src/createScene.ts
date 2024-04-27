import {JamScene} from "./scenes/jamScene";
import {PerspectiveCamera, Scene, WebGLRenderer} from "three";

export interface CreateSceneClass {
    createScene: (canvas: HTMLCanvasElement) => Promise<{
      renderer: WebGLRenderer;
      camera: PerspectiveCamera;
      scene: Scene
    }>;
    preTasks?: Promise<unknown>[];
}

export interface CreateSceneModule {
    default: CreateSceneClass;
}

export const getSceneModule = (): CreateSceneClass => {
    return new JamScene();
}
