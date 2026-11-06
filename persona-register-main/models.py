"""models.py: a classe do domínio (o que o Diagrama de Classes descreve)."""


class ItemAcervo:
    CATEGORIAS = ("Personagem", "Campanha", "História")

    def __init__(self, id, nome, categoria, detalhes):
        self.id = id
        # Estas três linhas passam pelos setters (com validação)
        self.nome = nome
        self.categoria = categoria
        self.detalhes = detalhes

    @property
    def nome(self):
        return self.__nome

    @nome.setter
    def nome(self, valor):
        valor = str(valor).strip()
        if not valor or len(valor) > 100:
            raise ValueError("O nome é obrigatório e deve ter até 100 caracteres.")
        self.__nome = valor

    @property
    def categoria(self):
        return self.__categoria

    @categoria.setter
    def categoria(self, valor):
        if valor not in ItemAcervo.CATEGORIAS:
            raise ValueError("Categoria inválida.")
        self.__categoria = valor

    @property
    def detalhes(self):
        return self.__detalhes

    @detalhes.setter
    def detalhes(self, valor):
        valor = str(valor).strip()
        if not valor or len(valor) > 255:
            raise ValueError("Os detalhes são obrigatórios (até 255 caracteres).")
        self.__detalhes = valor

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "categoria": self.categoria,
            "detalhes": self.detalhes,
        }
