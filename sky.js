import * as THREE from 'three';

export function createSky(scene) {
    // لون السماء
    scene.background = new THREE.Color(0x87CEEB);

    // إضاءة محيطة
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    // إضاءة شمسية
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(10, 20, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.camera.left = -15;
    sunLight.shadow.camera.right = 15;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -15;
    scene.add(sunLight);

    // إضاءة خلفية
    const backLight = new THREE.DirectionalLight(0x446688, 0.5);
    backLight.position.set(-5, 5, -10);
    scene.add(backLight);

    // اختيارياً: إضافة غيوم أو skybox لاحقاً
}
