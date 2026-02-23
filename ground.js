import * as THREE from 'three';

export function createGround(scene) {
    // أرضية خضراء بسيطة
    const groundGeometry = new THREE.CircleGeometry(30, 32);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3a9e3a, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // شبكة مساعدة (اختيارية)
    const gridHelper = new THREE.GridHelper(30, 20, 0xaaaaaa, 0x444444);
    scene.add(gridHelper);
}
