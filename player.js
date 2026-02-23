import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js";

let player, mixer;
let keys = {};

export function createPlayer(scene){

    const loader = new GLTFLoader();

    loader.load("Soldier.glb", function(gltf){

        player = gltf.scene;
        player.scale.set(2,2,2);
        player.position.set(0,0,0);

        player.traverse(function(obj){
            if(obj.isMesh){
                obj.castShadow = true;
            }
        });

        scene.add(player);

        mixer = new THREE.AnimationMixer(player);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
    });

    // لوحة المفاتيح
    window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
    window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

    return player;
}

export function updatePlayer(camera){

    if(!player) return;

    let speed = 0.12;

    if(keys["w"]) player.position.z -= speed;
    if(keys["s"]) player.position.z += speed;
    if(keys["a"]) player.position.x -= speed;
    if(keys["d"]) player.position.x += speed;

    // كاميرا شخص ثالث (خلف اللاعب)
    camera.position.x = player.position.x + 6;
    camera.position.y = player.position.y + 5;
    camera.position.z = player.position.z + 8;

    camera.lookAt(player.position);

    if(mixer) mixer.update(0.016);
}
