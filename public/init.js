function salvar() {
  const id = $("#id").val();
  const titulo = $("#titulo").val();
  const descricao = $("#descricao").val();

  if (!titulo) return alert("Campo título é obrigatório!");
  if (!descricao) return alert("Campo descrição é obrigatório!");

  const type = !id ? "post" : "put";

  $.ajax({
    type: type,
    url: "/notes",
    data: JSON.stringify({ title: titulo, description: descricao, id: id }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      alert(data.message);
      $("#titulo").val("");
      $("#descricao").val("");
      $("#id").val("");
      listar();
    },
    error: function (res) {
      alert(res.responseJSON.message);
    },
  });
}

function listar() {
  $(".list").html("");

  $.ajax({
    type: "get",
    url: "/notes",
    data: JSON.stringify({ title: titulo, description: descricao }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log(data);

      for (const note of data) {
        $(".list").append(`
            <div class="item">
                <h2>${note.title}</h2>
                <p>${note.description}</p>
                <button onClick="editar('${note.id}')">Editar</button>
                <button onClick="excluir('${note.id}')">Excluir</button>
            </div>
          `);
      }
    },
    error: function (res) {
      alert(res.responseJSON.message);
    },
  });
}

function excluir(id) {
  $.ajax({
    type: "delete",
    url: "/notes",
    data: JSON.stringify({ id: id }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      alert(data.message);
      listar();
    },
    error: function (res) {
      alert(res.responseJSON.message);
    },
  });
}

function editar(id) {
  $.ajax({
    type: "get",
    url: "/notes/" + id,
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      $("#id").val(data.id);
      $("#titulo").val(data.title);
      $("#descricao").val(data.description);
    },
    error: function (res) {
      alert(res.responseJSON.message);
    },
  });
}

listar();
