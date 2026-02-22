import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- الإعدادات الأساسية ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // لون السماء

// الكاميرات: كاميرتان - واحدة للشخصية (تابعة) والأخرى حرة
const cameraThirdPerson = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraThirdPerson.position.set(0, 5, 10); // خلف الشخصية

const cameraFree = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraFree.position.set(10, 10, 20);

let activeCamera = cameraThirdPerson; // الكاميرا النشطة حالياً

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // تفعيل الظلال
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// --- الإضاءة ---
// إضاءة محيطة
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

// إضاءة اتجاهية (للشمس) مع ظلال
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(20, 30, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;
scene.add(directionalLight);

// --- الأرضية ---
const groundGeometry = new THREE.CircleGeometry(50, 32);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3a5f0b });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.receiveShadow = true;
scene.add(ground);

// شبكة مساعدة (اختياري)
const gridHelper = new THREE.GridHelper(100, 20, 0x888888, 0x444444);
scene.add(gridHelper);

// --- الشخصية الرئيسية (مكعب بسيط) ---
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.castShadow = true;
player.receiveShadow = true;
player.position.set(0, 1, 0);
scene.add(player);

// --- إنشاء الأشجار (دالة مساعدة) ---
function createTree(x, z) {
    const group = new THREE.Group();
    
    // الجذع
    const trunkGeo = new THREE.CylinderGeometry(0.5, 0.7, 2);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    trunk.position.y = 1;
    group.add(trunk);
    
    // الأوراق (ثلاث طبقات)
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const leaf1 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.5), leafMat);
    leaf1.castShadow = true;
    leaf1.receiveShadow = true;
    leaf1.position.y = 2.5;
    group.add(leaf1);
    
    const leaf2 = new THREE.Mesh(new THREE.ConeGeometry(1, 1.2), leafMat);
    leaf2.castShadow = true;
    leaf2.receiveShadow = true;
    leaf2.position.y = 3.7;
    group.add(leaf2);
    
    const leaf3 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1), leafMat);
    leaf3.castShadow = true;
    leaf3.receiveShadow = true;
    leaf3.position.y = 4.7;
    group.add(leaf3);
    
    group.position.set(x, 0, z);
    return group;
}

// إضافة أشجار عشوائية
for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 8 + Math.random() * 15;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    scene.add(createTree(x, z));
}

// --- الحيوانات (أرانب بسيطة) ---
function createRabbit(x, z) {
    const group = new THREE.Group();
    
    // الجسم
    const bodyGeo = new THREE.SphereGeometry(0.5, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
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
    
    // الأذن اليسرى
    const earGeo = new THREE.ConeGeometry(0.1, 0.5);
    const earMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    const earL = new THREE.Mesh(earGeo, earMat);
    earL.castShadow = true;
    earL.receiveShadow = true;
    earL.position.set(-0.15, 1.1, 0.3);
    earL.rotation.z = -0.2;
    group.add(earL);
    
    // الأذن اليمنى
    const earR = new THREE.Mesh(earGeo, earMat);
    earR.castShadow = true;
    earR.receiveShadow = true;
    earR.position.set(0.15, 1.1, 0.3);
    earR.rotation.z = 0.2;
    group.add(earR);
    
    group.position.set(x, 0, z);
    return group;
}

// إنشاء عدة أرانب
const rabbits = [];
for (let i = 0; i < 5; i++) {
    const x = (Math.random() - 0.5) * 30;
    const z = (Math.random() - 0.5) * 30;
    const rabbit = createRabbit(x, z);
    scene.add(rabbit);
    rabbits.push({
        mesh: rabbit,
        speed: 0.02 + Math.random() * 0.03,
        direction: new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize(),
        time: 0
    });
}

// --- عناصر إضافية (صخور أو زهور) ---
// (يمكن إضافتها حسب الرغبة)

// --- متغيرات التحكم بالشخصية ---
const keyState = {
    w: false, a: false, s: false, d: false
};
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'KeyW': keyState.w = true; break;
        case 'KeyA': keyState.a = true; break;
        case 'KeyS': keyState.s = true; break;
        case 'KeyD': keyState.d = true; break;
        case 'KeyC': // تبديل الكاميرا
            activeCamera = (activeCamera === cameraThirdPerson) ? cameraFree : cameraThirdPerson;
            controls.enabled = (activeCamera === cameraFree); // تفعيل OrbitControls فقط في الكاميرا الحرة
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

// --- إعداد OrbitControls للكاميرا الحرة ---
const controls = new OrbitControls(cameraFree, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = true;
controls.maxPolarAngle = Math.PI / 2; // لا تذهب تحت الأرض
controls.enabled = false; // تبدأ معطلة لأن الكاميرا النشطة هي الشخصية

// --- حلقة اللعبة ---
let clock = new THREE.Clock();

function animate() {
    const delta = clock.getDelta();
    const time = performance.now() / 1000; // بالثواني
    
    // --- تحريك الشخصية بناءً على المدخلات ---
    const moveSpeed = 0.1;
    if (keyState.w) player.position.z -= moveSpeed;
    if (keyState.s) player.position.z += moveSpeed;
    if (keyState.a) player.position.x -= moveSpeed;
    if (keyState.d) player.position.x += moveSpeed;
    
    // --- تحديث الكاميرا الثالثة (تتبع الشخصية) ---
    const offset = new THREE.Vector3(5, 3, 5); // خلف الشخصية قليلاً
    cameraThirdPerson.position.copy(player.position.clone().add(offset));
    cameraThirdPerson.lookAt(player.position);
    
    // --- تحريك الحيوانات بشكل عشوائي ---
    rabbits.forEach(rabbit => {
        // حركة بسيطة: تغيير الاتجاه كل فترة
        rabbit.time += delta;
        if (rabbit.time > 2) {
            rabbit.time = 0;
            rabbit.direction.set(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
        }
        // تحريك الأرنب
        rabbit.mesh.position.x += rabbit.direction.x * rabbit.speed;
        rabbit.mesh.position.z += rabbit.direction.z * rabbit.speed;
        
        // إبقاء الأرنب داخل منطقة معينة (اختياري)
        const limit = 20;
        if (Math.abs(rabbit.mesh.position.x) > limit) rabbit.direction.x *= -1;
        if (Math.abs(rabbit.mesh.position.z) > limit) rabbit.direction.z *= -1;
        
        // جعل الأرنب يواجه اتجاه حركته
        if (rabbit.direction.length() > 0.01) {
            const angle = Math.atan2(rabbit.direction.x, rabbit.direction.z);
            rabbit.mesh.rotation.y = angle;
        }
    });
    
    // --- تحديث الكاميرا الحرة (OrbitControls) ---
    if (activeCamera === cameraFree) {
        controls.update();
    }
    
    // --- عرض المشهد بالكاميرا النشطة ---
    renderer.render(scene, activeCamera);
    requestAnimationFrame(animate);
}

animate();

// --- معالجة تغيير حجم النافذة ---
window.addEventListener('resize', () => {
    cameraThirdPerson.aspect = window.innerWidth / window.innerHeight;
    cameraThirdPerson.updateProjectionMatrix();
    cameraFree.aspect = window.innerWidth / window.innerHeight;
    cameraFree.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
