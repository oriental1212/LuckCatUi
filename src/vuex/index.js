import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    state() {
        return {
            logoinflage: true
        }
    },
    mutations: {
        changeloginflage(state) {
            state.logoinflage = !state.logoinflage
        }
    },
    //持久化存储loginflage
    plugins: [    
        createPersistedState({      
            storage: localStorage,
            reducer(state) {        
                return {                
                    logoinflage: state.logoinflage
                }      
            }  
        }),  
    ],
});

export default store;
