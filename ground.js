import * as THREE from 'three';

export function createGround() {
    // تحميل نسيج العشب (يمكن استخدام صورة محلية أو رابط)
    const textureLoader = new THREE.TextureLoader();
    const grassColor = textureLoader.load('https://threejs.org/examples/textures/terrain/grass_01_diff_1k.jpg');
    const grassNormal = textureLoader.load('https://threejs.org/examples/textures/terrain/grass_01_nor_gl_1k.jpg');
    const grassRoughness = textureLoader.load('https://threejs.org/examples/textures/terrain/grass_01_rough_1k.jpg');

    // تكرار النسيج
    grassColor.wrapS = THREE.RepeatWrapping;
    grassColor.wrapT = THREE.RepeatWrapping;
    grassColor.repeat.set(20, 20);
    grassNormal.wrapS = THREE.RepeatWrapping;
    grassNormal.wrapT = THREE.RepeatWrapping;
    grassNormal.repeat.set(20, 20);
    grassRoughness.wrapS = THREE.RepeatWrapping;
    grassRoughness.wrapT = THREE.RepeatWrapping;
    grassRoughness.repeat.set(20, 20);

    const groundMaterial = new THREE.MeshStandardMaterial({
        map: grassColor,
        normalMap: grassNormal,
        roughnessMap: grassRoughness,
        roughness: 0.8,
        metalness: 0.1
    });

    const groundGeometry = new THREE.CircleGeometry(80, 64);
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    return ground;
}
