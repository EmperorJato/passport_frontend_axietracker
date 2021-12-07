<template>
  <div id="users">
    <v-data-table
      :headers="headers"
      :items="accounts"
      class="elevation-1"
      loading-text="Loading... Please wait"
      :loading="loadingTable"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="mb-5">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form
                    id="form"
                    ref="form"
                    v-model="valid"
                    @submit.prevent="save"
                  >
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          v-model="editedItem.role"
                          label="Role"
                          :items="roles"
                          dense
                          prepend-icon="mdi-account-tie"
                          :rules="[...rules.requiredRules]"
                          :error-messages="errors.role"
                          item-text="name"
                          item-value="name"
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="red" text @click="close">
                  Cancel
                </v-btn>
                <v-btn
                  color="cyan"
                  text
                  form="form"
                  type="submit"
                  :loading="loading"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="closeDelete">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="handleClick(item)">
          mdi-eye
        </v-icon>
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template #[`item.image`]="{ item }">
        <v-avatar class="my-2" size="42">
          <v-img :src="$config.BACKEND_URL + `/img/${item.image}`" />
        </v-avatar>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  data: () => ({
    valid: true,
    dialog: false,
    loading: false,
    dialogDelete: false,
    loadingTable: true,
    headers: [
      {
        text: 'Image',
        align: 'start',
        sortable: false,
        value: 'image'
      },
      { text: 'Name', value: 'name' },
      { text: 'Contact', value: 'contact_number' },
      { text: 'Email', value: 'email' },
      { text: 'Address', value: 'address' },
      { text: 'Role', value: 'role' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      role: ''
    },
    rules: {
      requiredRules: [v => !!v || 'This field is required']
    },
    errors: {
      role: ''
    }
  }),

  computed: {

    ...mapGetters('accounts', {
      accounts: 'users',
      roles: 'roles'
    }),

    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Role'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.loadingTable = true
      this.$store
        .dispatch('accounts/getAccounts')
        .then(() => {
          this.loadingTable = false
        })
        .catch((err) => {
          this.$alert.show({
            type: 'error',
            text: err.response.data.message
          })
          this.loadingTable = false
        })
    },

    editItem (item) {
      this.editedIndex = this.accounts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.accounts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.accounts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        this.loading = true
        this.$store.dispatch('accounts/updateRole', this.editedItem)
          .then((res) => {
            this.$store.dispatch('accounts/getAccounts').then((res) => {
              this.$alert.show({
                type: 'success',
                text: 'Updated Successfully'
              })
              this.loading = false
              this.dialog = false
            })
          })
          .catch((err) => {
            this.$alert.show({
              type: 'error',
              text: err.response.data.message
            })
            this.loading = false
            this.dialog = false
          })
      } else {
        this.accounts.push(this.editedItem)
      }
    },
    handleClick (item) {
      console.log(item)
      this.$router.push({ name: 'profile', query: { id: item.id, name: item.name } })
    }
  }
}
</script>

<style>
</style>
