import type {ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
    variant?: 'primary' | ' secondary'
}


function Button({children, variant = 'primary', ...props}: ButtonProps) {
  return (
    <button
       {...props}
    >
      {children}
    </button>
  )
}

export default Button
