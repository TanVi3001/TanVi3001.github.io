import type { Metadata } from 'next'
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/space-grotesk/vietnamese-400.css'
import '@fontsource/space-grotesk/vietnamese-500.css'
import '@fontsource/space-grotesk/vietnamese-700.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import './legacy.css'
import './legacy-responsive.css'
import './globals.css'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  metadataBase: new URL('https://tanvi3001.github.io'),
  title: { default: 'Lê Tấn Vĩ — Data, AI & Research', template: '%s · Lê Tấn Vĩ' },
  description: 'Portfolio của Lê Tấn Vĩ, sinh viên Hệ thống Thông tin tại UIT. Dự án Data Analytics, Computer Vision, Time Series và nghiên cứu Drosophila.',
  icons: { icon: '/favicon.svg' },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi"><body>
    <a className="skip-link" href="#main-content">Bỏ qua đến nội dung chính</a><Nav />{children}
    <footer className="neo-footer"><div className="container footer-grid">
      <div><a className="neo-brand" href="/"><span className="brand-tile">TV</span>Lê Tấn Vĩ</a><p>Hệ thống Thông tin · UIT</p></div>
      <div className="footer-contact"><p className="mono-label">LIÊN HỆ</p><a href="mailto:letanvi301@gmail.com">letanvi301@gmail.com ↗</a><div><a href="https://github.com/TanVi3001" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/t%E1%BA%A5n-v%C4%A9-198683355/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>
    </div><div className="container footer-credit"><span>© 2026 Lê Tấn Vĩ</span><span>@TanVi3001</span></div></footer>
  </body></html>
}
