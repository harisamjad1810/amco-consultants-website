// English copy. `ur.ts` must match this shape exactly — the `Dictionary`
// type below is what makes a missing Urdu string a build error rather than a
// blank space on the page.

const en = {
  meta: {
    title: 'AMCO Consultants — Chartered Accountants & AMCO ERP',
    description:
      'AMCO Consultants is a firm of Chartered Accountants and the team behind AMCO ERP — accounting-perfect business software for Pakistani companies.'
  },
  nav: {
    home: 'Home',
    product: 'AMCO ERP',
    why: 'Why AMCO',
    team: 'Our team',
    demo: 'Free demo',
    language: 'Language',
    tryErp: 'Sign in',
    menu: 'Menu',
    close: 'Close'
  },
  languageDialog: {
    eyebrow: 'Welcome',
    title: 'Choose your language',
    remember: 'We will remember your choice on this device.'
  },
  hero: {
    eyebrow: 'Chartered Accountants · Software',
    titleLead: 'Accounting expertise,',
    titleAccent: 'built into software.',
    body: 'AMCO ERP is business software designed under the supervision of Chartered Accountants — so your ledgers, tax returns and financial statements are right from the very first entry.',
    primaryCta: 'Explore AMCO ERP',
    secondaryCta: 'Request a free demo',
    stats: [
      { value: '18', label: 'Modules' },
      { value: 'CA', label: 'Supervised design' },
      { value: '5', label: 'Tax authorities' }
    ],
    preview: {
      title: 'Trial balance',
      period: 'October',
      balanced: 'Balanced',
      debit: 'Debit',
      credit: 'Credit',
      sales: 'Sales this month',
      invoice: 'Sales tax invoice',
      accepted: 'Accepted by FBR'
    }
  },
  erp: {
    eyebrow: 'Our product',
    title: 'One system for your whole business',
    body: 'Built for retail, wholesale, distribution and manufacturing in Pakistan — from the first purchase to the signed financial statements.',
    cta: 'Open AMCO ERP',
    features: [
      { title: 'Accountant-designed books', body: 'Every posting rule was set and checked by Chartered Accountants, so the ledger, trial balance and statements always agree.' },
      { title: 'FBR, PRA, KPRA, BRA & SRB', body: 'File sales tax invoices with FBR Digital Invoicing and PRA e-IMS straight from the invoice, with the QR code on the print. KPRA and BRA declarations are built in, and SRB is on the way.' },
      { title: 'Statements, ready to sign', body: 'Balance sheet, profit and loss, cash flow and agings — produced from your own transactions, in real time.' },
      { title: 'Stock & costing', body: 'Weighted average or FIFO, warehouses, purchase and sale returns — every movement valued and posted.' },
      { title: 'Roles & approvals', body: 'Give each person exactly the screens they need, and approve documents before they reach the ledger.' }
    ],
    visual: {
      invoice: 'Sales tax invoice',
      accepted: 'Accepted by FBR',
      debit: 'Debit',
      credit: 'Credit',
      balanced: 'Balanced',
      ledger: ['Sales', 'Purchases', 'Cash in hand', 'Sales tax'],
      statements: ['Balance sheet', 'Profit & loss', 'Cash flow'],
      netProfit: 'Net profit',
      fifo: 'FIFO',
      average: 'Weighted average',
      layers: 'Cost layers',
      approved: 'Approved',
      awaiting: 'Awaiting approval',
      roles: ['Accountant', 'Store keeper', 'Manager'],
      ctaTitle: 'Every module, in detail',
      ctaBody: 'Real screens, a guided tour and videos of AMCO ERP at work.'
    }
  },
  tax: {
    eyebrow: 'Tax integration',
    title: 'Federal and provincial tax, in one place',
    body: 'Declare sales tax to the right authority from the invoice you already made — no second entry, no copying figures into a portal.',
    status: {
      live: 'Live filing',
      declarations: 'Declarations',
      soon: 'Coming soon'
    },
    authorities: [
      { code: 'FBR', name: 'Federal Board of Revenue', note: 'Digital Invoicing', status: 'live' },
      { code: 'PRA', name: 'Punjab Revenue Authority', note: 'e-IMS', status: 'live' },
      { code: 'KPRA', name: 'Khyber Pakhtunkhwa Revenue Authority', note: 'Sales tax on services', status: 'declarations' },
      { code: 'BRA', name: 'Balochistan Revenue Authority', note: 'Sales tax on services', status: 'declarations' },
      { code: 'SRB', name: 'Sindh Revenue Board', note: 'Sales tax on services', status: 'soon' }
    ] as { code: string; name: string; note: string; status: 'live' | 'declarations' | 'soon' }[]
  },
  ca: {
    eyebrow: 'Why AMCO',
    title: 'Built by Chartered Accountants, not just programmers.',
    body: 'Every report, posting and tax rule in AMCO ERP was designed and reviewed by qualified accountants who do this work every day — that is why it is so mature, and why the numbers add up.',
    points: ['Posting rules reviewed by CAs', 'Pakistani tax law built in', 'Audit-ready records']
  },
  team: {
    eyebrow: 'Our team',
    title: 'The people behind AMCO',
    body: 'Chartered Accountants and software specialists who build AMCO ERP — and who will be the ones answering when you call.'
  },
  demo: {
    eyebrow: 'Free demo',
    title: 'See AMCO ERP working on your own business',
    body: 'Leave your details and our team will reach you on WhatsApp or by email to arrange a free, personal demo — on a live company, with real documents.',
    points: ['A walk-through with our accountants', 'Your questions answered on a live system', 'No cost, no commitment'],
    form: {
      companyName: 'Company name',
      contactName: 'Your name',
      whatsapp: 'WhatsApp number',
      email: 'Email address',
      message: 'Anything you would like us to know?',
      optional: 'optional',
      companyPlaceholder: 'e.g. Al-Noor Traders',
      contactPlaceholder: 'e.g. Ali Raza',
      whatsappPlaceholder: '03XX XXXXXXX',
      emailPlaceholder: 'you@company.com',
      messagePlaceholder: 'Your business, how many users, what you use today…',
      submit: 'Request my free demo',
      sending: 'Sending…',
      privacy: 'We use these details only to arrange your demo.'
    },
    errors: {
      companyName: 'Please enter your company name.',
      whatsapp: 'Please enter a valid WhatsApp number.',
      email: 'Please enter a valid email address.',
      rateLimited: 'You have sent several requests already — we will be in touch soon.',
      network: 'We could not send your request. Please check your connection and try again.'
    },
    thanks: {
      title: 'Thank you!',
      body: 'We have received your request. Our team will reach you soon for your free demo.',
      again: 'Send another request'
    }
  },
  demoPage: {
    meta: {
      title: 'Request a free demo of AMCO ERP — AMCO Consultants',
      description: 'Book a free, personal demo of AMCO ERP. Our Chartered Accountants walk you through sales, stock, accounts and FBR / PRA filing on a live company.'
    },
    eyebrow: 'Free demo · no commitment',
    title: 'See AMCO ERP on your own business',
    body: 'Tell us a little about your business — it takes under a minute. Our team will set up a personal demo on a live company and walk you through it.',
    formTitle: 'Request your free demo',
    formBody: 'We reply within one working day.',
    stepsEyebrow: 'How it works',
    stepsTitle: 'What happens next',
    steps: [
      { title: 'Send your details', body: 'Your company name and a WhatsApp number or email are all we need.' },
      { title: 'We get in touch', body: 'Our team contacts you on WhatsApp or by email to agree a time that suits you.' },
      { title: 'A live, personal demo', body: 'We walk you through AMCO ERP on a live company — sales, stock, accounts and tax filing — and answer every question.' }
    ],
    note: 'Every posting rule in AMCO ERP is designed and reviewed by Chartered Accountants — ask us anything about your books.'
  },
  product: {
    meta: {
      title: 'AMCO ERP — accounting-perfect business software for Pakistan',
      description: 'A detailed tour of AMCO ERP: sales, purchases, inventory, costing, accounts, financial statements and FBR / PRA tax integration — with real screens.'
    },
    hero: {
      eyebrow: 'AMCO ERP',
      title: 'Every part of your business, in one accountant-designed system',
      body: 'Sales, purchases, stock, costing, payments, the general ledger, financial statements and tax filing — connected, so every document posts itself correctly and every report agrees.',
      primaryCta: 'Request a free demo',
      secondaryCta: 'Sign in',
      stats: [
        { value: '18', label: 'Modules' },
        { value: '80+', label: 'Screens' },
        { value: '5', label: 'Tax authorities' },
        { value: 'FIFO', label: 'or weighted average' }
      ]
    },
    modules: {
      eyebrow: 'What is inside',
      title: 'Eighteen modules that talk to each other',
      body: 'Every company gets exactly the modules it needs. Whatever is switched on posts to the same ledger.',
      items: [
        { title: 'Dashboard', body: 'Cash, receivables, payables, revenue and stock alerts at a glance — arranged the way you like.' },
        { title: 'Sales', body: 'Sale invoices, a retail till, dispatch notes, returns and customer receipts.' },
        { title: 'Purchases', body: 'Purchase orders, goods receipts, supplier invoices, returns and payments.' },
        { title: 'Inventory', body: 'Products, services, categories, warehouses and floors, HS codes and taxes.' },
        { title: 'Costing', body: 'Costing sheets that consume raw material and produce finished goods.' },
        { title: 'Accounts', body: 'Journal vouchers, ledgers, the cash book, trial balance and approvals.' },
        { title: 'Chart of Accounts', body: 'A full chart, created for you and kept in step with every customer and supplier.' },
        { title: 'Reports', body: 'Balance sheet, profit and loss, cash flow, equity, agings and sales reports.' },
        { title: 'Tax Integration', body: 'FBR, PRA, KPRA and BRA declarations from your own invoices.' },
        { title: 'People', body: 'Customers, suppliers and salesmen with opening balances and documents.' },
        { title: 'Users & Roles', body: 'Invite your team and give each person exactly the screens they need.' },
        { title: 'Settings', body: 'Your branding, invoice formats, number series, financial year and more.' }
      ]
    },
    tour: {
      eyebrow: 'Take the tour',
      title: 'Real screens, explained',
      fullSize: 'View full size',
      body: 'These are actual AMCO ERP screens. The numbered markers point out the parts that matter — hover or tap a point to find it on the screen.',
      screens: [
        {
          id: 'dashboard',
          tag: 'Home',
          title: 'A dashboard that answers the first question of the day',
          body: 'Cash in hand and at the bank, what customers owe, what you owe, and how this month compares — the moment you sign in.',
          marks: [
            { key: 'period', text: 'Switch the period — this month, quarter, year or your own dates.' },
            { key: 'layout', text: 'Arrange the cards your way; each user keeps their own layout.' },
            { key: 'kpi', text: 'Headline figures with a small trend line underneath.' },
            { key: 'trend', text: 'Twelve months of revenue against the year before.' },
            { key: 'aging', text: 'How old your receivables are — and how much is overdue.' }
          ]
        },
        {
          id: 'sale-invoices',
          tag: 'Sales',
          title: 'Every sale invoice, its payment and its status',
          body: 'One list shows what is posted, approved, paid, part-paid or still waiting — with the balance due beside each invoice.',
          marks: [
            { key: 'create', text: 'Raise a new sale invoice.' },
            { key: 'bulk', text: 'Approve or post many invoices at once.' },
            { key: 'status', text: 'Approval and payment status on every row.' },
            { key: 'balance', text: 'Exactly what is still owed on each invoice.' },
            { key: 'export', text: 'Export to Excel, print, or import invoices from a spreadsheet.' }
          ]
        },
        {
          id: 'invoice-form',
          tag: 'Sales',
          title: 'An invoice form that thinks like an accountant',
          body: 'Choose the customer and the rest follows: payment terms, due date, warehouse, taxes. Stock, cost of sales and the ledger are posted for you.',
          marks: [
            { key: 'customer', text: 'Pick the customer — address and terms fill in by themselves.' },
            { key: 'dates', text: 'Invoice date, due date and the month the invoice bills for.' },
            { key: 'items', text: 'Items with live stock, purchase price, discount and tax.' },
            { key: 'draft', text: 'Save a draft and start the next one in a single click.' },
            { key: 'post', text: 'Post it: stock, cost of sales and the ledger are written together.' }
          ]
        },
        {
          id: 'till',
          tag: 'Retail',
          title: 'A fast till for the shop counter',
          body: 'Tap products to fill the basket, take payment and print a thermal receipt. Every till sale is a proper invoice in your books.',
          marks: [
            { key: 'warehouse', text: 'One tab per warehouse — sell from where the goods are.' },
            { key: 'stock', text: 'Stock left on every product, counting down as you sell.' },
            { key: 'walkin', text: 'Walk-in customer or a registered one.' },
            { key: 'paidby', text: 'Cash or the bank account that received the money.' },
            { key: 'total', text: 'Discount, tax and the grand total, worked out as you go.' }
          ]
        },
        {
          id: 'trial-balance',
          tag: 'Accounts',
          title: 'A trial balance that always balances',
          body: 'Opening, movement and closing for every account, in your own financial year — drill into any account to see the entries behind it.',
          marks: [
            { key: 'year', text: 'Your financial year, with closed years kept safe.' },
            { key: 'group', text: 'Each account shown under its group in the chart.' },
            { key: 'period', text: 'This period’s debits and credits.' },
            { key: 'closing', text: 'Closing balances, ready for the statements.' },
            { key: 'export', text: 'Excel and print in one click.' }
          ]
        },
        {
          id: 'balance-sheet',
          tag: 'Reports',
          title: 'Financial statements, ready to sign',
          body: 'A statement of financial position laid out the way an accountant presents it, with last year beside this year.',
          marks: [
            { key: 'statement', text: 'Titled and dated like a printed statement.' },
            { key: 'compare', text: 'Comparative figures for the previous year.' },
            { key: 'cashflow', text: 'Each line tagged for the cash flow statement.' },
            { key: 'group', text: 'Current and non-current, grouped as standards require.' },
            { key: 'export', text: 'Export or print the whole statement.' }
          ]
        },
        {
          id: 'tax-pra',
          tag: 'Tax',
          title: 'Sales tax filed straight from the invoice',
          body: 'Turn a sale invoice into a declaration, send it to the authority and keep its answer — fiscal number and QR code included.',
          marks: [
            { key: 'fromSale', text: 'Create the declaration from a sale invoice you already made.' },
            { key: 'credentials', text: 'Your own API credentials, stored encrypted.' },
            { key: 'accepted', text: 'The authority’s decision on every declaration.' },
            { key: 'response', text: 'The fiscal invoice number the authority issued.' },
            { key: 'pdf', text: 'Print the tax invoice with the authority’s QR code.' }
          ]
        },
        {
          id: 'cash-book',
          tag: 'Accounts',
          title: 'A cash book anyone can use',
          body: 'Money in or money out, cash or bank, which account, how much — and AMCO ERP writes the voucher and the ledger entry for you.',
          marks: [
            { key: 'direction', text: 'Receipt or payment.' },
            { key: 'through', text: 'Through cash or a bank account.' },
            { key: 'number', text: 'Voucher numbers issued automatically, per series.' },
            { key: 'attach', text: 'Attach the bill or bank slip.' },
            { key: 'approval', text: 'Approval before anything reaches the ledger.' }
          ]
        }
      ]
    },
    videos: {
      eyebrow: 'Watch',
      title: 'See it in motion',
      body: 'A three-minute tour of AMCO ERP at work.',
      soon: 'Video coming soon',
      placeholders: ['A quick tour of AMCO ERP', 'From sale invoice to tax filing', 'Month-end in minutes']
    }
  },
  footer: {
    tagline: 'Chartered Accountants and the team behind AMCO ERP.',
    rights: 'All rights reserved.',
    badge: 'Chartered Accountants · Software',
    ctaEyebrow: 'Free demo',
    ctaTitle: 'See AMCO ERP on your own books',
    ctaBody: 'A free, personal demo on a live company, with real documents — arranged on WhatsApp or by email.',
    ctaButton: 'Request a free demo',
    explore: 'Explore',
    productHeading: 'AMCO ERP',
    authoritiesHeading: 'Tax authorities',
    authoritiesNote: 'Sales tax declared from the invoice you already made.',
    links: {
      home: 'Home',
      why: 'Why AMCO',
      team: 'Our team',
      demo: 'Free demo',
      overview: 'Overview',
      modules: 'Modules',
      tour: 'Screen tour',
      videos: 'Videos',
      tax: 'Tax integration'
    },
    reviewed: 'Every posting rule designed and reviewed by Chartered Accountants.',
    backToTop: 'Back to top'
  }
}

export default en
export type Dictionary = typeof en
