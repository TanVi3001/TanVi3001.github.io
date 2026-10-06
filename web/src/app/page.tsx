import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import NeuralScene from '@/components/neural-scene'

const projects = [
  { category: 'Nghiên cứu · Simulation', name: 'Drosophila PD Simulation', image: '/assets/images/projects/drosophila-analysis.webp', alt: 'Biểu đồ phân tích từ nghiên cứu mô phỏng Drosophila', tags: ['Python', 'FlyGym', 'MuJoCo'], description: 'Mô phỏng vận động của ruồi giấm, thử nghiệm neural/motor perturbation và phân tích các thay đổi liên quan đến Parkinson.', href: 'https://github.com/TanVi3001/drosophila-pd-flygym-platform' },
  { category: 'Computer Vision', name: 'MNIST Handwritten Digits', image: '/assets/images/projects/mnist-dataset-samples.webp', alt: 'Mẫu chữ số viết tay từ tập dữ liệu MNIST', tags: ['Python', 'MLP', 'PyTorch'], description: 'Nhận diện chữ số viết tay với MLP. Dự án thực hành xử lý dữ liệu, huấn luyện và đánh giá mô hình bằng PyTorch.', href: 'https://github.com/TanVi3001/MNIST_MLP_Pytorch' },
  { category: 'Time Series', name: 'Copper Price Forecasting', image: '', alt: '', tags: ['RNN / LSTM', 'GRU', 'Bi-LSTM'], description: 'So sánh các mô hình dự báo giá đồng một bước và nhiều bước theo cùng giao thức đánh giá.', href: 'https://github.com/TanVi3001/Time_seri_model' },
]
function SignalIllustration() {
  return <svg viewBox="0 0 500 230" role="img" aria-label="Minh họa chuỗi thời gian; không phải kết quả dự báo" className="signal-art"><defs><pattern id="signal-grid" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0V35" fill="none" stroke="#382650" strokeWidth="1"/></pattern></defs><rect width="500" height="230" fill="#110b22"/><rect x="30" y="20" width="440" height="190" fill="url(#signal-grid)"/><path d="M35 165L65 154 92 171 125 119 153 139 180 114 208 124 240 72 270 92 297 81 330 97" fill="none" stroke="#c4b5fd" strokeWidth="2.5" strokeLinejoin="round"/><path d="M330 97L359 75 388 89 417 54 450 64" fill="none" stroke="#9b6dff" strokeWidth="2.5" strokeDasharray="6 6"/><circle cx="330" cy="97" r="4" fill="#f4f0ff"/><text x="35" y="40" fontSize="11" fontFamily="monospace" fill="#bba6dd">TIME SERIES · ILLUSTRATION</text></svg>
}
export default function Home() {
  return <main id="main-content">
    <section className="neo-hero container">
      <div className="hero-editorial">
        <p className="hero-kicker">HỆ THỐNG THÔNG TIN · UIT</p>
        <div className="hero-identity"><img src="/assets/images/profile.webp" alt="Lê Tấn Vĩ" width="72" height="88"/><span>Xin chào, mình là</span></div>
        <h1>Lê Tấn Vĩ<span className="brand-period">.</span></h1>
        <p className="hero-role">Sinh viên · Định hướng Data Analyst</p>
        <p className="hero-description">Mình đang học năm 3 tại UIT. Đây là nơi mình lưu lại các dự án về dữ liệu, machine learning và mô phỏng mà mình đã làm trong quá trình học.</p>
        <div className="hero-links"><Link className="neo-button primary" href="/projects/">Xem dự án <ArrowUpRight size={18}/></Link><a className="neo-button" href="https://github.com/TanVi3001" target="_blank" rel="noopener noreferrer"><Github size={17}/> GitHub</a></div>
      </div>
      <div className="hero-lab"><NeuralScene/><p className="hero-footnote">Một minh họa 3D cho các chủ đề mình đang tìm hiểu.</p></div>
    </section>

    <section className="home-section container">
      <div className="neo-section-heading"><div><p className="mono-label">DỰ ÁN</p><h2>Một vài dự án của mình</h2></div><Link className="text-link" href="/projects/">Xem tất cả <ArrowUpRight size={17}/></Link></div>
      <div className="work-list">{projects.map((p,i)=><article className="work-row" key={p.name}>
        <a className="work-image" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`Mở repository ${p.name}`}>{p.image?<img src={p.image} alt={p.alt} loading="lazy" width="500" height="230"/>:<SignalIllustration/>}</a>
        <div className="work-content"><p className="work-category"><span>{String(i+1).padStart(2,'0')}</span>{p.category}</p><h3><a href={p.href} target="_blank" rel="noopener noreferrer">{p.name} <ArrowUpRight size={20}/></a></h3><p>{p.description}</p><div className="neo-tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>
      </article>)}</div>
    </section>

    <section id="about" className="about-band"><div className="container about-grid"><div><p className="mono-label">GIỚI THIỆU</p><h2>Mình đang học gì?</h2><p className="about-school">Đại học Công nghệ Thông tin<br/>ĐHQG TP.HCM · 2024 — nay</p><Link className="text-link" href="/experience/">Học tập & nghiên cứu <ArrowUpRight size={17}/></Link></div><div className="about-copy">
      <p>Mình theo hướng Data Analytics, đồng thời làm các dự án phần mềm để hiểu cách dữ liệu được lưu trữ và sử dụng trong một hệ thống.</p>
      <p>Ở mảng AI, mình đang thực hành Computer Vision và Time Series. Phần nghiên cứu hiện tại tập trung vào mô phỏng bệnh Parkinson trên ruồi giấm <em>Drosophila</em> với FlyGym, NeuroMechFly và MuJoCo.</p>
      <p className="learning-note"><span>Đang tìm hiểu thêm</span>LLM và Fly Brain — mô hình ngôn ngữ lớn, cấu trúc não ruồi giấm và mối liên hệ giữa hệ thần kinh với vận động.</p>
    </div></div></section>

    <section className="home-section container toolkit-section"><div className="neo-section-heading"><div><p className="mono-label">CÔNG CỤ</p><h2>Những thứ mình dùng</h2></div><Link className="text-link" href="/skills/">Chi tiết kỹ năng <ArrowUpRight size={17}/></Link></div><div className="toolkit-list">{[
      ['Dữ liệu', 'SQL · Python · Pandas · Matplotlib'],
      ['Machine learning', 'PyTorch · NumPy · Computer Vision'],
      ['Phần mềm', 'Java · React · Next.js · Git'],
      ['Mô phỏng', 'FlyGym · NeuroMechFly · MuJoCo'],
    ].map(([title,tools])=><div className="toolkit-row" key={title}><h3>{title}</h3><p>{tools}</p></div>)}</div></section>

    <section className="container home-notes"><div><h2>Ngoài các dự án</h2><p>Sách mình đọc, chứng chỉ đã học và một vài hình ảnh mình thích.</p></div><div className="notes-links"><Link href="/books/">Sách <ArrowUpRight size={16}/></Link><Link href="/certificates/">Chứng chỉ <ArrowUpRight size={16}/></Link><Link href="/gallery/">Ảnh <ArrowUpRight size={16}/></Link><Link href="/schedule/">Lịch học <ArrowUpRight size={16}/></Link></div></section>
  </main>
}
