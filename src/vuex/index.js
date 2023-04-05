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
            state.logoinflage = false
        }
    },
    plugins: [    
        createPersistedState({      
            storage: localStorage,
            reducer(state) {        
                return {          
                    // 只存储state中的userData          
                    logoinflage: state.logoinflage
                }      
            }  
        }),  
    ],
});

export default store;
