import * as React from "react";
import { SystemStyleObject } from "@chakra-ui/react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { QUESTION } from "../../interface";
declare const SelectController: ({ form, questionObject, style, }: {
    form: UseFormReturn<FieldValues, any, undefined>;
    questionObject: QUESTION;
    style?: SystemStyleObject | undefined;
}) => React.JSX.Element;
export default SelectController;
