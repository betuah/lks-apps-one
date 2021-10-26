export const state = () => ({
    examData: [],
})

export const mutations = {
    STORE_EXAM_DATA(state, data) {
        state.examData = data
    }
}

export const actions = {
    async storeExam({commit}, data) {
        try {
            const res = await this.$axios.get('/apiv2/quiz')
            commit('STORE_EXAM_DATA', res.data.data)

            if (res.data.code === 200) return res.data.data
            else return { code: res.data.code , error: res.data.status}
        } catch (error) {
            return []
        }
        
    }
}

export const getters = {
    getData(state) {
        return state.majorsData
    }
}