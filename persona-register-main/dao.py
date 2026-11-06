"""dao.py: acesso ao banco SQLite (padrão DAO). Só aqui existe SQL."""
import os
import sqlite3

from models import ItemAcervo

PASTA = os.path.dirname(os.path.abspath(__file__))
CAMINHO_BANCO = os.path.join(PASTA, "database", "personaforge.db")
CAMINHO_SQL = os.path.join(PASTA, "database", "personaforge.sql")


class AcervoDAO:
    def __init__(self, caminho_banco=CAMINHO_BANCO):
        self.caminho_banco = caminho_banco
        self.criar_tabela_se_preciso()

    def criar_tabela_se_preciso(self):
        """Na primeira execução, roda o .sql (cria a tabela e os dados de exemplo)."""
        with sqlite3.connect(self.caminho_banco) as conexao:
            cursor = conexao.cursor()
            cursor.execute(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='acervo'"
            )
            if cursor.fetchone() is None:
                with open(CAMINHO_SQL, "r", encoding="utf-8") as arquivo:
                    conexao.executescript(arquivo.read())

    def buscar_todos(self):
        with sqlite3.connect(self.caminho_banco) as conexao:
            cursor = conexao.cursor()
            cursor.execute("SELECT id, nome, categoria, detalhes FROM acervo ORDER BY id DESC")
            return [ItemAcervo(*linha) for linha in cursor.fetchall()]

    def inserir(self, item):
        with sqlite3.connect(self.caminho_banco) as conexao:
            cursor = conexao.cursor()
            cursor.execute(
                "INSERT INTO acervo (nome, categoria, detalhes) VALUES (?, ?, ?)",
                (item.nome, item.categoria, item.detalhes),
            )
            conexao.commit()
            return cursor.lastrowid

    def atualizar(self, id_item, item):
        with sqlite3.connect(self.caminho_banco) as conexao:
            cursor = conexao.cursor()
            cursor.execute(
                "UPDATE acervo SET nome=?, categoria=?, detalhes=? WHERE id=?",
                (item.nome, item.categoria, item.detalhes, id_item),
            )
            conexao.commit()
            return cursor.rowcount  # 0 = id não existe

    def remover(self, id_item):
        with sqlite3.connect(self.caminho_banco) as conexao:
            cursor = conexao.cursor()
            cursor.execute("DELETE FROM acervo WHERE id=?", (id_item,))
            conexao.commit()
            return cursor.rowcount
