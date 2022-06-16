import type { StoreSlice } from '..'
import { nanoid } from 'nanoid'

export interface LinkType {
  id: string
  url: string
  isActive: boolean
}

export interface IList {
  list: LinkType[]
  initList: (list: Array<LinkType>) => void
  addLink: (url: LinkType['url']) => void
  updateLink?: () => void
  removeLink?: (linkId: string) => void
  activateLink?: (linkId: string) => void
  deactivateLink?: (linkId: string) => void
}

export const createListSlice: StoreSlice<IList> = (set) => ({
  list: [],
  initList: (list): void => {
    set((state) => {
      state.list = list
      return state
    })
  },
  addLink: (url): void => {
    set((state) => {
      state.list.push({
        id: nanoid(),
        url,
        isActive: true,
      })
      return state
    })
  },
  removeLink: (linkId): void => {
    set((state) => {
      state.list.filter(({ id }) => id !== linkId)
      return state
    })
  },
  activateLink: (linkId): void => {
    set((state) => {
      const selectedLink = state.list.find((link) => link.id === linkId)
      selectedLink!.isActive = true
      return state
    })
  },
  deactivateLink: (linkId): void => {
    set((state) => {
      const selectedLink = state.list.find((link) => link.id === linkId)
      selectedLink!.isActive = false
      return state
    })
  },
})
