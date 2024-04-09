import React from 'react';

const CurrencyFormatter = ({ value }) => {
  
  const formatCurrency = (amount) => {
    
    const formattedValue = parseFloat(amount).toFixed(2);

    
    if (isNaN(formattedValue)) {
      return 'R$ 0,00'; 
    }

    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(formattedValue);
  };

  return <span>{formatCurrency(value)}</span>;
};

export default CurrencyFormatter;
