-- PERSONAForge: estrutura do banco (SQLite)
-- Substitui a versão MySQL: o sqlite3 já vem com o Python, sem instalar nada.

CREATE TABLE IF NOT EXISTS acervo (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nome      TEXT NOT NULL,
    categoria TEXT NOT NULL,
    detalhes  TEXT NOT NULL
);

-- Dados fictícios de exemplo
INSERT INTO acervo (nome, categoria, detalhes) VALUES
('Avelynn, a Renegada', 'Personagem', 'Uma elfa ladina especialista em venenos e espionagem silenciosa.'),
('Crônicas de Althea', 'Campanha', 'Campanha de RPG focada na busca pelos artefatos divinos perdidos.'),
('O Voo do Dragão de Ferro', 'História', 'Conto focado na revolução industrial steampunk e dragões mecânicos.');
