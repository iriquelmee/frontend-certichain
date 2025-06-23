export const sidebarItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Administracion',
      icon: 'pi pi-fw pi-cog',
      routerLink: '/admin'
    },   
    {
      label: 'Instituciones',
      icon: 'pi pi-fw pi-building',
      routerLink: '/instituciones'
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-fw pi-users',
      routerLink: '/usuarios'
    },
    {
      separator: true
    }
  ];
  
export const tabsAdmin = [
  { title: 'Usuarios', value: 0, content: '', type: 'component', component: 'Usuarios'  },
  { title: 'Categorias', value: 1, content: '', type: 'component', component: 'Categoria' },
  { title: 'Auditoría', value: 2, content: '', type: 'component', component: 'Auditoria' },
];

export const tabsInstituciones = [
  { title: 'Administrar Solicitudes', value: 0, content: '', type: 'component', component: 'SolicitudesInstitucion'  },
  { title: 'Administrar Tipos Documentos', value: 1, content: '', type: 'component', component: 'TiposDocumentos' },
  { title: 'Administrar Otras Solicitudes', value: 2, content: '', type: 'component', component: 'OtrasSolicitudes' },
];

export const tabsUsuarios = [
  { title: 'Informacion Usuario', value: 0, content: '', type: 'component', component: 'InformacionUsuario'  },
  { title: 'Solicitudes', value: 1, content: '', type: 'component', component: 'SolicitudesUsuario' },
];