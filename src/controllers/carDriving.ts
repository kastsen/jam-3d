import gsap, {Linear} from "gsap";
import {CARS} from "../index";

export const driveCar = async (car: any, touch: any, previousMousePosition: any) => {
    console.log('driveCar');
    if (!car) return;
    if (car.name === CARS.green.name) {
        await gsap.to(car.position, {
            duration: 1, // Длительность анимации (в секундах)
            z: 70, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        gsap.to(car.rotation, {
            duration: 1, // Длительность анимации (в секундах)
            y: Math.PI / 2, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        await gsap.to(car.position, {
            duration: 0.6, // Длительность анимации (в секундах)
            z: 90, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        await gsap.to(car.position, {
            duration: 0.5, // Длительность анимации (в секундах)
            x: car.position.x + 90, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        gsap.to(car.position, {
            duration: 1, // Длительность анимации (в секундах)
            x: car.position.x + 20, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        gsap.to(car.rotation, {
            duration: 1, // Длительность анимации (в секундах)
            y: 0, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        await gsap.to(car.position, {
            duration: 1, // Длительность анимации (в секундах)
            x: car.position.x + 40, // Новый масштаб по оси Z
            z: car.position.z - 30, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        await gsap.to(car.position, {
            duration: 1, // Длительность анимации (в секундах)
            z: car.position.z - 140, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        gsap.to(car.rotation, {
            duration: 1, // Длительность анимации (в секундах)
            y: -Math.PI / 2, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        await gsap.to(car.position, {
            duration: 1, // Длительность анимации (в секундах)
            x: car.position.x - 30, // Новый масштаб по оси Z
            z: car.position.z - 20, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        gsap.to(car.position, {
            duration: 1, // Длительность анимации (в секундах)
            x: car.position.x - 130, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });
    }
    
}
