import * as THREE from 'three';

export function addRocksAndFlowers(scene) {
    // صخور
    const rockGeo = new THREE.DodecahedronGeometry(0.5);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 });
    for (let i = 0; i < 50; i++) {
        const rock = new THREE.Mesh(rockGeo, rockMat);
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 30;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        rock.position.set(x, 0.3, z);
        rock.scale.set(0.5 + Math.random(), 0.3 + Math.random()*0.5, 0.5 + Math.random());
        rock.rotation.set(Math.random(), Math.random(), Math.random());
        rock.castShadow = true;
        rock.receiveShadow = true;
        scene.add(rock);
    }

    // زهور (أقراص ملونة)
    const flowerMatRed = new THREE.MeshStandardMaterial({ color: 0xff4444 });
    const flowerMatYellow = new THREE.MeshStandardMaterial({ color: 0xffdd44 });
    const flowerMatBlue = new THREE.MeshStandardMaterial({ color: 0x44aaff });
    for (let i = 0; i < 100; i++) {
        const colorMat = [flowerMatRed, flowerMatYellow, flowerMatBlue][Math.floor(Math.random() * 3)];
        const flower = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.1, 6), colorMat);
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 30;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        flower.position.set(x, 0.05, z);
        flower.rotation.y = Math.random();
        flower.castShadow = true;
        flower.receiveShadow = true;
        scene.add(flower);
    }
}
