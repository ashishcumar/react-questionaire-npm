import * as React from "react";
import { CONFIG, QUESTION } from "../interface";
type QuestionnaireProps = {
    questions: QUESTION[];
    config: CONFIG;
};
type QuestionnaireRef = {
    SubmitForm: (e: any) => void;
};
declare const Questionnaire: React.ForwardRefExoticComponent<QuestionnaireProps & React.RefAttributes<QuestionnaireRef>>;
export { Questionnaire };
