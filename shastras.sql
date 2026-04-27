--
-- PostgreSQL database dump
--

\restrict 0v8sIzVlDNoVgROXl06IBq5aQRTB3mtogDoGSd4VAQmovCudMaBckhYpsTQyvxv

-- Dumped from database version 17.8 (130b160)
-- Dumped by pg_dump version 17.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: shastras; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.shastras (id, slug, name, structure_type, status, deleted_at, created_at, updated_at) FROM stdin;
9e6d62f5-bd1a-41ff-9f1b-fd73bc9ef6c8	bhagavad-gita	Bhagavad Gītā	adhyaya-shloka	ACTIVE	\N	2026-04-24 20:13:35.331	2026-04-24 20:13:35.331
\.


--
-- PostgreSQL database dump complete
--

\unrestrict 0v8sIzVlDNoVgROXl06IBq5aQRTB3mtogDoGSd4VAQmovCudMaBckhYpsTQyvxv

