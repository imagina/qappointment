<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qappointment.entityNames.appointments"),
        permission: 'iappointment.appointments',
        apiRoute: 'apiRoutes.qappointment.appointments',
        extraFormFields: 'iappointment.crud-fields.appointments',
        create: {
          title: this.$tr('iappointment.cms.newAppointment'),
          toExternalUrl: `${this.$store.state.qsiteApp.baseUrl}/cita/categorias`
        },
        read: {
          showAs: 'grid',
          allowToggleView: false,
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'customer', label: this.$tr('iappointment.cms.form.customer'), align: 'left',
              field: 'customer', sortable: true, format: val => ((val && val.fullName) ? val.fullName : '-')
            },
            {
              name: 'assigned', label: this.$tr('iappointment.cms.form.assigned'), align: 'left',
              field: 'assigned', sortable: true, format: val => ((val && val.fullName) ? val.fullName : '-')
            },
            {
              name: 'category', label: this.$tr('isite.cms.form.category'),
              align: 'left', field: 'category', sortable: true,
              format: val => ((val && val.title) ? val.title : '-')
            },
            {
              name: 'statusinfo', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left',
              format: val => ((val && val.title) ? val.title : '-')
            },
            {
              name: 'description', label: this.$tr('isite.cms.form.description'), field: 'description',
              align: 'left', classes: 'ellipsis', style: 'max-width : 250px'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updatedAt', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'category,customer,assigned,status,fields,conversation'},
          filters: {
            categories: {
              value: null,
              type: 'treeSelect',
              props: {
                label: this.$tr('isite.cms.label.category')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qappointment.categories'
              }
            },
            assigned: {
              value: null,
              type: 'select',
              props: {
                label: this.$trp('iappointment.cms.form.assigned'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.quser.users',
                select: {label: 'fullName', id: 'id'},
                filterByQuery: true
              }
            },
            customer: {
              value: null,
              type: 'select',
              props: {
                label: this.$trp('iappointment.cms.form.customer'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.quser.users',
                select: {label: 'fullName', id: 'id'},
                filterByQuery: true
              }
            },
            date: true,
          },
          grid: {
            component: () => import('modules/qappointment/_components/crud/appointmentCard'),
          }
        },
        update: {
          title: this.$tr('iappointment.cms.updateAppointment')
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          assignedTo: {
            type: 'crud',
            permission: 'iappointment.appointments.edit-all',
            props: {
              crudType: 'select',
              crudData: import('modules/quser/_crud/users'),
              crudProps: {
                label: this.$trp('iappointment.cms.form.assigned'),
              },
              config: {
                options: {
                  label: 'fullName', value: 'id'
                }
              },
              vIf: this.$hasAccess('iappointment.appointments.edit-all')
            },
          },
          categoryId: {
            type: 'crud',
            permission: 'iappointment.appointments.edit-all',
            props: {
              crudType: 'select',
              crudData: import('modules/qappointment/_crud/categories'),
              crudProps: {
                label: `${this.$tr('isite.cms.form.category')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
              config: {
                options: {
                  label: 'title', value: 'id'
                }
              }
            },
          },
          statusId: {
            value: '1',
            type: 'select',
            props: {
              label: `${this.$tr('isite.cms.form.status')}:`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qappointment.appointmentStatuses',
            }
          },
          recommendation: {
            value: null,
            type: 'html',
            isFakeField: true,
            props: {
              label: `${this.$tr('isite.cms.label.recommendation')}`
            }
          },
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
