import * as THREE from 'three';

export function createTree(x, z) {
    const group = new THREE.Group();

    // تحميل نسيج الخشب
    const textureLoader = new THREE.TextureLoader();
    const barkTex = textureLoader.load('https://threejs.org/examples/textures/terrain/grass_01_diff_1k.jpg'); // نسيج مؤقت (يمكن تغييره)
    // استخدام نسيج مختلف للجذع والأوراق
    const leafTex = textureLoader.load('https://threejs.org/examples/textures/terrain/grass_01_diff_1k.jpg');

    // جذع
    const trunkGeo = new THREE.CylinderGeometry(0.6, 0.8, 2.5);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, roughness: 0.7, metalness: 0.1 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    trunk.position.y = 1.25;
    group.add(trunk);

    // أوراق (عدة طبقات)
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x3A7734, emissive: 0x112211, roughness: 0.4, metalness: 0 });
    
    const leaf1 = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.8), leafMat);
    leaf1.castShadow = true;
    leaf1.receiveShadow = true;
    leaf1.position.y = 2.8;
    group.add(leaf1);

    const leaf2 = new THREE.Mesh(new THREE.ConeGeometry(1.1, 1.5), leafMat);
    leaf2.castShadow = true;
    leaf2.receiveShadow = true;
    leaf2.position.y = 4.0;
    group.add(leaf2);

    const leaf3 = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.2), leafMat);
    leaf3.castShadow = true;
    leaf3.receiveShadow = true;
    leaf3.position.y = 5.0;
    group.add(leaf3);

    group.position.set(x, 0, z);
    
    // إضافة خاصية لحركة الأوراق
    group.userData = {
        leaf1, leaf2, leaf3,
        originalY: [leaf1.position.y, leaf2.position.y, leaf3.position.y]
    };
    
    return group;
}

export function addTrees(scene, count = 20) {
    const trees = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 10 + Math.random() * 25;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const tree = createTree(x, z);
        scene.add(tree);
        trees.push(tree);
    }
    return trees; // نرجعها لتحريكها لاحقاً إذا أردنا
}
