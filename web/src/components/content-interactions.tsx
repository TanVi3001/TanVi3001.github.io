'use client'
import { useEffect } from 'react'
export default function ContentInteractions({ page }: { page: string }) {
  useEffect(() => {
    const modal = document.getElementById('gallery-lightbox'), items = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-gallery-index]'))
    if (!modal || !items.length) return
    const image = modal.querySelector<HTMLImageElement>('#lightbox-image')!, caption = modal.querySelector<HTMLElement>('#lightbox-caption')!, closeButton = modal.querySelector<HTMLButtonElement>('.lightbox-close')!
    let index = 0, lastFocused: HTMLElement | null = null
    const originalOverflow = document.body.style.overflow
    function render() { const item = items[index], thumb = item.querySelector('img')!; image.src = thumb.currentSrc || thumb.src; image.alt = thumb.alt; caption.textContent = `${index + 1} / ${items.length} — ${item.dataset.caption}` }
    function close() { modal!.classList.remove('is-open'); modal!.setAttribute('aria-hidden', 'true'); document.body.style.overflow = originalOverflow; lastFocused?.focus() }
    function click(e: MouseEvent) {
      const target = e.target as HTMLElement, trigger = target.closest<HTMLButtonElement>('[data-gallery-index]')
      if (trigger) { index = items.indexOf(trigger); lastFocused = trigger; render(); modal!.classList.add('is-open'); modal!.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; closeButton.focus(); return }
      if (target === modal || target.closest('.lightbox-close')) close()
      if (target.closest('.lightbox-next')) { index = (index + 1) % items.length; render() }
      if (target.closest('.lightbox-prev')) { index = (index + items.length - 1) % items.length; render() }
    }
    function key(e: KeyboardEvent) {
      if (!modal!.classList.contains('is-open')) return
      if (e.key === 'Escape') { e.preventDefault(); close() }
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); index = (index + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length; render() }
      if (e.key === 'Tab') { const controls = Array.from(modal!.querySelectorAll<HTMLButtonElement>('button')); if (e.shiftKey && document.activeElement === controls[0]) { e.preventDefault(); controls.at(-1)?.focus() } else if (!e.shiftKey && document.activeElement === controls.at(-1)) { e.preventDefault(); controls[0].focus() } }
    }
    document.addEventListener('click', click); document.addEventListener('keydown', key)
    return () => { document.removeEventListener('click', click); document.removeEventListener('keydown', key); document.body.style.overflow = originalOverflow }
  }, [page])
  return null
}
