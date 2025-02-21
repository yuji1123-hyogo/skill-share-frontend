"use client"

import { useState } from "react"

const TextInputWithButton = ({ onSubmit, placeholder, buttonText = "送信" }) => {
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    setError("")
    
    // 空文字チェック
    if (!inputValue.trim()) {
      setError("内容を入力してください")
      return
    }

    onSubmit(inputValue.trim())
    setInputValue("") // 送信後にクリア
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-dark-secondary text-gray-100 rounded-lg px-4 py-2 border border-dark-accent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!inputValue.trim()}
        >
          {buttonText}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default TextInputWithButton