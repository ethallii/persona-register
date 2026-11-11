"""models.py: a classe do domínio (o que o Diagrama de Classes descreve)."""


class ItemAcervo:
    CATEGORIAS = ("Personagem", "Campanha", "História")

    def __init__(self, id, nome, categoria, detalhes):
        self.id = id
        self.nome = nome
        self.categoria = categoria
        self.detalhes = detalhes

    @property
    def nome(self):
        return self.__nome

    @nome.setter
    def nome(self, valor):
        if valor is None:
            raise ValueError("O nome é obrigatório.")
        texto = str(valor).strip()
        if not texto or len(texto) > 100:
            raise ValueError("O nome é obrigatório e deve ter até 100 caracteres.")
        self.__nome = texto

    @property
    def categoria(self):
        return self.__categoria

    @categoria.setter
    def categoria(self, valor):
        if valor not in ItemAcervo.CATEGORIAS:
            raise ValueError("Categoria inválida. Escolha: Personagem, Campanha ou História.")
        self.__categoria = valor

    @property
    def detalhes(self):
        return self.__detalhes

    @detalhes.setter
    def detalhes(self, valor):
        if valor is None:
            raise ValueError("Os detalhes são obrigatórios.")
        texto = str(valor).strip()
        if not texto or len(texto) > 255:
            raise ValueError("Os detalhes são obrigatórios (até 255 caracteres).")
        self.__detalhes = texto

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "categoria": self.categoria,
            "detalhes": self.detalhes,
        }