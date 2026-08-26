# minh.anh/ — Portfolio cá nhân

Website portfolio tĩnh đa trang được xây dựng theo yêu cầu học tập: HTML5, CSS3 và JavaScript thuần.

## Nội dung

Website gồm đủ 8 trang:

1. **Home / Info** — thông tin cơ bản, ảnh đại diện và liên hệ.
2. **Dự án** — 4 dự án mẫu, có mô tả, vai trò, công nghệ và liên kết.
3. **Kinh nghiệm** — timeline học tập và làm việc.
4. **Sở thích** — 6 sở thích có icon và mô tả.
5. **Thế mạnh** — kỹ năng cứng dạng progress bar và kỹ năng mềm dạng card.
6. **Sách** — 3 sách yêu thích có bìa, tác giả và cảm nhận.
7. **Chứng chỉ** — 3 chứng chỉ có đơn vị cấp, thời gian và credential ID.
8. **Gallery** — 8 ảnh responsive, lazy-load và lightbox phóng to.

## Cấu trúc thư mục

```text
.
├── index.html
├── projects.html
├── experience.html
├── interests.html
├── skills.html
├── books.html
├── certificates.html
├── gallery.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Chạy local

Mở `index.html` trực tiếp trên trình duyệt, hoặc chạy một static server trong thư mục project:

```bash
python -m http.server 8000
```

Sau đó mở <http://localhost:8000>.

## Deploy GitHub Pages

1. Tạo một repository mới trên GitHub và push toàn bộ thư mục project lên nhánh `main`.
2. Vào **Settings → Pages**.
3. Ở **Build and deployment**, chọn **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Bấm **Save** và chờ GitHub Pages tạo địa chỉ dạng `https://<username>.github.io/<repository>/`.

Website dùng đường dẫn tương đối (`./`) nên hoạt động được cả ở domain root lẫn trong sub-path của repository.

## Responsive và khả năng truy cập

- Layout dùng CSS Grid/Flexbox với breakpoint mobile `<768px`, tablet `768–1020px`, desktop `>1020px`.
- Có skip link, heading theo thứ bậc, `alt` cho ảnh, focus state rõ ràng và `aria-current` cho trang hiện tại.
- Gallery có `loading="lazy"`, ảnh dùng URL Unsplash với định dạng WebP và kích thước phù hợp.
- Lightbox có nút đóng, hỗ trợ phím `Escape` và trả focus về thumbnail ban đầu.
- Có hỗ trợ `prefers-reduced-motion` cho người dùng hạn chế chuyển động.

## Nguồn nội dung và bản quyền

- Ảnh gallery và avatar: [Unsplash](https://unsplash.com/), sử dụng qua Unsplash Image URL với `auto=format` và `fm=webp`.
- Ảnh bìa sách: [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers).
- Nội dung nhân vật, dự án, chứng chỉ và liên hệ là dữ liệu giả lập phục vụ mục đích học tập; không sử dụng thông tin nhạy cảm.
- Mã nguồn website do Minh Anh viết cho bài tập cá nhân. Khi thay ảnh/nội dung bằng tài nguyên riêng, cần kiểm tra lại giấy phép trước khi tái phân phối.
