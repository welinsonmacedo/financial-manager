import React from 'react';

const CurrencyFormatter = ({ value }) => {
  // Função para formatar o valor em moeda
  const formatCurrency = (amount) => {
    // Converte a string em um número e formata com duas casas decimais
    const formattedValue = parseFloat(amount).toFixed(2);

    // Verifica se o valor formatado é um número válido
    if (isNaN(formattedValue)) {
      return 'R$ 0,00'; // Retorna zero se o valor não for um número válido
    }

    // Formata o valor em moeda
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(formattedValue);
  };

  return <span>{formatCurrency(value)}</span>;
};

export default CurrencyFormatter;
