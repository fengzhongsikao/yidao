import { create } from 'zustand'

const useGuaStore = create((set) => ({
    guaListTemp: [{gua_ci: "", gua_name: "", id: 0, up_down: "", yao_ci: []}],
    setGuaListTemp: (newGuaList:any) =>set( ({ bears:[...newGuaList] })),
}));

export default  useGuaStore;