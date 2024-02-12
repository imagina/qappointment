export default {
  categories: {
    permission: 'iappointment.categories.manage',
    activated: true,
    authenticated: true,
    path: '/appointment/categories/index',
    name: 'qappointment.admin.categories',
    crud: import('modules/qappointment/_crud/categories'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'iappointment.cms.sidebar.adminCategories',
    icon: 'fa-light fa-layer-group',
    subHeader: {
      refresh: true,
    }
  }
}
