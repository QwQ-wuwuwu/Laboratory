import { defineAsyncComponent, h, render } from "vue";

export const createAlert = (title:string, type:string, description:string) => {
    const alert = defineAsyncComponent(() => import('./AlertComponent.vue'))
    const vnode = h(alert, {title, type, description})
    render(vnode, document.querySelector('#showAlert') as Element)
}

export const createDialog = (message:string, confirm?:() => void) => {
    const dialog = defineAsyncComponent(() => import('./DialogComponent.vue'))
    const vnode = h(dialog, {message, onConfirm: () => { // onConfirm是传递给子组件的事件回调函数
        confirm && confirm()
    }})
    render(vnode, document.body)
}

export const createId = ():string => {
    const date = new Date()
    const id = date.valueOf().toString().substring(0,10)
    return id
}
