function excluirPedido(id) {
    console.log(id);
    fetch(`/pedidos/${id}`, { method: "DELETE" })
        .then(() => {
            location.reload();
        })
        .catch((error) => {
            console.error(error);
        });
}
