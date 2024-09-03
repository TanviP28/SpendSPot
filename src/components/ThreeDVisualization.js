import React, { useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const LegoStaircaseAnimation = () => {
  useEffect(() => {
    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x1a1a2e); // Dark background for contrast

    // Create Lego Brick Geometry (4x4 studs)
    const createLegoBrick = (color) => {
      const group = new THREE.Group();
      const brickGeometry = new THREE.BoxGeometry(1, 0.5, 1); // Base of the brick
      const brickMaterial = new THREE.MeshPhongMaterial({ color });
      const brickMesh = new THREE.Mesh(brickGeometry, brickMaterial);
      group.add(brickMesh);

      // Add studs on top of the brick
      const studGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 32);
      const studMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff }); // Slightly lighter for contrast
      for (let i = -0.35; i <= 0.35; i += 0.7) {
        for (let j = -0.35; j <= 0.35; j += 0.7) {
          const studMesh = new THREE.Mesh(studGeometry, studMaterial);
          studMesh.position.set(i, 0.3, j); // Stud position
          studMesh.rotation.x = Math.PI / 2; // Correct orientation
          group.add(studMesh);
        }
      }
      return group;
    };

    // Bright Colors for Each Step
    const brightColors = [0xff6384, 0xffcd56, 0x4bc0c0, 0x36a2eb, 0xff9f40];

    // Text Geometry for "Saving & Spending Step by Step"
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Saving & Spending Step by Step', {
        font: font,
        size: 0.4,
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x555555 }); // More white and bold
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.computeBoundingBox();
      textGeometry.boundingBox.getCenter(textMesh.position).multiplyScalar(-1);
      textMesh.position.set(0, 4, 0); // Position text above the staircase
      scene.add(textMesh);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Increased ambient light intensity
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 100); // Increased intensity and distance
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Added directional light
    directionalLight.position.set(-5, 10, 5).normalize();
    scene.add(directionalLight);

    const spotlight = new THREE.SpotLight(0xffffff, 1.5); // Added spotlight for focused lighting
    spotlight.position.set(0, 10, 10);
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 0.1;
    spotlight.decay = 2;
    spotlight.distance = 100;
    scene.add(spotlight);

    camera.position.set(0, 3, 10); // Adjust camera position for a better view

    // Animation Loop: Adding Cubes to Form a Staircase
    let step = 0;
    let blocks = []; // Keep track of blocks for looping
    let blockDelay = 0; // Delay between adding each block

    const animate = () => {
      requestAnimationFrame(animate);

      // Clear previous blocks after completing the animation loop
      if (step === 20) {
        blocks.forEach((block) => scene.remove(block));
        blocks = [];
        step = 0; // Reset step to restart the animation
        blockDelay = 0; // Reset delay
      }

      // Add new blocks extremely slowly
      if (step < 20 && blockDelay === 60) { // Increase delay here to make it slower
        const color = brightColors[step % brightColors.length]; // Cycle through bright colors
        const legoBrick = createLegoBrick(color);
        legoBrick.position.set((step % 5) - 2, Math.floor(step / 5) * 0.6, 0); // Precise positioning for staircase effect
        scene.add(legoBrick);
        blocks.push(legoBrick); // Add block to track for clearing later
        step++;
        blockDelay = 0; // Reset delay after adding block
      }

      blockDelay++;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.body.removeChild(renderer.domElement); // Clean up
    };
  }, []);

  return null; // No additional JSX needed
};

export default LegoStaircaseAnimation;
