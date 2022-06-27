import type { StoreSlice } from '..'
import { nanoid } from 'nanoid'

interface LinkType {
  id: string
  url: string
  isActive: boolean
}

interface IList {
  list: LinkType[]
  initList: (list: LinkType[]) => void
  addLink: (url: LinkType['url']) => void
  updateLink?: () => void
  removeLink?: (linkId: string) => void
}

const createListSlice: StoreSlice<IList> = (set) => ({
  list: [],
  initList: (list): void => {
    set((state) => {
      // eslint-disable-next-line no-param-reassign
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
})

export type { LinkType, IList }
export { createListSlice }
