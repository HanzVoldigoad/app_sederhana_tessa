CREATE DATABASE aplikasi_sederhana;

USE aplikasi_sederhana;

CREATE TABLE pengguna (
    id_pengguna INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    email VARCHAR(100),
    kata_sandi VARCHAR(255)
);
