-- CSDL thời khóa biểu cho project portfolio của Lê Tấn Vĩ
-- Hệ quản trị đề xuất: MySQL 8.0+

CREATE DATABASE IF NOT EXISTS le_tan_vi_schedule
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE le_tan_vi_schedule;

CREATE TABLE IF NOT EXISTS academic_terms (
  term_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  term_code VARCHAR(30) NOT NULL UNIQUE,
  term_name VARCHAR(120) NOT NULL,
  starts_on DATE,
  ends_on DATE
);

CREATE TABLE IF NOT EXISTS courses (
  course_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(30) NOT NULL UNIQUE,
  course_name VARCHAR(160) NOT NULL,
  credits TINYINT UNSIGNED NOT NULL DEFAULT 0,
  description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS instructors (
  instructor_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
  room_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  room_code VARCHAR(80) NOT NULL UNIQUE,
  building VARCHAR(80),
  room_type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS weekdays (
  weekday_id TINYINT UNSIGNED PRIMARY KEY,
  day_number TINYINT UNSIGNED NOT NULL UNIQUE,
  day_name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS periods (
  period_id TINYINT UNSIGNED PRIMARY KEY,
  period_number TINYINT UNSIGNED NOT NULL UNIQUE,
  starts_at TIME NOT NULL,
  ends_at TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS course_sections (
  section_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  term_id INT UNSIGNED NOT NULL,
  course_id INT UNSIGNED NOT NULL,
  instructor_id INT UNSIGNED,
  section_code VARCHAR(40) NOT NULL,
  section_type ENUM('LT', 'HT1', 'HT2', 'TH', 'DA', 'KLTN', 'TTTN') NOT NULL DEFAULT 'LT',
  starts_on DATE,
  ends_on DATE,
  is_fixed_schedule BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE KEY uq_section_in_term (term_id, section_code),
  CONSTRAINT fk_section_term FOREIGN KEY (term_id)
    REFERENCES academic_terms (term_id),
  CONSTRAINT fk_section_course FOREIGN KEY (course_id)
    REFERENCES courses (course_id),
  CONSTRAINT fk_section_instructor FOREIGN KEY (instructor_id)
    REFERENCES instructors (instructor_id)
);

-- Một block có thể kéo dài nhiều tiết liên tiếp, tương ứng với rowspan trên giao diện.
CREATE TABLE IF NOT EXISTS schedule_blocks (
  block_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  section_id INT UNSIGNED NOT NULL,
  weekday_id TINYINT UNSIGNED NOT NULL,
  period_from TINYINT UNSIGNED NOT NULL,
  period_to TINYINT UNSIGNED NOT NULL,
  room_id INT UNSIGNED,
  session_type ENUM('LT', 'HT1', 'HT2', 'TH', 'DA', 'KLTN', 'TTTN') NOT NULL DEFAULT 'LT',
  note VARCHAR(255),
  CONSTRAINT chk_period_range CHECK (period_from <= period_to),
  UNIQUE KEY uq_schedule_block (section_id, weekday_id, period_from, period_to, session_type),
  CONSTRAINT fk_block_section FOREIGN KEY (section_id)
    REFERENCES course_sections (section_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_block_weekday FOREIGN KEY (weekday_id)
    REFERENCES weekdays (weekday_id),
  CONSTRAINT fk_block_period_from FOREIGN KEY (period_from)
    REFERENCES periods (period_id),
  CONSTRAINT fk_block_period_to FOREIGN KEY (period_to)
    REFERENCES periods (period_id),
  CONSTRAINT fk_block_room FOREIGN KEY (room_id)
    REFERENCES rooms (room_id)
);

CREATE OR REPLACE VIEW v_timetable AS
SELECT
  sb.block_id,
  at.term_name,
  c.course_code,
  c.course_name,
  c.credits,
  cs.section_code,
  sb.session_type,
  i.full_name AS instructor_name,
  w.day_number,
  w.day_name,
  p_from.period_number AS period_from,
  p_to.period_number AS period_to,
  p_from.starts_at,
  p_to.ends_at,
  r.room_code,
  cs.starts_on,
  cs.ends_on,
  cs.is_fixed_schedule
FROM schedule_blocks AS sb
JOIN course_sections AS cs ON cs.section_id = sb.section_id
JOIN academic_terms AS at ON at.term_id = cs.term_id
JOIN courses AS c ON c.course_id = cs.course_id
LEFT JOIN instructors AS i ON i.instructor_id = cs.instructor_id
JOIN weekdays AS w ON w.weekday_id = sb.weekday_id
JOIN periods AS p_from ON p_from.period_id = sb.period_from
JOIN periods AS p_to ON p_to.period_id = sb.period_to
LEFT JOIN rooms AS r ON r.room_id = sb.room_id;
