import { useState, type CSSProperties, type ReactElement } from 'react';

const styles: Record<string, CSSProperties> = {
  main: {
    padding: '20px',
  },
  title: {
    color: '#5C6AC4',
  },
};

export default function Ex1(): ReactElement {
  const [count, setCount] = useState(10);
  const [count2, setCount2] = useState(10);
  const [text, setText] = useState('t');

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Hello, World!</h1>

      <div>
        {/* Count 1 Controls */}
        <button onClick={() => { if (count < 20) { setCount(prev => prev + 3); } }}>
          +
        </button>

        <span> count {count} </span>

        <button onClick={() => { if (count > 0) { setCount(prev => prev - 2); } }}>
          -
        </button>

        {/* Text Controls */}
        <button
          onClick={() => {
            if (text.length < 20) {
              setText(prev => prev + 't');
            }
          }}
        >
          +
        </button>

        <p>{text}</p>

        <button
          onClick={() => {
            if (text.length > 1) {
              setText(prev => prev.slice(0, -1));
            }
          }}
        >
          -
        </button>

        {/* Count 2 Controls */}
        <button onClick={() => {
          if (count2 < 20) {
            setCount2(prevCount => prevCount + 1);
            setCount2(prevCount => prevCount + 1);
            setCount2(prevCount => prevCount + 1);
            setCount2(prevCount => prevCount + 1);
          }
        }}>
          +
        </button>

        <span> count {count2} </span>

        <button onClick={() => { if (count2 > 0) { setCount2(prevCount => prevCount - 1); } }}>
          -
        </button>
      </div>
    </div>
  );
}