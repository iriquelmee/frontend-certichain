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

export const documentos = [
  {
    documentRequest: {
      id: '123',
      requesterID: 'user001',
      issuerID: 'user123',
      date: '2025-06-25T14:30:00.000Z',
      documentTypeID: 'tipo2025',
      state: 'CREADO',
    },
    privateDocument: {
      documentId: '123',
      institution: 'user123',
      userId: 'user001',
      name: 'declaracion.pdf',
      path: '/declaracion.pdf',
      hash: '111aaaa2222ssss',
      state: 'CREADO',
    },
  },
  {
    documentRequest: {
      id: '124',
      requesterID: 'user002',
      issuerID: 'user124',
      date: '2025-06-20T10:00:00.000Z',
      documentTypeID: 'tipo2024',
      state: 'EN_PROCESO',
    },
    privateDocument: {
      documentId: '124',
      institution: 'user124',
      userId: 'user002',
      name: 'contrato.pdf',
      path: '/contrato.pdf',
      hash: '333bbbb4444tttt',
      state: 'EN_PROCESO',
    },
  },
  {
    documentRequest: {
      id: '125',
      requesterID: 'user003',
      issuerID: 'user125',
      date: '2025-06-15T09:00:00.000Z',
      documentTypeID: 'tipo2023',
      state: 'APROBADO',
    },
    privateDocument: {
      documentId: '125',
      institution: 'user125',
      userId: 'user003',
      name: 'licencia.pdf',
      path: '/licencia.pdf',
      hash: '555cccc6666rrrr',
      state: 'APROBADO',
    },
  },
  {
    documentRequest: {
      id: '126',
      requesterID: 'user004',
      issuerID: 'user126',
      date: '2025-06-10T11:45:00.000Z',
      documentTypeID: 'tipo2022',
      state: 'RECHAZADO',
    },
    privateDocument: {
      documentId: '126',
      institution: 'user126',
      userId: 'user004',
      name: 'certificado.pdf',
      path: '/certificado.pdf',
      hash: '777dddd8888vvvv',
      state: 'RECHAZADO',
    },
  },
  {
    documentRequest: {
      id: '127',
      requesterID: 'user005',
      issuerID: 'user127',
      date: '2025-06-01T08:30:00.000Z',
      documentTypeID: 'tipo2021',
      state: 'CREADO',
    },
    privateDocument: {
      documentId: '127',
      institution: 'user127',
      userId: 'user005',
      name: 'reporte.pdf',
      path: '/reporte.pdf',
      hash: '999eeee0000zzzz',
      state: 'CREADO',
    },
  },
];

export const documentosColumns = [
  { campo: 'documentRequest.id', header: 'ID' },
  { campo: 'documentRequest.state', header: 'Estado' },
  { campo: 'privateDocument.name', header: 'Nombre' },
  { campo: 'privateDocument.userId', header: 'Usuario' }
];

export const usuariosColumns = [
  { campo: 'id', header: 'ID' },
  { campo: 'name', header: 'Nombre' },
  { campo: 'email', header: 'Email' },
  { campo: 'perfil', header: 'Perfil' }
];
export interface UserInfo {
  Id: string;
  UserID: string;
  UserTypeId: string;
  UserSubTypeId: string;
}

export const userInfoData: UserInfo = {
  Id: "1",
  UserID: "user123",
  UserTypeId: "institucion",
  UserSubTypeId: "admin"
};

export const usuariosDumy = [
  {
    id: "1",
    name: "Juan Pérez",
    perfil: "institucion",
    email: "juan.perez@example.com"
  },
  {
    id: "2",
    name: "María García",
    perfil: "ciudadano",
    email: "maria.garcia@example.com"
  },
  {
    id: "3",
    name: "Carlos López",
    perfil: "institucion",
    email: "carlos.lopez@example.com"
  },
  {
    id: "4",
    name: "Ana Torres",
    perfil: "ciudadano",
    email: "ana.torres@example.com"
  },
  {
    id: "5",
    name: "Luis Fernández",
    perfil: "institucion",
    email: "luis.fernandez@example.com"
  },
  {
    id: "6",
    name: "Laura Ramírez",
    perfil: "ciudadano",
    email: "laura.ramirez@example.com"
  },
  {
    id: "7",
    name: "Pedro Gómez",
    perfil: "institucion",
    email: "pedro.gomez@example.com"
  },
  {
    id: "8",
    name: "Sofía Morales",
    perfil: "ciudadano",
    email: "sofia.morales@example.com"
  },
  {
    id: "9",
    name: "Diego Castro",
    perfil: "institucion",
    email: "diego.castro@example.com"
  },
  {
    id: "10",
    name: "Valentina Herrera",
    perfil: "ciudadano",
    email: "valentina.herrera@example.com"
  }
];

export const institucionSolicitudesColumns = [
  { campo: 'id', header: 'ID' },
  { campo: 'solicitante', header: 'Solicitante' },
  { campo: 'nombre', header: 'Nombre' },
  { campo: 'fecha', header: 'Fecha' },
  { campo: 'estado', header: 'Estado' },
  { campo: 'accion', header: 'Accion' }
];
export const institucionSolicitudes = [
  {
    id: "SOL-001",
    solicitante: "Juan Pérez",
    nombre: "Solicitud de certificado",
    fecha: "2025-06-26",
    estado: "Pendiente",
    accion: "Ver"
  }
];
export const institucionTiposDocumentoColumns = [
  { campo: 'id', header: 'ID' },
  { campo: 'nombreTipo', header: 'Tipo' },
  { campo: 'estado', header: 'Estado' },
  { campo: 'accion', header: 'Accion' }
];
export const institucionTiposDocumento = [
  {
    id: "TDOC-001",
    nombreTipo: "Constancia de Residencia",
    estado: "Activo",
    accion: "Desactivar"
  }
];

export const administracionUsuarios = [
  {
    id: "USR-001",
    nombre: "María García",
    estado: "Inactivo",
    tipo: "Ciudadano",
    accion: "Activar"
  }
];
export const administracionTiposUsuario = [
  {
    id: "TUSR-001",
    nombre: "Funcionario Público",
    estado: "Activo",
    accion: "Editar"
  }
];
export const administracionAuditoria = [
  {
    id: "AUD-001",
    idDocumento: "DOC-123",
    emisor: "Carlos López",
    solicitante: "Ana Torres",
    fecha: "2025-06-25"
  }
];
