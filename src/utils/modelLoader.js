import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function loadModel(path, onLoad, onError) {
    const loader = new GLTFLoader();
    loader.load(path, onLoad, undefined, onError);
}