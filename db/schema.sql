PRAGMA foreign_keys=ON;

DROP TABLE IF EXISTS userArtist;
DROP TABLE IF EXISTS artWork;

CREATE TABLE OR REPLACE userArtist (
username VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
id INT AUTO_INCREMENT,
PRIMARY KEY (id)
);

CREATE TABLE OR REPLACE artWork (
id INT AUTO_INCREMENT,
image_path VARCHAR(100) NOT NULL,
date_added DATE NOT NULL,
title VARCHAR(50) NOT NULL,
description VARCHAR(250) NOT NULL,
artist_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (artist_id) REFERENCES userArtist (id)
);
