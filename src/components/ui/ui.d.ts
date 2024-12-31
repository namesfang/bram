import type { Snippet } from "svelte"

declare global {

  declare namespace ui {
    // 
    type Sizes = 'tiny' | 'small' | 'medium' | 'large'

    // 
    type Colors = 'success' | 'warning' | 'info' | 'danger' | 'default' | 'tertiary' | 'primary'

    // 图标类型
    type Icons = 'more' | 'check' | 'file-copy' | 'svelte' | 'send-plane' | 'close-circle' | 'close'|'download'|'file'|'file-pdf'|'file-damage'|'file-excel-2'|'markdown'|'quill-pen'|'notification'|'arrow-right-up-box'|'book'|'github'|'user-3'|'add'|'git-branch'|'information'|'error-warning'|'checkbox-circle'|'search'|'folder'|'lock'|'settings-3'|'edit-box'

    interface IconProps {
      name: Icons
      fill?: boolean
      // 图标既不是fill也不是line类型
      pure?: boolean
      size?: number | Sizes
      class?: string
      style?: string
      color?: Colors
      onclick?: ()=> void
    }

    interface ButtonProps {
      name?: string
      icon?: Icons | IconProps
      link?: boolean
      block?: boolean
      submit?: boolean
      reset?: boolean
      shape?: 'round' | 'circle' | 'default'
      loading?: boolean
      size?: Sizes
      color?: Colors
      href?: string
      class?: string
      style?: string
      buttonRef?: HTMLButtonElement
      popconfirm?:  {
        message: string
        onConfirm: () => void
        onCancel?: ()=> void
      },
      onclick?: (e: MouseEvent) => void
      children?: Snippet
    }

    interface AlertProps {
      title?: string
      content?: string
      color?: ui.Colors
      children?: Snippet
    }

    interface BlockProps {
      children?: Snippet
      class?: string
      style?: string
      between?: boolean
    }

    interface CountdownProps {
      delay?: number
      done: ()=> void
    }

    interface ContainerProps {
      title: string
      description?: string
      padding?: boolean
      width?: string | number
      children?: Snippet
    }

    interface CaptchaProps {
      value: string
      filled?: boolean
    }

    // spin
    interface SpinProps {
      spinning?: boolean
      message?: string
      size?: ui.Sizes
      color?: ui.Colors
      delay?: number
      style?: string
      class?: string
      children?: Snippet
    }

    interface PopperProps {
      visible: boolean
      full?: boolean
      class?: string
      style?: string
      children?: Snippet
    }

    interface InputProps {
      name?: string
      value?: string
      size?: Sizes
      type?: 'text' | 'password' | 'number'
      placeholder?: string
      autocomplete?: boolean
      maxlength?: number
      minlength?: number
      class?: string
      style?: string
      filled?: boolean
    }

    interface InputNumberProps extends Omit<InputProps, 'autocomplete' | 'type' | 'minlength' | 'maxlength'> {
      step?: number
      max?: number
      min?: number
      value?: number
      hideButtons?: boolean
    }

    interface TextareaProps {
      name?: string
      value?: string
      autocomplete?: boolean
      placeholder?: string
      maxlength?: number
      minlength?: number
      class?: string
      style?: string
      filled?: boolean
      rows?: number
      resize?: 'vertical' | 'horizontal' | 'both' | 'none'
    }

    interface FieldNames {
      label: string
      value: string
    }
  
    interface SelectOption {
      // label: string
      // value: string | number
      [key: string]: string | number | unknown
    }
    
    interface SelectProps {
      name?: string
      value?: string | number | unknown
      align?: 'left' | 'right' | 'center'
      style?: string
      fieldNames?: FieldNames
      placeholder?: string
      options: Option[]
      onchange?: (value: string | number | unknown, option: Option) => void | Promise<void>
    }

    interface TabProps {
      options: {label: string, href: string}[]
      padding?: boolean
      children?: Snippet
    }

    interface ResultProps {
      success?: boolean;
      danger?: boolean;
      warn?: boolean;
      info?: boolean;
      title?: string
      description?: string;
      countdown?: boolean;
      redirectURI?: string;
      children?: Snippet;
    }

    interface EmptyProps {
      description?: string;
      redirectURI?: string;
      children?: Snippet;
    }

    interface DatePickerProps {
      value?: string
      name?: string
      format?: string
      readonly?: boolean
      onchange?: (val: string)=> void
      placeholder?: string
    }

    // Popup
    interface PopupProps {
      visible: boolean
      arrow?: boolean
      triggerElement?: HTMLElement
      placement?: 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right'
      style?: string
      class?: string
      children: Snippet
    }

    // Popconfirm
    interface PopconfirmProps {
      visible: boolean
      content: string;
      triggerElement?: HTMLElement;
      onConfirm: ()=> void;
      onCancel?: ()=> void;
    }

    // Modal
    interface ModalButtonDetail {
      close: () => void;
      loading: (complete?: boolean) => void;
      props: ModalButtonProps;
    }
  
    interface ModalButtonProps {
      key: 'confirm' | 'cancel';
      enabled?: boolean;
      textContent?: string;
      color?: ui.Colors;
      onClick?: (detail: ModalButtonDetail) => void;
    }
  
    interface ModalProps {
      visible?: boolean;
      title?: string;
      closable?: boolean;
      maskClosable?: boolean;
      closedManually?: boolean;
      headerStyle?: string;
      mainStyle?: string;
      mainPadding?: string;
      footerStyle?: string;
      footerJustifyContent?: string;
      confirmButtonProps?: ModalButtonProps;
      cancelButtonProps?: ModalButtonProps;
      okText?: string;
      cancelText?: string;
      loading?: boolean;
      leading?: Snippet;
      children: Snippet;
      footer?: Snippet;
      onclose?: () => void;
      oncommand?: (detail: ModalButtonDetail) => void;
    }

    interface MessageProps {
      icon?: ui.Icons
      visible: boolean
      confirm?: boolean
      title?: string
      content: string
      onConfirm?: ()=> void
      onCancel?: ()=> void
    }

    type SwitchValue = number | string
    interface SwitchProps {
      name?: string
      value: SwitchValue
      customValues?: [SwitchValue, SwitchValue]
      customLabels?: [string, string]
      size?: Sizes
      color?: Colors
      round?: boolean
      disabled?: boolean
      style?: string
      class?: string
      onchange?: (value: SwitchValue, booleanValue: boolean)=> void | Promise<void>
    }

    interface OverlayProps {
      visible?: boolean
      maskClosable?: boolean
      alignItems?: 'center' | 'flex-start' | 'flex-end'
      onclose?: (event: MouseEvent)=> void | Promise<void>
      onclick?: (event: MouseEvent)=> void|Promise<void>
      class?: string
      style?: string
      children?: Snippet
    }
  }
}