'use client'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'

const modes = [
  { label: 'Vision', color: 0x9b6dff, flow: ['Image', 'Features', 'Prediction'] },
  { label: 'Time series', color: 0xc4b5fd, flow: ['History', 'Patterns', 'Forecast'] },
  { label: 'Research', color: 0xa78bfa, flow: ['Question', 'Experiment', 'Evidence'] },
]

function NetworkFallback() {
  const layers = [[58, 3], [175, 5], [290, 4], [400, 2]]
  return <svg viewBox="0 0 460 300" role="img" aria-label="Minh họa các lớp của mạng neuron" className="network-fallback">
    {layers.slice(0, -1).flatMap(([x, count], l) => Array.from({ length: count }, (_, i) => Array.from({length: layers[l + 1][1]}, (_, j) => <line key={`${l}-${i}-${j}`} x1={x} y1={150 + (i - (count - 1)/2)*46} x2={layers[l + 1][0]} y2={150 + (j-(layers[l + 1][1]-1)/2)*46} stroke="#9465cc" strokeWidth="1" opacity=".25" />)))}
    {layers.flatMap(([x, count], l) => Array.from({length: count}, (_, i) => <circle key={`${l}-${i}`} cx={x} cy={150+(i-(count-1)/2)*46} r="12" fill={['#9b6dff','#b794f6','#9d6de5','#d8b4fe'][l]} stroke="#9465cc" strokeWidth="2" />))}
  </svg>
}

function NeuralCanvas({ mode, paused, reset }: { mode: number; paused: boolean; reset: number }) {
  const host = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)
  useEffect(() => {
    let disposed = false, cleanup = () => {}
    import('three').then(THREE => {
      if (disposed || !host.current) return
      const el = host.current
      let renderer: import('three').WebGLRenderer
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }) }
      catch { setFallback(true); return }
      setFallback(false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x070610, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.domElement.setAttribute('role', 'img')
      renderer.domElement.setAttribute('aria-label', 'Mạng neuron 3D với tín hiệu đi qua các lớp; minh họa trực quan, không chạy model thật')
      el.appendChild(renderer.domElement)
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, 1, .1, 100)
      camera.position.set(6, 3.2, 14); camera.lookAt(0, 0, 0)
      scene.add(new THREE.HemisphereLight(0xffffff, 0x342044, 2.5))
      const light = new THREE.DirectionalLight(0xffffff, 3); light.position.set(-3, 7, 8); scene.add(light)
      const group = new THREE.Group(); group.rotation.z = -.04; scene.add(group)
      const colors = [modes[mode].color, 0xb798f5, 0x9d6de5, 0xd8b4fe]
      const counts = [3, 5, 4, 2], layers: import('three').Vector3[][] = []
      const balls: import('three').Mesh[] = []
      const geometries: import('three').BufferGeometry[] = [], materials: import('three').Material[] = []
      const sphere = new THREE.SphereGeometry(.24, 20, 16); geometries.push(sphere)
      counts.forEach((count, layer) => {
        const mat = new THREE.MeshPhysicalMaterial({color: colors[layer], roughness: .28, metalness: .08, clearcoat: .6}); materials.push(mat)
        layers[layer] = []
        for (let n=0;n<count;n++) {
          const pos = new THREE.Vector3((layer-1.5)*2.45, (n-(count-1)/2)*1.14, Math.sin(n*1.9+layer)*.58)
          layers[layer].push(pos)
          const mesh = new THREE.Mesh(sphere, mat); mesh.position.copy(pos); group.add(mesh); balls.push(mesh)
          const ringGeometry = new THREE.TorusGeometry(.31, .017, 6, 32); geometries.push(ringGeometry)
          const ringMat = new THREE.MeshBasicMaterial({color: 0xb38bdf}); materials.push(ringMat)
          const ring = new THREE.Mesh(ringGeometry, ringMat); ring.position.copy(pos); group.add(ring)
        }
      })
      const pulses: { mesh: import('three').Mesh; a: import('three').Vector3; b: import('three').Vector3; phase: number }[] = []
      const wireMat = new THREE.LineBasicMaterial({color: 0x9465cc, transparent: true, opacity: .3}); materials.push(wireMat)
      const pulseGeometry = new THREE.SphereGeometry(.055, 8, 8); geometries.push(pulseGeometry)
      const pulseMat = new THREE.MeshBasicMaterial({color: modes[mode].color}); materials.push(pulseMat)
      for(let l=0;l<layers.length-1;l++) layers[l].forEach((a,i) => layers[l+1].forEach((b,j) => {
        const geo = new THREE.BufferGeometry().setFromPoints([a,b]); geometries.push(geo); group.add(new THREE.Line(geo, wireMat))
        if ((i+j)%2===0) { const mesh = new THREE.Mesh(pulseGeometry,pulseMat);group.add(mesh);pulses.push({mesh,a,b,phase:(l*.34+i*.13+j*.19)%1}) }
      }))
      const grid = new THREE.GridHelper(14, 18, 0x382650, 0x1a112b); grid.position.y = -3.15; scene.add(grid)
      const gridMats = Array.isArray(grid.material) ? grid.material : [grid.material]; materials.push(...gridMats); geometries.push(grid.geometry)
      let frame = 0, elapsed = 0, previous = 0, visible = true, px = 0, py = 0
      function draw(time = 0) {
        if(disposed) return
        if(previous && !paused) elapsed += Math.min((time-previous)/1000,.05)
        previous=time
        group.rotation.y = -.16+Math.sin(elapsed*.22)*.16+px*.12
        group.rotation.x = py*.08
        pulses.forEach(p => p.mesh.position.lerpVectors(p.a,p.b,(elapsed*.35+p.phase)%1))
        balls.forEach((ball,i) => {const s=1+Math.sin(elapsed*2-i*.7)*.035;ball.scale.setScalar(s)})
        renderer.render(scene,camera)
        if(!paused && visible && !document.hidden) frame=requestAnimationFrame(draw)
      }
      function resize() { if(!el.clientWidth || !el.clientHeight)return;camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight);if(paused)draw() }
      function start() { cancelAnimationFrame(frame);previous=0;draw() }
      function visibility() { if(document.hidden){cancelAnimationFrame(frame);previous=0}else if(visible)start() }
      function pointer(e: PointerEvent) { if(e.pointerType==='touch')return;const b=el.getBoundingClientRect();px=(e.clientX-b.left)/b.width-.5;py=(e.clientY-b.top)/b.height-.5;if(paused)draw() }
      function leave() {px=0;py=0;if(paused)draw()}
      const resizeObserver = new ResizeObserver(resize);resizeObserver.observe(el)
      const observer = new IntersectionObserver(entries => {visible=entries[0].isIntersecting;if(visible)start();else {cancelAnimationFrame(frame);previous=0}},{threshold:.05});observer.observe(el)
      document.addEventListener('visibilitychange',visibility);el.addEventListener('pointermove',pointer);el.addEventListener('pointerleave',leave)
      resize();start()
      cleanup=()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',visibility);el.removeEventListener('pointermove',pointer);el.removeEventListener('pointerleave',leave);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove()}
    }).catch(() => {if(!disposed)setFallback(true)})
    return () => {disposed=true;cleanup()}
  }, [mode, paused, reset])
  return <div ref={host} className="neural-canvas" data-renderer={fallback ? 'fallback' : 'webgl'}>{fallback && <NetworkFallback />}</div>
}

