# Cơ sở dữ liệu thời khóa biểu

Thư mục này chứa mô hình cơ sở dữ liệu quan hệ cho trang `schedule.html`. Đây là mã nguồn SQL, không phải ảnh chụp sơ đồ.

## Cách chạy với MySQL 8.0+

```sql
SOURCE database/schedule_schema.sql;
SOURCE database/schedule_seed.sql;

SELECT *
FROM v_timetable
ORDER BY day_number, period_from, course_code;
```

`schedule_schema.sql` tạo database, các bảng và view. `schedule_seed.sql` thêm dữ liệu mẫu về môn học, lớp học phần, giảng viên, phòng, ngày, tiết và các block lịch.

## Quan hệ chính

- Một học kỳ có nhiều lớp học phần.
- Một môn học có thể mở nhiều lớp học phần.
- Một lớp học phần thuộc một giảng viên và có thể có nhiều block lịch.
- Một block lịch gắn với một ngày, khoảng tiết bắt đầu/kết thúc và một phòng.
- Lớp không có giờ cố định vẫn được lưu trong `course_sections` với `is_fixed_schedule = FALSE`, nhưng không có dòng trong `schedule_blocks`.

Sơ đồ ER bằng Mermaid và giải thích từng bảng nằm tại [`docs/database.md`](../docs/database.md).

Website hiện là static site nên chưa kết nối trực tiếp MySQL; SQL này là phần thiết kế dữ liệu để có thể dùng cho API/backend về sau.
