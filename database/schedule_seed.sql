-- Dữ liệu mẫu khớp với schedule.html.
-- Chạy file này sau schedule_schema.sql trên một database mới.

USE le_tan_vi_schedule;

INSERT INTO academic_terms (term_id, term_code, term_name, starts_on, ends_on) VALUES
  (1, 'HK1-2026-2027', 'Học kỳ 1 năm học 2026–2027', '2026-09-07', '2026-12-26');

INSERT INTO courses (course_id, course_code, course_name, credits) VALUES
  (1, 'IS207', 'Phát triển ứng dụng web', 3),
  (2, 'IS336', 'Hoạch định nguồn lực doanh nghiệp', 3),
  (3, 'DS311', 'Kỹ năng nghiên cứu và viết báo cáo khoa học', 2),
  (4, 'IS403', 'Phân tích dữ liệu kinh doanh', 3),
  (5, 'PE231', 'Giáo dục thể chất 1', 1),
  (6, 'IS217', 'Kho dữ liệu và OLAP', 3);

INSERT INTO instructors (instructor_id, full_name) VALUES
  (1, 'Vũ Minh Sang'),
  (2, 'Vân Đức Sơn Hà'),
  (3, 'Nguyễn Văn Kiệt'),
  (4, 'Dương Phi Long'),
  (5, 'Dương Đài Tài'),
  (6, 'Đỗ Thị Minh Phụng');

INSERT INTO rooms (room_id, room_code, building, room_type) VALUES
  (1, 'B3.04', 'B', 'Phòng học'),
  (2, 'B4.12', 'B', 'Phòng học'),
  (3, 'C213', 'C', 'Phòng học'),
  (4, 'B1.10', 'B', 'Phòng học'),
  (5, 'SânPickleball_01', 'Khu thể thao', 'Sân thể chất'),
  (6, 'B4.10', 'B', 'Phòng học');

INSERT INTO weekdays (weekday_id, day_number, day_name) VALUES
  (2, 2, 'Thứ 2'),
  (3, 3, 'Thứ 3'),
  (4, 4, 'Thứ 4'),
  (5, 5, 'Thứ 5'),
  (6, 6, 'Thứ 6'),
  (7, 7, 'Thứ 7');

INSERT INTO periods (period_id, period_number, starts_at, ends_at) VALUES
  (1, 1, '07:30:00', '08:15:00'),
  (2, 2, '08:15:00', '09:00:00'),
  (3, 3, '09:00:00', '09:45:00'),
  (4, 4, '10:00:00', '10:45:00'),
  (5, 5, '10:45:00', '11:30:00'),
  (6, 6, '13:00:00', '13:45:00'),
  (7, 7, '13:45:00', '14:30:00'),
  (8, 8, '14:30:00', '15:15:00'),
  (9, 9, '15:30:00', '16:15:00'),
  (10, 10, '16:15:00', '17:00:00');

INSERT INTO course_sections
  (section_id, term_id, course_id, instructor_id, section_code, section_type, starts_on, ends_on, is_fixed_schedule)
VALUES
  (1, 1, 1, 1, 'IS207.R12.1', 'LT',  '2026-09-07', '2026-12-19', TRUE),
  (2, 1, 2, 2, 'IS336.R12',   'LT',  '2026-09-07', '2026-11-28', TRUE),
  (3, 1, 3, 3, 'DS311.R11',   'LT',  '2026-09-07', '2026-11-28', TRUE),
  (4, 1, 4, 4, 'IS403.R11',   'LT',  '2026-09-07', '2026-11-28', TRUE),
  (5, 1, 5, 5, 'PE231.R17',   'LT',  '2026-09-07', '2026-12-26', TRUE),
  (6, 1, 6, 6, 'IS217.R11',   'LT',  '2026-09-07', '2026-11-28', TRUE),
  (7, 1, 2, 2, 'IS336.R12.1', 'HT2', '2026-09-07', '2026-12-26', FALSE);

INSERT INTO schedule_blocks
  (section_id, weekday_id, period_from, period_to, room_id, session_type)
VALUES
  (1, 2, 1, 5, 1, 'HT1'),
  (2, 3, 1, 4, 2, 'LT'),
  (3, 5, 1, 4, 3, 'LT'),
  (1, 2, 6, 9, 2, 'LT'),
  (4, 3, 6, 9, 4, 'LT'),
  (5, 4, 6, 8, 5, 'LT'),
  (6, 5, 6, 9, 6, 'LT');

-- Truy vấn mẫu để lấy dữ liệu hiển thị lên timetable.
SELECT *
FROM v_timetable
ORDER BY day_number, period_from, course_code;
