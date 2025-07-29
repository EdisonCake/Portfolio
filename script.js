function mostrarAba(id) {
    const abas = document.querySelectorAll('.aba');
    abas.forEach(aba => aba.classList.remove('ativa'));

    const abaSelecionada = document.getElementById(id);
    if (abaSelecionada) {
        abaSelecionada.classList.add('ativa');
    }
}
