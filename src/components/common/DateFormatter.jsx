import React from 'react';

const DateFormatter = ({ date }) => {
  // Função para formatar a data
  const formatDate = (inputDate) => {
    try {
      // Verifica se a data é válida
      const isValidDate = !isNaN(new Date(inputDate).getTime());
      if (!isValidDate) {
        return 'Data inválida';
      }

      // Formata a data no formato desejado (dd/mm/aaaa)
      const formattedDate = new Date(inputDate).toLocaleDateString('pt-BR');
      return formattedDate;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Erro ao formatar data';
    }
  };

  return <span>{formatDate(date)}</span>;
};

export default DateFormatter;
