import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: '-- Gestion des Utilisateurs',
    moduleName: '',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'Gestion des Profs',
    moduleName: 'professors',
    iconType: 'material-icons-two-tone',
    icon: 'supervisor_account',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/professors/add',
        title: 'Ajout Prof.',
        moduleName: 'professors',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/professors/list',
        title: 'Liste Profs.',
        moduleName: 'professors',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      }
    ],
  },
  {
    path: '',
    title: 'Gestion des Etudiants',
    moduleName: 'students',
    iconType: 'material-icons-two-tone',
    icon: 'face',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/students/add',
        title: 'Ajout Etudiant',
        moduleName: 'professors',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/students/list',
        title: 'Liste Etudiants',
        moduleName: 'professors',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      }
    ],
  },
  {
    path: '',
    title: '-- Sessions',
    moduleName: '',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'Gestion des Sessions',
    moduleName: 'sessions',
    iconType: 'material-icons-two-tone',
    icon: 'event',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/sessions/add',
        title: 'Ajout Session',
        moduleName: 'sessions',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/sessions/list',
        title: 'Liste Sessions',
        moduleName: 'sessions',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      }
    ],
  }
];
