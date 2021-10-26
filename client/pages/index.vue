<template>
  <v-container fill-height class="d-flex flex-wrap justify-center">
    <v-card class="d-flex flex-row col-8 pa-0 rounded-lg">
      <div class="col-6 d-flex flex-column pa-0 justify-center align-content-center rounded-0 rounded-l-lg btn-image">
        <div class="d-flex btn-backdrop pa-3 rounded-l-lg">
          <div class="white--text col-10 mx-auto d-flex flex-column align-content-center justify-center">
            <div>
              <v-btn block class="my-2 py-5 white--text" color="light-blue lighten-1" @click="registration()">
                <div class="col-2">
                  <v-icon left color="white" class="mr-2">
                    app_registration
                  </v-icon>
                </div>
                <div>
                  Registration
                </div>
              </v-btn>
            </div>
            <div>
              <v-btn block class="my-2 py-5 white--text" color="green lighten-1" @click="viewStudentData()">
                <v-icon left color="white" class="mr-2">
                  campaign
                </v-icon>
                Student Data
              </v-btn>
            </div>
            <div>
              <v-btn block class="my-2 py-5 white--text" color="orange lighten-1" @click="exam()">
                <v-icon left color="white" class="mr-2">
                  quiz
                </v-icon>
                Take Exam
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 d-flex flex-column pa-10 rounded-0">
        <div class="font-weight-bold text-h3 text-capitalize mb-6 d-flex flex-column">
          <span class="font-weight-thin grey--text">Hellow</span> 
          <span class="cyan--text text--lighten-1">student candicates,</span>
        </div>
        <span class="font-weight-light text-subtitle-1 text-capitalize light-blue--text text--lighten-1 mb-1">Welcome to the our campus websites.</span>
        <p class="font-weight-light text-caption text-justify">This is a website-based new student admission application for registration and announcement of new student selection on our campus. If your're want to join with us click registration button, If you want to view registered participant data please click student data and if you're already registered and want to take exam plase click Take Exam.</p>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    
  }),
  methods: {
    viewStudentData() {
      this.$router.push('/studentdata')
    },
    registration() {
      this.$router.push('/registration')
    },
    exam() {
      this.$router.push('/quiz')
    }
  },
}
</script>

<style>
  .btn-image {
    background-image: url('https://previews.123rf.com/images/saenal78/saenal781505/saenal78150500058/40068714-seamless-pattern-with-medical-icons-on-white-background.jpg');
    background-position: center;
    background-repeat: repeat;
    background-size: cover;
    position: relative;
    width: 100%;
  }
  .btn-backdrop {
    background: rgba(184, 247, 255, 0.9);
    height: 100%;
    width: 100%;
  }
</style>