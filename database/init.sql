-- PeopleSphere HRMS Database Initialization and Schema Reference
-- Target Database: MySQL 8.0+
-- Default Database Name: peoplesphere_db
-- Character Set: utf8mb4
-- Collation: utf8mb4_unicode_ci

CREATE DATABASE IF NOT EXISTS peoplesphere_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE peoplesphere_db;

-- Initial Database Notes:
-- Schema is managed automatically via Alembic migrations located in backend/alembic.
-- Run: alembic upgrade head
