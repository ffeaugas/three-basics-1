import * as THREE from 'three';

export function events(scene, renderer, cubes, cylinders) {
  const cubesList = document.querySelector('#cubes button');
  cubesList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff,
      });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      cube.position.x = Math.random() * 20 - 10;
      cube.position.y = Math.random() * 8 - 2;
      cube.position.z = Math.random() * 10 - 10;
      cubes.push(cube);
    }
  });

  const cylindersList = document.querySelector('#cylinders button');
  cylindersList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      const radiusTop = 0.2;
      const radiusBottom = 0.2;
      const height = 1;
      const radialSegments = 12;
      const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff,
      });
      const cylinder = new THREE.Mesh(geometry, material);
      scene.add(cylinder);
      cylinder.position.x = Math.random() * 20 - 10;
      cylinder.position.y = Math.random() * 8 - 2;
      cylinder.position.z = Math.random() * 10 - 10;
      cylinders.push(cylinder);
    }
  });

  const clearCubesButton = document.querySelector('#cubes button.clear');
  clearCubesButton.addEventListener('click', event => {
    cubes.forEach(cube => {
      scene.remove(cube);
    });
    cubes.length = 0;
    renderer.renderLists.dispose();
  });

  const clearCylindersButton = document.querySelector('#cylinders button.clear');
  clearCylindersButton.addEventListener('click', event => {
    cylinders.forEach(cylinder => {
      scene.remove(cylinder);
    });
    cylinders.length = 0;
    renderer.renderLists.dispose();
  });
}
