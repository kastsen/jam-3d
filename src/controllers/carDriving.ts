import gsap from "gsap";
import {CARS} from "../index";

export const driveCar = async (car: any, touch: any, previousMousePosition: any) => {
    console.log('driveCar');
    if (car.name === CARS.green.name) {
        await gsap.to(car.position, {
            duration: 1, // Длительность анимации (в секундах)
            z: 70, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        gsap.to(car.rotation, {
            duration: 1, // Длительность анимации (в секундах)
            y: -Math.PI / 2, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        await gsap.to(car.position, {
            duration: 1, // Длительность анимации (в секундах)
            z: 94, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        gsap.to(car.position, {
            duration: 1, // Длительность анимации (в секундах)
            x: car.position.x - 800, // Новый масштаб по оси Z
            // z: 66,
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });
    }
    
}
