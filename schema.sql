-- Script para criar as tabelas no Supabase SQL Editor

-- Ativar extensão de UUID se necessário
create extension if not exists "uuid-ossp";

-- 1. Tabela Club Info (Informações do Clube)
create table if not exists club_info (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slogan text,
  description text,
  foundation_year integer,
  email text,
  phone text,
  address text,
  training_locations jsonb, -- array de {name, address, details}
  social_media jsonb,       -- objeto de redes sociais
  president text,
  head_coach text,
  logo_url text,
  admin_pin text default '19780621',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Tabela News (Notícias e Blog)
create table if not exists news (
  id text primary key,
  title text not null,
  slug text not null unique,
  category text not null,
  summary text,
  content text,
  cover_image text,
  author text,
  publish_date text,
  featured boolean default false,
  tags text[],
  views integer default 0,
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tabela Trainings (Sessões de Treino)
create table if not exists trainings (
  id text primary key,
  title text not null,
  category text,
  day_of_week text not null,
  time text not null,
  location text,
  coach text,
  target_level text,
  focus text,
  notes text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Tabela Results (Resultados de Corridas)
create table if not exists results (
  id text primary key,
  race_name text not null,
  location text,
  date text,
  distance text,
  category text,
  athlete_name text not null,
  bib_number text,
  official_time text not null,
  pace text,
  overall_rank integer,
  category_rank integer,
  podium_position integer,
  medal_type text,
  notes text,
  photo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Tabela Gallery (Galeria de Fotos)
create table if not exists gallery (
  id text primary key,
  title text not null,
  album text not null,
  category text not null,
  image_url text not null,
  date text,
  photographer text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Tabela Registrations (Fichas de Inscrição dos Atletas)
create table if not exists registrations (
  id text primary key,
  registration_number text not null unique,
  full_name text not null,
  email text not null,
  phone text not null,
  birth_date text not null,
  id_number text not null,
  nif text,
  gender text not null,
  address text,
  city text,
  postal_code text,
  escalao text,
  disciplines text[],
  emergency_contact_name text,
  emergency_contact_phone text,
  medical_conditions text,
  experience_level text,
  terms_accepted boolean default false,
  rgpd_accepted boolean default false,
  status text default 'Pendente',
  submission_date text not null,
  admin_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
