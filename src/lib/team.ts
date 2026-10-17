// The team (photos edited from the originals: background replaced and colour
// corrected, no change to faces). To add or replace a person: put their photo in `public/team/`
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
    photo: '/team/imran-shahzad.webp',
    name: { en: 'Dr. Imran Shahzad', ur: 'ڈاکٹر عمران شہزاد' },
    role: { en: 'Director Finance', ur: 'ڈائریکٹر فنانس' },
    credential: 'FCA · PhD'
  },
  {
    photo: '/team/usama-amjad.webp',
    name: { en: 'Usama Amjad', ur: 'اسامہ امجد' },
    role: { en: 'Director Financial & Business Operations', ur: 'ڈائریکٹر فنانشل و بزنس آپریشنز' },
    credential: 'CA (Finalist) · CBA'
  },
  {
    photo: '/team/rana-tahir-zulqarnain.webp',
    name: { en: 'Rana Tahir Zulqarnain', ur: 'رانا طاہر ذوالقرنین' },
    role: { en: 'Director Finance', ur: 'ڈائریکٹر فنانس' },
    credential: 'ACA'
  },
  {
    photo: '/team/muhammad-haris-amjad.webp',
    name: { en: 'Muhammad Haris Amjad', ur: 'محمد حارث امجد' },
    role: { en: 'Director IT & Business Operations', ur: 'ڈائریکٹر آئی ٹی و بزنس آپریشنز' },
    credential: 'Software Engineer'
  }
]
