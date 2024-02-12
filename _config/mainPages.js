export default {
  appointmentIndex: {
    permission: 'iappointment.appointments.index',
    activated: true,
    authenticated: true,
    path: '/appointments/index',
    name: 'qappointment.main.appointments.index',
    crud: import('modules/qappointment/_crud/appointments'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'iappointment.cms.sidebar.panelAppointments',
    icon: 'fa-light fa-clipboard-check',
    subHeader: {
      refresh: true,
    }
  },
}
