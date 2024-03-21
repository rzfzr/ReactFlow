import create from 'zustand';

const useMyStore = create((set) => ({
  edges: [],
  setEdges: (newEdges) => set({ edges: newEdges }),
}));

export default useMyStore;