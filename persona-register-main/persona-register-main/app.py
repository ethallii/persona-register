"""app.py: rotas Flask (a API REST + a página)."""
from flask import Flask, jsonify, render_template, request

from dao import AcervoDAO
from models import ItemAcervo

app = Flask(__name__)
dao = AcervoDAO()


@app.route("/")
def pagina_inicial():
    return render_template("index.html")


@app.route("/acervo", methods=["GET"])
def listar():
    itens = dao.buscar_todos()
    return jsonify([i.to_dict() for i in itens])


@app.route("/acervo", methods=["POST"])
def criar():
    dados = request.json or {}
    try:
        item = ItemAcervo(
            None, dados.get("nome"), dados.get("categoria"), dados.get("detalhes")
        )
    except ValueError as erro:
        return jsonify({"erro": str(erro)}), 400
    id_gerado = dao.inserir(item)
    return jsonify({"id": id_gerado, "mensagem": "Registro salvo com sucesso!"}), 201


@app.route("/acervo/<int:id_item>", methods=["PUT"])
def atualizar(id_item):
    dados = request.json or {}
    try:
        item = ItemAcervo(
            id_item, dados.get("nome"), dados.get("categoria"), dados.get("detalhes")
        )
    except ValueError as erro:
        return jsonify({"erro": str(erro)}), 400
    if dao.atualizar(id_item, item) == 0:
        return jsonify({"erro": "Registro não encontrado."}), 404
    return jsonify({"mensagem": "Registro atualizado!"})


@app.route("/acervo/<int:id_item>", methods=["DELETE"])
def remover(id_item):
    if dao.remover(id_item) == 0:
        return jsonify({"erro": "Registro não encontrado."}), 404
    return jsonify({"mensagem": "Registro removido!"})


if __name__ == "__main__":
    app.run(debug=True)
