import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../../database.db');

const db = new Database(dbPath, { verbose: console.log });

// اجرای اولیه مایگریشن‌ها
const initDb = () => {
  const migration = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name='persons'
  `).get();

  if (!migration) {
    const sql = await fs.readFile(
      path.join(__dirname, 'migrations/001_init.sql'),
      'utf-8'
    );
    db.exec(sql);
  }
};

// تعریف تایپ‌ها
export interface Person {
  id?: number;
  code: string;
  name: string;
  email?: string;
  website?: string;
  description?: string;
  creditLimit: number;
  isActive: boolean;
  category?: string;
  balance: number;
  taxType?: string;
  priceList?: string;
  branchCode?: string;
  birthDate?: string;
  marriageDate?: string;
  membershipDate?: string;
  avatarPath?: string;
  openingDebit: number;
  openingCredit: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PersonType {
  id?: number;
  personId: number;
  typeName: string;
}

export interface PersonContact {
  id?: number;
  personId: number;
  phoneNumber: string;
  phoneType: string;
}

export interface PersonBankAccount {
  id?: number;
  personId: number;
  accountNumber: string;
  bankName?: string;
  sheba?: string;
  isDefault: boolean;
}

// تعریف کوئری‌های پایه
const queries = {
  insertPerson: db.prepare(`
    INSERT INTO persons (
      code, name, email, website, description, credit_limit,
      is_active, category, balance, tax_type, price_list,
      branch_code, birth_date, marriage_date, membership_date,
      avatar_path, opening_debit, opening_credit
    ) VALUES (
      @code, @name, @email, @website, @description, @creditLimit,
      @isActive, @category, @balance, @taxType, @priceList,
      @branchCode, @birthDate, @marriageDate, @membershipDate,
      @avatarPath, @openingDebit, @openingCredit
    )
  `),

  insertPersonType: db.prepare(`
    INSERT INTO person_types (person_id, type_name)
    VALUES (@personId, @typeName)
  `),

  insertPersonContact: db.prepare(`
    INSERT INTO person_contacts (person_id, phone_number, phone_type)
    VALUES (@personId, @phoneNumber, @phoneType)
  `),

  insertPersonBankAccount: db.prepare(`
    INSERT INTO person_bank_accounts (
      person_id, account_number, bank_name, sheba, is_default
    ) VALUES (
      @personId, @accountNumber, @bankName, @sheba, @isDefault
    )
  `),

  getAllPersons: db.prepare(`
    SELECT * FROM persons ORDER BY created_at DESC
  `),

  getPersonById: db.prepare(`
    SELECT * FROM persons WHERE id = ?
  `),

  getPersonTypes: db.prepare(`
    SELECT * FROM person_types WHERE person_id = ?
  `),

  getPersonContacts: db.prepare(`
    SELECT * FROM person_contacts WHERE person_id = ?
  `),

  getPersonBankAccounts: db.prepare(`
    SELECT * FROM person_bank_accounts WHERE person_id = ?
  `),

  updatePerson: db.prepare(`
    UPDATE persons SET
      name = @name,
      email = @email,
      website = @website,
      description = @description,
      credit_limit = @creditLimit,
      is_active = @isActive,
      category = @category,
      tax_type = @taxType,
      price_list = @priceList,
      branch_code = @branchCode,
      birth_date = @birthDate,
      marriage_date = @marriageDate,
      membership_date = @membershipDate,
      avatar_path = @avatarPath,
      opening_debit = @openingDebit,
      opening_credit = @openingCredit,
      updated_at = datetime('now')
    WHERE id = @id
  `),

  deletePerson: db.prepare(`
    DELETE FROM persons WHERE id = ?
  `)
};

// صادر کردن توابع مورد نیاز
export const db = {
  init: initDb,
  ...queries,
  getInstance: () => db
};

export default db;