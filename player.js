import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createGround } from './ground.js';
import { createSky } from './sky.js';

// --- إعداد المشهد والرندر ---
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// --- إضافة العناصر من الملفات الأخرى ---
createSky(scene);
createGround(scene);

// --- إنشاء شخصية بسيطة (مكعب يمثل اللاعب) ---
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.castShadow = true;
player.receiveShadow = true;
player.position.set(0, 1, 0);
scene.add(player);

// --- كاميرات ---
const cameraFollow = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraFollow.position.set(5, 3, 5);

const cameraFree = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraFree.position.set(10, 10, 10);

let activeCamera = cameraFollow;
const controls = new OrbitControls(cameraFree, renderer.domElement);
controls.enableDamping = true;
controls.enabled = false;

// --- حالة الأزرار ---
const keyState = { w: false, a: false, s: false, d: false };

window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD' || e.code === 'KeyC') {
        e.preventDefault();
    }
    switch(e.code) {
        case 'KeyW': keyState.w = true; break;
        case 'KeyA': keyState.a = true; break;
        case 'KeyS': keyState.s = true; break;
        case 'KeyD': keyState.d = true; break;
        case 'KeyC':
            activeCamera = (activeCamera === cameraFollow) ? cameraFree : cameraFollow;
            controls.enabled = (activeCamera === cameraFree);
            break;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD') e.preventDefault();
    switch(e.code) {
        case 'KeyW': keyState.w = false; break;
        case 'KeyA': keyState.a = false; break;
        case 'KeyS': keyState.s = false; break;
        case 'KeyD': keyState.d = false; break;
    }
});

// --- حلقة اللعبة ---
function animate() {
    // تحريك الشخصية
    const speed = 0.1;
    if (keyState.w) player.position.z -= speed;
    if (keyState.s) player.position.z += speed;
    if (keyState.a) player.position.x -= speed;
    if (keyState.d) player.position.x += speed;

    // تحديث كاميرا التتبع
    if (activeCamera === cameraFollow) {
        const offset = new THREE.Vector3(-3, 2, 3);
        cameraFollow.position.copy(player.position.clone().add(offset));
        cameraFollow.lookAt(player.position);
    } else {
        controls.update();
    }

    renderer.render(scene, activeCamera);
    requestAnimationFrame(animate);
}

animate();

// --- تغيير حجم النافذة ---
window.addEventListener('resize', () => {
    cameraFollow.aspect = window.innerWidth / window.innerHeight;
    cameraFollow.updateProjectionMatrix();
    cameraFree.aspect = window.innerWidth / window.innerHeight;
    cameraFree.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log('✅ اللعبة تعمل من ملفات منفصلة!');
