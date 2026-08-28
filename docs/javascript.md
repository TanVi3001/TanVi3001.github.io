# JavaScript trong project

## 1. Hai file JavaScript

| File | Chức năng |
|---|---|
| `js/main.js` | Navbar mobile, highlight trang hiện tại và hiệu ứng reveal khi scroll |
| `js/gallery.js` | Mở/đóng lightbox, đổi ảnh trước/sau và điều khiển bằng bàn phím |

Hai file đều được bọc trong IIFE dạng arrow function:

```js
(() => {
  // Code bên trong không làm rò biến ra global scope.
})();
```

IIFE giúp mỗi file có scope riêng và chạy ngay sau khi được nạp.

## 2. Cú pháp và API DOM được dùng

| Cú pháp/API | Chức năng trong project |
|---|---|
| `document.body` | Lấy phần tử `<body>` |
| `document.querySelector()` | Lấy một phần tử đầu tiên theo CSS selector |
| `document.querySelectorAll()` | Lấy nhiều phần tử theo selector |
| `[...collection]` | Chuyển NodeList thành Array để dùng `forEach` |
| `element.dataset` | Đọc thuộc tính `data-*` |
| `classList.toggle()` | Thêm/xóa class tùy theo trạng thái |
| `classList.add()` / `remove()` | Thêm hoặc xóa class cụ thể |
| `getAttribute()` | Đọc một attribute |
| `setAttribute()` | Gán một attribute |
| `removeAttribute()` | Xóa một attribute |
| `addEventListener()` | Đăng ký xử lý sự kiện |
| `event.target.closest()` | Tìm phần tử cha gần nhất khớp selector |
| `window.location.hash` | Đọc hash hiện tại, ví dụ `#about` |
| `IntersectionObserver` | Phát hiện phần tử đi vào vùng nhìn thấy |
| `element.focus()` | Trả focus về button sau khi đóng lightbox |
| `currentSrc` / `src` | Lấy đường dẫn ảnh đang được trình duyệt dùng |

## 3. `main.js`: khởi tạo và lấy phần tử

```js
const body = document.body;
const page = body.dataset.page;
const nav = document.querySelector('.main-nav');
const toggle = document.querySelector('.nav-toggle');
```

- `body.dataset.page` đọc giá trị như `home`, `projects`, `gallery`.
- `nav` là navbar chính.
- `toggle` là nút hamburger; có thể không tồn tại ở một layout khác nên code kiểm tra trước khi dùng.

## 4. Hàm `updateActiveLink()`

```js
const updateActiveLink = () => {
  const isAboutHash = page === 'home' && window.location.hash === '#about';

  document.querySelectorAll('[data-page-link]').forEach((link) => {
    const key = link.dataset.pageLink;
    const current = isAboutHash ? key === 'about' : key === page;
    link.classList.toggle('is-current', current);

    if (current) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};
```

Chức năng:

1. Kiểm tra trang đang mở qua `data-page`.
2. Nếu Home có hash `#about`, đánh dấu link About thay vì Home.
3. Duyệt toàn bộ link có `data-page-link`.
4. Thêm class `is-current` cho link hiện tại.
5. Gắn `aria-current="page"` để hỗ trợ accessibility.

Hàm được gọi ngay lúc tải trang và chạy lại khi hash thay đổi:

```js
updateActiveLink();
window.addEventListener('hashchange', updateActiveLink);
```

## 5. Mở/đóng navbar mobile

```js
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
```

Luồng xử lý:

- Đọc trạng thái hiện tại từ `aria-expanded`.
- Đảo trạng thái bằng `String(!open)`.
- Thêm/xóa `.is-open`; CSS responsive dùng class này để hiện menu.

Khi click một link trong navbar, menu tự đóng:

```js
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
});
```

`closest('a')` giúp nhận cả trường hợp người dùng click vào `<span>` nằm bên trong link.

## 6. Hiệu ứng reveal khi scroll

```js
const revealItems = document.querySelectorAll('.reveal');
```

Nếu trình duyệt hỗ trợ `IntersectionObserver`:

```js
const observer = new IntersectionObserver((entries, currentObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
```

