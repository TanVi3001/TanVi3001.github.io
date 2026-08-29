# Kiến trúc và cách project hoạt động

## 1. Cấu trúc thư mục

```text
BT/
├── index.html
├── projects.html
├── experience.html
├── hobbies.html
├── skills.html
├── books.html
├── certificates.html
├── gallery.html
├── schedule.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── gallery.js
├── assets/
│   ├── images/
│   │   ├── profile.webp
│   │   ├── projects/
│   │   ├── gallery/
│   │   ├── books/
│   │   └── certificates/
│   └── icons/
├── docs/
│   ├── README.md
│   ├── html.md
│   ├── css.md
│   ├── javascript.md
│   └── architecture.md
└── README.md
```

## 2. Luồng tải một trang

```text
HTML page
   ↓
style.css + responsive.css
   ↓
main.js
   ↓
gallery.js (chỉ có trên gallery.html)
   ↓
Người dùng tương tác: navbar, scroll reveal, lightbox
```

### Thứ tự thực tế

1. Trình duyệt đọc HTML.
2. `style.css` tạo style mặc định.
3. `responsive.css` điều chỉnh theo viewport.
4. Script có `defer` chờ HTML parse xong mới chạy.
5. `main.js` đọc `body[data-page]`, cập nhật navbar và khởi tạo reveal.
6. `gallery.js` kiểm tra có lightbox hay không; nếu có thì gắn các event gallery.

## 3. Quy ước đặt tên

| Quy ước | Ví dụ |
|---|---|
| Component dùng kebab-case | `.site-header`, `.gallery-item` |
| Class trạng thái dùng tiền tố/ý nghĩa rõ | `.is-current`, `.is-open`, `.is-visible` |
| JavaScript dùng camelCase | `currentIndex`, `closeButton`, `updateActiveLink` |
| File trang dùng tên nội dung | `projects.html`, `certificates.html` |
| Asset phân loại theo thư mục | `images/projects/`, `images/gallery/` |

## 4. Chia trách nhiệm

### HTML

- Chứa nội dung thật: tên, mô tả, project, sách, chứng chỉ.
- Chứa cấu trúc semantic và thuộc tính accessibility.
- Không nhúng CSS/JS dài trực tiếp vào từng trang.

### CSS

- `style.css` chứa style chung và component.
- `responsive.css` chứa media query.
- Không dùng table để bố cục chính; layout dùng Grid/Flexbox.
- Trạng thái tương tác dùng `:hover`, `:focus-visible` và class trạng thái.

### JavaScript

- `main.js` xử lý hành vi có trên nhiều trang.
- `gallery.js` chỉ xử lý hành vi đặc thù của gallery.
- Code có guard clause để script không lỗi khi thiếu component.

## 5. Luồng navbar

```text
body[data-page] + a[data-page-link]
              ↓
       updateActiveLink()
              ↓
  thêm .is-current + aria-current
```

Trên mobile:

```text
Click .nav-toggle
      ↓
đổi aria-expanded
      ↓
thêm/xóa .is-open
      ↓
CSS hiện hoặc ẩn .main-nav
```

## 6. Luồng gallery lightbox

```text
Click gallery item
       ↓
open(index)
       ↓
render ảnh + caption
       ↓
thêm .is-open, khóa body scroll
       ↓
Next / Previous / Arrow keys
       ↓
move(step) → render()
       ↓
Escape / Close / click nền
       ↓
close() → trả focus về item cũ
```

## 7. Accessibility đang có

- HTML khai báo `lang="vi"`.
- Có skip link tới `#main-content`.
- Navbar dùng `aria-label`, `aria-current`, `aria-expanded`, `aria-controls`.
- Ảnh có `alt`; gallery button có thể thao tác bằng keyboard.
- Lightbox dùng `role="dialog"`, `aria-modal`, `aria-hidden`, `aria-labelledby`.
- CSS có `:focus-visible` và `prefers-reduced-motion`.
- Không khóa focus vào modal hoàn toàn, nhưng focus được đưa vào Close và trả về item cũ khi đóng.

## 8. Performance đang có

- Ảnh project/gallery/chứng chỉ dùng WebP.
- Gallery và nhiều ảnh nội dung có `loading="lazy"`.
- Ảnh có `width`/`height` để giảm layout shift.
- `IntersectionObserver` chỉ theo dõi reveal item đến khi item xuất hiện lần đầu.
- Không dùng thư viện JavaScript lớn.
- Đường dẫn asset dùng tương đối `./`, phù hợp GitHub Pages.

## 9. Cách chạy local

Mở trực tiếp `index.html`, hoặc chạy static server:

```bash
python -m http.server 8000
```

Sau đó mở <http://localhost:8000>.

## 10. Checklist khi chỉnh sửa

- Nội dung mới đặt đúng trang HTML.
- Heading vẫn theo thứ tự `h1 > h2 > h3`.
- Ảnh mới có `alt`, `width`, `height`; ảnh gallery có `loading="lazy"`.
- Link ngoài có `target="_blank"` và `rel="noopener noreferrer"`.
- Không thêm thông tin nhạy cảm vào asset public.
- Sau khi đổi class, kiểm tra cả `style.css`, `responsive.css` và JavaScript có liên quan.
- Kiểm tra mobile ở các mốc `<576px`, `576–767px`, `768–991px` và desktop `≥992px`.
