import * as React from 'react';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Container, Grid, Button, Text, Box, Input, Textarea, useMediaQuery, Flex } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Controller, useForm } from 'react-hook-form';

const SelectController = ({ form, questionObject, style, }) => {
    const { control } = form;
    return (React.createElement(Container, { sx: { ...(style ? style : { padding: 0 }) } },
        React.createElement(Controller, { control: control, name: questionObject?.code, rules: {
                required: "Please select at least one",
            }, render: ({ field: { onChange, onBlur, value, ref } }) => (React.createElement(Select, { ...(questionObject?.multi_select ? { isMulti: true } : {}), name: questionObject.main_question, isClearable: true, ref: ref, onChange: onChange, onBlur: onBlur, value: value, options: questionObject?.options, placeholder: "Select Option", closeMenuOnSelect: questionObject?.multi_select ? false : true })) })));
};

const reactHookFormErrMsg = {
    required: "This field is required.",
    min: "Value below minimum allowed.",
    max: "Value exceeds maximum allowed.",
    pattern: "Invalid input format.",
};

function ResponseField({ qutestionObject, form, setIsCollapsed, inputSelectStyle, toggleButtonContainer, toggleButton, toggleBtnTheme, }) {
    const { code, response_type, is_mandatory, regex, min, max } = qutestionObject;
    const errroType = form.formState.errors[code]?.type;
    const [toggle, setToggle] = useState(false);
    const handleButtonClick = (value) => {
        form.setValue(code, value);
        setIsCollapsed(value);
        setToggle(value);
        if (form.formState.errors[code]) {
            form.clearErrors(code);
        }
        if (!value) {
            let keyToUnregisterAgain = Object.keys(form.getValues()).filter((quesCode) => quesCode.startsWith(code) ||
                quesCode === code ||
                (quesCode.includes("-") &&
                    quesCode.split("-")[1].startsWith(code)));
            keyToUnregisterAgain.forEach((key) => {
                form.unregister(key);
            });
        }
    };
    if (!["bool", "text", "number", "date", "dropdown", "textArea"].includes(response_type))
        throw new TypeError("Invalid response type");
    if (response_type === "bool") {
        return (React.createElement(Grid, null,
            React.createElement(Grid, { sx: toggleButtonContainer
                    ? toggleButtonContainer
                    : {
                        width: "200px",
                        gridTemplateColumns: "1fr 1fr",
                        border: `1px solid #EDF2F7`,
                        borderRadius: "8px",
                        overflow: "hidden",
                    }, ...form.register(code, {
                    required: !!is_mandatory,
                }) },
                React.createElement(Button, { variant: "solid", onClick: () => handleButtonClick(true), sx: toggleButton
                        ? {
                            ...toggleButton,
                            color: toggle
                                ? toggleBtnTheme?.secondary || "white"
                                : toggleBtnTheme?.primary || "black",
                            background: toggle
                                ? toggleBtnTheme?.primary || "#319795"
                                : toggleBtnTheme?.secondary || "White",
                        }
                        : {
                            borderRadius: "8px 0 0 8px",
                            padding: "0 24px",
                            color: toggle
                                ? toggleBtnTheme?.secondary || "white"
                                : toggleBtnTheme?.primary || "black",
                            background: toggle
                                ? toggleBtnTheme?.primary || "#319795"
                                : toggleBtnTheme?.secondary || "White",
                        } }, "Yes"),
                React.createElement(Button, { onClick: () => handleButtonClick(false), sx: toggleButton
                        ? {
                            ...toggleButton,
                            color: toggle
                                ? toggleBtnTheme?.secondary || "white"
                                : toggleBtnTheme?.primary || "black",
                            background: toggle
                                ? toggleBtnTheme?.primary || "#319795"
                                : toggleBtnTheme?.secondary || "White",
                        }
                        : {
                            borderRadius: "0 8px 8px 0",
                            padding: "0 24px",
                            color: toggle
                                ? toggleBtnTheme?.primary || "black"
                                : toggleBtnTheme?.secondary || "white",
                            background: toggle
                                ? toggleBtnTheme?.secondary || "White"
                                : toggleBtnTheme?.primary || "#319795",
                        } }, "No")),
            form.formState.errors[code] && (React.createElement(Text, { fontSize: "small", color: "red" }, reactHookFormErrMsg[errroType]))));
    }
    if (response_type === "text") {
        return (React.createElement(Box, null,
            React.createElement(Input, { type: "text", placeholder: "Your answer here...", sx: {
                    ...(inputSelectStyle
                        ? inputSelectStyle
                        : {
                            width: "200px",
                            border: `1px solid #EDF2F7`,
                        }),
                }, ...form.register(code, {
                    required: !!is_mandatory,
                    ...(regex ? { pattern: new RegExp(regex) } : {}),
                }) }),
            form.formState.errors[code] && (React.createElement(Text, { fontSize: "small", color: "red" }, reactHookFormErrMsg[errroType]))));
    }
    if (response_type === "textArea") {
        return (React.createElement(Box, null,
            React.createElement(Textarea, { ...form.register(code, {
                    required: !!is_mandatory,
                    ...(regex ? { pattern: new RegExp(regex) } : {}),
                }), sx: {
                    ...(inputSelectStyle
                        ? inputSelectStyle
                        : {
                            width: "200px",
                            border: `1px solid #EDF2F7`,
                        }),
                }, placeholder: "Your answer here..." }),
            form.formState.errors[code] && (React.createElement(Text, { fontSize: "small", color: "red" }, reactHookFormErrMsg[errroType]))));
    }
    if (response_type === "number") {
        return (React.createElement(Box, null,
            React.createElement(Input, { type: "number", placeholder: "Your answer here...", sx: {
                    ...(inputSelectStyle
                        ? inputSelectStyle
                        : {
                            width: "200px",
                            border: `1px solid #EDF2F7`,
                        }),
                }, ...form.register(code, {
                    required: !!is_mandatory,
                    min: min ? min : 0,
                    ...(max ? { max } : {}),
                }) }),
            form.formState.errors[code] && (React.createElement(Text, { fontSize: "small", color: "red" }, reactHookFormErrMsg[errroType]))));
    }
    if (response_type === "date") {
        return (React.createElement(Box, null,
            React.createElement(Input, { type: "date", sx: {
                    ...(inputSelectStyle
                        ? inputSelectStyle
                        : {
                            width: "200px",
                            border: `1px solid #EDF2F7`,
                        }),
                }, ...form.register(code, {
                    required: !!is_mandatory,
                    ...(min ? { min } : {}),
                    ...(max ? { max } : {}),
                }) }),
            form.formState.errors[code] && (React.createElement(Text, { fontSize: "small", color: "red", paddingLeft: "4px" }, reactHookFormErrMsg[errroType]))));
    }
    if (response_type === "dropdown" &&
        Number(qutestionObject?.options?.length) > 0) {
        return (React.createElement(Box, null,
            React.createElement(SelectController, { form: form, questionObject: qutestionObject, key: qutestionObject.code, style: inputSelectStyle }),
            form.formState.errors[code] && (React.createElement(Text, { fontSize: "small", color: "red" }, reactHookFormErrMsg[errroType]))));
    }
    else
        return React.createElement(React.Fragment, null);
}

