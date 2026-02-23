import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createGround } from './ground.js';
import { createSky } from './sky.js';

// --- المشهد والرندر ---
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// --- استدعاء العناصر من الملفات الأخرى ---
createSky(scene);
createGround(scene);

// --- شخصية رئيسية (تفاصيل بسيطة) ---
const playerGroup = new THREE.Group();

// الجسم
const bodyGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.5);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.castShadow = true;
body.receiveShadow = true;
body.position.y = 0.75;
playerGroup.add(body);

// الرأس
const headGeo = new THREE.SphereGeometry(0.4);
const headMat = new THREE.MeshStandardMaterial({ color: 0xffccaa });
const head = new THREE.Mesh(headGeo, headMat);
head.castShadow = true;
head.receiveShadow = true;
head.position.y = 1.6;
playerGroup.add(head);

// الذراعان
const armGeo = new THREE.CylinderGeometry(0.2, 0.2, 1);
const armMat = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
const armL = new THREE.Mesh(armGeo, armMat);
armL.castShadow = true;
armL.receiveShadow = true;
armL.position.set(-0.7, 1.0, 0);
armL.rotation.z = 0.2;
playerGroup.add(armL);
const armR = new THREE.Mesh(armGeo, armMat);
armR.castShadow = true;
armR.receiveShadow = true;
armR.position.set(0.7, 1.0, 0);
armR.rotation.z = -0.2;
playerGroup.add(armR);

// الأرجل
const legGeo = new THREE.CylinderGeometry(0.2, 0.2, 1);
const legMat = new THREE.MeshStandardMaterial({ color: 0x337766 });
const legL = new THREE.Mesh(legGeo, legMat);
legL.castShadow = true;
legL.receiveShadow = true;
legL.position.set(-0.25, 0.4, 0);
playerGroup.add(legL);
const legR = new THREE.Mesh(legGeo, legMat);
legR.castShadow = true;
legR.receiveShadow = true;
legR.position.set(0.25, 0.4, 0);
playerGroup.add(legR);

playerGroup.position.set(0, 0.5, 0);
playerGroup.castShadow = true;
playerGroup.receiveShadow = true;
scene.add(playerGroup);

// --- الكاميرات ---
const cameraFollow = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraFollow.position.set(5, 3, 5);

const cameraFree = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraFree.position.set(10, 10, 10);

let activeCamera = cameraFollow;
const controls = new OrbitControls(cameraFree, renderer.domElement);
controls.enableDamping = true;
controls.enabled = false;

// --- حالة الأزرار (للوحة المفاتيح واللمس) ---
const keyState = { w: false, a: false, s: false, d: false };

// دالة تحديث مؤشر الكاميرا
function updateCamStatus() {
    document.getElementById('cam-status').innerText = 
        activeCamera === cameraFollow ? '📷 كاميرا: خلفية' : '📷 كاميرا: حرة';
}

// --- أحداث لوحة المفاتيح ---
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
            updateCamStatus();
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

// --- أحداث أزرار اللمس (من index.html) ---
const btnW = document.getElementById('btn-w');
const btnA = document.getElementById('btn-a');
const btnS = document.getElementById('btn-s');
const btnD = document.getElementById('btn-d');
const btnC = document.getElementById('btn-c');

function setActive(btn, state) {
    if (state) btn.classList.add('active');
    else btn.classList.remove('active');
}

if (btnW) {
    btnW.addEventListener('touchstart', (e) => { e.preventDefault(); keyState.w = true; setActive(btnW, true); });
    btnW.addEventListener('touchend', (e) => { e.preventDefault(); keyState.w = false; setActive(btnW, false); });
    btnW.addEventListener('touchcancel', (e) => { e.preventDefault(); keyState.w = false; setActive(btnW, false); });
    btnW.addEventListener('mousedown', (e) => { e.preventDefault(); keyState.w = true; setActive(btnW, true); });
    btnW.addEventListener('mouseup', (e) => { e.preventDefault(); keyState.w = false; setActive(btnW, false); });
    btnW.addEventListener('mouseleave', (e) => { keyState.w = false; setActive(btnW, false); });
}

if (btnA) {
    btnA.addEventListener('touchstart', (e) => { e.preventDefault(); keyState.a = true; setActive(btnA, true); });
    btnA.addEventListener('touchend', (e) => { e.preventDefault(); keyState.a = false; setActive(btnA, false); });
    btnA.addEventListener('touchcancel', (e) => { e.preventDefault(); keyState.a = false; setActive(btnA, false); });
    btnA.addEventListener('mousedown', (e) => { e.preventDefault(); keyState.a = true; setActive(btnA, true); });
    btnA.addEventListener('mouseup', (e) => { e.preventDefault(); keyState.a = false; setActive(btnA, false); });
    btnA.addEventListener('mouseleave', (e) => { keyState.a = false; setActive(btnA, false); });
}

if (btnS) {
    btnS.addEventListener('touchstart', (e) => { e.preventDefault(); keyState.s = true; setActive(btnS, true); });
    btnS.addEventListener('touchend', (e) => { e.preventDefault(); keyState.s = false; setActive(btnS, false); });
    btnS.addEventListener('touchcancel', (e) => { e.preventDefault(); keyState.s = false; setActive(btnS, false); });
    btnS.addEventListener('mousedown', (e) => { e.preventDefault(); keyState.s = true; setActive(btnS, true); });
    btnS.addEventListener('mouseup', (e) => { e.preventDefault(); keyState.s = false; setActive(btnS, false); });
    btnS.addEventListener('mouseleave', (e) => { keyState.s = false; setActive(btnS, false); });
}

if (btnD) {
    btnD.addEventListener('touchstart', (e) => { e.preventDefault(); keyState.d = true; setActive(btnD, true); });
    btnD.addEventListener('touchend', (e) => { e.preventDefault(); keyState.d = false; setActive(btnD, false); });
    btnD.addEventListener('touchcancel', (e) => { e.preventDefault(); keyState.d = false; setActive(btnD, false); });
    btnD.addEventListener('mousedown', (e) => { e.preventDefault(); keyState.d = true; setActive(btnD, true); });
    btnD.addEventListener('mouseup', (e) => { e.preventDefault(); keyState.d = false; setActive(btnD, false); });
    btnD.addEventListener('mouseleave', (e) => { keyState.d = false; setActive(btnD, false); });
}

if (btnC) {
    btnC.addEventListener('touchstart', (e) => {
        e.preventDefault();
        activeCamera = (activeCamera === cameraFollow) ? cameraFree : cameraFollow;
        controls.enabled = (activeCamera === cameraFree);
        updateCamStatus();
    });
    btnC.addEventListener('click', (e) => {
        e.preventDefault();
        activeCamera = (activeCamera === cameraFollow) ? cameraFree : cameraFollow;
        controls.enabled = (activeCamera === cameraFree);
        updateCamStatus();
    });
}

// --- حلقة اللعبة ---
function animate() {
    // حركة الشخصية
    const speed = 0.15;
    if (keyState.w) playerGroup.position.z -= speed;
    if (keyState.s) playerGroup.position.z += speed;
    if (keyState.a) playerGroup.position.x -= speed;
    if (keyState.d) playerGroup.position.x += speed;

    // تحديث كاميرا التتبع
    if (activeCamera === cameraFollow) {
        const offset = new THREE.Vector3(-3, 2.5, 4);
        cameraFollow.position.copy(playerGroup.position.clone().add(offset));
        cameraFollow.lookAt(playerGroup.position);
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

updateCamStatus();
console.log('✅ جميع الملفات تعمل معاً');
