// تغيير لون الزر النشط + عمل scroll للجزء المطلوب
const buttons = document.querySelectorAll('.car-selector button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // إزالة الكلاس active من الكل
    buttons.forEach(b => b.classList.remove('active'));

    // إضافة الكلاس active للزر اللي اضغط عليه
    btn.classList.add('active');

    // عمل scroll للجزء المطلوب
    const targetId = btn.dataset.target;
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// ------------- Three.js Setup --------------------

function initViewer(containerId, modelPath) {
  const container = document.getElementById(containerId);

  // إعداد المشهد والكاميرا والrenderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // إضاءة
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(0, 10, 10);
  scene.add(dirLight);

  // تحميل الموديل
  const loader = new THREE.GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      console.log('Model loaded:', gltf);
      scene.add(gltf.scene);
      // Adjust camera to fit the model
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Scale the model if it's too small (like the E46 model)
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim < 1) {
        const scale = 10 / maxDim; // Scale to make it at least 10 units
        gltf.scene.scale.setScalar(scale);
        box.setFromObject(gltf.scene);
        box.getSize(size);
        box.getCenter(center);
      }

      camera.position.set(center.x, center.y + size.y / 2, center.z + size.z);
      camera.lookAt(center);
      animate();
    },
    (progress) => {
      console.log('Loading progress:', progress);
    },
    (error) => {
      console.error('Error loading model:', error);
      container.innerHTML = '<p style="color:red;">خطأ في تحميل الموديل: ' + error.message + '</p>';
    }
  );

  // أنيميشن الدوران البسيط
  function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
}

// تهيئة الموديلات
window.addEventListener('load', () => {
  initViewer('viewer-e46', 'assets/car_model/2014-m2-motoring-bmw-m3-e46/scene.gltf');  // BMW E46
  initViewer('viewer-b340', 'assets/car_model/bmw-m3/scene.gltf');  // BMW M3
  initViewer('viewer-m5', 'assets/car_model/bmw-x7-m60i/scene.gltf');  // BMW X7 M60i (as M5 placeholder)
});
