import * as THREE from 'three';

export function createPlayer() {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
    const player = new THREE.Mesh(geometry, material);
    player.castShadow = true;
    player.receiveShadow = true;
    player.position.set(0, 1, 0);
    return player;
}
