import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { setupLighting } from './lighting.js';
import { addTrees } from './trees.js';
import { addAnimals } from './animals.js';
import { createPlayer } from './player.js';
import { setupCameras, updateThirdPersonCamera } from './camera.js';

// --- المشهد والرندر ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// --- الإضاءة ---
setupLighting(scene);

// --- الأرضية ---
const groundGeo = new THREE.CircleGeometry(50, 32);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x3a5f0b });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.receiveShadow = true;
scene.add(ground);

// شبكة مساعدة (اختياري)
scene.add(new THREE.GridHelper(100, 20, 0x888888, 0x444444));

// --- إنشاء العناصر ---
const player = createPlayer();
scene.add(player);

addTrees(scene, 25);
const animals = addAnimals(scene, 6);

// --- الكاميرات ---
const { cameraThird, cameraFree } = setupCameras();
let activeCamera = cameraThird; // نبدأ بكاميرا الشخصية

// --- أدوات التحكم للكاميرا الحرة ---
const controls = new OrbitControls(cameraFree, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = true;
controls.maxPolarAngle = Math.PI / 2;
controls.enabled = false; // تبدأ معطلة

// --- التحكم بالشخصية (WASD) ---
const keyState = { w: false, a: false, s: false, d: false };
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'KeyW': keyState.w = true; break;
        case 'KeyA': keyState.a = true; break;
        case 'KeyS': keyState.s = true; break;
        case 'KeyD': keyState.d = true; break;
        case 'KeyC': 
            activeCamera = (activeCamera === cameraThird) ? cameraFree : cameraThird;
            controls.enabled = (activeCamera === cameraFree);
            break;
    }
});
document.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'KeyW': keyState.w = false; break;
        case 'KeyA': keyState.a = false; break;
        case 'KeyS': keyState.s = false; break;
        case 'KeyD': keyState.d = false; break;
    }
});

// --- حلقة اللعبة ---
const clock = new THREE.Clock();

function animate() {
    const delta = clock.getDelta();
    
    // تحريك الشخصية
    const speed = 0.1;
    if (keyState.w) player.position.z -= speed;
    if (keyState.s) player.position.z += speed;
    if (keyState.a) player.position.x -= speed;
    if (keyState.d) player.position.x += speed;
    
    // تحديث كاميرا الشخصية
    updateThirdPersonCamera(cameraThird, player);
    
    // تحريك الحيوانات
    animals.forEach(animal => {
        animal.time += delta;
        if (animal.time > 2) {
            animal.time = 0;
            animal.direction.set(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
        }
        
        animal.mesh.position.x += animal.direction.x * animal.speed;
        animal.mesh.position.z += animal.direction.z * animal.speed;
        
        // حدود الحركة
        const limit = 22;
        if (Math.abs(animal.mesh.position.x) > limit) animal.direction.x *= -1;
        if (Math.abs(animal.mesh.position.z) > limit) animal.direction.z *= -1;
        
        // توجيه الأرنب نحو اتجاه حركته
        if (animal.direction.lengthSq() > 0.01) {
            const angle = Math.atan2(animal.direction.x, animal.direction.z);
            animal.mesh.rotation.y = angle;
        }
    });
    
    // تحديث الكاميرا الحرة إذا كانت نشطة
    if (activeCamera === cameraFree) {
        controls.update();
    }
    
    // الرسم
    renderer.render(scene, activeCamera);
    requestAnimationFrame(animate);
}

animate();

// --- معالجة تغيير حجم النافذة ---
window.addEventListener('resize', () => {
    cameraThird.aspect = window.innerWidth / window.innerHeight;
    cameraThird.updateProjectionMatrix();
    cameraFree.aspect = window.innerWidth / window.innerHeight;
    cameraFree.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
