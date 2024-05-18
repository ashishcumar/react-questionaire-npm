import * as React from "react";
import { CONFIG, QUESTION } from "../interface";
import { FieldValues, UseFormReturn } from "react-hook-form";
declare function Questions({ qutestionObject, form, isSingle, memberArray, globalStyle, currMember, questionId, }: Readonly<{
    qutestionObject: QUESTION;
    form: UseFormReturn<FieldValues, any, undefined>;
    isSingle: boolean;
    memberArray?: string[];
    globalStyle?: CONFIG["globalStyle"];
    currMember?: string;
    questionId?: string;
}>): React.JSX.Element;
export default Questions;
