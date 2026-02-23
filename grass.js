import * as THREE from 'three';

export function addGrass(scene) {
    // إنشاء نموذج عشبة بسيط (مخروط صغير)
    const bladeGeo = new THREE.ConeGeometry(0.1, 0.5, 4);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x55aa33 });

    // استخدام InstancedMesh لتكرار العشب
    const count = 2000;
    const instancedMesh = new THREE.InstancedMesh(bladeGeo, bladeMat, count);
    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
        // توزيع عشوائي على مساحة دائرية
        const radius = 30 + Math.random() * 30;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // تجنب وضع العشب في مركز اللعب
        if (Math.abs(x) < 5 && Math.abs(z) < 5) continue;

        dummy.position.set(x, 0.25, z);
        dummy.rotation.y = Math.random() * Math.PI;
        dummy.scale.set(1, 1 + Math.random() * 0.5, 1);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    scene.add(instancedMesh);
}