- `threshold: 0.12`: khi khoảng 12% phần tử đi vào viewport thì animation bắt đầu.
- `entry.isIntersecting`: kiểm tra phần tử có đang nằm trong viewport không.
- `is-visible`: class CSS làm phần tử hiện ra.
- `unobserve()`: ngừng theo dõi sau lần xuất hiện đầu tiên, giảm xử lý không cần thiết.

Nếu trình duyệt không hỗ trợ API này, code thêm `is-visible` ngay cho tất cả `.reveal` để nội dung vẫn nhìn thấy:

```js
revealItems.forEach((item) => item.classList.add('is-visible'));
```

## 7. `gallery.js`: lấy các phần tử lightbox

```js
const lightbox = document.querySelector('#gallery-lightbox');
const items = [...document.querySelectorAll('[data-gallery-index]')];
if (!lightbox || items.length === 0) return;
```

Guard clause này giúp script dừng an toàn nếu chạy trên trang không có gallery.

Các phần tử còn lại:

```js
const image = lightbox.querySelector('#lightbox-image');
const caption = lightbox.querySelector('#lightbox-caption');
const closeButton = lightbox.querySelector('.lightbox-close');
const previousButton = lightbox.querySelector('.lightbox-prev');
const nextButton = lightbox.querySelector('.lightbox-next');
```

Biến trạng thái:

```js
let currentIndex = 0;
let lastFocused;
```

- `currentIndex`: vị trí ảnh đang xem.
- `lastFocused`: button gallery đã mở modal; dùng để trả focus sau khi đóng.

## 8. Hàm `render()`

```js
const render = () => {
  const item = items[currentIndex];
  const thumbnail = item.querySelector('img');
  image.src = thumbnail.currentSrc || thumbnail.src;
  image.alt = thumbnail.alt;
  caption.textContent = `${item.dataset.category} / ${item.dataset.caption}`;
};
```

Chức năng:

1. Lấy gallery item tại `currentIndex`.
2. Lấy ảnh thumbnail bên trong item.
3. Gán ảnh lớn và `alt` cho modal.
4. Ghép `data-category` và `data-caption` thành caption.

## 9. Hàm `open(index)`

```js
const open = (index) => {
  currentIndex = index;
  lastFocused = items[index];
  render();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  closeButton.focus();
};
```

Hàm này:

- Ghi lại index và button vừa click.
- Render đúng ảnh/caption.
- Thêm `.is-open` để CSS hiện modal.
- Đổi `aria-hidden` thành `false`.
- Khóa scroll nền bằng `.no-scroll`.
- Đưa focus vào nút Close để thao tác keyboard thuận tiện.

## 10. Hàm `close()`

```js
const close = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  lastFocused?.focus();
};
```

Modal được ẩn, scroll được bật lại và focus quay về ảnh đã mở. `?.` là optional chaining: chỉ gọi `focus()` nếu `lastFocused` tồn tại.

## 11. Hàm `move(step)`

```js
const move = (step) => {
  currentIndex = (currentIndex + step + items.length) % items.length;
  render();
};
```

Công thức modulo tạo vòng lặp:

- `move(1)`: sang ảnh kế tiếp.
- `move(-1)`: về ảnh trước.
- Từ ảnh cuối bấm Next sẽ quay về ảnh đầu.
- Từ ảnh đầu bấm Previous sẽ quay về ảnh cuối.

## 12. Các sự kiện gallery

```js
items.forEach((item, index) =>
  item.addEventListener('click', () => open(index))
);

closeButton.addEventListener('click', close);
previousButton.addEventListener('click', () => move(-1));
nextButton.addEventListener('click', () => move(1));
```

Đóng modal khi click vùng nền:

```js
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) close();
});
```

Điều khiển bằng bàn phím:

```js
document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (event.key === 'Escape') close();
  if (event.key === 'ArrowLeft') move(-1);
  if (event.key === 'ArrowRight') move(1);
});
```

## 13. Khi thêm một ảnh gallery mới

1. Thêm file ảnh vào `assets/images/gallery/` hoặc dùng asset project có sẵn.
2. Thêm một button có `data-gallery-index` mới trong `gallery.html`.
3. Gắn `data-category`, `data-caption`, `alt`, `width`, `height` và `loading="lazy"`.
4. Không cần sửa `gallery.js`; script tự lấy toàn bộ phần tử `[data-gallery-index]`.

