import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "lucide-react"

import { ReactNode } from "react"

interface Props {
  dialogTitle: string
  dialogDescription: string
  dialogTrigger: string
  children: ReactNode
}


const Modal = ({
  dialogTitle,
  dialogTrigger,
  dialogDescription,
  children
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant="outline">
          <div className="flex gap-2 items-center">
            <User className="h-3 w-3" />
            <p>{dialogTrigger}</p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="mb-2">
            {dialogTitle}
          </DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal