import React from "react";

const useInputState = (
    initialValue: string = "",
): {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
} => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue("");
    };

    return {
        value,
        onChange,
        reset,
    };
};

export default useInputState;