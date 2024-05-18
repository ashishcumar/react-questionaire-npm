import { QUESTION } from "../../../interface";
declare const useGenerateResponseHook: () => {
    generateResponse: (response: {
        [key: string]: any;
    }, questionState: QUESTION[]) => QUESTION[];
    generateResponseForMember: (response: {
        [key: string]: any;
    }, data: QUESTION[]) => {
        [key: string]: QUESTION[];
    };
    handleFormSubmit: (ref: {
        current: {
            formSubmit: () => void;
        };
    }) => void;
};
export default useGenerateResponseHook;
