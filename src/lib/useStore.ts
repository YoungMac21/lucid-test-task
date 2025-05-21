import { create } from "zustand"

interface FormulaStore {
    input: string
    trimInput: string
    isTag: boolean
    tagStartIndex: number
    tagEndIndex: number
    setInput: (value: string) => void
    setTrimInput: (value: string) => void
    setIsTag: (value: boolean) => void
}

export const useStore = create<FormulaStore>()((set) => (
    {
        input: '',
        trimInput: '',
        isTag: false,
        tagStartIndex: 0,
        tagEndIndex: 0,
        setInput: (value) => set({input: value}),
        setTrimInput: (value) => set({trimInput: value}),
        setIsTag: (value) => set({isTag: value}),
    }
))