<template>
    <v-container fill-height fluid >
        <div class="d-flex flex-column col-12 align-center">
            <div color="cyan lighten-5 rounded-lg">
                <v-row no-gutters class="elevation-3 rounded-lg">
                    <v-col
                        cols="4"
                        class=""
                    >
                        <v-avatar
                        class="profile rounded-l-lg"
                        color="light-blue lighten-5"
                        size="100%"
                        tile
                        >
                        <v-img :src="detailsItem.profilePics"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col
                        cols="8"
                        class="white rounded-r-lg"
                    >
                        <v-card
                            color="indigo lighten-2"
                            class="d-flex flex-row rounded-0 rounded-tr-lg pl-4 pr-3"
                        >
                            <div class="py-3 px-2">
                                <v-list-item-title class="text-capitalize text-h5 font-weight-bold light-blue--text text--lighten-5">{{ detailsItem.fullName }}</v-list-item-title>
                                <v-list-item-subtitle class="font-weight-light blue--text text--lighten-5">{{ detailsItem.major ? detailsItem.major.major_name : '' }}</v-list-item-subtitle>
                            </div>
                            <v-spacer></v-spacer>
                            <v-icon large color="blue lighten-5">flutter_dash</v-icon>
                        </v-card>

                        <v-list dense class="pl-2 mt-2">
                            <v-list-item>
                                <div class="d-flex flex-row flex-wrap flex-grow-1">
                                <div class="flex-grow-0">
                                    <v-icon color="cyan" class="pr-3">badge</v-icon>
                                </div>
                                <div class="d-flex flex-column flex-grow-1 my-2">
                                    <div>
                                    <v-list-item-title class="font-weight-bold brown--text text--lighten-2">{{ detailsItem.studentId }}</v-list-item-title>
                                    </div>
                                    <div class="mt-2">
                                    <v-divider />
                                    </div>
                                </div>
                                </div>
                            </v-list-item>
                            <v-list-item>
                                <div class="d-flex flex-row flex-wrap flex-grow-1">
                                <div class="flex-grow-0">
                                    <v-icon color="cyan" class="pr-3">wc</v-icon>
                                </div>
                                <div class="d-flex flex-column flex-grow-1 my-2">
                                    <div>
                                    <v-list-item-title class="font-weight-bold brown--text text--lighten-2">{{ detailsItem.gender == 1 ? 'Male' : 'Female' }}</v-list-item-title>
                                    </div>
                                    <div class="mt-2">
                                    <v-divider />
                                    </div>
                                </div>
                                </div>
                            </v-list-item>
                            <v-list-item>
                                <div class="d-flex flex-row flex-wrap flex-grow-1">
                                <div class="flex-grow-0">
                                    <v-icon color="cyan" class="pr-3">cake</v-icon>
                                </div>
                                <div class="d-flex flex-column flex-grow-1 my-2">
                                    <div>
                                    <v-list-item-title class="font-weight-bold brown--text text--lighten-2">{{ detailsItem.tglLahir }}</v-list-item-title>
                                    </div>
                                    <div class="mt-2">
                                    <v-divider />
                                    </div>
                                </div>
                                </div>
                            </v-list-item>
                        </v-list>

                        <div :class="detailsItem.status == '1' ? 'd-flex rounded-l-pill ml-4 my-3 pl-3 py-2 green lighten-1' : ( detailsItem.status === '2' ? 'd-flex rounded-l-pill ml-4 my-3 pl-3 py-2 warning lighten-1' : 'd-flex rounded-l-pill ml-4 my-3 pl-3 py-2 red lighten-1')">
                            <v-icon small left color="white">
                            school
                            </v-icon>
                            <div class="white--text pl-1">
                            {{ detailsItem.status == '1' ? 'Accepted' : ( detailsItem.status === '2' ? 'Waiting' : 'Rejected') }}
                            </div>
                            <v-spacer></v-spacer>
                            <v-icon small left color="white" class="pr-1">
                            campaign
                            </v-icon>
                        </div>
                    </v-col>
                </v-row>

                <v-btn 
                    block 
                    color="mt-6 rounded-lg elevation-3 green lighten-1 white--text"
                    @click="goBack()"
                >
                    <v-icon left color="white">arrow_back</v-icon>
                    Go Back Student Data
                </v-btn>

                <v-btn 
                    block 
                    color="mt-2 rounded-lg elevation-3 light-blue lighten-1 white--text"
                    @click="goHome()"
                >
                    <v-icon left color="white">home</v-icon>
                    Go Back Home
                </v-btn>
            </div>
        </div>

        <v-snackbar
            v-model="alert"
            timeout=3000
            top
            color="error"
        >
            <v-icon color="white">
                error
            </v-icon>
            
            {{ 'Data not found!' }}
            
            <template v-slot:action="{ attrs }">
                <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="alert = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>

export default {
    data: () => ({
        detailsItem: {},
        alert: false
    }),
    async mounted() {
        await this.initData(this.$route.params.id)
    },
    methods: {
        async initData(id) {
            this.loading = true
            const res = await this.$store.dispatch("student/getStudentById", id)
            this.loading = false

            if (res.data) {
                this.detailsItem = res.data
            } else {
                this.$context.error({statusCode: '404'})
            }
        },
        goHome() {
            this.$router.push(`/`)
        },
        goBack() {
            this.$router.push(`/studentData`)
        }
    },
}
</script>
