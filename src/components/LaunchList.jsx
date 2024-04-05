import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #30b94e;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;
const SectionTitle = styled.p`
  margin-top: 20px;
  font-size: 1.5em;
`;
const LaunchList = ({ launches }) => {
  const [filteredLaunches, setFilteredLaunches] = useState(launches);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFilter = () => {
    let filtered = launches;
    if (selectedType) {
      filtered = filtered.filter(launch => launch.type === selectedType);
    }
    if (selectedCategory) {
      filtered = filtered.filter(launch => launch.category === selectedCategory);
    }
    setFilteredLaunches(filtered);
  };

  const handleChangeType = (e) => {
    setSelectedType(e.target.value);
    handleFilter();
  };

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
    handleFilter();
  };

  return (
    <Container>
      <SectionTitle>Lançamentos</SectionTitle>
      <div>
        <Label htmlFor="type">Tipo:</Label>
        <Select id="type" value={selectedType} onChange={handleChangeType}>
          <option value="">Todos</option>
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="category">Categoria:</Label>
        <Select id="category" value={selectedCategory} onChange={handleChangeCategory}>
          <option value="">Todas</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Transporte">Transporte</option>
          {/* Adicione mais opções de categoria conforme necessário */}
        </Select>
      </div>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {filteredLaunches.map((launch, index) => (
            <TableRow key={index}>
              <TableCell>{launch.type}</TableCell>
              <TableCell>{launch.category}</TableCell>
              <TableCell>{launch.amount}</TableCell>
              <TableCell>{launch.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default LaunchList;
