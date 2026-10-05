'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react'
const primary = [{ href: '/', label: 'Home' }, { href: '/projects/', label: 'Projects' }, { href: '/experience/', label: 'Experience' }]
const secondary = [{ href: '/skills/', label: 'Skills' }, { href: '/books/', label: 'Books' }, { href: '/certificates/', label: 'Certificates' }, { href: '/gallery/', label: 'Gallery' }, { href: '/hobbies/', label: 'Hobbies' }, { href: '/schedule/', label: 'Schedule' }]
export default function Nav() {
  const pathname = usePathname(), root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false), [more, setMore] = useState(false)
  useEffect(() => { setOpen(false); setMore(false) }, [pathname])
  useEffect(() => {
    function close(e: PointerEvent) { if (!root.current?.contains(e.target as Node)) { setMore(false); setOpen(false) } }
    function escape(e: KeyboardEvent) { if (e.key === 'Escape') { setMore(false); setOpen(false) } }
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape) }
  }, [])
  function item(link: {href: string; label: string}) { return <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link> }
  return <header className="neo-header" ref={root}><div className="container neo-nav-shell">
    <Link className="neo-brand" href="/"><span className="brand-tile">TV</span>LÊ TẤN VĨ<span className="brand-period">.</span></Link>
    <button className="mobile-nav-toggle" aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open} aria-controls="portfolio-nav" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
    <nav id="portfolio-nav" aria-label="Điều hướng chính" className={`neo-nav ${open ? 'is-open' : ''}`}>
      {primary.map(item)}<Link href="/#about" onClick={() => setOpen(false)}>About</Link>
      <div className="nav-more"><button aria-expanded={more} aria-controls="more-links" onClick={() => setMore(!more)}>Explore <ChevronDown size={15} /></button>{more && <div className="more-links" id="more-links">{secondary.map(item)}</div>}</div>
      <div className="mobile-extra">{secondary.map(item)}</div><a className="nav-github" href="https://github.com/TanVi3001" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={17} /></a>
    </nav>
  </div></header>
}
