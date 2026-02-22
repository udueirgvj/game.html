import * as THREE from 'three';

export function setupCameras() {
    const cameraThird = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraThird.position.set(0, 5, 10);
    
    const cameraFree = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraFree.position.set(10, 10, 20);
    
    return { cameraThird, cameraFree };
}

export function updateThirdPersonCamera(camera, targetPlayer) {
    const offset = new THREE.Vector3(5, 3, 5);
    camera.position.copy(targetPlayer.position.clone().add(offset));
    camera.lookAt(targetPlayer.position);
}
