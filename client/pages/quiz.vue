<template>
    <v-container fill-height class="d-flex flex-wrap justify-center">
        <v-card class="d-flex flex-column col-8 pa-0 rounded-lg">
            <v-card-title class="text-uppercase d-flex flex-column indigo lighten-2 pa-0">
                <div class="d-flex flex-row col-12 pa-5">
                    <div class="ma-auto">
                        <span class="font-weight-light text-h5 light-blue--text text--lighten-5">Admission - </span>
                        <span class="font-weight-bold text-h5 light-blue--text text--lighten-5">Exam</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn color="white elevation-4" outlined class="white--text"  @click="goBack()">
                        <v-icon left>
                            arrow_back
                        </v-icon>
                        Back
                    </v-btn>
                </div>
            </v-card-title>
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="indigo lighten-5"
            ></v-progress-linear>
            <div class="d-flex flex-column pa-0">
                <v-sheet>
                    <v-tabs
                        v-model="tab"
                        background-color="indigo lighten-1"
                        dark
                        next-icon="chevron_right"
                        prev-icon="chevron_left"
                        show-arrows
                    >
                    <v-tabs-slider color="white"></v-tabs-slider>
                        <v-tab
                            v-for="exam in exams"
                            :key="exam.quizId"
                            :href="`#tab-${exam.quizId}`"
                            class="text--indigo text--lighten-5"
                        >
                            Quiz No.{{ exam.quizId }}
                        </v-tab>
                    </v-tabs>
                </v-sheet>
            </div>
            <v-tabs-items v-model="tab" center-active>
                <v-tab-item
                    v-for="(exam, index) in exams"
                    :key="exam.quizId"
                    :value="`tab-${exam.quizId}`"
                >
                    <div class="d-flex flex-column pa-5 px-8">
                        <div class="d-flex flex-row font-weight-black indigo--text text--lighten-1 mb-2">
                            {{ exam.quizTitle }}
                        </div>
                        <v-divider></v-divider>
                        <div>
                            <v-radio-group
                                column
                            >
                                <v-radio
                                    v-for="item in exam.options"
                                    :key="item.optionId"
                                    :label="`${item.option}`"
                                    :value="item.optionId"
                                    color="blue"
                                    active-class="{ color: red}"
                                ></v-radio>
                            </v-radio-group>
                        </div>
                        <v-divider></v-divider>
                        <div v-if="index === exams.length -1" class="mt-4 d-flex flex-row justify-end">
                            <v-btn :loading="loading" color="green" outlined @click="submit()">Submit</v-btn>
                        </div>
                    </div>
                </v-tab-item>
            </v-tabs-items>
            <div v-if="exams.length === 0" class="d-flex flex-row my-10 mx-auto">
                <p class="grey--text ">Exam quiz not found.</p>
            </div>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data:() => ({
        tab: null,
        loading: false,
        exams: []
    }),
    async mounted() {
        await this.getData()
    },
    methods: {
        async getData() {
            this.loading = true
            const res = await this.$store.dispatch("exam/storeExam")
            this.loading = false
            this.exams = !res.code ? (res.length > 0 ? res[0].quiz : []) : []

        },
        submit() {
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        },
        goBack() {
            this.$router.push('/')
        }
    }

}
</script>