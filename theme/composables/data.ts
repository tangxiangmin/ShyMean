import { inject, InjectionKey } from 'vue'
import { VitePressData } from 'vitepress'

export const dataSymbol: InjectionKey<VitePressData> = Symbol()

export function useData<T = any>(): VitePressData<T> {
  const data = inject(dataSymbol)
  if (!data) {
    throw new Error('vitepress data not properly injected in app')
  }
  return data
}
