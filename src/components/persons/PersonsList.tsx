import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PersonCard from './common/PersonCard';

const ListContainer = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: 'AnjomanMax';
  font-size: 1.5rem;
  color: ${props => props.theme.colors.gray[800]};
`;

const AddButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const FilterSection = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadows.base};
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: 0.375rem;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: 0.375rem;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const PersonsGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

interface Person {
  id: string;
  type: 'customer' | 'supplier' | 'employee';
  code: string;
  name: string;
  phone?: string;
  mobile?: string;
  email?: string;
  nationalCode?: string;
  economicCode?: string;
  registerNumber?: string;
}

// داده‌های نمونه برای تست
const samplePersons: Person[] = [
  {
    id: '1',
    type: 'customer',
    code: 'C001',
    name: 'شرکت نمونه',
    phone: '021-88888888',
    mobile: '0912-1234567',
    email: 'info@sample.com',
    economicCode: '123456789',
    registerNumber: '987654'
  },
  {
    id: '2',
    type: 'supplier',
    code: 'S001',
    name: 'تولیدی مثال',
    phone: '021-77777777',
    mobile: '0912-7654321',
    email: 'info@example.com',
    economicCode: '987654321',
    registerNumber: '123456'
  },
  // می‌توانید موارد بیشتری اضافه کنید
];

const PersonsList: React.FC = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<Person[]>(samplePersons);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(event.target.value);
  };

  const handleEdit = (id: string) => {
    navigate(`/persons/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('آیا از حذف این شخص اطمینان دارید؟')) {
      setPersons(prev => prev.filter(person => person.id !== id));
    }
  };

  const handleView = (id: string) => {
    navigate(`/persons/${id}`);
  };

  const filteredPersons = persons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? person.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  return (
    <ListContainer>
      <Header>
        <Title>لیست اشخاص</Title>
        <AddButton onClick={() => navigate('/persons/new')}>
          افزودن شخص جدید
        </AddButton>
      </Header>

      <FilterSection>
        <SearchInput
          type="text"
          placeholder="جستجو بر اساس نام یا کد..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FilterSelect value={typeFilter} onChange={handleTypeFilter}>
          <option value="">همه اشخاص</option>
          <option value="customer">مشتریان</option>
          <option value="supplier">تأمین‌کنندگان</option>
          <option value="employee">کارمندان</option>
        </FilterSelect>
      </FilterSection>

      <PersonsGrid>
        {filteredPersons.map(person => (
          <PersonCard
            key={person.id}
            {...person}
            onEdit={() => handleEdit(person.id)}
            onDelete={() => handleDelete(person.id)}
            onView={() => handleView(person.id)}
          />
        ))}
      </PersonsGrid>
    </ListContainer>
  );
};

export default PersonsList;