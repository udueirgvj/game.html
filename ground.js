import * as THREE from 'three';

export function createGround(scene) {
    // أرضية خضراء
    const groundGeometry = new THREE.CircleGeometry(40, 32);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3a9e3a, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // شبكة مساعدة (اختيارية)
    const gridHelper = new THREE.GridHelper(40, 20, 0xaaaaaa, 0x444444);
    scene.add(gridHelper);

    // إضافة بعض الأشجار البسيطة
    for (let i = 0; i < 10; i++) {
        const treeGroup = new THREE.Group();
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x228822 });
        
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 2), trunkMat);
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        trunk.position.y = 1;
        treeGroup.add(trunk);
        
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(1, 1.5), leafMat);
        leaf.castShadow = true;
        leaf.receiveShadow = true;
        leaf.position.y = 2.5;
        treeGroup.add(leaf);
        
        const angle = Math.random() * Math.PI * 2;
        const radius = 8 + Math.random() * 12;
        treeGroup.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        scene.add(treeGroup);
    }
}
