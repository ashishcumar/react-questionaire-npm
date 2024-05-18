import * as React from "react";
import { SystemStyleObject } from "@chakra-ui/react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { QUESTION } from "../interface";
declare function ResponseField({ qutestionObject, form, setIsCollapsed, inputSelectStyle, toggleButtonContainer, toggleButton, toggleBtnTheme, }: Readonly<{
    qutestionObject: QUESTION;
    form: UseFormReturn<FieldValues, any, undefined>;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    inputSelectStyle?: SystemStyleObject | undefined;
    toggleButtonContainer?: SystemStyleObject | undefined;
    toggleButton?: SystemStyleObject | undefined;
    toggleBtnTheme?: {
        primary: string;
        secondary?: string;
    };
}>): React.JSX.Element;
export default ResponseField;
