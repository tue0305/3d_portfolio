import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadModel } from '../utils/modelLoader';

let scene, camera, renderer, controls;

export function initScene() {
    // Clear the portfolio container
    const container = document.getElementById('portfolio-container');
    container.innerHTML = '';

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5).normalize();
    scene.add(directionalLight);

    // Load the forest model
    loadModel('./assets/models/forest_creek.glb', (gltf) => {
        console.log('Model loaded successfully:', gltf);
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Adjust scale if necessary
        model.position.set(0, 0, 0); // Adjust position if necessary
        scene.add(model);
    }, (error) => {
        console.error('An error occurred while loading the model:', error);
    });

    camera.position.set(0, 2, 5);

    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia)
    controls.dampingFactor = 0.25; // Damping factor
    controls.screenSpacePanning = false; // Disable panning

    window.addEventListener('resize', onWindowResize);
}

export function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}