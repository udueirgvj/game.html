import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js";

let player = null;
let mixer = null;
let walkAction = null;

export function createPlayer(scene){

    const loader = new GLTFLoader();

    // ⭐ مهم: لأن الملف خارج مجلد ga
    loader.load("../Soldier.glb", function(gltf){

        player = gltf.scene;
        player.scale.set(2,2,2);
        player.position.set(0,0,0);

        // الظلال
        player.traverse(function(obj){
            if(obj.isMesh){
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });

        scene.add(player);

        // الانيميشن (المشي)
        mixer = new THREE.AnimationMixer(player);
        walkAction = mixer.clipAction(gltf.animations[0]);
        walkAction.play();
    });

    return player;
}


export function updatePlayer(camera){

    if(!player) return;

    let speed = 0.15;

    // قراءة الجويستك من index.html
    let moveX = window.joyX || 0;
    let moveY = window.joyY || 0;

    // حركة اللاعب
    player.position.x += moveX * speed;
    player.position.z -= moveY * speed;

    // دوران باتجاه الحركة
    if(moveX !== 0 || moveY !== 0){
        let angle = Math.atan2(moveX, moveY);
        player.rotation.y = angle;
    }

    // كاميرا شخص ثالث خلف اللاعب
    const distance = 8;
    const height = 5;

    const camX = player.position.x + Math.sin(player.rotation.y) * distance;
    const camZ = player.position.z + Math.cos(player.rotation.y) * distance;

    camera.position.set(camX, player.position.y + height, camZ);
    camera.lookAt(player.position.x, player.position.y + 2, player.position.z);

    // تحديث الانيميشن
    if(mixer) mixer.update(0.016);
}
