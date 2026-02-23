import * as THREE from 'three';

class Rabbit {
    constructor(x, z) {
        this.group = new THREE.Group();
        
        // المواد
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.4 });
        const earMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
        const eyeMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
        
        // الجسم
        const bodyGeo = new THREE.SphereGeometry(0.5, 16);
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.castShadow = true;
        body.receiveShadow = true;
        body.scale.set(1, 0.8, 1.2);
        body.position.y = 0.4;
        this.group.add(body);
        
        // الرأس
        const headGeo = new THREE.SphereGeometry(0.3, 16);
        const head = new THREE.Mesh(headGeo, bodyMat);
        head.castShadow = true;
        head.receiveShadow = true;
        head.position.set(0, 0.8, 0.4);
        this.group.add(head);
        
        // الأذنان
        const earGeo = new THREE.ConeGeometry(0.1, 0.5);
        const earL = new THREE.Mesh(earGeo, earMat);
        earL.castShadow = true;
        earL.receiveShadow = true;
        earL.position.set(-0.15, 1.1, 0.3);
        earL.rotation.z = -0.2;
        this.group.add(earL);
        
        const earR = new THREE.Mesh(earGeo, earMat);
        earR.castShadow = true;
        earR.receiveShadow = true;
        earR.position.set(0.15, 1.1, 0.3);
        earR.rotation.z = 0.2;
        this.group.add(earR);
        
        // العيون
        const eyeGeo = new THREE.SphereGeometry(0.05);
        const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
        eyeL.position.set(-0.1, 0.85, 0.65);
        this.group.add(eyeL);
        const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
        eyeR.position.set(0.1, 0.85, 0.65);
        this.group.add(eyeR);
        
        // الذيل
        const tailGeo = new THREE.SphereGeometry(0.1);
        const tail = new THREE.Mesh(tailGeo, bodyMat);
        tail.position.set(0, 0.4, -0.7);
        this.group.add(tail);
        
        this.group.position.set(x, 0, z);
        this.group.castShadow = true;
        this.group.receiveShadow = true;

        // متغيرات الحركة
        this.speed = 0.02 + Math.random() * 0.04;
        this.direction = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
        this.time = Math.random() * 10;
        this.jumpTimer = 0;
        this.earAngle = 0;
    }

    update(delta, time) {
        // تغيير الاتجاه كل بضع ثوان
        this.time += delta;
        if (this.time > 3) {
            this.time = 0;
            this.direction.set(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
        }

        // حركة الأرنب
        this.group.position.x += this.direction.x * this.speed;
        this.group.position.z += this.direction.z * this.speed;

        // تدوير الأرنب باتجاه الحركة
        if (this.direction.lengthSq() > 0.01) {
            const angle = Math.atan2(this.direction.x, this.direction.z);
            this.group.rotation.y = angle;
        }

        // حركة القفز البسيطة (ارتفاع وهبوط)
        this.jumpTimer += delta * 5;
        const jumpY = Math.abs(Math.sin(this.jumpTimer)) * 0.1;
        this.group.position.y = jumpY;

        // حركة الأذنين
        this.earAngle += delta * 2;
        const earRotation = Math.sin(this.earAngle) * 0.1;
        this.group.children[2].rotation.z = -0.2 + earRotation; // الأذن اليسرى
        this.group.children[3].rotation.z = 0.2 - earRotation; // الأذن اليمنى

        // البقاء ضمن حدود معينة
        const limit = 30;
        if (Math.abs(this.group.position.x) > limit) this.direction.x *= -1;
        if (Math.abs(this.group.position.z) > limit) this.direction.z *= -1;
    }
}

export function addAnimals(scene, count = 5) {
    const animals = [];
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 40;
        const rabbit = new Rabbit(x, z);
        scene.add(rabbit.group);
        animals.push(rabbit);
    }
    return animals;
}
