# CSS trong project

## 1. Hai file CSS

| File | Chức năng |
|---|---|
| `css/style.css` | Biến màu, reset, layout chính, component và hiệu ứng |
| `css/responsive.css` | Điều chỉnh giao diện theo chiều rộng màn hình và reduced motion |

`responsive.css` được nạp sau `style.css`, vì vậy các rule responsive có thể ghi đè rule mặc định.

## 2. Biến CSS trong `:root`

```css
:root {
  --navy: #0b1220;
  --paper: #f6f8fb;
  --cyan: #4de3e7;
  --purple: #987dff;
  --shadow: 0 18px 50px rgba(11, 18, 32, .09);
  --max: 1160px;
  --radius: 14px;
}
```

`var(--ten-bien)` lấy lại giá trị biến. Dùng biến giúp đổi theme/màu toàn site tại một nơi.

Các biến quan trọng:

| Biến | Ý nghĩa |
|---|---|
| `--navy`, `--navy-2`, `--navy-3` | Nền tối, header/footer và accent tối |
| `--ink` | Màu chữ chính |
| `--muted` | Màu chữ phụ |
| `--paper`, `--white` | Nền sáng và nền card |
| `--line` | Đường viền nhẹ |
| `--cyan`, `--purple`, `--orange` | Màu nhấn |
| `--shadow` | Box shadow dùng cho card/profile |
| `--max` | Chiều rộng tối đa của `.container` |
| `--radius` | Bán kính bo góc chuẩn |

## 3. Reset và rule nền tảng

| Selector | Chức năng |
|---|---|
| `* { box-sizing: border-box; }` | Tính padding/border bên trong kích thước phần tử |
| `html` | Bật cuộn mượt bằng `scroll-behavior: smooth` |
| `body` | Đặt margin, font, màu chữ, nền và line-height chung |
| `body.no-scroll` | Khóa cuộn trang khi lightbox mở |
| `img` | Ảnh hiển thị dạng block và không vượt container |
| `a` | Bỏ gạch chân và kế thừa màu |
| `button` | Kế thừa font của trang |
| `:focus-visible` | Tạo outline rõ khi điều hướng bằng bàn phím |

## 4. Layout dùng trong project

### Container và section

```css
.container {
  width: min(calc(100% - 48px), var(--max));
  margin-inline: auto;
}

.section-space {
  padding-block: 106px;
}
```

- `calc()` tính chiều rộng còn lại sau khi trừ khoảng cách hai bên.
- `min()` chọn giá trị nhỏ hơn giữa chiều rộng responsive và `--max`.
- `margin-inline: auto` căn container vào giữa.
- `padding-block` đặt padding trên và dưới.

### Flexbox

Flexbox được dùng cho navbar, button row, footer và các nhóm cần xếp theo một chiều:

```css
.nav-shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}
```

| Thuộc tính | Chức năng |
|---|---|
| `display: flex` | Bật Flexbox |
| `flex-direction` | Chọn hướng xếp hàng/cột |
| `align-items` | Căn theo trục phụ |
| `justify-content` | Căn theo trục chính |
| `gap` | Khoảng cách giữa các item |
| `flex-wrap` | Cho phép item xuống dòng |

### CSS Grid

Grid được dùng cho hero, two-column, project cards, book cards, certificate cards và gallery:

```css
.certificate-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
```

| Thuộc tính | Chức năng |
|---|---|
| `display: grid` | Bật CSS Grid |
| `grid-template-columns` | Khai báo số cột và tỷ lệ cột |
| `grid-template-rows` | Khai báo hàng |
| `grid-column`, `grid-row` | Cho item chiếm vị trí hoặc nhiều ô |
| `grid-auto-rows` | Chiều cao mặc định của hàng tự tạo |
| `minmax()` | Tạo kích thước tối thiểu/tối đa linh hoạt |

## 5. Nhóm component chính

