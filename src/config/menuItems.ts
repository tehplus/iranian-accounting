import { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'داشبورد',
    path: '/',
    icon: 'dashboard'
  },
  {
    id: 'persons',
    title: 'اشخاص',
    icon: 'persons',
    children: [
      { id: 'new-person', title: 'شخص جدید', path: '/persons/new' },
      { id: 'persons-list', title: 'اشخاص', path: '/persons/list' },
      { id: 'receive', title: 'دریافت', path: '/persons/receive' },
      { id: 'receive-list', title: 'لیست دریافت‌ها', path: '/persons/receive-list' },
      { id: 'payment', title: 'پرداخت', path: '/persons/payment' },
      { id: 'payment-list', title: 'لیست پرداخت‌ها', path: '/persons/payment-list' },
      { id: 'shareholders', title: 'سهامداران', path: '/persons/shareholders' },
      { id: 'vendors', title: 'فروشندگان', path: '/persons/vendors' }
    ]
  },
  {
    id: 'products',
    title: 'کالاها و خدمات',
    icon: 'products',
    children: [
      { id: 'new-product', title: 'کالای جدید', path: '/products/new' },
      { id: 'new-service', title: 'خدمات جدید', path: '/products/new-service' },
      { id: 'products-list', title: 'کالاها و خدمات', path: '/products/list' },
      { id: 'price-update', title: 'به روز رسانی لیست قیمت', path: '/products/price-update' },
      { id: 'barcode-print', title: 'چاپ بارکد', path: '/products/barcode-print' },
      { id: 'barcode-bulk', title: 'چاپ بارکد تعدادی', path: '/products/barcode-bulk' },
      { id: 'price-list', title: 'صفحه لیست قیمت کالا', path: '/products/price-list' }
    ]
  },
  {
    id: 'banking',
    title: 'بانکداری',
    icon: 'banking',
    children: [
      { id: 'banks', title: 'بانک‌ها', path: '/banking/banks' },
      { id: 'funds', title: 'صندوق‌ها', path: '/banking/funds' },
      { id: 'petty-cash', title: 'تنخواه‌گردان‌ها', path: '/banking/petty-cash' },
      { id: 'transfer', title: 'انتقال', path: '/banking/transfer' },
      { id: 'transfer-list', title: 'لیست انتقال‌ها', path: '/banking/transfer-list' },
      { id: 'received-checks', title: 'لیست چک‌های دریافتی', path: '/banking/received-checks' },
      { id: 'paid-checks', title: 'لیست چک‌های پرداختی', path: '/banking/paid-checks' }
    ]
  },
  // ادامه منوها در پایین
  {
    id: 'sales',
    title: 'فروش و درآمد',
    icon: 'sales',
    children: [
      { id: 'new-sale', title: 'فروش جدید', path: '/sales/new' },
      { id: 'quick-invoice', title: 'فاکتور سریع', path: '/sales/quick' },
      { id: 'sale-return', title: 'برگشت از فروش', path: '/sales/return' },
      { id: 'sale-invoices', title: 'فاکتورهای فروش', path: '/sales/invoices' },
      { id: 'sale-return-invoices', title: 'فاکتورهای برگشت از فروش', path: '/sales/return-invoices' },
      { id: 'income', title: 'درآمد', path: '/sales/income' },
      { id: 'income-list', title: 'لیست درآمدها', path: '/sales/income-list' },
      { id: 'installment-contract', title: 'قرارداد فروش اقساطی', path: '/sales/installment-contract' },
      { id: 'installment-list', title: 'لیست فروش اقساطی', path: '/sales/installment-list' },
      { id: 'discounted-items', title: 'اقلام تخفیف دار', path: '/sales/discounted-items' }
    ]
  },
  {
    id: 'purchases',
    title: 'خرید و هزینه',
    icon: 'purchases',
    children: [
      { id: 'new-purchase', title: 'خرید جدید', path: '/purchases/new' },
      { id: 'purchase-return', title: 'برگشت از خرید', path: '/purchases/return' },
      { id: 'purchase-invoices', title: 'فاکتورهای خرید', path: '/purchases/invoices' },
      { id: 'purchase-return-invoices', title: 'فاکتورهای برگشت از خرید', path: '/purchases/return-invoices' },
      { id: 'expense', title: 'هزینه', path: '/purchases/expense' },
      { id: 'expense-list', title: 'لیست هزینه‌ها', path: '/purchases/expense-list' },
      { id: 'waste', title: 'ضایعات', path: '/purchases/waste' },
      { id: 'waste-list', title: 'لیست ضایعات', path: '/purchases/waste-list' }
    ]
  },
  {
    id: 'warehouse',
    title: 'انبارداری',
    icon: 'warehouse',
    children: [
      { id: 'warehouses', title: 'انبارها', path: '/warehouse/list' },
      { id: 'new-transfer', title: 'حواله جدید', path: '/warehouse/new-transfer' },
      { id: 'transfers', title: 'رسید و حواله‌های انبار', path: '/warehouse/transfers' },
      { id: 'inventory', title: 'موجودی کالا', path: '/warehouse/inventory' },
      { id: 'all-inventory', title: 'موجودی تمامی انبارها', path: '/warehouse/all-inventory' },
      { id: 'stocktaking', title: 'انبارگردانی', path: '/warehouse/stocktaking' }
    ]
  },
  {
    id: 'accounting',
    title: 'حسابداری',
    icon: 'accounting',
    children: [
      { id: 'new-voucher', title: 'سند جدید', path: '/accounting/new-voucher' },
      { id: 'voucher-list', title: 'لیست اسناد', path: '/accounting/voucher-list' },
      { id: 'opening-balance', title: 'تراز افتتاحیه', path: '/accounting/opening-balance' },
      { id: 'close-fiscal-year', title: 'بستن سال مالی', path: '/accounting/close-fiscal-year' },
      { id: 'chart-accounts', title: 'جدول حساب‌ها', path: '/accounting/chart-accounts' },
      { id: 'merge-documents', title: 'تجمیع اسناد', path: '/accounting/merge-documents' }
    ]
  },
  {
    id: 'other',
    title: 'سایر',
    icon: 'other',
    children: [
      { id: 'archive', title: 'آرشیو', path: '/other/archive' },
      { id: 'sms-panel', title: 'پنل پیامک', path: '/other/sms-panel' },
      { id: 'inquiry', title: 'استعلام', path: '/other/inquiry' },
      { id: 'other-receive', title: 'دریافت سایر', path: '/other/receive' },
      { id: 'other-receive-list', title: 'لیست دریافت‌ها', path: '/other/receive-list' },
      { id: 'other-payment', title: 'پرداخت سایر', path: '/other/payment' },
      { id: 'other-payment-list', title: 'لیست پرداخت‌ها', path: '/other/payment-list' },
      { id: 'currency-rate', title: 'سند تسعیر ارز', path: '/other/currency-rate' },
      { id: 'person-balance', title: 'سند توازن اشخاص', path: '/other/person-balance' },
      { id: 'product-balance', title: 'سند توازن کالاها', path: '/other/product-balance' },
      { id: 'salary-document', title: 'سند حقوق', path: '/other/salary-document' }
    ]
  },
  {
    id: 'reports',
    title: 'گزارش‌ها',
    icon: 'reports',
    children: [
      { id: 'all-reports', title: 'تمام گزارش‌ها', path: '/reports/all' },
      { id: 'balance-sheet', title: 'ترازنامه', path: '/reports/balance-sheet' },
      { id: 'debtors-creditors', title: 'بدهکاران و بستانکاران', path: '/reports/debtors-creditors' },
      { id: 'person-account', title: 'کارت حساب اشخاص', path: '/reports/person-account' },
      { id: 'product-account', title: 'کارت حساب کالا', path: '/reports/product-account' },
      { id: 'sales-by-product', title: 'فروش به تفکیک کالا', path: '/reports/sales-by-product' },
      { id: 'project-card', title: 'کارت پروژه', path: '/reports/project-card' }
    ]
  },
  {
    id: 'settings',
    title: 'تنظیمات',
    icon: 'settings',
    children: [
      { id: 'projects', title: 'پروژه‌ها', path: '/settings/projects' },
      { id: 'business-info', title: 'اطلاعات کسب و کار', path: '/settings/business-info' },
      { id: 'financial-settings', title: 'تنظیمات مالی', path: '/settings/financial' },
      { id: 'currency-rates', title: 'جدول تبدیل نرخ ارز', path: '/settings/currency-rates' },
      { id: 'user-management', title: 'مدیریت کاربران', path: '/settings/users' },
      { id: 'print-settings', title: 'تنظیمات چاپ', path: '/settings/print' },
      { id: 'form-builder', title: 'فرم ساز', path: '/settings/form-builder' },
      { id: 'notifications', title: 'اعلانات', path: '/settings/notifications' }
    ]
  }
];