// ⚠️ PLACEHOLDER TEAM. The names, roles and photos below are samples until the
// real ones arrive. To replace a person: put their photo in `public/team/`
// (a portrait, roughly 4:5, e.g. 800 × 1000 px .jpg or .webp), point `photo`
// at it, and change the name and role in BOTH languages. Add or remove
// entries freely — the section lays itself out for any number.

export type TeamMember = {
  photo: string
  name: { en: string; ur: string }
  role: { en: string; ur: string }
  credential?: string
}

export const TEAM: TeamMember[] = [
  {
    photo: '/team/member-1.svg',
    name: { en: 'Ahmed Khan', ur: 'احمد خان' },
    role: { en: 'Managing Partner', ur: 'منیجنگ پارٹنر' },
    credential: 'FCA'
  },
  {
    photo: '/team/member-2.svg',
    name: { en: 'Sara Malik', ur: 'سارہ ملک' },
    role: { en: 'Partner, Audit & Tax', ur: 'پارٹنر، آڈٹ اور ٹیکس' },
    credential: 'ACA'
  },
  {
    photo: '/team/member-3.svg',
    name: { en: 'Bilal Hussain', ur: 'بلال حسین' },
    role: { en: 'Head of AMCO ERP', ur: 'سربراہ، ایمکو ای آر پی' }
  },
  {
    photo: '/team/member-4.svg',
    name: { en: 'Ayesha Siddiqui', ur: 'عائشہ صدیقی' },
    role: { en: 'Implementation Lead', ur: 'امپلیمنٹیشن لیڈ' },
    credential: 'ACCA'
  },
  {
    photo: '/team/member-5.svg',
    name: { en: 'Usman Tariq', ur: 'عثمان طارق' },
    role: { en: 'Senior Tax Consultant', ur: 'سینئر ٹیکس کنسلٹنٹ' },
    credential: 'ACA'
  },
  {
    photo: '/team/member-6.svg',
    name: { en: 'Hina Javed', ur: 'حنا جاوید' },
    role: { en: 'Audit Manager', ur: 'آڈٹ منیجر' },
    credential: 'ACCA'
  },
  {
    photo: '/team/member-7.svg',
    name: { en: 'Faisal Raza', ur: 'فیصل رضا' },
    role: { en: 'Lead Software Engineer', ur: 'لیڈ سافٹ ویئر انجینئر' }
  },
  {
    photo: '/team/member-8.svg',
    name: { en: 'Maryam Aslam', ur: 'مریم اسلم' },
    role: { en: 'Customer Success Manager', ur: 'کسٹمر سکسیس منیجر' }
  }
]
