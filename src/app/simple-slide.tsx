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

export default function SimpleSlideDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState("next")
  const [isAnimating, setIsAnimating] = useState(false)

  // 次のインデックスを計算
  const nextIndex = (currentIndex + 1) % contributors.length

  // 5秒ごとに次の貢献者に切り替える
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next")
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentIndex(nextIndex)
        setIsAnimating(false)
      }, 600) // アニメーション時間
    }, 5000) // 表示時間

    return () => clearInterval(interval)
  }, [currentIndex, nextIndex])

  const currentContributor = contributors[currentIndex]
  const nextContributor = contributors[nextIndex]

  // スライドアニメーションのクラスを取得
  const getSlideClasses = (isCurrent) => {
    if (!isAnimating) return "translate-x-0 opacity-100"

    if (isCurrent) {
      return "translate-x-[-100%] opacity-0"
    } else {
      return "translate-x-0 opacity-100"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 overflow-hidden">
      <div className="w-full max-w-4xl relative">
        {/* シンプルな枠 */}
        <div className="absolute inset-0 border-8 border-yellow-500 rounded-lg" />

        {/* 内容 - シンプルなスライドアニメーション */}
        <div className="bg-black p-16 rounded-lg flex flex-col items-center justify-center min-h-[70vh] relative z-10 overflow-hidden">
          {/* 現在表示中のコンテンツ */}
          <div className={`absolute w-full transition-all duration-600 ease-out ${getSlideClasses(true)}`}>
            <ContentDisplay contributor={currentContributor} />
          </div>

          {/* 次に表示するコンテンツ */}
          {isAnimating && (
            <div
              className={`absolute w-full transition-all duration-600 ease-out translate-x-[100%] ${getSlideClasses(false)}`}
            >
              <ContentDisplay contributor={nextContributor} />
            </div>
          )}

          {/* コーナー装飾 - シンプルに */}
          <Award size={64} className="absolute top-4 left-4 text-yellow-500" />
          <Award size={64} className="absolute top-4 right-4 text-yellow-500" />
          <Award size={64} className="absolute bottom-4 left-4 text-yellow-500" />
          <Award size={64} className="absolute bottom-4 right-4 text-yellow-500" />
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
      <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 mb-12 text-center">{contributor.contribution}</h1>

      {/* 装飾線 */}
      <div className="w-3/4 h-1 bg-yellow-500 mb-12 mx-auto"></div>

      {/* 名前 */}
      <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-12 text-center">{contributor.name}</div>

      {/* 装飾線 */}
      <div className="w-3/4 h-1 bg-yellow-500 mb-8 mx-auto"></div>

      {/* 日付 */}
      <div className="text-3xl md:text-4xl text-yellow-500 font-semibold text-center">
        {new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}
      </div>
    </>
  )
}
