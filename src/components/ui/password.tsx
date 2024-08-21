import * as React from "react"

import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"


export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode
}

const Password = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-10 w-full ring-1 ring-slate-300 rounded-md bg-white px-3 py-2 text-sm focus-visible:outline-none",
            className
          )}
          ref={ref}
          {...props}
        />
        <span
          className="absolute right-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOffIcon className="select-none" /> : <EyeIcon className="select-none" />}
        </span>
      </div>
    )
  }
)
Password.displayName = "Password"

export { Password }
