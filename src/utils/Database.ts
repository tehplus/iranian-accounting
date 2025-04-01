import Dexie, { Table } from 'dexie';

export interface Person {
  id?: number;
  code: string;
  name: string;
  types: string[];
  email?: string;
  website?: string;
  description?: string;
  creditLimit: number;
  isActive: boolean;
  category?: string;
  balance: number;
  bankAccounts: {
    accountNumber: string;
    bankName?: string;
    sheba?: string;
    isDefault: boolean;
  }[];
  phones: {
    number: string;
    type: string;
  }[];
  taxType?: string;
  priceList?: string;
  branchCode?: string;
  birthDate?: string;
  marriageDate?: string;
  membershipDate?: string;
  avatar?: string;
  openingDebit: number;
  openingCredit: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id?: number;
  code: string;
  name: string;
  category?: string;
  description?: string;
  unit: string;
  price: number;
  cost: number;
  minStock: number;
  maxStock: number;
  currentStock: number;
  isActive: boolean;
  barcode?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

class AccountingDatabase extends Dexie {
  persons!: Table<Person>;
  products!: Table<Product>;

  constructor() {
    super('IranianAccounting');
    
    this.version(1).stores({
      persons: '++id, code, name, *types, createdAt',
      products: '++id, code, name, category, barcode'
    });
  }

  async addPerson(person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    return await this.persons.add({
      ...person,
      createdAt: now,
      updatedAt: now
    });
  }

  async updatePerson(id: number, person: Partial<Person>) {
    return await this.persons.update(id, {
      ...person,
      updatedAt: new Date().toISOString()
    });
  }

  async deletePerson(id: number) {
    return await this.persons.delete(id);
  }

  async getAllPersons() {
    return await this.persons.toArray();
  }

  async getPersonById(id: number) {
    return await this.persons.get(id);
  }

  async searchPersons(query: string) {
    return await this.persons
      .filter(person => 
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.code.toLowerCase().includes(query.toLowerCase()) ||
        (person.email && person.email.toLowerCase().includes(query.toLowerCase()))
      )
      .toArray();
  }

  async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    return await this.products.add({
      ...product,
      createdAt: now,
      updatedAt: now
    });
  }

  async updateProduct(id: number, product: Partial<Product>) {
    return await this.products.update(id, {
      ...product,
      updatedAt: new Date().toISOString()
    });
  }

  async deleteProduct(id: number) {
    return await this.products.delete(id);
  }

  async getAllProducts() {
    return await this.products.toArray();
  }

  async getProductById(id: number) {
    return await this.products.get(id);
  }

  async searchProducts(query: string) {
    return await this.products
      .filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.code.toLowerCase().includes(query.toLowerCase()) ||
        (product.barcode && product.barcode.toLowerCase().includes(query.toLowerCase()))
      )
      .toArray();
  }
}

const db = new AccountingDatabase();

export default db;