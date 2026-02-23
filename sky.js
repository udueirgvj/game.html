import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

export function createSky(scene) {
    const sky = new Sky();
    sky.scale.setScalar(450);
    scene.add(sky);

    const sun = new THREE.Vector3();

    const parameters = {
        elevation: 30,
        azimuth: 180,
        exposure: 0.5
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    let renderTarget;

    function updateSun() {
        const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
        const theta = THREE.MathUtils.degToRad(parameters.azimuth);
        sun.setFromSphericalCoords(1, phi, theta);
        sky.material.uniforms.sunPosition.value.copy(sun);
        if (renderTarget !== undefined) renderTarget.dispose();
        renderTarget = pmremGenerator.fromScene(scene);
        scene.environment = renderTarget.texture;
    }

    updateSun();
    // يمكن تحديث الشمس ديناميكياً بتغيير parameters.elevation مع الوقت
}
