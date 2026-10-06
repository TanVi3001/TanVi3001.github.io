import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return <main id="main-content" className="content-page"><section className="page-hero container section-space">
    <p className="eyebrow">404</p><h1>Không tìm thấy trang</h1>
    <p className="page-lead">Đường dẫn này có thể đã thay đổi. Bạn có thể quay lại trang chủ để xem các dự án.</p>
    <Link className="neo-button primary" href="/"><ArrowLeft size={17}/> Về trang chủ</Link>
  </section></main>
}
