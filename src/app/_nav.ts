interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Users'
  },
  {
    name: 'Users',
    url: '/user',
    icon: 'icon-user',
    children: [
      {
        name: 'Add',
        url: '/user/add',
        icon: 'icon-note'
      },
      {
        name: 'List',
        url: '/user/list',
        icon: 'icon-list'
      },
      {
        name: 'Bulk Upload',
        url: '/user/bulk',
        icon: 'icon-cloud-upload'
      }
    ]
  },
  {
    name: 'Devices',
    url: '/devices',
    icon: 'icon-screen-smartphone',
    children: [
      {
        name: 'Clients',
        url: '/devices/client',
        icon: 'icon-globe',
          children: [
            {
              name: 'Add',
              url: '/devices/add-client',
              icon: 'icon-plus',
            },
            {
              name: 'List',
              url: '/devices/list-client',
              icon: 'icon-list',
            }
        ]
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    divider: true
  }
];
