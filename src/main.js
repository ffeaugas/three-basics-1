import * as THREE from 'three';
import { events } from './events.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const animationCheckbox = document.getElementById('stopAnimation');

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 20;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;
  camera.position.y = 1;

  const scene = new THREE.Scene();

  {
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    const directinalLight = new THREE.DirectionalLight(0xffffff, 10);
    directinalLight.position.set(0, 10, 10);
    scene.add(directinalLight);
  }

  const gridHelper = new THREE.GridHelper(50, 50, 0x00aaaa, 0x00aaaa);
  scene.add(gridHelper);
  gridCheckbox.addEventListener('change', event => {
    gridHelper.visible = event.target.checked;
  });

  const cubes = [];
  const cylinders = [];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (!animationCheckbox.checked) {
      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
      cylinders.forEach((cylinder, ndx) => {
        const speed = 0.5 + ndx * 0.1;
        cylinder.position.y = Math.sin(time * 2) * speed;
      });
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  events(scene, renderer, cubes, cylinders);
}

main();
