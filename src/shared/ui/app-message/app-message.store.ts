import { defineStore } from 'pinia'

type MsgType = 'info' | 'error' | 'success'

export const useMessageStore = defineStore('message', {
  state: () => ({
    text: '' as string,
    type: 'info' as MsgType,
    isVisible: false,
  }),

  actions: {
    showMessage(text: string, type: MsgType = 'info') {
      this.text = text
      this.type = type
      this.isVisible = true

      setTimeout(() => {
        this.isVisible = false
        this.text = ''
      }, 3000)
    }
  }
})
