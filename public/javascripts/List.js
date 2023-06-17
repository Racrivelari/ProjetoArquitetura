document.addEventListener("DOMContentLoaded", function () {
    const options = {
        valueNames: ["pedido"]
    };
    const pedidoList = new List("lista-pedidos", options);
    
    const buscarInput = document.getElementById("buscar");
    buscarInput.addEventListener("input", function () {
        const searchString = this.value.toLowerCase();
        pedidoList.search(searchString);
    });
});