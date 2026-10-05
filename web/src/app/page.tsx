import Link from 'next/link'
import { ArrowUpRight, ArrowRight, Github, BrainCircuit, Database, Code2, FlaskConical } from 'lucide-react'
import NeuralScene from '@/components/neural-scene'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const projects = [
  { label: '01 / COMPUTER VISION', title: 'Learning to see.', name: 'MNIST Handwritten Digits', image: '/assets/images/projects/mnist-dataset-samples.webp', alt: 'Mẫu chữ số viết tay từ dự án MNIST', tags: ['Python', 'MLP', 'PyTorch'], description: 'Từ ảnh chữ số đến preprocessing, training và đánh giá mô hình.', color: 'violet', href: 'https://github.com/TanVi3001/MNIST_MLP_Pytorch' },
  { label: '02 / TIME SERIES', title: 'Finding the signal.', name: 'Copper Price Forecasting', image: '', alt: '', tags: ['RNN / LSTM', 'GRU', 'Bi-LSTM'], description: 'So sánh mô hình dự báo giá đồng một bước và nhiều bước theo cùng giao thức.', color: 'blue', href: 'https://github.com/TanVi3001/Time_seri_model' },
  { label: '03 / RESEARCH', title: 'Questions in motion.', name: 'Drosophila PD Simulation', image: '/assets/images/projects/drosophila-analysis.webp', alt: 'Biểu đồ phân tích từ nghiên cứu mô phỏng Drosophila', tags: ['FlyGym', 'MuJoCo', 'Python'], description: 'Thử nghiệm neural/motor perturbation và phân tích vận động trong mô phỏng.', color: 'yellow', href: 'https://github.com/TanVi3001/drosophila-pd-flygym-platform' },
]
function SignalIllustration() {
  return <svg viewBox="0 0 500 230" role="img" aria-label="Minh họa tín hiệu chuỗi thời gian; không phải kết quả dự báo" className="signal-art"><defs><pattern id="signal-grid" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0V35" fill="none" stroke="#19180f" strokeOpacity=".12"/></pattern></defs><rect width="500" height="230" fill="#c5ddff"/><rect x="30" y="20" width="440" height="190" fill="url(#signal-grid)"/><path d="M35 165L65 154 92 171 125 119 153 139 180 114 208 124 240 72 270 92 297 81 330 97" fill="none" stroke="#19180f" strokeWidth="3" strokeLinejoin="round"/><path d="M330 97L359 75 388 89 417 54 450 64" fill="none" stroke="#3d8bff" strokeWidth="4" strokeDasharray="7 7"/><circle cx="330" cy="97" r="7" fill="#ffc730" stroke="#19180f" strokeWidth="2"/><text x="35" y="40" fontSize="11" fontFamily="monospace" fill="#19180f">HISTORY → FORECAST</text></svg>
}
export default function Home() {
  return <main id="main-content">
    <section className="neo-hero container"><div className="hero-editorial">
      <div className="hero-kicker"><span className="status-square"/><span>INFORMATION SYSTEMS · UIT</span><span className="hero-year">2026</span></div>
      <h1>Data to<br/><span className="highlight-word">discovery.</span><span className="hero-asterisk" aria-hidden="true">✳</span></h1>
      <div className="hero-identity"><img src="/assets/images/profile.webp" alt="Lê Tấn Vĩ" width="50" height="50"/><div><strong>Lê Tấn Vĩ</strong><span>Data Analyst · Developer · AI Research Enthusiast</span></div></div>
      <p className="hero-description">Mình học cách biến dữ liệu thành insight, xây dựng những hệ thống hữu ích, và thử nghiệm những câu hỏi nghiên cứu mới.</p>
      <div className="hero-links"><Link className="neo-button yellow" href="/projects/">Explore my work <ArrowUpRight size={20}/></Link><a className="neo-button white" href="https://github.com/TanVi3001" target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub</a></div>
      <div className="hero-tags"><span>Computer Vision</span><span>Time Series</span><span>Simulation</span></div>
    </div><div className="hero-lab"><span className="lab-sticker">A LITTLE CODE.<br/>A LOT OF CURIOSITY.</span><NeuralScene/><div className="hero-footnote"><span>01 / A WORK IN PROGRESS</span><span>Learn. Build. Test. Repeat. ↗</span></div></div></section>

    <div className="interest-ribbon" aria-label="Hướng quan tâm"><div><span>DATA ANALYTICS</span><i>✳</i><span>MACHINE LEARNING</span><i>✳</i><span>COMPUTER VISION</span><i>✳</i><span>RESEARCH & SIMULATION</span><i>✳</i></div></div>

    <section className="home-section container"><div className="neo-section-heading"><div><p className="mono-label"><span className="section-pill">01</span> SELECTED WORK</p><h2>Built to learn.<br/><span>Made to explore.</span></h2></div><Link className="text-link" href="/projects/">All projects <ArrowUpRight size={19}/></Link></div>
      <div className="featured-grid">{projects.map(p=><article className={`featured-card ${p.color}`} key={p.name}><div className="featured-image">{p.image?<img src={p.image} alt={p.alt} loading="lazy" width="500" height="230"/>:<SignalIllustration/>}<span className="project-chip">{p.label}</span></div><div className="featured-content"><h3>{p.title}</h3><p className="project-name">{p.name}</p><p>{p.description}</p><div className="neo-tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div><a className="project-source" href={p.href} target="_blank" rel="noopener noreferrer">Explore repository <ArrowUpRight size={19}/></a></div></article>)}</div>
    </section>

    <section id="about" className="about-band"><div className="container about-grid"><div><p className="mono-label"><span className="section-pill">02</span> A BIT ABOUT ME</p><h2>Curiosity is<br/>the starting point<span className="brand-period">.</span></h2><div className="about-portrait"><img src="/assets/images/profile.webp" alt="Ảnh đại diện Lê Tấn Vĩ" width="90" height="90"/><span>UIT / HỆ THỐNG THÔNG TIN<br/><strong>2024 — nay</strong></span></div></div><div className="about-copy"><p className="about-lead">Mình là sinh viên năm 3 ngành Hệ thống Thông tin tại Đại học Công nghệ Thông tin — ĐHQG TP.HCM.</p><p>Mình quan tâm đến Data Analytics, Software Development và Artificial Intelligence. Bên cạnh các dự án học thuật, mình đang nghiên cứu mô phỏng bệnh Parkinson trên ruồi giấm <em>Drosophila</em> bằng computational modeling và simulation.</p><p>Mỗi dự án là một cơ hội để hiểu dữ liệu tốt hơn, kiểm chứng ý tưởng và học cách xây dựng những experiment có thể tái lập.</p><Link className="neo-button white" href="/experience/">My learning journey <ArrowRight size={19}/></Link></div></div></section>

    <section className="home-section container toolkit-section"><div className="neo-section-heading"><div><p className="mono-label"><span className="section-pill">03</span> THE TOOLKIT</p><h2>Tools meet curiosity.</h2></div><Link className="text-link" href="/skills/">Explore skills <ArrowUpRight size={19}/></Link></div><TooltipProvider><div className="toolkit-grid">{[
      {icon:Database,title:'Data & Analytics',tools:'SQL · Python · Pandas · Matplotlib',color:'blue',detail:'Phân tích dữ liệu, preprocessing và trực quan hóa.'},
      {icon:BrainCircuit,title:'AI & Machine Learning',tools:'PyTorch · NumPy · Computer Vision',color:'violet',detail:'Thử nghiệm mô hình, training, validation và evaluation.'},
      {icon:Code2,title:'Software Development',tools:'Java · React · Next.js · Git',color:'yellow',detail:'Xây dựng ứng dụng, API và workflow phát triển.'},
      {icon:FlaskConical,title:'Research & Simulation',tools:'FlyGym · NeuroMechFly · MuJoCo',color:'green',detail:'Mô phỏng, thiết kế experiment và phân tích vận động.'},
    ].map(t=><Tooltip key={t.title}><TooltipTrigger asChild><Link className={`toolkit-card ${t.color}`} href="/skills/"><t.icon size={29} strokeWidth={1.8}/><h3>{t.title}</h3><p>{t.tools}</p><ArrowUpRight className="toolkit-arrow" size={18}/></Link></TooltipTrigger><TooltipContent>{t.detail}</TooltipContent></Tooltip>)}</div></TooltipProvider></section>

    <section className="container home-cta"><span className="cta-star" aria-hidden="true">✳</span><div><p className="mono-label">THERE’S MORE TO EXPLORE</p><h2>Beyond the code.</h2><p>Sách, chứng chỉ, những hình ảnh yêu thích và nhịp học mỗi tuần.</p></div><div className="cta-links"><Link href="/gallery/">Gallery ↗</Link><Link href="/certificates/">Certificates ↗</Link><Link href="/books/">Reading list ↗</Link><Link href="/schedule/">Schedule ↗</Link></div></section>
  </main>
}
