import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { worlds } from "../data/worlds";
export default function Universe({
  active,
  paused,
  onSelect,
}: {
  active: number;
  paused: boolean;
  onSelect: (index: number) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const current = useRef(active);
  const still = useRef(paused);
  const select = useRef(onSelect);
  useEffect(() => {
    current.current = active;
  }, [active]);
  useEffect(() => {
    still.current = paused;
  }, [paused]);
  useEffect(() => {
    select.current = onSelect;
  }, [onSelect]);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    let alive = true,
      raf = 0,
      visible = true;
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(0, 0.7, 10);
    camera.lookAt(0, 0, 0);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0xffffff, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.domElement.setAttribute("aria-hidden", "true");
    el.appendChild(renderer.domElement);
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment(),
      environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff, 0xc2cbe3, 3));
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-4, 6, 6);
    scene.add(light);
    const cards: THREE.Group[] = [],
      images: THREE.Mesh[] = [],
      textures: THREE.Texture[] = [];
    const loader = new THREE.TextureLoader();
    worlds.forEach((w, i) => {
      const g = new THREE.Group();
      g.userData.index = i;
      const back = new THREE.Mesh(
        new THREE.BoxGeometry(5.58, 3.52, 0.09),
        new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.25,
          roughness: 0.15,
          clearcoat: 1,
        }),
      );
      g.add(back);
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(5.42, 3.38), mat);
      plane.position.z = 0.052;
      plane.userData.index = i;
      g.add(plane);
      images.push(plane);
      loader.load(w.image || `/worlds/${w.id}.webp`, (texture) => {
        if (!alive) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(
          4,
          renderer.capabilities.getMaxAnisotropy(),
        );
        textures.push(texture);
        mat.map = texture;
        mat.needsUpdate = true;
        renderer.render(scene, camera);
        el.classList.add("loaded");
      });
      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(5.6, 3.54, 0.11)),
        new THREE.LineBasicMaterial({
          color: w.colour,
          transparent: true,
          opacity: 0.4,
        }),
      );
      g.add(edge);
      scene.add(g);
      cards.push(g);
    });
    const rings = new THREE.Group();
    scene.add(rings);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(4 + i * 0.3, 0.013, 8, 120),
        new THREE.MeshBasicMaterial({
          color: [0x86c9bc, 0xa79be3, 0xe9b982][i],
          transparent: true,
          opacity: 0.45,
        }),
      );
      ring.rotation.set(0.3 + i * 0.4, 0.2 + i * 0.3, 0.3);
      rings.add(ring);
    }
    const dustGeometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 100; i++)
      positions.push(
        Math.sin(i * 43.6) * 9,
        Math.cos(i * 12.3) * 5,
        -4 + (i % 5),
      );
    dustGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: 0x638b9c,
        size: 0.025,
        transparent: true,
        opacity: 0.6,
      }),
    );
    scene.add(dust);
    const pointer = new THREE.Vector2(),
      ray = new THREE.Raycaster();
    let downX = 0,
      downY = 0,
      dragging = false,
      lastActive = -1,
      lastPaused = false;
    function layout(t: number) {
      cards.forEach((g, i) => {
        let offset = i - current.current;
        while (offset > 4) offset -= worlds.length;
        while (offset < -4) offset += worlds.length;
        const x = offset * 4.7,
          y = offset === 0 ? 0.18 : Math.sin(offset) * 0.8,
          z = offset === 0 ? 1.2 : -2 - Math.abs(offset) * 0.8;
        const speed = still.current ? 1 : 0.075;
        g.position.lerp(new THREE.Vector3(x, y, z), speed);
        const rot = offset === 0 ? pointer.x * 0.1 : -Math.sign(offset) * 0.5;
        g.rotation.y += (rot - g.rotation.y) * speed;
        g.rotation.x +=
          ((offset === 0 ? -pointer.y * 0.06 : 0) - g.rotation.x) * speed;
        g.rotation.z +=
          ((offset === 0 ? -0.025 : Math.sign(offset) * 0.09) - g.rotation.z) *
          speed;
        if (!still.current) g.position.y += Math.sin(t * 0.0006 + i) * 0.002;
      });
    }
    function resize() {
      renderer.setSize(el!.clientWidth, el!.clientHeight);
      camera.aspect = el!.clientWidth / el!.clientHeight;
      camera.updateProjectionMatrix();
      layout(0);
      renderer.render(scene, camera);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    function move(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      pointer.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1,
      );
    }
    function down(e: PointerEvent) {
      downX = e.clientX;
      downY = e.clientY;
      dragging = true;
    }
    function up(e: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      const delta = e.clientX - downX;
      if (Math.abs(delta) > 40 && Math.abs(e.clientY - downY) < 80) {
        select.current(
          (current.current + (delta < 0 ? 1 : -1) + worlds.length) %
            worlds.length,
        );
        return;
      }
      if (Math.abs(delta) > 10) return;
      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObjects(images)[0];
      if (hit) select.current(hit.object.userData.index);
    }
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", cancelDrag);
    function cancelDrag() {
      dragging = false;
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);
    function loop(t: number) {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (still.current && lastPaused && lastActive === current.current) return;
      layout(t);
      rings.rotation.z = still.current ? 0 : Math.sin(t * 0.0001) * 0.12;
      renderer.render(scene, camera);
      lastActive = current.current;
      lastPaused = still.current;
    }
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", cancelDrag);
      scene.traverse((o) => {
        if (
          o instanceof THREE.Mesh ||
          o instanceof THREE.LineSegments ||
          o instanceof THREE.Points
        ) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => m.dispose());
        }
      });
      textures.forEach((t) => t.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div className="universe-canvas" ref={host} aria-hidden="true" />;
}
