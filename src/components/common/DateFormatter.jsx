import React from 'react';

const DateFormatter = ({ date }) => {
  
  const formatDate = (inputDate) => {
    try {
      
      const isValidDate = !isNaN(new Date(inputDate).getTime());
      if (!isValidDate) {
        return 'Data inválida';
      }

      
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
