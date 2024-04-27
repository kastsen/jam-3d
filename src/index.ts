import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';

import jam from '../assets/glb/parking_jam_5.glb';
import {DirectionalLight, Mesh} from "three";

window.onload = function () {
    // Создаем сцену
    const scene = new THREE.Scene();

    // Создаем камеру (перспективная камера)
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(200, 400, 300); // Немного спереди и высоко
    camera.rotateX(-Math.PI / 4); // Поворот камеры на 45 градусов вокруг оси X

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    // Добавляем вспомогательные оси для ориентации
    // scene.add(new THREE.AxesHelper(5));
    //
    // Создаем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Мягкое освещение всей сцены
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 7); // Направленный источник света
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Добавляем тени
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x1F9C51); // Устанавливаем цвет фона (черный, например)
    // directionalLight.castShadow = true;

    // Настраиваем параметры теней
    directionalLight.shadow.mapSize.width = 2024;
    directionalLight.shadow.mapSize.height = 2024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;

    // Загружаем модель glTF
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(jam, (gltf) => {
        const root = gltf.scene;

        // Ищем направленный источник света в сцене glTF
        let gltfDirectionalLight: any;
        root.traverse((child) => {
            if (child instanceof DirectionalLight) {
                gltfDirectionalLight = child;
            }
        });

        // Создаем свой направленный источник света на основе параметров из glTF
        const directionalLight = new THREE.DirectionalLight();
        if (gltfDirectionalLight) {
            directionalLight.color.copy(gltfDirectionalLight.color);
            directionalLight.intensity = gltfDirectionalLight.intensity;
            directionalLight.position.copy(gltfDirectionalLight.position);
            // Направление может быть сохранено в целевом объекте в glTF сцене
            if (gltfDirectionalLight.target) {
                const targetPosition = new THREE.Vector3();
                gltfDirectionalLight.target.getWorldPosition(targetPosition);
                directionalLight.target.position.copy(targetPosition);
            }
        } else {
            // Если свет не найден в glTF сцене, используем значения по умолчанию
            directionalLight.color.set(0xffffff);
            directionalLight.intensity = 8;
            directionalLight.position.set(10, 10, 10);
        }
        scene.add(directionalLight);

        // Также добавьте тень, если необходимо
        renderer.shadowMap.enabled = true;
        directionalLight.castShadow = true;
        // Настройте параметры теней, если это необходимо

        // Продолжайте остальную часть вашего кода...

        // Устанавливаем параметры теней для всех объектов в сцене
        root.traverse((child) => {
            if (child instanceof Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        root.rotation.y = -Math.PI / 3; // 90 градусов в радианах
        root.position.x = 160;

        const scaleFactor = 2; // Фактор масштабирования
        root.scale.set(scaleFactor, scaleFactor, scaleFactor); // Применяем масштабирование

        scene.add(root);
        
        console.log(root)

        // Постобработка для улучшения изображения
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
        composer.addPass(gammaCorrectionPass);

        // Переменные для отслеживания состояния перетаскивания
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        // Добавляем обработчики событий для мыши
        document.addEventListener('pointerdown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('pointerup', onMouseUp);

        // window.addEventListener('touchstart', onTouchStart);
        // window.addEventListener('touchmove', onTouchMove);
        // document.addEventListener('touchend', onTouchEnd);

        document.addEventListener('touchmove', onTouchMove);



        renderer.domElement.addEventListener('click', onClick, false);
        
        let moveCar: any;

        function onClick(event: { clientX: number; clientY: number; }) {
            
            console.log('onClick !!!!!!!!!!!!!!!!')
            // Получаем координаты клика относительно canvas
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            // Создаем вектор для луча, который будет проходить через точку клика
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

            // Получаем список объектов, через которые прошел луч
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                // Если луч пересек объекты в сцене
                const clickedObject = intersects[0].object;
                if (clickedObject.parent?.name.match('green')) {
                    moveCar = clickedObject;
                }
                console.log("Clicked object:", clickedObject.parent?.name);

                // Вы можете выполнить здесь любые действия с объектом, например, изменить его цвет или размер
            }
        }

        function onTouchStart(event: any) {
            // Получаем координаты касания
            const touch = event.touches[0];
            previousMousePosition = { x: touch.clientX, y: touch.clientY };
            isDragging = true;
            console.log('!!!!!!!!!!!!!!!!')
        }

        

        function onTouchEnd() {
            // Конец перетаскивания объекта по тачпаду
            isDragging = false;
        }

        function onMouseDown(event: any) {
            console.log('onMouseDown !!!!!!!!!!!!!!!!')
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        }

        function onTouchMove(event: any) {
            console.log('onTouchMove')
            console.log(event.touches[0])
            if (isDragging) {
                // Получаем текущие координаты касания
                const touch = event.touches[0];
                const deltaX = touch.clientX - previousMousePosition.x;
                const deltaY = touch.clientY - previousMousePosition.y;
                const car = root.children[0]; // Измените этот путь, если изменяется название дочерней сцены
                car.position.z -= 10; // Учитывайте, что ось y в 3D-пространстве может быть обратной

                // Изменяем позицию объекта на сцене в соответствии с перемещением пальца по тачпаду
                if (moveCar) {
                    
                }

                // Обновляем предыдущие координаты касания
                previousMousePosition = { x: touch.clientX, y: touch.clientY };
            }
        }

        function onMouseMove(event: any) {
            console.log('onMouseMove !!!!!!!!!!!!!!!!')
            if (isDragging) {
                const deltaX = event.clientX - previousMousePosition.x;
                const deltaY = event.clientY - previousMousePosition.y;

                // Изменяем позицию объекта на сцене в соответствии с перемещением мыши
                // const car = root.children[0]; // Измените этот путь, если изменяется название дочерней сцены
                // car.position.x += deltaY;
                if (moveCar) {
                    moveCar.position.z -= deltaX; // Учитывайте, что ось y в 3D-пространстве может быть обратной
                    
                }

                previousMousePosition = { x: event.clientX, y: event.clientY };
            }
        }

        function onMouseUp() {
            isDragging = false;
        }

        // Анимация и рендеринг
        function animate() {
            requestAnimationFrame(animate);
            composer.render();
        }

        animate();



        
        
        

        function onWindowResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            composer.setSize(width, height); // Обновляем размеры композитора постобработки, если используется
        }

        // Добавляем обработчик события изменения размеров окна
        window.addEventListener('resize', onWindowResize);

        // Инициализация размеров рендерера при загрузке страницы
        onWindowResize();
    });


};
