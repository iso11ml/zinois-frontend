import {
    FormControl,
    FormField,
    FormItem,

    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Password } from "../ui/password";

interface Props {
    nameField: string;
    formControl: any;
    title: string;
    placeHolder?: string;
    isPassword?: boolean
}

const FormFieldInput = ({
    nameField,
    formControl,
    title,
    placeHolder,
    isPassword
}: Props) => {
    return (
        <div className="p-1 rounded-md flex flex-col gap-4">

            <p className={`font-medium text-sm`}>{title}</p>

            <FormField
                control={formControl}
                name={nameField}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            {
                                isPassword ? (
                                    <Password placeholder={placeHolder} {...field} />
                                ) : (
                                    <Input placeholder={placeHolder} {...field} />
                                )
                            }
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>

    )
}

export default FormFieldInput;