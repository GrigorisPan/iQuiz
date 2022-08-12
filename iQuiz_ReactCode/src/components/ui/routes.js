export const teacherRoutes = [
  {
    name: 'Αρχική',
    link: '/teacher',
    icon: 'home',
    activeIndex: 0,
  },
  {
    name: 'Βιβλιοθήκη',
    link: '/teacher/library/',
    icon: 'library_books',
    activeIndex: 1,
  },
  {
    name: 'Στατιστικά',
    link: '/teacher/statistics',
    icon: 'leaderboard',
    activeIndex: 2,
  },
  {
    name: 'Ψηφιακή Τάξη',
    link: '/teacher/digiClass',
    icon: 'school',
    activeIndex: 3,
  },
  {
    name: 'Δημιουργία Κουίζ',
    link: '/teacher/create-quiz',
    icon: 'add_circle_outline',
    activeIndex: 4,
  },
];

export const studentRoutes = [
  { name: 'Αρχική', link: '/student', icon: 'home', activeIndex: 0 },
  {
    name: 'Στατιστικά',
    link: '/student/statistics',
    icon: 'leaderboard',
    activeIndex: 1,
  },
  {
    name: 'Ψηφιακή Τάξη',
    link: '/student/digiClass',
    icon: 'school',
    activeIndex: 2,
  },
  {
    name: 'Live Κουίζ',
    link: '/livegame/landing',
    icon: 'quiz',
    activeIndex: 3,
  },
];

export const adminRoutes = [
  { name: 'Αρχική', link: '/admin', icon: 'dashboard', activeIndex: 0 },
  {
    name: 'Χρήστες',
    link: '/admin/users',
    icon: 'people',
    activeIndex: 1,
  },
  {
    name: 'Κουίζ',
    link: '/admin/quizzes',
    icon: 'quiz',
    activeIndex: 2,
  },
  {
    name: 'Προτεινόμενα Κουίζ',
    link: '/admin/suggestquizzes',
    icon: 'queue',
    activeIndex: 3,
  },
  {
    name: 'Στατιστικά',
    link: '/admin/statistics',
    icon: 'leaderboard',
    activeIndex: 4,
  },
  {
    name: 'Ψηφιακές Τάξεις',
    link: '/admin/digitalclass',
    icon: 'school',
    activeIndex: 5,
  },
  {
    name: 'Αναφορές',
    link: '/admin/reports',
    icon: 'bug_report',
    activeIndex: 6,
  },
];

export const mainRoutes = [
  {
    name: 'Προφίλ',
    link: '/profile',
    icon: 'manage_accounts',
    activeIndex: 7,
  },
  /*   {
    name: 'Αποσύνδεση',
    link: '/logout',
    icon: 'logout',
    activeIndex: 1500,
  }, */
];
