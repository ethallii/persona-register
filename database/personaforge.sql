CREATE DATABASE personaforge
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE personaforge;

CREATE TABLE acervo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    detalhes VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- ATENÇÃO, LEO, ESSES DADOS SÃO FICTÍCIOS!!!!
INSERT INTO acervo (nome, categoria, detalhes) VALUES 
('Avelynn, a Renegada', 'Personagem', 'Uma elfa ladina especialista em venenos e espionagem silenciosa.'),
('Crônicas de Althea', 'Campanha', 'Campanha de RPG focada na busca pelos artefatos divinos perdidos.'),
('O Voo do Dragão de Ferro', 'História', 'Conto focado na revolução industrial steampunk e dragões mecânicos.');