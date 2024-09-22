import { useState } from "react";

export default function Player({name, symbol, isActive, onNameChange}) {
  const [isEditing, setIsEditing] = useState(false)
  const [playerName, setPlayerName] = useState(name)
  const handleBtnClick = () => {
    setIsEditing(isEditing => !isEditing)
    isEditing && onNameChange(symbol, playerName)
  }
  const handleChange = (e) => {
    setPlayerName(e.target.value)
  }
  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        { isEditing ? <input type="text" value={playerName} onChange={handleChange} required/> : <span className="player-name">{playerName}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleBtnClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
