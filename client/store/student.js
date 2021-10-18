export const state = () => ({
    students: [],
    student: {}
})

export const mutations = {
    STORE_ALL_STUDENT(state, data) {
        state.students = data
    },
    STORE_STUDENT_BY_ID(state, data) {
        state.student = data
    }
}

export const actions = {
    async storeStudents({commit}, data) {
        try {
            const res = await this.$axios.get('/api/students')
            commit('STORE_ALL_STUDENT', res.data.data)

            if (res.data.code === 200) return res.data.data
            else return { code: res.data.code , error: res.data.status}
        } catch (error) {
            return []
        }
        
    },
    async getStudentById({commit}, id) {
        try {
            const res = await this.$axios.get(`/api/students/${id}`)
            commit('STORE_STUDENT_BY_ID', res.data.data)

            if(res.data.code === 200) return res.data
            else return res.data
        } catch (error) {
            return []
        }
        
    }
}

export const getters = {
    students(state) {
        return state.students
    }
}