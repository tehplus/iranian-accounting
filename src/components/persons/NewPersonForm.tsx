import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from '../common/DatePicker';
import { DateObject } from 'react-multi-date-picker';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  padding: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
`;

const FormTitle = styled.h2`
  font-family: 'AnjomanMax';
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
  text-align: right;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-family: 'AnjomanMax';
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &[type="number"] {
    direction: ltr;
    text-align: right;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  color: #1e293b;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Checkbox = styled.input`
  margin-left: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  color: #1e293b;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const ImageUploadContainer = styled.div`
  width: 150px;
  height: 150px;
  border: 2px dashed #e2e8f0;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #6366f1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.$variant === 'primary' ? `
    background-color: #6366f1;
    color: #ffffff;
    &:hover {
      background-color: #4f46e5;
    }
  ` : `
    background-color: #f1f5f9;
    color: #1e293b;
    &:hover {
      background-color: #e2e8f0;
    }
  `}
`;

interface PersonFormData {
  types: string[];
  code: string;
  name: string;
  email: string;
  website: string;
  description: string;
  creditLimit: number;
  isActive: boolean;
  category: string;
  balance: number;
  bankAccount1: string;
  bankAccount2: string;
  bankAccount3: string;
  openingDebit: number;
  openingCredit: number;
  taxType: string;
  priceList: string;
  branchCode: string;
  birthDate: DateObject | null;
  marriageDate: DateObject | null;
  membershipDate: DateObject | null;
  phone1: string;
  phone2: string;
  phone3: string;
  avatar: File | null;
}

export const NewPersonForm: React.FC = () => {
  const [formData, setFormData] = useState<PersonFormData>({
    types: [],
    code: '',
    name: '',
    email: '',
    website: '',
    description: '',
    creditLimit: 0,
    isActive: true,
    category: '',
    balance: 0,
    bankAccount1: '',
    bankAccount2: '',
    bankAccount3: '',
    openingDebit: 0,
    openingCredit: 0,
    taxType: '',
    priceList: '',
    branchCode: '',
    birthDate: null,
    marriageDate: null,
    membershipDate: null,
    phone1: '',
    phone2: '',
    phone3: '',
    avatar: null
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('حجم تصویر نباید بیشتر از ۲ مگابایت باشد');
        return;
      }
      setFormData(prev => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, avatar: null }));
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: اینجا اطلاعات به سرور ارسال می‌شود
      console.log(formData);
      toast.success('اطلاعات با موفقیت ذخیره شد');
    } catch (error) {
      toast.error('خطا در ذخیره اطلاعات');
    }
  };

  return (
    <FormContainer>
      <FormTitle>افزودن شخص جدید</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>تصویر پروفایل</SectionTitle>
          <ImageUploadContainer onClick={() => fileInputRef.current?.click()}>
            {previewUrl ? (
              <>
                <img src={previewUrl} alt="تصویر پروفایل" />
                <RemoveImageButton type="button" onClick={handleRemoveImage}>
                  ×
                </RemoveImageButton>
              </>
            ) : (
              <span>انتخاب تصویر</span>
            )}
          </ImageUploadContainer>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </FormSection>

        <FormSection>
          <SectionTitle>نوع شخص</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>
                <Checkbox
                  type="checkbox"
                  checked={formData.types.includes('customer')}
                  onChange={() => handleTypeChange('customer')}
                />
                مشتری
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Checkbox
                  type="checkbox"
                  checked={formData.types.includes('supplier')}
                  onChange={() => handleTypeChange('supplier')}
                />
                تأمین کننده
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Checkbox
                  type="checkbox"
                  checked={formData.types.includes('employee')}
                  onChange={() => handleTypeChange('employee')}
                />
                کارمند
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Checkbox
                  type="checkbox"
                  checked={formData.types.includes('shareholder')}
                  onChange={() => handleTypeChange('shareholder')}
                />
                سهامدار
              </Label>
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>اطلاعات اصلی</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>کد</Label>
              <Input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="کد را وارد کنید"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>نام</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="نام کامل را وارد کنید"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>ایمیل</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ایمیل را وارد کنید"
              />
            </FormGroup>
            <FormGroup>
              <Label>وب‌سایت</Label>
              <Input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="آدرس وب‌سایت را وارد کنید"
              />
            </FormGroup>
            <FormGroup>
              <Label>دسته‌بندی</Label>
              <Select name="category" value={formData.category} onChange={handleChange}>
                <option value="">انتخاب کنید</option>
                <option value="A">دسته A</option>
                <option value="B">دسته B</option>
                <option value="C">دسته C</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>
                <Checkbox
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                فعال
              </Label>
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>اطلاعات مالی</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>اعتبار مالی (ریال)</Label>
              <Input
                type="number"
                name="creditLimit"
                value={formData.creditLimit}
                onChange={handleChange}
                placeholder="0"
              />
            </FormGroup>
            <FormGroup>
              <Label>تراز (ریال)</Label>
              <Input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                placeholder="0"
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label>تراز افتتاحیه - بدهکار (ریال)</Label>
              <Input
                type="number"
                name="openingDebit"
                value={formData.openingDebit}
                onChange={handleChange}
                placeholder="0"
              />
            </FormGroup>
            <FormGroup>
              <Label>تراز افتتاحیه - بستانکار (ریال)</Label>
              <Input
                type="number"
                name="openingCredit"
                value={formData.openingCredit}
                onChange={handleChange}
                placeholder="0"
              />
            </FormGroup>
            <FormGroup>
              <Label>نوع مالیات</Label>
              <Select name="taxType" value={formData.taxType} onChange={handleChange}>
                <option value="">انتخاب کنید</option>
                <option value="VAT">مالیات بر ارزش افزوده</option>
                <option value="NONE">معاف از مالیات</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>لیست قیمت</Label>
              <Select name="priceList" value={formData.priceList} onChange={handleChange}>
                <option value="">انتخاب کنید</option>
                <option value="A">لیست قیمت A</option>
                <option value="B">لیست قیمت B</option>
                <option value="C">لیست قیمت C</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>حساب‌های بانکی</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>حساب بانکی - ۱</Label>
              <Input
                type="text"
                name="bankAccount1"
                value={formData.bankAccount1}
                onChange={handleChange}
                placeholder="شماره حساب یا شماره شبا"
              />
            </FormGroup>
            <FormGroup>
              <Label>حساب بانکی - ۲</Label>
              <Input
                type="text"
                name="bankAccount2"
                value={formData.bankAccount2}
                onChange={handleChange}
                placeholder="شماره حساب یا شماره شبا"
              />
            </FormGroup>
            <FormGroup>
              <Label>حساب بانکی - ۳</Label>
              <Input
                type="text"
                name="bankAccount3"
                value={formData.bankAccount3}
                onChange={handleChange}
                placeholder="شماره حساب یا شماره شبا"
              />
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>اطلاعات تماس</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>تلفن ۱</Label>
              <Input
                type="tel"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                placeholder="شماره تلفن اول"
              />
            </FormGroup>
            <FormGroup>
              <Label>تلفن ۲</Label>
              <Input
                type="tel"
                name="phone2"
                value={formData.phone2}
                onChange={handleChange}
                placeholder="شماره تلفن دوم"
              />
            </FormGroup>
            <FormGroup>
              <Label>تلفن ۳</Label>
              <Input
                type="tel"
                name="phone3"
                value={formData.phone3}
                onChange={handleChange}
                placeholder="شماره تلفن سوم"
              />
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>تاریخ‌ها</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>تاریخ تولد</Label>
              <DatePicker
                value={formData.birthDate}
                onChange={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
                placeholder="تاریخ تولد را انتخاب کنید"
              />
            </FormGroup>
            <FormGroup>
              <Label>تاریخ ازدواج</Label>
              <DatePicker
                value={formData.marriageDate}
                onChange={(date) => setFormData(prev => ({ ...prev, marriageDate: date }))}
                placeholder="تاریخ ازدواج را انتخاب کنید"
              />
            </FormGroup>
            <FormGroup>
              <Label>تاریخ عضویت</Label>
              <DatePicker
                value={formData.membershipDate}
                onChange={(date) => setFormData(prev => ({ ...prev, membershipDate: date }))}
                placeholder="تاریخ عضویت را انتخاب کنید"
              />
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>توضیحات</SectionTitle>
          <FormGroup>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="توضیحات اضافی را وارد کنید"
            />
          </FormGroup>
        </FormSection>

        <ButtonGroup>
          <Button type="button">انصراف</Button>
          <Button type="submit" $variant="primary">
            ذخیره اطلاعات
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default NewPersonForm;