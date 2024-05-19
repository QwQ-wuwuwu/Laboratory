import { defineAsyncComponent, h, render } from "vue";

export const createAlert = (title:string, type:string, description:string) => {
    const alert = defineAsyncComponent(() => import('./AlertComponent.vue'))
    const vnode = h(alert, {title, type, description})
    render(vnode, document.querySelector('#showAlert') as Element)
}

export const createDialog = () => {

}