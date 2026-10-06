'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'

const modes = [
  { label: 'Vision', flow: ['Image', 'Features', 'Prediction'] },
  { label: 'Time series', flow: ['History', 'Patterns', 'Forecast'] },
  { label: 'Research', flow: ['Question', 'Experiment', 'Evidence'] },
]

function NetworkFallback() {
  const layers: [number, number][] = [[42, 4], [154, 7], [270, 7], [388, 5], [496, 3]]
  const palette = ['#7c3aed', '#a855f7', '#c4b5fd', '#a855f7', '#7c3aed']
  return <svg viewBox="0 0 540 300" role="img" aria-label="Sơ đồ các lớp mạng neuron" className="network-fallback">
    {layers.slice(0, -1).flatMap(([x, count], layer) => Array.from({ length: count }, (_, index) =>
      Array.from({ length: layers[layer + 1][1] }, (_, next) => <line
        key={`${layer}-${index}-${next}`}
        x1={x}
        y1={150 + (index - (count - 1) / 2) * 28}
        x2={layers[layer + 1][0]}
        y2={150 + (next - (layers[layer + 1][1] - 1) / 2) * 28}
        stroke="#a855f7"
        strokeWidth="1"
        opacity=".22"
      />),
    ))}
    {layers.flatMap(([x, count], layer) => Array.from({ length: count }, (_, index) => <circle
      key={`${layer}-${index}`}
      cx={x}
      cy={150 + (index - (count - 1) / 2) * 28}
      r={layer === 2 ? 7 : 6}
      fill={palette[layer]}
      stroke="#c4b5fd"
      strokeWidth="1"
    />))}
  </svg>
}

function NeuralCanvas({ mode, paused, reset }: { mode: number; paused: boolean; reset: number }) {
  const host = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(paused)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    pausedRef.current = paused
    host.current?.dispatchEvent(new CustomEvent('neural-scene:pause', { detail: paused }))
  }, [paused])

  useEffect(() => {
    let disposed = false
    let cleanup = () => {}
    const element = host.current
    if (!element) return
    const runtimeUrl = new URL('/neural-scene-live.js', window.location.origin).href
    import(/* webpackIgnore: true */ runtimeUrl)
      .then((runtime: { mountNeuralScene: (host: HTMLDivElement, mode: number, paused: boolean) => () => void }) => {
        if (disposed || !host.current) return
        cleanup = runtime.mountNeuralScene(host.current, mode, pausedRef.current)
        setFallback(false)
      })
      .catch(() => { if (!disposed) setFallback(true) })
    return () => {
      disposed = true
      cleanup()
    }
  }, [mode, reset])

  return <div ref={host} className="neural-canvas" data-renderer={fallback ? 'fallback' : 'webgl'}>
    {fallback && <NetworkFallback />}
  </div>
}

export default function NeuralScene() {
  const [mode, setMode] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reset, setReset] = useState(0)

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches) setPaused(true)
    const listener = () => setPaused(preference.matches)
    preference.addEventListener('change', listener)
    return () => preference.removeEventListener('change', listener)
  }, [])

  return <div className="neural-window">
    <div className="window-bar">
      <span>MẠNG NEURON · 3D</span>
      <span className={`live-pill ${paused ? 'paused' : ''}`}><i />{paused ? 'Đã dừng' : 'Chuyển động'}</span>
    </div>
    <div className="scene-toolbar">
      <div className="scene-modes" role="group" aria-label="Chọn chủ đề minh họa">
        {modes.map((item, index) => <button key={item.label} aria-pressed={mode === index} onClick={() => setMode(index)}>{item.label}</button>)}
      </div>
      <div className="scene-actions">
        <button aria-label={paused ? 'Chạy chuyển động 3D' : 'Tạm dừng chuyển động 3D'} onClick={() => setPaused(!paused)}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        <button aria-label="Đặt lại góc nhìn 3D" onClick={() => setReset(reset + 1)}><RotateCcw size={15} /></button>
      </div>
    </div>
    <div className="scene-stage">
      <NeuralCanvas mode={mode} paused={paused} reset={reset} />
      <span className="scene-annotation bottom">Di chuyển chuột để đổi góc nhìn</span>
    </div>
    <div className="scene-console">
      <div>
        <span>{modes[mode].flow.join(' → ')}</span>
        <small>Minh họa trực quan, không phải kết quả chạy mô hình</small>
      </div>
    </div>
  </div>
}
