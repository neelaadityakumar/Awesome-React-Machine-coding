import { useEffect, useRef, useState } from "react";

const singleNumRegex = /^\d$/;
const numRegex = /^\d+$/;

function InputDigit({ value, isFocused, ...props }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused) inputRef.current?.focus();
  }, [isFocused]);

  return (
    <input
      ref={inputRef}
      type="text"
      maxLength={1}
      inputMode="numeric"
      autoComplete="one-time-code"
      value={value}
      className="w-12 h-12 text-center text-2xl font-semibold bg-gray-200 outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed"
      {...props}
    />
  );
}

export default function OTP({
  length = 6,
  isDisabled = false,
  onSubmit = () => {},
}) {
  const [code, setCode] = useState(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);

  function clampIndex(index) {
    return Math.max(0, Math.min(index, length - 1));
  }

  function onFocus(index) {
    setFocusedIndex(index);
  }

  function onKeyDown(event, index) {
    switch (event.key) {
      case "ArrowLeft":
        setFocusedIndex(clampIndex(focusedIndex - 1));
        break;
      case "ArrowRight":
        setFocusedIndex(clampIndex(focusedIndex + 1));
        break;
      case "Backspace":
        if (code[index]) {
          setCode(code.map((c, i) => (i === index ? "" : c)));
        } else if (index > 0) {
          setCode(code.map((c, i) => (i === index - 1 ? "" : c)));
          setFocusedIndex(clampIndex(index - 1));
        }
        break;
      default: {
        const value = event.key;
        if (!singleNumRegex.test(value)) return;

        setCode(code.map((c, i) => (i === index ? value : c)));
        setFocusedIndex(clampIndex(focusedIndex + 1));
      }
    }
  }

  function onPaste(event) {
    event.preventDefault();
    const pastedCode = event.clipboardData.getData("text");

    if (!numRegex.test(pastedCode)) return;

    setCode(code.map((c, i) => pastedCode[i] ?? c));
    setFocusedIndex(clampIndex(pastedCode.length));
  }

  function onReset() {
    setCode(Array(length).fill(""));
    setFocusedIndex(0);
  }

  const isSubmitEnabled = code.every(Boolean);
  const isResetEnabled = code.some(Boolean);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(code.join(""));
        }}
      >
        <div className="flex gap-2">
          {code.map((digit, index) => (
            <InputDigit
              key={index}
              value={digit}
              isFocused={focusedIndex === index}
              disabled={isDisabled}
              onFocus={() => onFocus(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              onPaste={onPaste}
            />
          ))}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            type="reset"
            className="border-2 border-black px-4 py-2 text-black disabled:opacity-25 disabled:cursor-not-allowed"
            disabled={!isResetEnabled || isDisabled}
            onClick={onReset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 border-2 border-black disabled:opacity-25 disabled:cursor-not-allowed"
            disabled={!isSubmitEnabled || isDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
