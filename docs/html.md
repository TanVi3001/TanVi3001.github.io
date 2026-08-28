# HTML trong project

## 1. HTML có vai trò gì?

HTML không có “hàm” như JavaScript. HTML dùng **thẻ (tag)** để tạo cấu trúc và **thuộc tính (attribute)** để mô tả thêm cho thẻ. CSS định dạng HTML, còn JavaScript tương tác với HTML thông qua DOM.

## 2. Khung HTML chung

Mỗi trang đều có cấu trúc cơ bản:

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Mô tả trang">
  <title>Lê Tấn Vĩ | Tên trang</title>
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/responsive.css">
  <script src="./js/main.js" defer></script>
</head>
<body data-page="projects">
  ...
</body>
</html>
```

### Chức năng các thẻ khung

| Thẻ | Chức năng trong project |
|---|---|
| `<!doctype html>` | Báo cho trình duyệt sử dụng chuẩn HTML5 |
| `<html lang="vi">` | Phần tử gốc; `lang="vi"` giúp trình đọc màn hình nhận biết ngôn ngữ |
| `<head>` | Chứa metadata, tiêu đề, CSS và JavaScript |
| `<meta charset="utf-8">` | Hiển thị đúng tiếng Việt và ký tự Unicode |
| `<meta name="viewport">` | Giúp layout hiển thị đúng trên mobile |
| `<meta name="description">` | Mô tả trang cho công cụ tìm kiếm và preview |
| `<title>` | Tiêu đề hiển thị trên tab trình duyệt |
| `<link rel="stylesheet">` | Nạp file CSS bên ngoài |
| `<script defer>` | Nạp JavaScript và thực thi sau khi HTML được phân tích |
| `<body>` | Chứa toàn bộ nội dung người dùng nhìn thấy |

## 3. Header và điều hướng dùng chung

```html
<header class="site-header">
  <div class="container nav-shell">
    <a class="brand" href="./index.html">...</a>
    <button class="nav-toggle" type="button"
      aria-expanded="false" aria-controls="main-navigation">
      ...
    </button>
    <nav id="main-navigation" class="main-nav" aria-label="Điều hướng chính">
      <a href="./projects.html" data-page-link="projects">Projects</a>
    </nav>
  </div>
</header>
```

| Thành phần | Chức năng |
|---|---|
| `<header>` | Vùng đầu trang, chứa thương hiệu và navbar |
| `<a>` | Liên kết về Home hoặc một trong các trang |
| `<button class="nav-toggle">` | Nút mở/đóng menu trên mobile |
| `<nav>` | Nhóm các liên kết điều hướng chính |
| `data-page="..."` | Xác định trang hiện tại để JavaScript highlight navbar |
| `data-page-link="..."` | Gắn một liên kết với tên trang tương ứng |
| `aria-expanded` | Cho biết menu mobile đang mở hay đóng |
| `aria-controls` | Nói cho trình đọc màn hình biết button điều khiển phần tử nào |
| `aria-current="page"` | Đánh dấu liên kết của trang hiện tại |

## 4. Các thẻ semantic chính

| Thẻ | Cách project đang dùng |
|---|---|
| `<main id="main-content">` | Nội dung chính của từng trang; skip link trỏ tới đây |
| `<section>` | Chia trang thành các vùng: hero, about, danh sách project, CTA |
| `<article>` | Một đơn vị nội dung độc lập như project, sách hoặc chứng chỉ |
| `<footer>` | Footer thống nhất ở cuối mọi trang |
| `<h1>` | Tiêu đề chính, mỗi trang nên có một tiêu đề cấp 1 |
| `<h2>` | Tiêu đề section hoặc card lớn |
| `<h3>` | Tiêu đề nhóm nhỏ hơn |
| `<p>` | Đoạn mô tả, đoạn giới thiệu hoặc ghi chú |
| `<strong>` | Nhấn mạnh nội dung quan trọng |
| `<em>` | Nhấn ngữ nghĩa, ví dụ tên khoa học `Drosophila` |
| `<br>` | Xuống dòng có chủ đích trong một số heading/footer |
| `<span>` | Bọc label, số thứ tự, tag hoặc phần chữ cần CSS riêng |
| `<i>` | Dùng cho dấu phân cách nhỏ trong vai trò hero |

## 5. Ảnh và thuộc tính ảnh

Ví dụ trong `projects.html`:

```html
<img src="./assets/images/projects/mnist-dataset-samples.webp"
  alt="20 mẫu chữ số viết tay từ tập dữ liệu MNIST"
  width="1189" height="418" loading="lazy">
