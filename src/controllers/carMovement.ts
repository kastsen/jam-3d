import {CARS} from "../index";
import {Raycaster} from "three";
import {driveCar} from "./carDriving";

const carWidth = 20;
const carHeight = 15;

export let movingDisabled = false;

export const moveCar = (car: any, event: any, previousMousePosition: any) => {
    if (!car) return;
    console.log(event);
    console.log(car.name);
    if (car.name === CARS.green.name) {
        moveGreen(car, event, previousMousePosition);
    } else if (car.name === CARS.yellow.name) {
        console.log('yellow')
        moveYellow(car, event, previousMousePosition);
    } else if (car.name === CARS.red.name) {
        moveRed(car, event, previousMousePosition);
    }
}

export const moveRed = (car: any, touch: any, previousMousePosition: any) => {
    const {position} = car;
    const distance = touch.type === 'mousemove' ? 1 : 4;
    console.log(touch.type);
    if (position.x > -17 || position.x < 20) {
        if (touch.clientX >= previousMousePosition.x) {
            car.position.z -= distance; // Учитывайте, что ось y в 3D-пространстве может быть обратной
        } else {
            car.position.z += distance; // Учитывайте, что ось y в 3D-пространстве может быть обратной
        }
    }
    
    console.log(car)

    // Создаем лучи
//     const rays = [];
//     for (let vertexIndex = 0; vertexIndex < car.geometry.vertices.length; vertexIndex++) {
//         const localVertex = car.geometry.vertices[vertexIndex].clone();
//         const globalVertex = localVertex.applyMatrix4(car.matrix);
//         const directionVector = globalVertex.sub(car.position);
//
//         const ray = new Raycaster(car.position, directionVector.clone().normalize());
//         rays.push(ray);
//     }
//
// // Проверяем столкновения
//     const collidableMeshList = [CARS.yellow, CARS.green]; // Массив объектов, с которыми проверяем столкновения
//     for (const ray of rays) {
//         const intersects = ray.intersectObjects(collidableMeshList);
//         if (intersects.length > 0) {
//             // Здесь можно обработать столкновение
//             console.log("Collision detected!!!!");
//         }
//     }
    
}

export const moveGreen = (car: any, touch: any, previousMousePosition: any) => {
    if (movingDisabled) return;
    const {position} = car;
    console.log(position)

    const distance = touch.type === 'mousemove' ? 1 : 2;
    console.log(touch.type);
    
    
    if (position.z > -22 && position.z < 27) {
        if (touch.clientX >= previousMousePosition.x) {
            car.position.z -= distance; // Учитывайте, что ось y в 3D-пространстве может быть обратной

        } else {
            car.position.z += distance; // Учитывайте, что ось y в 3D-пространстве может быть обратной
        }
    } else {
        if (position.z <= -22) {
            car.position.z = -19;
        } else if (position.z >= 27) {
            movingDisabled = true;
            driveCar(car, touch, previousMousePosition);
        } 
    }
    
}

export const moveYellow = (car: any, touch: any, previousMousePosition: any) => {
    if (touch.clientY >= previousMousePosition.y) {
        car.position.x += 4; // Учитывайте, что ось y в 3D-пространстве может быть обратной
    } else {
        car.position.x -= 4; // Учитывайте, что ось y в 3D-пространстве может быть обратной
    }
    yellowMovementBorders(car, touch, previousMousePosition);
}


const yellowMovementBorders = (car: any, touch: any, previousMousePosition: any) => {
    console.log('yellowMovementBorders')
    const {position} = car;
    console.log(position)
    // console.log(car)
}

const greenMovementBorders = (car: any, touch: any, previousMousePosition: any) => {
    console.log('greenMovementBorders')
    const {position} = car;
    console.log(position)
    // console.log(car)
}