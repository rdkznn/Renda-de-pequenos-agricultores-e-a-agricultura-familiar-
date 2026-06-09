// Aguarda o HTML carregar completamente antes de ativar o monitor do formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rendaForm');
    
    form.addEventListener('submit', function(event) {
        // Impede o formulário de recarregar a página web
        event.preventDefault();

        // Captura e converte os valores inseridos pelo usuário
        const vendas = parseFloat(document.getElementById('vendas').value) || 0;
        const outrasReceitas = parseFloat(document.getElementById('outrasReceitas').value) || 0;
        const insumos = parseFloat(document.getElementById('insumos').value) || 0;
        const infraestrutura = parseFloat(document.getElementById('infraestrutura').value) || 0;

        // Executa as operações matemáticas de receita, despesa e saldo líquido
        const faturamentoBruto = vendas + outrasReceitas;
        const custosTotais = insumos + infraestrutura;
        const rendaLiquida = faturamentoBruto - custosTotais;

        // Renderiza e formata os dados no formato de moeda Real (R$)
        document.getElementById('resBruto').innerText = faturamentoBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('resCustos').innerText = custosTotais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        const elementoLiquido = document.getElementById('resLiquido');
        elementoLiquido.innerText = rendaLiquida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Validação e exibição de dicas financeiras com base no resultado encontrado
        const mensagemDica = document.getElementById('mensagemDica');
        
        if (rendaLiquida > 0) {
            elementoLiquido.style.color = "#2e7d32";
            mensagemDica.innerHTML = "🌱 <strong>Ótimo trabalho!</strong> Sua produção deu lucro este mês. Considere guardar uma parte deste valor para criar uma reserva de emergência para as entressafras.";
        } else if (rendaLiquida === 0) {
            elementoLiquido.style.color = "#ff8f00";
            mensagemDica.innerHTML = "⚠️ <strong>Atenção!</strong> Suas receitas foram iguais aos seus custos. Avalie formas de reduzir os insumos ou buscar canais de venda direta (como feiras livres) para aumentar sua margem.";
        } else {
            elementoLiquido.style.color = "#c62828";
            mensagemDica.innerHTML = "🚨 <strong>Alerta de Prejuízo!</strong> Seus custos superaram os ganhos. Tente mapear onde estão os maiores gastos ou verifique se houve perda anormal de produção (perdas climáticas ou pragas).";
        }

        // Altera a propriedade CSS para exibir o bloco de resultados na interface
        document.getElementById('resultado').style.display = 'block';
    });
});
