function excluirPedido(id) {
    console.log(id);
    fetch(`/pedidos/${id}`, { method: "DELETE" })
        .then(() => {
            location.href = location.href;
        })
        .catch((error) => {
            console.error(error);
        });
}


  
