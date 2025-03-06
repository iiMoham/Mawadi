export type SubjectCategory = 'CS' | 'IT' | 'IS' | 'ALL';

export interface Subject {
  id: string;
  name: string;
  description: string;
  slide_link?: string;
  test_bank_link?: string;
  telegram_channel?: string;
  category: SubjectCategory;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
}