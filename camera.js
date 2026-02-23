import * as THREE from 'three';

export function setupCameras() {
    const cameraThird = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraThird.position.set(0, 5, 10);
    
    const cameraFree = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraFree.position.set(10, 10, 20);
    
    return { cameraThird, cameraFree };
}

export function updateThirdPersonCamera(camera, targetPlayer, delta) {
    // الموضع المطلوب خلف الشخصية
    const idealOffset = new THREE.Vector3(5, 3, 5); // خلف الشخصية
    const idealPosition = targetPlayer.position.clone().add(idealOffset);
    
    // استخدام الاستيفاء الخطي (lerp) لحركة سلسة
    const lerpFactor = 0.05;
    camera.position.lerp(idealPosition, lerpFactor);
    camera.lookAt(targetPlayer.position);
}
