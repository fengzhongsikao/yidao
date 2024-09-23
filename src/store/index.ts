import { create } from 'zustand'

const useGuaStore = create((set) => ({
    guaListTemp: [],
    setGuaListTemp: (newGuaList:any) =>set( ({ guaListTemp:[...newGuaList] })),
}));

export default  useGuaStore;