function Questions({ qutestionObject, form, isSingle, memberArray, globalStyle, currMember, questionId, }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedMember, setSelectedMember] = useState([]);
    const [isMobile] = useMediaQuery("(max-width: 400px)");
    const handleMemberSelection = (member) => {
        if (selectedMember.includes(member)) {
            setSelectedMember(selectedMember.filter((m) => m !== member));
            const keyToUnregisterAgain = Object.keys(form.getValues()).filter((quesCode) => quesCode.startsWith(member) || quesCode === member);
            keyToUnregisterAgain.forEach((key) => {
                form.unregister(key);
            });
        }
        else {
            setSelectedMember([...selectedMember, member]);
        }
    };
    useEffect(() => {
        if (!isCollapsed) {
            setSelectedMember([]);
        }
    }, [isCollapsed]);
    if (!isSingle && memberArray?.length === 0) {
        throw new Error("Member array is empty");
    }
    return (React.createElement(Grid, { sx: globalStyle?.questionContainer
            ? globalStyle?.questionContainer
            : {
                margin: isMobile ? "8px 0" : "12px 0",
                padding: "12px",
                background: "white",
                borderRadius: "8px",
                boxShadow: "inset 0px 0px 6px rgba(0, 0, 0, 0.1)",
            } },
        React.createElement(Flex, { sx: {
                justifyContent: "space-between",
                alignItems: isMobile ? "" : "flex-start",
                flexDirection: isMobile ? "column" : "row",
            } },
            React.createElement(Box, { sx: { width: isMobile ? "100%" : "60%" } },
                React.createElement(Text, { sx: globalStyle?.question
                        ? globalStyle?.question
                        : { fontSize: "medium", fontWeight: "bold" } },
                    questionId ? `${questionId}. ` : "",
                    qutestionObject.main_question),
                React.createElement(Text, { sx: globalStyle?.description
                        ? globalStyle?.description
                        : { fontSize: "sm", color: "gray.600" } }, qutestionObject.question_description
                    ? qutestionObject.question_description
                    : ``)),
            React.createElement(Flex, { sx: {
                    justifyContent: "end",
                    alignItems: "center",
                    margin: isMobile ? "8px" : 0,
                    width: isMobile ? "100%" : "40%",
                } },
                React.createElement(ResponseField, { qutestionObject: qutestionObject, form: form, setIsCollapsed: setIsCollapsed, inputSelectStyle: globalStyle?.inputSelectStyle, toggleButtonContainer: globalStyle?.toggleButtonContainer, toggleButton: globalStyle?.toggleButton, toggleBtnTheme: globalStyle?.toggleBtnTheme }))),
        isSingle ? (React.createElement(React.Fragment, null, isCollapsed &&
            qutestionObject?.sub_ques?.length &&
            Number(qutestionObject?.sub_ques?.length) > 0
            ? qutestionObject?.sub_ques?.map((subQuestion, i) => {
                return (React.createElement(Questions, { form: form, qutestionObject: {
                        ...subQuestion,
                        code: currMember
                            ? `${currMember}-${subQuestion.code}`
                            : subQuestion.code,
                    }, key: subQuestion.code, isSingle: isSingle, memberArray: memberArray, globalStyle: globalStyle, currMember: currMember ? currMember : "", questionId: questionId ? `${questionId}.${i + 1}` : "1" }));
            })
            : null)) : null,
        !isSingle && isCollapsed ? (React.createElement(Grid, { sx: { margin: "12px 0", padding: isMobile ? 0 : "12px" } },
            React.createElement(Text, { sx: { fontSize: "16px", fontWeight: "bold", color: "#333" } }, "Select Member"),
            React.createElement(Flex, { sx: { gap: "8px" } }, qutestionObject?.sub_ques?.length
                ? memberArray?.map((mem) => {
                    return (React.createElement(Button, { key: mem, onClick: () => handleMemberSelection(mem), width: "fit-content", sx: {
                            margin: isMobile ? "8px 0" : "12px 0",
                            background: selectedMember.includes(mem)
                                ? globalStyle?.toggleBtnTheme?.primary || "#319795"
                                : globalStyle?.toggleBtnTheme?.secondary || "white",
                            border: `1px solid #edf2f7`,
                            color: selectedMember.includes(mem)
                                ? globalStyle?.toggleBtnTheme?.secondary || "white"
                                : globalStyle?.toggleBtnTheme?.primary || "black",
                            "&:hover": {
                                background: globalStyle?.toggleBtnTheme?.primary || "#319795",
                                color: globalStyle?.toggleBtnTheme?.secondary || "white",
                            },
                        } }, mem));
                })
                : null),
            selectedMember.length
                ? selectedMember.map((mem) => {
                    return (React.createElement(React.Fragment, null,
                        React.createElement(Text, { fontSize: "large", fontWeight: "bold", paddingLeft: "12px" }, mem),
                        qutestionObject?.sub_ques?.length &&
                            Number(qutestionObject?.sub_ques?.length) > 0
                            ? qutestionObject?.sub_ques?.map((subQuestion, i) => {
                                return (React.createElement(Questions, { form: form, qutestionObject: {
                                        ...subQuestion,
                                        code: `${mem}-${subQuestion.code}`,
                                    }, key: subQuestion.code, isSingle: true, memberArray: memberArray, globalStyle: globalStyle, currMember: mem, questionId: questionId ? `${questionId}.${i + 1}` : "1" }));
                            })
                            : null));
                })
                : null)) : null));
}