export default function NeuralScene() {
  const [mode,setMode] = useState(0), [paused,setPaused] = useState(false), [reset,setReset] = useState(0)
  useEffect(() => {const q=matchMedia('(prefers-reduced-motion: reduce)');if(q.matches)setPaused(true);const listener=()=>setPaused(q.matches);q.addEventListener('change',listener);return()=>q.removeEventListener('change',listener)},[])
  return <div className="neural-window">
    <div className="window-bar"><span>MẠNG NEURON · 3D</span><span className={`live-pill ${paused?'paused':''}`}><i/>{paused ? 'Đã dừng' : 'Chuyển động'}</span></div>
    <div className="scene-toolbar"><div className="scene-modes" role="group" aria-label="Chọn chủ đề minh họa">{modes.map((m,i)=><button key={m.label} aria-pressed={mode===i} onClick={()=>setMode(i)}>{m.label}</button>)}</div>
      <div className="scene-actions"><button aria-label={paused?'Chạy chuyển động 3D':'Tạm dừng chuyển động 3D'} onClick={()=>setPaused(!paused)}>{paused?<Play size={16}/>:<Pause size={16}/>}</button><button aria-label="Đặt lại góc nhìn 3D" onClick={()=>setReset(reset+1)}><RotateCcw size={15}/></button></div></div>
    <div className="scene-stage"><NeuralCanvas mode={mode} paused={paused} reset={reset}/><span className="scene-annotation bottom">Di chuyển chuột để đổi góc nhìn</span></div>
    <div className="scene-console"><div><span>{modes[mode].flow.join(' → ')}</span><small>Minh họa trực quan, không phải kết quả chạy mô hình</small></div></div>
  </div>
}