```

| Thuộc tính | Chức năng |
|---|---|
| `src` | Đường dẫn tới file ảnh local |
| `alt` | Mô tả ảnh cho accessibility; không được bỏ trống với ảnh có ý nghĩa |
| `width`, `height` | Khai báo kích thước gốc, giúp trình duyệt giữ chỗ trước khi ảnh tải |
| `loading="lazy"` | Trì hoãn tải ảnh chưa nằm trong vùng nhìn thấy; đang dùng cho gallery/project |

Các ảnh project hiện dùng gồm:

- `drosophila-analysis.webp`: biểu đồ phân tích mô phỏng.
- `supermarket-dashboard.webp`: dashboard báo cáo doanh thu.
- `mnist-dataset-samples.webp`: mẫu ảnh từ dataset MNIST.

## 6. Danh sách, tag và dữ liệu dạng cặp

```html
<ul class="check-list">
  <li>Data preprocessing</li>
</ul>

<dl>
  <div>
    <dt>Completed</dt>
    <dd>29.07.2026</dd>
  </div>
</dl>
```

| Thẻ | Chức năng |
|---|---|
| `<ul>` | Danh sách không cần thứ tự |
| `<li>` | Một phần tử trong danh sách |
| `<dl>` | Danh sách mô tả dạng key/value |
| `<dt>` | Tên trường dữ liệu, ví dụ `Completed` |
| `<dd>` | Giá trị của trường dữ liệu |

Project dùng `<dl>` cho thông tin chứng chỉ và dùng các `<span>` trong `.tag-row`, `.pill-cloud` để tạo badge công nghệ/kỹ năng.

## 7. Gallery và lightbox

Mỗi ảnh gallery là một button để có thể click và dùng bàn phím:

```html
<button class="gallery-item" type="button"
  data-gallery-index="0"
  data-category="MNIST"
  data-caption="Dataset / handwritten digit samples">
  <img src="..." alt="20 mẫu chữ số viết tay trong tập dữ liệu MNIST"
    loading="lazy">
</button>
```

| Thuộc tính | Chức năng |
|---|---|
| `data-gallery-index` | Vị trí ảnh trong danh sách lightbox |
| `data-category` | Nhóm ảnh, được dùng khi tạo caption |
| `data-caption` | Mô tả ngắn hiển thị trong modal |
| `type="button"` | Tránh button bị hiểu là submit nếu sau này đặt trong form |

Modal lightbox dùng các thành phần:

```html
<div id="gallery-lightbox" role="dialog" aria-modal="true"
  aria-labelledby="lightbox-caption" aria-hidden="true">
  <button class="lightbox-close" type="button">×</button>
  <button class="lightbox-prev" type="button">←</button>
  <figure>
    <img id="lightbox-image" src="" alt="">
    <figcaption id="lightbox-caption"></figcaption>
  </figure>
  <button class="lightbox-next" type="button">→</button>
</div>
```

`<figure>` gom ảnh với chú thích; `<figcaption>` chứa caption; `role="dialog"` và các thuộc tính `aria-*` mô tả modal cho công cụ hỗ trợ.

## 8. Skip link và accessibility

```html
<a class="skip-link" href="#main-content">Bỏ qua đến nội dung chính</a>
```

Skip link cho phép người dùng bàn phím bỏ qua navbar. Các nút có `aria-label`, navbar có `aria-label`, ảnh có `alt`, và heading đi theo thứ bậc `h1 > h2 > h3`.

