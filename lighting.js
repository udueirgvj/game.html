import * as THREE from 'three';

export function setupLighting(scene) {
    // إضاءة محيطة من السماء والأرض
    const hemiLight = new THREE.HemisphereLight(0x88ccff, 0x335522, 1);
    scene.add(hemiLight);

    // إضاءة شمسية اتجاهية
    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    sunLight.position.set(30, 40, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 80;
    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;
    sunLight.shadow.bias = -0.0005;
    sunLight.shadow.normalBias = 0.02;
    scene.add(sunLight);

    // إضاءة خلفية ناعمة
    const fillLight = new THREE.DirectionalLight(0x446688, 0.5);
    fillLight.position.set(-20, 10, -20);
    scene.add(fillLight);
}
