import * as THREE from 'three';

export function createPlayer() {
    const group = new THREE.Group();
    
    // الجسم
    const bodyGeo = new THREE.BoxGeometry(0.8, 1.5, 0.8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffaa00, roughness: 0.5 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 0.75;
    group.add(body);
    
    // الرأس
    const headGeo = new THREE.SphereGeometry(0.4);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffcc88 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 1.7;
    group.add(head);
    
    // العينان
    const eyeGeo = new THREE.SphereGeometry(0.1);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.2, 1.8, 0.35);
    group.add(eyeL);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.2, 1.8, 0.35);
    group.add(eyeR);
    
    // الذراعان
    const armGeo = new THREE.BoxGeometry(0.2, 0.8, 0.2);
    const armMat = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
    const armL = new THREE.Mesh(armGeo, armMat);
    armL.castShadow = true;
    armL.receiveShadow = true;
    armL.position.set(-0.6, 1.1, 0);
    group.add(armL);
    const armR = new THREE.Mesh(armGeo, armMat);
    armR.castShadow = true;
    armR.receiveShadow = true;
    armR.position.set(0.6, 1.1, 0);
    group.add(armR);
    
    // الأرجل
    const legGeo = new THREE.BoxGeometry(0.2, 0.8, 0.2);
    const legMat = new THREE.MeshStandardMaterial({ color: 0xaa7700 });
    const legL = new THREE.Mesh(legGeo, legMat);
    legL.castShadow = true;
    legL.receiveShadow = true;
    legL.position.set(-0.2, 0.4, 0);
    group.add(legL);
    const legR = new THREE.Mesh(legGeo, legMat);
    legR.castShadow = true;
    legR.receiveShadow = true;
    legR.position.set(0.2, 0.4, 0);
    group.add(legR);
    
    group.position.set(0, 1, 0);
    group.castShadow = true;
    group.receiveShadow = true;
    return group;
}
