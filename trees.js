import * as THREE from 'three';

export function createTree(x, z) {
    const group = new THREE.Group();
    
    // الجذع
    const trunkGeo = new THREE.CylinderGeometry(0.5, 0.7, 2);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    trunk.position.y = 1;
    group.add(trunk);
    
    // الأوراق
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2E8B57 });
    const leaf1 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.5), leafMat);
    leaf1.castShadow = true;
    leaf1.receiveShadow = true;
    leaf1.position.y = 2.5;
    group.add(leaf1);
    
    const leaf2 = new THREE.Mesh(new THREE.ConeGeometry(1, 1.2), leafMat);
    leaf2.castShadow = true;
    leaf2.receiveShadow = true;
    leaf2.position.y = 3.7;
    group.add(leaf2);
    
    const leaf3 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1), leafMat);
    leaf3.castShadow = true;
    leaf3.receiveShadow = true;
    leaf3.position.y = 4.7;
    group.add(leaf3);
    
    group.position.set(x, 0, z);
    return group;
}

export function addTrees(scene, count = 20) {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 8 + Math.random() * 15;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        scene.add(createTree(x, z));
    }
}
