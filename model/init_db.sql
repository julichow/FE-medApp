-- Create medications table

DROP TABLE IF EXISTS medications; 

CREATE TABLE medications(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  reason VARCHAR(255),
  frequency INT,
  dose VARCHAR(255),
  doctor VARCHAR(255),
  date_time DATETIME,
  PRIMARY KEY(id)
  );

INSERT INTO medications (name, reason, frequency, dose, doctor, date_time)
VALUES
  ('Haldol', 'Schizophrenia', 1, '20mg', 'A. Samson', '2023-08-19 16:26:23'),
  ('Gabapentin', 'Seizures', 3, '10mg', 'P. Wick', '2023-07-17 08:30:23'),
  ('Ibuprofen', 'Pain relief', 1, '10mg', 'A. Samson', '2023-08-19 12:30:23'),
  ('Biktarvy', 'HIV', 1, '50mg', 'G. Smith', '2023-08-19 12:30:23');