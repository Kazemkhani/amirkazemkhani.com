import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function PortalScene({ paused }: { paused: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(paused);
  useEffect(() => {
    pauseRef.current = paused;
  }, [paused]);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    let alive = true,
      frame = 0,
      visible = true;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(6.6, 6.4, 10);
    camera.lookAt(0, 1, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04);
    scene.environment = env.texture;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xe6efff, 0xd9c9b3, 2));
    const sun = new THREE.DirectionalLight(0xfff4de, 4);
    sun.position.set(-3, 8, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -5;
    sun.shadow.camera.right = 5;
    sun.shadow.camera.top = 5;
    sun.shadow.camera.bottom = -5;
    sun.shadow.normalBias = 0.03;
    scene.add(sun);
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.54;
    ground.receiveShadow = true;
    scene.add(ground);
    let model: THREE.Group | undefined;
    const pointer = { x: 0, y: 0 };
    function draw() {
      renderer.render(scene, camera);
    }
    function resize() {
      renderer.setSize(host!.clientWidth, host!.clientHeight);
      camera.aspect = host!.clientWidth / host!.clientHeight;
      camera.updateProjectionMatrix();
      draw();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    new GLTFLoader().load(
      "/worlds/portals.glb",
      (gltf) => {
        if (!alive) {
          disposeModel(gltf.scene);
          return;
        }
        model = gltf.scene;
        model.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });
        scene.add(model);
        draw();
        host.classList.add("is-loaded");
      },
      undefined,
      () => {},
    );
    function move(e: PointerEvent) {
      if (e.pointerType !== "mouse" || pauseRef.current) return;
      const b = host!.getBoundingClientRect();
      pointer.x = (e.clientX - b.left) / b.width - 0.5;
      pointer.y = (e.clientY - b.top) / b.height - 0.5;
    }
    function leave() {
      pointer.x = 0;
      pointer.y = 0;
    }
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    function animate(t: number) {
      frame = requestAnimationFrame(animate);
      if (!visible || document.hidden || pauseRef.current) return;
      if (model && !pauseRef.current) {
        model.rotation.y +=
          (pointer.x * 0.25 +
            Math.sin(t * 0.00015) * 0.045 -
            model.rotation.y) *
          0.045;
        model.position.y = Math.sin(t * 0.00065) * 0.035;
        model.rotation.x += (-pointer.y * 0.08 - model.rotation.x) * 0.045;
      }
      draw();
    }
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(host);
    frame = requestAnimationFrame(animate);
    function disposeModel(root: THREE.Object3D) {
      root.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
    }
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      disposeModel(scene);
      env.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      host.classList.remove("is-loaded");
    };
  }, []);
  return <div className="portal-scene" ref={mount} aria-hidden="true" />;
}
