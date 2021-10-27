<template>
  <v-container fill-height fluid >
    <v-row class="d-flex flex-wrap align-center justify-center">
      <v-col cols="8">
        <v-dialog v-model="docs" max-width="600px">
          <v-card elevation="3" class="col-12">
            <iframe :src="`${detailsItem.document}`" width="100%" height="550px"></iframe>
            <v-card-actions class="d-flex flex-row justify-end">
              <v-btn right text color="error" @click="closeModal('docs')">
                CLOSE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card elevation="3" class="rounded-lg">
          <v-card-title class="text-uppercase d-flex flex-column indigo lighten-2 pa-0">
            <div class="d-flex flex-row col-12 pa-5">
                <div class="ma-auto">
                    <span class="font-weight-light text-h5 light-blue--text text--lighten-5">students</span>
                    <span class="font-weight-bold text-h5 light-blue--text text--lighten-5">admission</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="white elevation-4" outlined class="white--text"  @click="goBack()">
                    <v-icon left>
                        arrow_back
                    </v-icon>
                    Back
                </v-btn>
            </div>
            <div class="col-12 px-5 pt-1 indigo lighten-3">
                <v-text-field
                v-model="search"
                label="Search"
                append-icon="search"
                dark
                hide-details
                ></v-text-field>
            </div>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            loading-text="Loading... Please wait"
            class="grey--text"
          >
            <template v-slot:[`item.status`]="{ item }">
              <v-chip
                small
                class
                :color="item.status === 1 ? 'green lighten-1' : ( item.status === 2 ? 'warning lighten-1' : 'red lighten-1')"
                dark
              >
                {{ item.status === 1 ? 'Graduated' : ( item.status === 2 ? 'Pending' : 'Not Pass') }}
              </v-chip>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:[`activator`]="{ on, attrs }">
                  <v-icon
                    medium
                    color="green"
                    class="mr-1"
                    v-bind="attrs"
                    v-on="on"
                    @click="showDocument(item)"
                  >
                    assignment
                  </v-icon>
                </template>
                <span>Document</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:[`activator`]="{ on, attrs }">
                  <v-icon
                    medium
                    color="light-blue"
                    v-bind="attrs"
                    v-on="on"
                    @click="showDetails(item.id)"
                  >
                    info
                  </v-icon>
                </template>
                <span>Details</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      search: '',
      dialog: false,
      docs: false,
      loading: false,
      headers: [
        {
          text: 'Full Name',
          align: 'start',
          value: 'nama',
          class: "blue--text font-weight-bold"
        },
        { text: 'Birth Date', value: 'tglLahir', },
        { text: 'Gender', value: 'gender', },
        { text: 'Majors', value: 'majors', class: "blue--text font-weight-bold"},
        { text: 'Status', value: 'status', class: "success--text font-weight-bold" },
        { text: 'Actions', value: 'actions', sortable: false}
      ],
      desserts: [],
      editedIndex: -1,
      detailsItem: {},
      defaultItem: {
        nama: '',
        gender: 0,
        majors: 0,
        status: 0,
        tglLahir: 0,
      },
    }),
    async mounted() {
      await this.getData()
    },
    methods: {
      async getData() {
        this.loading = true
        const res = await this.$store.dispatch("student/storeStudents")
        this.loading = false
        this.desserts = !res.code ? res.map(item => { 
          return {
            id: item.studentId,
            nama: item.fullName,
            gender: item.gender === '1' ? 'Male' : 'Female',
            tglLahir: item.tglLahir,
            majors: item.major.major_name,
            profilePics: item.profilePics,
            document: item.document,
            status: item.status,
          }
        }) : []
      },
      showDocument(item) {
        this.docs = true
        this.detailsItem = item
      },
      showDetails(id) {
        this.$router.push(`/profile/${id}`)
      },
      closeModal(req) {
        if (req === 'docs') this.docs = false
      },
      goBack() {
          this.$router.push('/')
      }
    }
  }
</script>