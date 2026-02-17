import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(440);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const startSound = () => {
    // 创建 AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new (
        window.AudioContext || window.webkitAudioContext
      )();
    }

    const audioContext = audioContextRef.current;

    // 创建 Oscillator（振荡器）
    oscillatorRef.current = audioContext.createOscillator();
    oscillatorRef.current.type = "sine"; // 正弦波
    oscillatorRef.current.frequency.setValueAtTime(
      frequency,
      audioContext.currentTime,
    );

    // 创建 GainNode 用于控制音量
    gainNodeRef.current = audioContext.createGain();
    gainNodeRef.current.gain.setValueAtTime(0.3, audioContext.currentTime);

    // 连接节点
    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContext.destination);

    // 开始播放
    oscillatorRef.current.start();
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
      setIsPlaying(false);
    }
  };

  const handleFrequencyChange = (e) => {
    const newFreq = parseInt(e.target.value);
    setFrequency(newFreq);
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(
        newFreq,
        audioContextRef.current.currentTime,
      );
    }
  };

  return (
    <div className="app">
      <h1>Web Audio API 演示</h1>
      <div className="controls">
        <div className="control-group">
          <label>
            频率: {frequency} Hz
            <input
              type="range"
              min="100"
              max="1000"
              value={frequency}
              onChange={handleFrequencyChange}
              className="slider"
            />
          </label>
        </div>
        <div className="button-group">
          <button
            onClick={startSound}
            disabled={isPlaying}
            className="btn btn-start"
          >
            播放声音
          </button>
          <button
            onClick={stopSound}
            disabled={!isPlaying}
            className="btn btn-stop"
          >
            停止声音
          </button>
        </div>
      </div>
      <div className="info">
        <h2>说明</h2>
        <p>这是一个简单的 Web Audio API 演示，展示了如何生成和控制音频。</p>
        <ul>
          <li>使用 Oscillator 生成正弦波</li>
          <li>通过滑块调整声音频率（100-1000 Hz）</li>
          <li>使用 GainNode 控制音量</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