const useGenerateResponseHook = () => {
    const generateResponse = (response, questionState) => {
        const updateValues = (obj, res) => {
            if (res[obj?.code]) {
                obj.value = res[obj?.code];
            }
            if (obj.sub_ques && obj.sub_ques.length > 0) {
                obj.sub_ques.forEach((sub) => updateValues(sub, res));
            }
            return obj;
        };
        const res = questionState?.map((obj) => updateValues({ ...obj }, response));
        return res;
    };
    const restructureObject = (res) => {
        const resKeys = Object.keys(res);
        const uniqueMemberHash = {};
        const resWithoutKeyName = [];
        resKeys.forEach((key) => {
            const keySplit = key.split("-");
            if (keySplit.length > 1) {
                uniqueMemberHash[keySplit[0]] = "";
            }
            else {
                resWithoutKeyName.push(key);
            }
        });
        Object.keys(uniqueMemberHash).forEach((member) => {
            resWithoutKeyName.forEach((key) => {
                const temp = `${member}-${key}`;
                if (resKeys.some((key) => key.startsWith(temp))) {
                    res[temp] = res[key];
                }
            });
        });
        return { res, uniqueMemberHash };
    };
    const generateResponseForMember = (response, data) => {
        const { res, uniqueMemberHash } = restructureObject(response);
        const temp = {};
        const updateValues = (obj, res, member) => {
            const tempCode = `${member}-${obj?.code}`;
            if (res[tempCode]) {
                obj.value = res[tempCode];
            }
            if (obj.sub_ques && obj.sub_ques.length > 0) {
                obj.sub_ques.forEach((sub) => updateValues(sub, res, member));
            }
            return obj;
        };
        Object.keys(uniqueMemberHash).forEach((member) => {
            const tempData = structuredClone(data);
            temp[member] = tempData?.map((obj) => updateValues({ ...obj }, res, member));
        });
        return temp;
    };
    const handleFormSubmit = (ref) => {
        if (ref.current) {
            ref.current.formSubmit();
        }
    };
    return {
        generateResponse,
        generateResponseForMember,
        handleFormSubmit,
    };
};

