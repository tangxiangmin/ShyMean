export default {
    setCatalogue: (state,catalogue)=>{
        state.catalogue = catalogue;
    },
    setLoading: (state,isLoading)=>{
        state.isLoading = isLoading;
    },
    setAsideTabItems: (state, tabItems)=>{
        state.asideTabItems = tabItems;
    }
}
