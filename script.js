
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Octree } from 'three/addons/math/Octree.js';
import { Capsule } from 'three/addons/math/Capsule.js';
import { update } from './src/controls.js';
import { returnjson } from './dialogs.js';

    const octree = new Octree();

    var playerCollider = new Capsule( new THREE.Vector3( -1.5,  0, 4.5 ), new THREE.Vector3( -1.5,  0 + 1.15, 4.5 ), 0.9);

    let jsonString = returnjson();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xBFEAE8);
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.5, 200);
    

    camera.position.x = playerCollider.end.x;
    camera.position.y = playerCollider.end.y;
    camera.position.z = playerCollider.end.z;
    

    camera.rotation.order = 'YXZ'
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const objects = [];
    const interaction = [];
    document.body.requestPointerLock = renderer.domElement.requestPointerLock || renderer.domElement.mozRequestPointerLock || renderer.domElement.webkitRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

    document.addEventListener('click', function(event) {
        selectObject(event, camera, scene, renderer);
    });

    // Event listener for pointer lock change
        document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === document.body) {
            document.addEventListener('mousemove', onMouseMove, false);
        } else {
            document.removeEventListener('mousemove', onMouseMove, false);
        }
    });

    // Event listener for pointer lock error
    document.addEventListener('pointerlockerror', () => {
        console.error('Pointer lock error');
    });

    // Request pointer lock when the document is clicked
    document.addEventListener('click', () => {
        document.body.requestPointerLock();
    });

    // Function to handle mouse movement
    function onMouseMove(event) {
        camera.rotation.y = (camera.rotation.y - event.movementX / 300) % (2 * Math.PI);
        const moverotation = (camera.rotation.x - event.movementY / 300) % (2 * Math.PI)
        if(moverotation < (Math.PI/5) && moverotation > - (Math.PI/4) )
            camera.rotation.x = moverotation;
    }

    const loader = new GLTFLoader();    
    loader.load(
        './kitchen/scene.gltf',
        function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    // Ajouter l'objet au tableau
                    objects.push(child);
                }
            });
            scene.add(gltf.scene);
        },
        undefined,
        function (error) {
            console.error('Error loading GLTF model:', error);
        }
    );

    function hideAllObjects(scene) {
        scene.traverse(function (child) {
            if (child.isMesh) {
                child.visible = false;
            }
        });
    }
    loader.load(
        './kitchen/collider/interaction.gltf',
        function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    // Ajouter l'objet au tableau
                    interaction.push(child);
                }
            });
            hideAllObjects(gltf.scene);
            scene.add(gltf.scene);
        },
        undefined,
        function (error) {
            console.error('Error loading GLTF model:', error);
        }
    );
    
    function displayCard(text) {
        const cardClassName = 'my-card-class';
        const card = document.createElement('div');
        card.classList.add(cardClassName);
        card.textContent = text;
        document.body.appendChild(card);
        setTimeout(() => {
            card.remove();
        }, 3000);
    }

    function selectObject(event, camera, scene, renderer) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        const mouseVector = new THREE.Vector3(mouseX, mouseY, 0.5);
        mouseVector.unproject(camera);
        const raycaster = new THREE.Raycaster(camera.position, mouseVector.sub(camera.position).normalize(), 0, 3);
        const intersects = raycaster.intersectObjects(interaction, true);
        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            const dialogs = jsonString.find((c) => (c.var == selectedObject.name));
            if(dialogs)
             displayCard(dialogs.text);
        }
    }

    function animate() {
        update(camera.position, camera.rotation);
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();