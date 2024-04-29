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
            duration: 0.5, // Длительность анимации (в секундах)
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
            x: car.position.x + 110, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });



        gsap.to(car.rotation, {
            duration: 0.25, // Длительность анимации (в секундах)
            y: Math.PI, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        await gsap.to(car.position, {
            duration: 0.25, // Длительность анимации (в секундах)
            x: car.position.x + 22, // Новый масштаб по оси Z
            z: car.position.z - 10, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        await gsap.to(car.position, {
            duration: 0.5, // Длительность анимации (в секундах)
            z: car.position.z - 160, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        gsap.to(car.rotation, {
            duration: 0.25, // Длительность анимации (в секундах)
            y: Math.PI * 1.5, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        await gsap.to(car.position, {
            duration: 0.25, // Длительность анимации (в секундах)
            x: car.position.x - 30, // Новый масштаб по оси Z
            z: car.position.z - 20, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        await gsap.to(car.position, {
            duration: 0.6, // Длительность анимации (в секундах)
            x: car.position.x - 130, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        gsap.to(car.rotation, {
            duration: 0.25, // Длительность анимации (в секундах)
            y: Math.PI*2, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        await gsap.to(car.position, {
            duration: 0.25, // Длительность анимации (в секундах)
            x: car.position.x - 20, // Новый масштаб по оси Z
            z: car.position.z + 90, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        gsap.to(car.rotation, {
            duration: 0.25, // Длительность анимации (в секундах)
            y: Math.PI*1.5, // Новый масштаб по оси Z
            ease: "power2.out", // Эффект анимации (можно выбрать другой)
        });

        await gsap.to(car.position, {
            duration: 0.25, // Длительность анимации (в секундах)
            x: car.position.x - 20, // Новый масштаб по оси Z
            z: car.position.z + 20, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });

        await gsap.to(car.position, {
            duration: 0.5, // Длительность анимации (в секундах)
            x: car.position.x - 1320, // Новый масштаб по оси Z
            ease: Linear.easeNone,
        });
    }

}
