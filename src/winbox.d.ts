export as namespace WinBox

declare module 'winbox' {
  interface WinBoxConstructor {
    (title: string, params?: Params): WinBox
    (params: Params): WinBox
    new (title: string, params?: Params): WinBox
    new (params: Params): WinBox
  }

  interface WinBox {
    dom: Node
    background: string
    body: HTMLElement
    border: string | number

    class: string | string[]

    html: string
    id: string | number
    index: number
    max: boolean
    modal: boolean
    root: Node
    title: string
    url: string
    onfocus: (this: WinBox) => void
    onmaximize: (this: WinBox) => void
    onminimize: (this: WinBox) => void
    onrestore: (this: WinBox) => void
    onblur: (this: WinBox) => void
    onresize: (this: WinBox, width: number, height: number) => void
    onmove: (this: WinBox, x: number, y: number) => void
    onclose: (this: WinBox, force: boolean) => boolean
    mount(src?: Element): WinBox
    unmount(dest?: Element): WinBox
    setTitle(title: string): WinBox
    setBackground(background: string): WinBox
    setUrl(url: string): WinBox
    focus(): WinBox
    hide(): WinBox
    show(): WinBox
    minimize(state?: boolean): WinBox
    maximize(state?: boolean): WinBox
    fullscreen(state?: boolean): WinBox
    close(force?: boolean): boolean | void
    move(x?: string | number, y?: string | number, skipUpdate?: boolean): WinBox
    resize(
      w?: string | number,
      h?: string | number,
      skipUpdate?: boolean
    ): WinBox
    addClass(classname: string): WinBox
    removeClass(classname: string): WinBox
  }

  interface Params {
    header?: number
    // configuration:
    index: number
    id: string
    root: HTMLElement
    class: string[]

    // appearance:
    title: string
    background: string
    border: number
    header: number
    icon: boolean

    // initial state:
    modal: boolean
    max: boolean
    min: boolean
    hidden: boolean

    // dimension:
    width: number
    height: number
    minheight: number
    minwidth: number
    maxheight: number
    maxwidth: number
    autosize: boolean

    // position:
    x: number
    y: number

    // viewport boundaries:
    top: number
    right: number
    bottom: number
    left: number

    // contents (choose from):
    url: false
    mount: false
    html: 'width: 250, height: 200'

    // callbacks:
    oncreate?: (options: Params) => void
    onshow?: (this: WinBox) => void
    onhide?: (this: WinBox) => void
    onfocus?: (this: WinBox) => void
    onblur?: (this: WinBox) => void
    onresize?: (this: WinBox, width: number, height: number) => void
    onmove?: (this: WinBox, x: number, y: number) => void
    onclose?: (this: WinBox, force?: boolean) => boolean
    onfullscreen?: (this: WinBox) => void
    onmaximize?: (this: WinBox) => void
    onminimize?: (this: WinBox) => void
    onrestore?: (this: WinBox) => void
  }
}

declare const WinBox: WinBox.WinBoxConstructor & {
  new:
    | ((title: string, params?: WinBox.Params) => WinBox)
    | ((params: WinBox.Params) => WinBox)
}

export = WinBox
