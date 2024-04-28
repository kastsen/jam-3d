import {CARS} from "../index";

const carWidth = 20;
const carHeight = 15;

export const moveCar = (car: any, touch: any, previousMousePosition: any) => {
    if (!car) return;
    if (car.name === CARS.green.name) {
        moveGreen(car, touch, previousMousePosition);
    } else if (car.name === CARS.yellow.name) {
        moveYellow(car, touch, previousMousePosition);
    }
}


export const moveGreen = (car: any, touch: any, previousMousePosition: any) => {
    if (!car) return;
    greenMovementBorders(car, touch, previousMousePosition);
    
    if (touch.clientX >= previousMousePosition.x) {
        car.position.z -= 4; // Учитывайте, что ось y в 3D-пространстве может быть обратной

    } else {
        car.position.z += 4; // Учитывайте, что ось y в 3D-пространстве может быть обратной
    }
}

export const moveYellow = (car: any, touch: any, previousMousePosition: any) => {
    if (!car) return;
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