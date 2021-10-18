export const state = () => ({
    majorsData: [],
})

export const mutations = {
    STORE_MAJOR_DATA(state, data) {
        state.majorsData = data
    }
}

export const actions = {
    async storeMajors({commit}, data) {
        try {
            const res = await this.$axios.get('/api/majors')
            commit('STORE_MAJOR_DATA', res.data.data)

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