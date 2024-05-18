import * as React from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { CONFIG, QUESTION } from "../interface";
import Questions from "./Questions";
import { useForm } from "react-hook-form";
import useGenerateResponseHook from "./CustomHooks/useGenerateResponseHook";

type QuestionnaireProps = {
  questions: QUESTION[];
  config: CONFIG;
};

type QuestionnaireRef = {
  SubmitForm: (e: any) => void;
};

const Questionnaire = forwardRef<QuestionnaireRef, QuestionnaireProps>(
  ({ questions, config }, ref) => {
    const form = useForm({ mode: "onChange" });
    const submitref = React.useRef<HTMLFormElement>(null);
    const [questionState, setQuestionState] = React.useState<QUESTION[]>();
    const { generateResponse, generateResponseForMember } =
      useGenerateResponseHook();
    const updateDataWithCode = (data: QUESTION[], parentCode = "") => {
      return data.map((obj, index) => {
        const code = parentCode ? `${parentCode}_${index}` : `${index + 1}`;
        const updatedObj = { ...obj, code };
        if (Number(obj?.sub_ques?.length) > 0) {
          updatedObj.sub_ques = updateDataWithCode(
            obj?.sub_ques as QUESTION[],
            code
          );
        }
        return updatedObj;
      });
    };

    useEffect(() => {
      setQuestionState(updateDataWithCode(questions));
    }, [questions]);

    const onFormSubmit = (event: any) => {
      if (config.isSingle) {
        config.setResponse(
          generateResponse(event, questionState as QUESTION[])
        );
      } else {
        config.setResponse(
          generateResponseForMember(event, questionState as QUESTION[])
        );
      }
    };

    useImperativeHandle(ref, () => ({
      SubmitForm: (e) => {
        form.handleSubmit((event: any) => {
          onFormSubmit(event);
        })(e);
      },
    }));

    return (
      <form ref={submitref} onSubmit={onFormSubmit}>
        {questionState?.length
          ? questionState?.map((questionObject, i) => {
              return (
                <Questions
                  key={questionObject.code}
                  qutestionObject={questionObject}
                  form={form}
                  isSingle={config.isSingle}
                  memberArray={config?.memberArray}
                  questionId={(i + 1).toString()}
                  globalStyle={config?.globalStyle}
                />
              );
            })
          : null}
      </form>
    );
  }
);

export { Questionnaire };
