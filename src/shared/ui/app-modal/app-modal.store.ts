import { defineStore } from 'pinia'
interface IModalState {
  isOpen: boolean
  modalState: null | 'confirm' | 'create'
  confirmResolver: null | ((value: boolean) => void)
}

export const useModalStore = defineStore('modal', {
  state: (): IModalState => ({
    isOpen: false,
    modalState: null,
    confirmResolver: null
  }),

  actions: {
    showModal(type: 'confirm' | 'create' | null) {
      this.isOpen = true
      this.modalState = type
    },
    closeModal() {
      this.isOpen = false
      this.modalState = null
    },
    confirmModal() {
      return new Promise<boolean>((resolve) => {
        this.confirmResolver = resolve
      })
    },
    resolveConfirm(value: boolean) {
      this.confirmResolver?.(value)
      this.confirmResolver = null

      this.closeModal()
    }
  }
})
