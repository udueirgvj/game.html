import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { setupLighting } from './lighting.js';
import { addTrees } from './trees.js';
import { addAnimals } from './animals.js';
import { createPlayer } from './player.js';
import { setupCameras, updateThirdPersonCamera } from './camera.js';
import { createSky } from './sky.js';
import { createGround } from './ground.js';
import { addGrass } from './grass.js';
import { addRocksAndFlowers } from './environment.js';

// --- المشهد والرندر ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // لون السماء الأساسي، سيتم استبداله بالسماء

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // ظلال ناعمة
renderer.shadowMap.bias = 0.0001;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

// --- الإضاءة المحسنة ---
setupLighting(scene);

// --- السماء والضباب ---
createSky(scene);
scene.fog = new THREE.FogExp2(0x87CEEB, 0.02); // ضباب خفيف

// --- الأرضية مع نسيج ---
const ground = createGround();
scene.add(ground);

// --- إضافة العشب (كائنات صغيرة) ---
addGrass(scene);

// --- إضافة صخور وزهور ---
addRocksAndFlowers(scene);

// --- الأشجار (مع تحسينات) ---
addTrees(scene, 30); // زيادة عدد الأشجار

// --- الحيوانات (مع تحسينات الحركة) ---
const animals = addAnimals(scene, 8);

// --- الشخصية ---
const player = createPlayer();
scene.add(player);

// --- الكاميرات ---
const { cameraThird, cameraFree } = setupCameras();
let activeCamera = cameraThird;
const controls = new OrbitControls(cameraFree, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = true;
controls.maxPolarAngle = Math.PI / 2;
controls.enabled = false;

// --- متغيرات التحكم بالشخصية ---
const keyState = { w: false, a: false, s: false, d: false, space: false };
let playerVelocity = new THREE.Vector3();
let playerOnGround = true;
const gravity = -0.05;
const jumpForce = 0.8;

document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'KeyW': keyState.w = true; break;
        case 'KeyA': keyState.a = true; break;
        case 'KeyS': keyState.s = true; break;
        case 'KeyD': keyState.d = true; break;
        case 'Space': keyState.space = true; break;
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
        case 'Space': keyState.space = false; break;
    }
});

// --- حلقة اللعبة ---
const clock = new THREE.Clock();

function animate() {
    const delta = clock.getDelta();
    const time = performance.now() / 1000;

    // --- فيزياء الشخصية ---
    // تطبيق الجاذبية
    playerVelocity.y += gravity * delta * 30; // تسريع
    player.position.y += playerVelocity.y;

    // التحقق من الأرض
    if (player.position.y <= 1) { // نصف ارتفاع الشخصية (1)
        player.position.y = 1;
        playerVelocity.y = 0;
        playerOnGround = true;
    } else {
        playerOnGround = false;
    }

    // القفز
    if (keyState.space && playerOnGround) {
        playerVelocity.y = jumpForce;
        playerOnGround = false;
    }

    // تحريك الشخصية أفقياً (WASD)
    const speed = 0.15;
    const moveX = (keyState.d ? 1 : 0) - (keyState.a ? 1 : 0);
    const moveZ = (keyState.s ? 1 : 0) - (keyState.w ? 1 : 0);
    if (moveX !== 0 || moveZ !== 0) {
        // تطبيع الاتجاه
        const direction = new THREE.Vector3(moveX, 0, moveZ).normalize();
        player.position.x += direction.x * speed;
        player.position.z += direction.z * speed;

        // تدوير الشخصية باتجاه الحركة
        player.rotation.y = Math.atan2(direction.x, direction.z);
    }

    // تحديث كاميرا الشخصية بشكل سلس
    updateThirdPersonCamera(cameraThird, player, delta);

    // تحريك الحيوانات (محدث)
    animals.forEach(animal => {
        animal.update(delta, time);
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
