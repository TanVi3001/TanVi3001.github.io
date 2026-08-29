# Tài liệu kỹ thuật portfolio

Tài liệu này tóm tắt đúng các thẻ HTML, quy tắc CSS, hàm JavaScript và luồng hoạt động đang được sử dụng trong project portfolio của Lê Tấn Vĩ.

## Mục lục

- [HTML và cấu trúc trang](./html.md)
- [CSS, layout và responsive](./css.md)
- [JavaScript, hàm và sự kiện](./javascript.md)
- [Kiến trúc thư mục và luồng hoạt động](./architecture.md)

## Tổng quan nhanh

Project là website tĩnh đa trang, không dùng framework lớn:

- HTML5 tạo nội dung và cấu trúc semantic.
- CSS3 tạo giao diện, Grid/Flexbox, hiệu ứng và responsive.
- JavaScript thuần xử lý navbar, highlight trang hiện tại, animation reveal và gallery lightbox.
- Ảnh project, gallery và chứng chỉ được lưu local, ưu tiên WebP.

## 9 trang hiện có

| File | Chức năng |
|---|---|
| `index.html` | Home/About, thông tin cá nhân, định hướng học tập và avatar |
| `projects.html` | Ba project: Drosophila, Smart Supermarket và MNIST |
| `experience.html` | Kinh nghiệm theo timeline |
| `hobbies.html` | Sở thích và hoạt động cá nhân |
| `skills.html` | Kỹ năng cứng, kỹ năng mềm và thanh đánh giá |
| `books.html` | Danh sách sách yêu thích |
| `certificates.html` | Chứng chỉ VNU-EPT và Google Data Analytics |
| `gallery.html` | Gallery 8 ảnh project với lightbox |
| `schedule.html` | Thời khóa biểu theo ngày, tiết học và các lớp không cố định |

## Cách đọc tài liệu

Khi muốn sửa nội dung, xem phần HTML. Khi muốn sửa màu, khoảng cách hoặc breakpoint, xem phần CSS. Khi muốn sửa menu mobile, animation hoặc phóng to ảnh, xem phần JavaScript tương ứng.
