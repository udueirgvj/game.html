import * as THREE from 'three';

export function setupLighting(scene) {
    // إضاءة محيطة
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    // إضاءة اتجاهية رئيسية
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(20, 30, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);

    // إضاءة خلفية ناعمة
    const backLight = new THREE.DirectionalLight(0x446688, 0.5);
    backLight.position.set(-10, 10, -10);
    scene.add(backLight);
}
