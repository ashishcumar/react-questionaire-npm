# 📝 React Questionnaire Package

## Introduction
Welcome to the React Questionnaire Package! 🚀

The React Questionnaire Package is your all-in-one solution for building dynamic and interactive surveys, quizzes, feedback forms, and more within your React applications. 📊✨. It reduces developer time by simplifying the implementation of complex logic and handling error cases effectively. ⏱️🛠️

## Features
List of key features provided by the package:

- **Dynamic Forms**: Easily create dynamic and interactive forms with nested questions.
- **Survey Component**: Build engaging surveys and questionnaires for your users.
- **React Hook Form Integration**: Seamlessly integrate with React Hook Form for efficient state management and validation.
- **Custom Styling**: Customize the appearance of your forms to match your application's design.
- **Accessible UX**: Prioritize accessibility with an accessible user experience out-of-the-box.
- **Responsive Design**: Ensure a seamless experience across devices with responsive design.
- **Efficient State Management**: Manage form state efficiently for optimal performance.
- **Form Validation**: Validate form data to ensure accuracy and data integrity.
- **User Engagement**: Engage users with interactive forms and surveys.
- **Scalable Solution**: Scalable and suitable for projects of all sizes.
- **Extensible Components**: Extend and customize components to suit your specific needs.
- **Feedback Forms**: Gather valuable user feedback with customizable feedback forms.
- **Quiz Component**: Create quizzes for assessments or educational purposes.
- **Mobile-friendly Forms**: Ensure a smooth experience on mobile devices.
- **Error Handling**: Handle errors gracefully to enhance the user experience.


## Installation

To install the package, use npm or yarn:

```sh
npm install react-questionaire
```
or
```sh
yarn add react-questionaire
```

## Use Cases

The `react-questionnaire` component offers a versatile solution for building interactive forms and surveys within your React application. Here's a breakdown of its potential use cases:

- **Surveys**:
Create feedback forms to gather user opinions and insights on products, services, or events.
- **Quizzes**:
Develop educational quizzes for students or training programs, incorporating multiple-choice, true/false, and open-ended questions.
- **Forms**:
Build complex forms with conditional logic and validation for registration, onboarding, or data collection.

## Usage

```
import React, { useRef, useState } from "react";
import { Questionnaire } from "react-questionaire";
import { data } from "./data"; // Import your question data

const App = () => {
  const [response, setResponse] = useState();
  const innerComponentRef = useRef();

  const handleSubmit = () => {
    if (innerComponentRef.current) {
      innerComponentRef.current.SubmitForm();
    }
  };

  return (
    <div>
      <Questionnaire
        ref={innerComponentRef}
        questions={data}
        config={{
          isSingle: true,
          setResponse: setResponse,
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;

```

## Props

**Questions:**

- `questions: QUESTION[] (Required)`: An array of question objects to be rendered. Each question object should define the content and structure of the question.

**Config:**

- `config: CONFIG (Required)`: A configuration object to customize the questionnaire. This object allows you to define various aspects of the questionnaire's behavior and appearance.

## QUESTION Interface (TypeScript)

This interface defines the structure of a question object used within your questionnaire component.

```
interface QUESTION {
  main_question: string;
  question_description?: string | null;
  response_type: "bool" | "text" | "number" | "dropdown" | "textArea" | "date" | string;
  value: string | boolean | number | object | null;
  sub_ques?: QUESTION[];
  is_mandatory: boolean | number;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  regex?: string;
  multi_select?: boolean;
}
```

**Properties:**

* **main_question: string**
    * The primary text of the question that will be displayed to the user.
* **question_description (optional): string | null**
    * Additional information or explanation about the question.
* **response_type: "bool" | "text" | "number" | "dropdown" | "textArea" | "date" | string**
    * Defines the type of response expected from the user. Options include:
        * `"bool"`: Boolean (true/false)
        * `"text"`: Text input
        * `"number"`: Numeric input
        * `"dropdown"`: Dropdown selection from available options
        * `"textArea"`: Multi-line text input
        * `"date"`: Date selection
* **value (optional): string | boolean | number | object | null**
    * The default value for the question.
* **sub_ques (optional): QUESTION[]**
    * An array containing sub-questions that are nested within this question.
* **is_mandatory: boolean | number**
    * Indicates if the question is mandatory for the user to answer. Can be a boolean (true/false) or a number representing a validation rule.
* **options (optional): { label: string; value: any }[]**
    * An array of objects defining the options available for selection if `response_type` is `"dropdown"`. Each object should have the following properties:
        * `label`: The text displayed for the option.
        * `value`: The actual value associated with the option.
* **min (optional): number**
    * Minimum allowed value for numeric responses.
* **max (optional): number**
    * Maximum allowed value for numeric responses.
* **regex (optional): string**
    * A regular expression string used to validate text input.
* **multi_select (optional): boolean**
    * Indicates if multiple selections are allowed for dropdown responses.


## CONFIG Interface (TypeScript)

This interface defines the configuration options for your questionnaire component. It allows you to customize various aspects of the questionnaire's behavior and appearance.

**Properties:**

* **isSingle: boolean**
    * Determines if the questionnaire allows only one response or multiple responses simultaneously. 
        * `true`: Only one response can be submitted at a time.
        * `false` (default): Multiple responses can be submitted simultaneously.
* **setResponse:**
    * A function used to update the state of the questionnaire responses. This allows you to capture user input and manage the response data.
* **memberArray (optional)**
    * An optional array of strings that can be used to filter which questions are displayed based on membership criteria (e.g., user roles).
* **globalStyle (optional):**
    * An optional object containing style properties for various elements within the questionnaire. These properties utilize the `React.CSSProperties` type to define CSS styles directly within your configuration. 
        * `question`: Styles for the main question text.
        * `subQuestion`: Styles for sub-questions.
        * `description`: Styles for the question description text.
        * `toggleButton`: Styles for the toggle button (if applicable).
        * `inputSelectStyle`: Styles for the input select element (used for dropdown responses).
        * `toggleButtonContainer`: Styles for the container element holding the toggle button.
        * `questionContainer`: Styles for the container element holding the question.
        * `toggleBtnTheme (optional)`: An optional object defining themes for the toggle button:
            * `primary`: The primary color for the toggle button.
            * `secondary (optional)`: An optional secondary color for the toggle button.