| Nhóm class | Chức năng |
|---|---|
| `.site-header`, `.main-nav`, `.nav-toggle` | Header desktop và menu mobile |
| `.brand`, `.brand-mark` | Logo chữ và ô ký hiệu `</>` |
| `.hero`, `.hero-visual`, `.profile-frame` | Khu vực giới thiệu và ảnh đại diện |
| `.button`, `.button-primary`, `.button-outline`, `.button-cyan` | Các kiểu button/link hành động |
| `.project-card-large`, `.project-visual` | Card project và vùng ảnh project |
| `.timeline`, `.timeline-item`, `.timeline-marker` | Kinh nghiệm theo dòng thời gian |
| `.hobby-grid`, `.book-grid`, `.certificate-grid` | Grid card của từng trang |
| `.skill-bar`, `.meter`, `.meter-fill` | Thanh mức độ kỹ năng |
| `.gallery-grid`, `.gallery-item` | Grid ảnh gallery có thể click |
| `.lightbox`, `.lightbox.is-open` | Modal phóng to ảnh |
| `.site-footer`, `.footer-main`, `.footer-bottom` | Footer dùng chung |

## 6. Ảnh: căn khung và không crop

Project dùng `object-fit: contain` cho ảnh project, certificate và gallery:

```css
.project-visual img,
.certificate-image img,
.gallery-item img {
  width: 100%;
  object-fit: contain;
  object-position: center;
}
```

- `object-fit: contain`: giữ nguyên toàn bộ ảnh, không cắt nội dung.
- `object-position: center`: căn ảnh vào giữa khung.
- `aspect-ratio`: giữ tỷ lệ khung ổn định trước khi ảnh tải.
- `max-width: 100%`: không cho ảnh tràn container.

## 7. Pseudo-class và hiệu ứng

| Rule | Chức năng |
|---|---|
| `:hover` | Đổi màu, bóng hoặc phóng ảnh khi rê chuột |
| `:focus-visible` | Hiển thị trạng thái focus rõ cho keyboard |
| `[aria-current=page]` | Highlight trang hiện tại trong navbar |
| `::before`, `::after` | Tạo đường gạch, bullet hoặc hiệu ứng mà không thêm HTML |
| `transition` | Làm thay đổi màu/transform mượt hơn |
| `transform: scale()` | Phóng ảnh/card nhẹ khi hover |
| `transform: translateY()` | Tạo hiệu ứng menu/reveal từ dưới lên |
| `opacity` | Ẩn/hiện menu, label hoặc reveal item |

## 8. Responsive breakpoint

| Media query | Mục đích |
|---|---|
| `@media (max-width: 991px)` | Tablet ngang và màn hình trung bình; giảm gap, đổi số cột một số grid |
| `@media (max-width: 767px)` | Mobile/tablet dọc; bật menu hamburger, chuyển nhiều layout thành một cột |
| `@media (max-width: 575px)` | Mobile nhỏ; giảm row gallery, button full width, grid đơn giản hơn |
| `@media (prefers-reduced-motion: reduce)` | Tắt/giảm animation và smooth scroll cho người nhạy với chuyển động |

Một số rule responsive quan trọng:

```css
@media (max-width: 767px) {
  .nav-toggle { display: block; }
  .main-nav { opacity: 0; pointer-events: none; }
  .main-nav.is-open { opacity: 1; pointer-events: auto; }
  .project-card-large { display: flex; flex-direction: column; }
}
```

## 9. CSS function đang dùng

| Hàm CSS | Cách dùng |
|---|---|
| `var()` | Đọc biến màu/kích thước trong `:root` |
| `calc()` | Tính chiều rộng container |
| `min()` | Giới hạn container theo viewport và `--max` |
| `clamp()` | Chữ co giãn giữa kích thước nhỏ/lớn |
| `rgba()` | Tạo màu có độ trong suốt cho shadow/header |
| `scale()` | Phóng ảnh khi hover |
| `translateY()` | Di chuyển menu/reveal item theo trục dọc |
| `rotate()` | Xoay nhẹ profile frame |

