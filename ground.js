import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";

export function createGround(scene) {

    const textureLoader = new THREE.TextureLoader();

    // تحميل صورة العشب
    const grassTexture = textureLoader.load("grass.jpg");

    // تكرار الصورة حتى لا تتمطط
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;

    // عدد التكرار (كلما زاد أصبحت أدق)
    grassTexture.repeat.set(80, 80);

    // جودة أعلى
    grassTexture.anisotropy = 16;

    const groundGeometry = new THREE.PlaneGeometry(2000, 2000);

    const groundMaterial = new THREE.MeshStandardMaterial({
        map: grassTexture
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);

    // تدوير الأرض
    ground.rotation.x = -Math.PI / 2;

    // استقبال الظل
    ground.receiveShadow = true;

    scene.add(ground);
}
