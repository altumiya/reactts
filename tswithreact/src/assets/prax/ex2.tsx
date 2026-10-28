import React, { useState, useCallback, useRef, useEffect, type CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  main: { padding: '20px' },
  title: { color: '#5C6AC4' },
};

export default function Ex2(): React.JSX.Element {
  const [count, setCount] = useState<number>(0);
  const [length, setLength] = useState<number>(8);
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
  const [charAllowed, setCharAllowed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const passwordRef = useRef<HTMLInputElement>(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);

    if (navigator?.clipboard?.writeText && window.isSecureContext) {
      navigator.clipboard.writeText(password).catch(() => {
        document.execCommand('copy');
      });
    } else {
      document.execCommand('copy');
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Hello, World!</h1>
      <div>
        <button onClick={() => setCount((prev: number) => prev + 1)}>
          count {count}
        </button>
      </div>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev: boolean) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev: boolean) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}