const Questionnaire = forwardRef(({ questions, config }, ref) => {
    const form = useForm({ mode: "onChange" });
    const submitref = React.useRef(null);
    const [questionState, setQuestionState] = React.useState();
    const { generateResponse, generateResponseForMember } = useGenerateResponseHook();
    const updateDataWithCode = (data, parentCode = "") => {
        return data.map((obj, index) => {
            const code = parentCode ? `${parentCode}_${index}` : `${index + 1}`;
            const updatedObj = { ...obj, code };
            if (Number(obj?.sub_ques?.length) > 0) {
                updatedObj.sub_ques = updateDataWithCode(obj?.sub_ques, code);
            }
            return updatedObj;
        });
    };
    useEffect(() => {
        setQuestionState(updateDataWithCode(questions));
    }, [questions]);
    const onFormSubmit = (event) => {
        if (config.isSingle) {
            config.setResponse(generateResponse(event, questionState));
        }
        else {
            config.setResponse(generateResponseForMember(event, questionState));
        }
    };
    useImperativeHandle(ref, () => ({
        SubmitForm: (e) => {
            form.handleSubmit((event) => {
                onFormSubmit(event);
            })(e);
        },
    }));
    return (React.createElement("form", { ref: submitref, onSubmit: onFormSubmit }, questionState?.length
        ? questionState?.map((questionObject, i) => {
            return (React.createElement(Questions, { key: questionObject.code, qutestionObject: questionObject, form: form, isSingle: config.isSingle, memberArray: config?.memberArray, questionId: (i + 1).toString(), globalStyle: config?.globalStyle }));
        })
        : null));
});

export { Questionnaire };
