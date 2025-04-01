import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: start;
`;

const Avatar = styled.div<{ $bgColor?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor || '#6366f1'};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'AnjomanMax';
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  font-family: 'AnjomanMax';
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
`;

const Detail = styled.div`
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  color: #64748b;
  
  span {
    color: #1e293b;
    margin-right: 0.25rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: #6366f1;
          color: #ffffff;
          &:hover {
            background-color: #4f46e5;
          }
        `;
      case 'danger':
        return `
          background-color: #f43f5e;
          color: #ffffff;
          &:hover {
            background-color: #e11d48;
          }
        `;
      default:
        return `
          background-color: #f1f5f9;
          color: #1e293b;
          &:hover {
            background-color: #e2e8f0;
          }
        `;
    }
  }}
`;

export interface PersonCardProps {
  id: string;
  name: string;
  code: string;
  type: 'customer' | 'supplier' | 'employee';
  phone?: string;
  mobile?: string;
  email?: string;
  nationalCode?: string;
  economicCode?: string;
  registerNumber?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  id,
  name,
  code,
  type,
  phone,
  mobile,
  email,
  nationalCode,
  economicCode,
  registerNumber,
  onEdit,
  onDelete,
  onView
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'customer':
        return '#6366f1';
      case 'supplier':
        return '#10b981';
      case 'employee':
        return '#f59e0b';
      default:
        return '#6366f1';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'customer':
        return 'مشتری';
      case 'supplier':
        return 'تأمین‌کننده';
      case 'employee':
        return 'کارمند';
      default:
        return 'نامشخص';
    }
  };

  return (
    <Card>
      <Avatar $bgColor={getTypeColor(type)}>
        {getInitials(name)}
      </Avatar>
      <Info>
        <Name>{name}</Name>
        <Details>
          <Detail>
            کد: <span>{code}</span>
          </Detail>
          <Detail>
            نوع: <span>{getTypeLabel(type)}</span>
          </Detail>
          {phone && (
            <Detail>
              تلفن: <span>{phone}</span>
            </Detail>
          )}
          {mobile && (
            <Detail>
              موبایل: <span>{mobile}</span>
            </Detail>
          )}
          {email && (
            <Detail>
              ایمیل: <span dir="ltr">{email}</span>
            </Detail>
          )}
          {nationalCode && (
            <Detail>
              کد ملی: <span>{nationalCode}</span>
            </Detail>
          )}
          {economicCode && (
            <Detail>
              کد اقتصادی: <span>{economicCode}</span>
            </Detail>
          )}
          {registerNumber && (
            <Detail>
              شماره ثبت: <span>{registerNumber}</span>
            </Detail>
          )}
        </Details>
        <Actions>
          {onView && (
            <ActionButton onClick={() => onView(id)}>
              مشاهده
            </ActionButton>
          )}
          {onEdit && (
            <ActionButton $variant="primary" onClick={() => onEdit(id)}>
              ویرایش
            </ActionButton>
          )}
          {onDelete && (
            <ActionButton $variant="danger" onClick={() => onDelete(id)}>
              حذف
            </ActionButton>
          )}
        </Actions>
      </Info>
    </Card>
  );
};

export default PersonCard;