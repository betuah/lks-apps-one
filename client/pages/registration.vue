<template>
    <v-container fill-height class="d-flex flex-wrap justify-center">
        <v-snackbar
            v-model="alert"
            :timeout="3000"
            :color="notif.color"
            absolute
            top
        >
            <div class="d-flex flex-row py-1">
                <v-icon>
                    {{ notif.icon }}
                </v-icon>
                <div class="text-body-2 ml-4">
                    {{ notif.message }}
                </div>
            </div>
            
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    icon
                    v-bind="attrs"
                    @click="alert = false"
                >
                    <v-icon small>
                        close
                    </v-icon>
                </v-btn>
            </template>
        </v-snackbar>
        <v-card class="d-flex flex-column col-5 pa-0 rounded-t-lg" >
            <v-form 
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="submitForm"
            >
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    top
                    color="green"
                ></v-progress-linear>
                <div class="col-12 pa-0 btn-image-reg rounded-t-lg">
                    <div class="d-flex flex-column align-center btn-backdrop-reg pt-4 px-4 rounded-t-lg white--text">
                        <span class="font-weight-bold text-h4">Registration</span>
                        <p class="font-weight-thin text-body-1">Hello students candidates, please Fill in all the fields below.</p>
                    </div>
                </div>
                <div class="pa-1 indigo lighten-5"></div>
                <div class="col-12 pa-0 pt-5">
                    <div class="col-11 mx-auto">
                        <v-text-field
                            v-model="name"
                            name="name"
                            dense
                            color="cyan lighten-1"
                            prepend-inner-icon="assignment_ind"
                            
                            :rules="nameRules"
                            label="Full Name"
                            required
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            name="email"
                            dense
                            color="cyan lighten-1"
                            prepend-inner-icon="email"
                            :rules="emailRules"
                            label="Email"
                            required
                            outlined
                        ></v-text-field>
                        <v-select
                            v-model="gender"
                            name="gender"
                            dense
                            class="mb-4"
                            color="cyan lighten-1"
                            item-text="gender_name"
                            item-value="genderId"
                            :items="genderData"
                            :rules="genderRules"
                            menu-props="auto"
                            label="Select Gender"
                            hide-details
                            :prepend-inner-icon="gender === 2 ? 'female' : 'male'"
                            single-line
                            required
                            outlined
                        ></v-select>
                        <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="date"
                            persistent
                            width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    dense
                                    class="mb-0 mt-7"
                                    name="date"
                                    color="cyan lighten-1"
                                    label="Birth Date"
                                    prepend-inner-icon="event"
                                    readonly
                                    v-bind="attrs"
                                    outlined
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="modal = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog.save(date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-dialog>
                        <v-select
                            v-model="majors"
                            name="majors"
                            dense
                            outlined
                            class="mb-6"
                            color="cyan lighten-1"
                            item-text="major_name"
                            item-value="majorsId"
                            :items="majorsData"
                            :rules="majorsRules"
                            label="Select a vocational"
                            hide-details
                            prepend-inner-icon="school"
                            required
                        ></v-select>
                        <v-file-input
                            dense
                            outlined
                            color="cyan lighten-1"
                            :rules="profilePicsRules"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Pick an avatar"
                            prepend-icon=""
                            prepend-inner-icon="photo_camera"
                            show-size
                            label="Avatar"
                            required
                            @change="onPicsUpload"
                        ></v-file-input>
                        <v-file-input
                            dense
                            outlined
                            color="cyan lighten-1"
                            :rules="documentRules"
                            accept="application/pdf"
                            prepend-icon=""
                            prepend-inner-icon="attachment"
                            label="File input"
                            required
                            show-size
                            @change="onFileUpload"
                        ></v-file-input>
                    </div>
                </div>
                <div class="pa-1 indigo lighten-5"></div>
                <v-card-actions class="py-5 col-12 indigo lighten-3 d-flex flex-row justify-end">
                    <v-btn
                        outlined
                        color="white"
                        @click="goBack()"
                    >
                        <v-icon left>
                            arrow_back
                        </v-icon>
                        Back
                    </v-btn>
                    <v-btn
                        :loading="loading"
                        outlined
                        color="white"
                        type="submit"
                    >
                        Submit
                        <v-icon right>
                            send
                        </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        loading: false,
        alert: false,
        valid: true,
        menu: false,
        modal: false,
        majorsData: [],
        name: '',
        notif: {
            color: '',
            icon: '',
            message: ''
        },
        nameRules: [
            v => !!v || 'Full Name is required',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        gender: '',
        genderData: [{genderId: 1, gender_name: 'Male'}, {genderId: 2, gender_name: 'Female'}],
        genderRules: [
            v => !!v || 'Please select your gender!'
        ],
        majors: '',
        majorsRules: [
            v => !!v || 'Please select your vocational!',
        ],
        profilePics: [],
        profilePicsRules: [
            v => !!v || 'Avatar is required',
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        document: [],
        documentRules: [
            v => !!v || 'Document is required',
            value => !value || value.size < 5000000 || 'Document size should be less than 5 MB!',
        ]
    }),
    async mounted() {
        await this.getData()
    },
    methods: {
        async getData() {
            this.loading = true
            const res = await this.$store.dispatch("majors/storeMajors")
            this.majorsData = !res.code ? res.map(item => item) : []
            this.loading = false
        },
        onPicsUpload (event) {
            this.profilePics = event
        },
        onFileUpload (event) {
            this.document = event
        },
        showNotif(req, message) {
            switch (req) {
                case 'success':
                    this.notif = {
                        color: 'success',
                        icon: 'check_circle',
                        message: `${message}`
                    }
                    break;
                
                case 'info':
                    this.notif = {
                        color: 'light-blue',
                        icon: 'info',
                        message: `${message}`
                    }
                    break;

                case 'warning':
                    this.notif = {
                        color: 'warning',
                        icon: 'warning',
                        message: `${message}`
                    }
                    break;
                
                case 'error':
                    this.notif = {
                        color: 'error',
                        icon: 'error',
                        message: `${message}`
                    }
                    break;

                default:
                    this.notif = {
                        color: '',
                        icon: '',
                        message: ''
                    }
                    break;
            }
            this.alert = true
        },
        submitForm () {
            this.loading = true

            if (this.$refs.form.validate()) {
                const formData = new FormData()

                console.log(this.profilePics)
                console.log(this.profilePics.name)

                formData.append('fullName', this.name)
                formData.append('email', this.email)
                formData.append('tglLahir', this.date)
                formData.append('gender', this.gender)
                formData.append('profilePics', this.profilePics , this.profilePics.name)
                formData.append('majors', this.majors)
                formData.append('document', this.document, this.document.name)

                // for(const pair of formData.entries()) {
                //     console.log(pair[0]+ ', '+ pair[1] + ' , ' + pair[2]); 
                // }

                this.$axios.post('/api/students', formData, {
                }).then((res) => {
                    this.$refs.form.reset()
                    this.showNotif('success', 'Your data has been saved!')
                }).catch(e => {
                    this.showNotif('error', 'Sorry, an error occurred! Please registration again')
                    console.log(e)
                })
            }

            setTimeout(() => (this.loading = false), 2000)
            
        },
        goBack() {
            this.$router.push('/')
        }
    }
}
</script>

<style>
    .btn-image-reg {
        background-image: url('https://img3.stockfresh.com/files/i/iaroslava/m/92/7931312_stock-vector-geometric-seamless-pattern-background-simple-graphic-print-vector-repeating-line-texture.jpg');
        background-position: top;
        background-repeat: repeat;
        background-size: cover;
        position: relative;
        width: 100%;
    }
    .btn-backdrop-reg {
        background: rgba(184, 193, 241, 0.9);
        height: 100%;
        width: 100%;
    }
</style>