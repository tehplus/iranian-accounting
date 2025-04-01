import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import db, { Person } from '../../utils/Database';

const ListContainer = styled.div`
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 2rem;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #1e293b;
  font-weight: 600;
`;

const AddButton = styled(Link)`
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #4f46e5;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: right;
  padding: 1rem;
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 2px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #1e293b;
  font-size: 0.875rem;
`;

const StatusBadge = styled.span<{ $active?: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.$active ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.$active ? '#166534' : '#991b1b'};
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: none;
  color: #6366f1;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #4f46e5;
  }

  &:disabled {
    color: #cbd5e1;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#6366f1' : '#e2e8f0'};
  background: ${props => props.$active ? '#6366f1' : 'white'};
  color: ${props => props.$active ? 'white' : '#1e293b'};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #6366f1;
  }

  &:disabled {
    background: #f1f5f9;
    border-color: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const formatNumber = (number: number) => {
  return new Intl.NumberFormat('fa-IR').format(number);
};

const PersonsList: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadPersons();
  }, []);

const loadPersons = async () => {
    try {
      await db.init();
      const data = await db.getAllPersons();
      console.log('Loaded persons:', data); // برای دیباگ
      setPersons(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading persons:', error);
      toast.error('خطا در بارگذاری اطلاعات');
      setLoading(false);
    }
  };


  const handleDelete = async (id: number) => {
    if (window.confirm('آیا از حذف این شخص اطمینان دارید؟')) {
      try {
        await db.deletePerson(id);
        toast.success('شخص با موفقیت حذف شد');
        loadPersons();
      } catch (error) {
        console.error('Error deleting person:', error);
        toast.error('خطا در حذف شخص');
      }
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPersons.length / itemsPerPage);
  const paginatedPersons = filteredPersons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <ListContainer>
      <ListHeader>
        <Title>لیست اشخاص</Title>
        <AddButton to="/persons/new">افزودن شخص جدید</AddButton>
      </ListHeader>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="جستجو بر اساس نام، کد یا ایمیل..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {paginatedPersons.length > 0 ? (
        <>
          <Table>
            <thead>
              <tr>
                <Th>کد</Th>
                <Th>نام</Th>
                <Th>نوع</Th>
                <Th>ایمیل</Th>
                <Th>مانده حساب</Th>
                <Th>وضعیت</Th>
                <Th>تاریخ ثبت</Th>
                <Th>عملیات</Th>
              </tr>
            </thead>
            <tbody>
              {paginatedPersons.map(person => (
                <tr key={person.id}>
                  <Td>{person.code}</Td>
                  <Td>{person.name}</Td>
                  <Td>{person.types.join(' / ')}</Td>
                  <Td>{person.email}</Td>
                  <Td style={{ direction: 'ltr', textAlign: 'right' }}>
                    {formatNumber(person.balance)} ریال
                  </Td>
                  <Td>
                    <StatusBadge $active={person.isActive}>
                      {person.isActive ? 'فعال' : 'غیرفعال'}
                    </StatusBadge>
                  </Td>
                  <Td>{formatDate(person.createdAt)}</Td>
                  <Td>
                    <ActionButton
                      onClick={() => handleDelete(person.id!)}
                      title="حذف"
                    >
                      🗑️
                    </ActionButton>
                    <ActionButton
                      as={Link}
                      to={`/persons/edit/${person.id}`}
                      title="ویرایش"
                    >
                      ✏️
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PageButton
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              ‹‹
            </PageButton>
            <PageButton
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ‹
            </PageButton>
            
            {[...Array(pageCount)].map((_, i) => (
              <PageButton
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                $active={currentPage === i + 1}
              >
                {i + 1}
              </PageButton>
            ))}

            <PageButton
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              ›
            </PageButton>
            <PageButton
              onClick={() => setCurrentPage(pageCount)}
              disabled={currentPage === pageCount}
            >
              ››
            </PageButton>
          </Pagination>
        </>
      ) : (
        <EmptyState>
          هیچ شخصی یافت نشد.
        </EmptyState>
      )}
    </ListContainer>
  );
};

export default PersonsList;