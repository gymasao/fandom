"use client"

import { useEffect, useState } from "react"
import { Award } from "lucide-react"

// 貢献者データの例
const contributors = [
  { name: "田中 太郎", contribution: "営業貢献者" },
  { name: "佐藤 花子", contribution: "技術貢献者" },
  { name: "鈴木 一郎", contribution: "サポート貢献者" },
  { name: "山田 優子", contribution: "マーケティング貢献者" },
  { name: "伊藤 健太", contribution: "デザイン貢献者" },
]

export default function AdvancedAnimationDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [animationState, setAnimationState] = useState("visible") // "visible", "exiting", "entering"

  // 5秒ごとに次の貢献者に切り替える
  useEffect(() => {
    const interval = setInterval(() => {
      // 現在の表示を退場させる
      setAnimationState("exiting")

      // 退場アニメーション後に次のインデックスを設定
      setTimeout(() => {
        const next = (currentIndex + 1) % contributors.length
        setNextIndex(next)
        setAnimationState("entering")

        // 入場アニメーション後に現在のインデックスを更新
        setTimeout(() => {
          setCurrentIndex(next)
          setAnimationState("visible")
        }, 500)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const currentContributor = contributors[currentIndex]
  const nextContributor = contributors[nextIndex]

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 p-4 overflow-hidden">
      <div className="w-full max-w-4xl relative">
        {/* 表彰状の装飾的な枠 */}
        <div className="absolute inset-0 border-8 border-amber-300 rounded-lg" />
        <div className="absolute inset-3 border-2 border-amber-500 rounded-lg" />

        {/* コーナー装飾 */}
        <div className="absolute -top-5 -left-5 text-amber-600">
          <Award size={64} className="fill-amber-200 stroke-amber-600" />
        </div>
        <div className="absolute -top-5 -right-5 text-amber-600">
          <Award size={64} className="fill-amber-200 stroke-amber-600" />
        </div>
        <div className="absolute -bottom-5 -left-5 text-amber-600">
          <Award size={64} className="fill-amber-200 stroke-amber-600" />
        </div>
        <div className="absolute -bottom-5 -right-5 text-amber-600">
          <Award size={64} className="fill-amber-200 stroke-amber-600" />
        </div>

        {/* 内容 - 高度なアニメーション付き */}
        <div className="bg-amber-50 p-16 rounded-lg flex flex-col items-center justify-center min-h-[70vh] relative z-10 overflow-hidden">
          {/* 現在表示中のコンテンツ */}
          <div
            className={`absolute w-full transition-all duration-500 ease-in-out
              ${
                animationState === "visible"
                  ? "opacity-100 transform translate-x-0"
                  : animationState === "exiting"
                    ? "opacity-0 transform -translate-x-full"
                    : "hidden"
              }`}
          >
            <ContentDisplay contributor={currentContributor} />
          </div>

          {/* 次に表示するコンテンツ */}
          <div
            className={`absolute w-full transition-all duration-500 ease-in-out
              ${
                animationState === "entering"
                  ? "opacity-100 transform translate-x-0"
                  : animationState === "exiting"
                    ? "opacity-0 transform translate-x-full"
                    : "hidden"
              }`}
          >
            <ContentDisplay contributor={nextContributor} />
          </div>
        </div>
      </div>
    </div>
  )
}

// コンテンツ表示用のコンポーネント
function ContentDisplay({ contributor }) {
  return (
    <>
      {/* ヘッダー */}
      <h1 className="text-5xl md:text-6xl font-bold text-amber-800 mb-12 text-center">{contributor.contribution}</h1>

      {/* 装飾線 */}
      <div className="w-3/4 h-1 bg-amber-400 mb-12 mx-auto"></div>

      {/* 名前 */}
      <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-amber-900 mb-12 text-center">
        {contributor.name}
      </div>

      {/* 装飾線 */}
      <div className="w-3/4 h-1 bg-amber-400 mb-8 mx-auto"></div>

      {/* 日付 */}
      <div className="text-3xl md:text-4xl text-amber-800 font-semibold text-center">
        {new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}
      </div>
    </>
  )
}
