# Personal Portfolio — Lê Tấn Vĩ

Website portfolio cá nhân đa trang của **Lê Tấn Vĩ**, sinh viên năm 3 ngành **Hệ thống Thông tin (Management Information Systems)** tại **Đại học Công nghệ Thông tin – ĐHQG TP.HCM (UIT)**.

Portfolio thể hiện định hướng:

```text
Data → Software → AI → Research
```

## Nội dung

- Home / About — thông tin học tập, định hướng, education và thông tin liên hệ.
- Projects — Drosophila Parkinson's Disease Simulation, Smart Supermarket Management System và MNIST Handwritten Digit Recognition.
- Experience — timeline hoạt động nghiên cứu và dự án học thuật, không bịa công ty hoặc internship.
- Hobbies — coding, AI, research, data analysis, learning và experimentation.
- Skills — programming self-assessment, Data/AI, Database, Development, Research/Simulation và soft skills.
- Books — 3 cuốn sách về software development và machine learning.
- Certificates — VNU-EPT B1.3 và Google Data Analytics Professional Certificate.
- Gallery — CSS Grid với 6 ảnh vũ trụ do người dùng cung cấp, lightbox, previous/next, Escape và phím mũi tên.
- Schedule — thời khóa biểu theo ngày, tiết học và các lớp không cố định.
- Database — schema SQL và sơ đồ ER Mermaid cho database thời khóa biểu.

## Technologies

```text
HTML5
CSS3
JavaScript thuần
Git / GitHub
GitHub Pages
```

## Project structure

```text
portfolio/
├── index.html
├── projects.html
├── experience.html
├── hobbies.html
├── skills.html
├── books.html
├── certificates.html
├── gallery.html
├── schedule.html
├── SUBMISSION.txt
├── database/
│   ├── schedule_schema.sql
│   ├── schedule_seed.sql
│   └── README.md
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── gallery.js
├── assets/
│   ├── images/
│   │   ├── gallery/
│   │   ├── projects/
│   │   ├── books/
│   │   └── certificates/
│   └── icons/
└── README.md
```

## How to run

Có thể mở trực tiếp `index.html`, hoặc chạy static server:

```bash
python -m http.server 8000
```

Mở <http://localhost:8000>.

## Tài liệu kỹ thuật

Tài liệu tiếng Việt về các thẻ HTML, selector/property CSS, hàm JavaScript và kiến trúc project nằm trong thư mục [docs](./docs/README.md).

## Deployment — GitHub Pages

Repository hiện tại:

<https://github.com/TanVi3001/TanVi3001.github.io>

Live site:

<https://tanvi3001.github.io/>

Để deploy repository mới:

1. Push toàn bộ source lên branch `main`.
2. Vào **Settings → Pages**.
3. Chọn **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save và chờ GitHub Pages build.

Website dùng đường dẫn tương đối (`./`) nên có thể chạy ở root domain hoặc repository sub-path.

## Accessibility, responsive và performance

- Semantic HTML5, heading hierarchy, skip link, `aria-label`, `aria-expanded` và `aria-current`.
- Mọi ảnh đều có `alt`; gallery dùng `loading="lazy"`.
- Gallery button keyboard-accessible; modal có Close, Escape, Previous, Next, ArrowLeft và ArrowRight.
- Focus state rõ ràng, màu navy/cyan/purple có tương phản tốt và có `prefers-reduced-motion`.
- Layout dùng Grid/Flexbox và media queries cho mobile `<576px`, tablet `768–991px`, desktop `≥992px`.
- Không dùng table để dựng layout; riêng schedule dùng table cho dữ liệu dạng hàng/cột. Không tải thư viện JavaScript lớn.

## Image and book sources

- Ảnh chứng chỉ VNU-EPT trong `assets/images/certificates/vnu-ept-redacted.webp` được tạo từ ảnh người dùng cung cấp và đã che CCCD, ngày sinh, ảnh chân dung cùng các mã định danh trước khi đưa lên web.
- Ảnh `assets/images/certificates/coursera-data-analytics.webp` được render từ file PDF Google Data Analytics Professional Certificate người dùng cung cấp.
- Ảnh project được tối ưu thành WebP từ các repository GitHub của tác giả: [Drosophila analysis figure](https://github.com/TanVi3001/drosophila-pd-flygym-platform/blob/main/results/analysis/figures/e2_condition_comparison.png), [MNIST notebook](https://github.com/TanVi3001/MNIST_MLP_Pytorch/blob/main/Pytorch.ipynb) và [Smart Supermarket revenue dashboard](https://github.com/TanVi3001/SieuThiThongMinh_Java/pull/33).
- Ảnh đại diện `assets/images/profile.webp` và 6 ảnh gallery `space-01.webp` đến `space-06.webp` do người dùng cung cấp. Các ảnh project dùng trong Projects vẫn được ghi nguồn từ các repository GitHub tương ứng.
- Cover Hands-On Machine Learning là ảnh local được cung cấp trong `assets/images/books/MachineLearning.jpg`; các cover còn lại dùng Open Library Covers API theo ISBN: [Clean Code](https://openlibrary.org/isbn/9780132350884), [The Pragmatic Programmer](https://openlibrary.org/isbn/9780135957059) và [Storytelling with Data](https://openlibrary.org/books/OL29297625M/Storytelling_with_Data).
- Không đưa file gốc chứa thông tin nhạy cảm vào repository. Thông tin liên hệ công khai gồm GitHub, email và LinkedIn do chủ project cung cấp.

## License

Code có thể phát hành theo **MIT License**. Ảnh chứng chỉ là tài liệu do người dùng cung cấp, chỉ dùng trong portfolio cá nhân. Các asset hình ảnh trong `assets/images/` là ảnh do người dùng cung cấp hoặc được trích từ nguồn public đã ghi ở trên; khi thay asset mới cần kiểm tra và ghi đúng license.
