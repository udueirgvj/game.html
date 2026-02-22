import * as THREE from 'three';

function createRabbit(x, z) {
    const group = new THREE.Group();
    
    // الجسم
    const bodyGeo = new THREE.SphereGeometry(0.5, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    body.scale.set(1, 0.8, 1.2);
    body.position.y = 0.4;
    group.add(body);
    
    // الرأس
    const headGeo = new THREE.SphereGeometry(0.3, 16);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.set(0, 0.8, 0.4);
    group.add(head);
    
    // الأذنان
    const earGeo = new THREE.ConeGeometry(0.1, 0.5);
    const earMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
    const earL = new THREE.Mesh(earGeo, earMat);
    earL.castShadow = true;
    earL.receiveShadow = true;
    earL.position.set(-0.15, 1.1, 0.3);
    earL.rotation.z = -0.2;
    group.add(earL);
    
    const earR = new THREE.Mesh(earGeo, earMat);
    earR.castShadow = true;
    earR.receiveShadow = true;
    earR.position.set(0.15, 1.1, 0.3);
    earR.rotation.z = 0.2;
    group.add(earR);
    
    group.position.set(x, 0, z);
    return group;
}

export function addAnimals(scene, count = 5) {
    const animals = [];
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 30;
        const rabbit = createRabbit(x, z);
        scene.add(rabbit);
        animals.push({
            mesh: rabbit,
            speed: 0.02 + Math.random() * 0.03,
            direction: new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize(),
            time: Math.random() * 2
        });
    }
    return animals;
}
