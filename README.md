# Personal Portfolio — Lê Tấn Vĩ

Website portfolio cá nhân đa trang của **Lê Tấn Vĩ**, sinh viên năm 3 ngành **Hệ thống Thông tin (Management Information Systems)** tại **Đại học Công nghệ Thông tin – ĐHQG TP.HCM (UIT)**.

Portfolio thể hiện định hướng:

```text
Data → Software → AI → Research
```

## Nội dung

- Home / About — thông tin học tập, định hướng, education và contact placeholder.
- Projects — Drosophila Parkinson's Disease Simulation, Smart Supermarket Management System và MNIST Handwritten Digit Recognition.
- Experience — timeline hoạt động nghiên cứu và dự án học thuật, không bịa công ty hoặc internship.
- Hobbies — coding, AI, research, data analysis, learning và experimentation.
- Skills — programming self-assessment, Data/AI, Database, Development, Research/Simulation và soft skills.
- Books — 3 cuốn sách về software development và machine learning.
- Certificates — VNU-EPT B1.3 đã cung cấp và một card placeholder cho chứng chỉ thứ hai.
- Gallery — CSS Grid với 8 placeholder visuals, lightbox, previous/next, Escape và phím mũi tên.

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
- Không dùng table cho layout và không tải thư viện JavaScript lớn.

## Image and book sources

- Profile, project, certificate và gallery visuals hiện là **local SVG placeholders** được tạo riêng cho bài tập. Thay bằng ảnh cá nhân/screenshot project đã được cấp phép trong thư mục `assets/images/` khi có.
- Cover Hands-On Machine Learning là ảnh local được cung cấp trong `assets/images/books/MachineLearning.jpg`; các cover còn lại dùng Open Library Covers API theo ISBN: [Clean Code](https://openlibrary.org/isbn/9780132350884), [The Pragmatic Programmer](https://openlibrary.org/isbn/9780135957059) và [Storytelling with Data](https://openlibrary.org/books/OL29297625M/Storytelling_with_Data).
- Không sử dụng thông tin nhạy cảm. Email, GitHub cá nhân và LinkedIn chưa được cung cấp nên dùng placeholder rõ ràng.

## License

Code có thể phát hành theo **MIT License**. Placeholder visuals trong `assets/images/` phục vụ mục đích học tập của project này. Khi thay bằng ảnh cá nhân hoặc tài nguyên public, cần kiểm tra và ghi đúng license của từng tài nguyên.
