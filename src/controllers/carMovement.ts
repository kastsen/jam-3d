import {CARS} from "../index";

const carWidth = 20;
const carHeight = 15;

export const moveCar = (car: any, event: any, previousMousePosition: any) => {
    if (!car) return;
    console.log(car.name)
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
    if (position.x > -17 || position.x < 20) {
        if (touch.clientX >= previousMousePosition.x) {
            car.position.z -= 4; // Учитывайте, что ось y в 3D-пространстве может быть обратной
        } else {
            car.position.z += 4; // Учитывайте, что ось y в 3D-пространстве может быть обратной
        }
    }
    
}

export const moveGreen = (car: any, touch: any, previousMousePosition: any) => {
    const {position} = car;
    console.log(position)
    if (position.z > -22 && position.z < 27) {
        if (touch.clientX >= previousMousePosition.x) {
            car.position.z -= 2; // Учитывайте, что ось y в 3D-пространстве может быть обратной

        } else {
            car.position.z += 2; // Учитывайте, что ось y в 3D-пространстве может быть обратной
        }
    } else {
        if (position.z <= -22) {
            car.position.z = -19;
        } else if (position.z >= 27) {
            car.position.z = 23;
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