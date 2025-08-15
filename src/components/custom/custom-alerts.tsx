import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Info } from "lucide-react"

interface CustomAlertProps {
  title: string
  description: string
  variant: 'default' | 'destructive'
}

export const CustomAlert = ({
  title,
  description,
  variant = 'default',
}: CustomAlertProps) => {
  return (
    <Alert variant={variant} className="mt-4">
      <Info className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )   
}