"use client"

import { useEffect, useState } from "react"
import { Award } from "lucide-react"

type ContributionType = "団結" | "SMALLファンダム" | "MEDIUMファンダム" | "BIGファンダム"

type Contributor = {
  name: string
  contribution: ContributionType
}

type Item = Contributor & {
  id: number
  position: "left" | "center" | "right"
}

// 貢献者データの例
const contributors: Contributor[] = [
  { name: "よっしー", contribution: "BIGファンダム" },
  { name: "kopi", contribution: "BIGファンダム" },
]

const contributionStyles: Record<ContributionType, { bgColor: string, textColor: string, borderColor: string }> = {
  "団結": {
    bgColor: "bg-black",
    textColor: "text-white",
    borderColor: "border-gray-400"
  },
  "SMALLファンダム": {
    bgColor: "bg-black",
    textColor: "text-white",
    borderColor: "border-blue-400"
  },
  "MEDIUMファンダム": {
    bgColor: "bg-black",
    textColor: "text-white",
    borderColor: "border-yellow-400"
  },
  "BIGファンダム": {
    bgColor: "bg-black",
    textColor: "text-white",
    borderColor: "border-yellow-400"
  }
}

export default function ContributorDisplay() {
  const [items, setItems] = useState<Item[]>(
    contributors.map((contributor, index) => ({
      ...contributor,
      id: index,
      position: index === 0 ? "center" : "right",
    })),
  )

  // 5秒ごとに次の貢献者に切り替える
  useEffect(() => {
    const interval = setInterval(() => {
      // 現在の中央の項目を左に移動
      setItems((current) =>
        current.map((item) => {
          if (item.position === "center") {
            return { ...item, position: "left" }
          }
          if (
            item.position === "right" &&
            item.id === ((current.find((i) => i.position === "center")?.id ?? 0) + 1) % contributors.length
          ) {
            return { ...item, position: "center" }
          }
          return item
        }),
      )

      // アニメーション終了後に位置をリセット
      setTimeout(() => {
        setItems((current) => {
          const centerItemId = current.find((i) => i.position === "center")?.id ?? 0

          return current.map((item) => {
            if (item.position === "left") {
              return { ...item, position: "right" }
            }
            return item
          })
        })
      }, 1000) // アニメーション時間より長く
    }, 5000) // 表示時間

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 overflow-hidden">
      <div className="w-full max-w-4xl relative">
        {/* シンプルな枠 */}
        <div className="absolute inset-0 border-8 border-yellow-500 rounded-lg" />

        {/* 内容 - 一方向スライドアニメーション */}
        <div className="bg-black p-16 rounded-lg flex flex-col items-center justify-center min-h-[70vh] relative z-10 overflow-hidden">
          {/* 各貢献者のコンテンツ */}
          {items.map((item) => (
            <div
              key={item.id}
              className={`absolute w-full transition-all duration-800 ease-in-out ${item.position === "center"
                ? "translate-x-0 opacity-100"
                : item.position === "left"
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
                }`}
            >
              <ContentDisplay contributor={contributors[item.id]} />
            </div>
          ))}

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
function ContentDisplay({ contributor }: { contributor: Contributor }) {
  const styles = contributionStyles[contributor.contribution];

  return (
    <div className={`${styles.bgColor} p-16 rounded-lg flex flex-col items-center justify-center min-h-[70vh] relative z-10 overflow-hidden`}>
      {/* ヘッダー */}
      <h1 className={`text-7xl md:text-8xl lg:text-9xl font-bold ${styles.textColor} mb-12 text-center`}>{contributor.contribution}</h1>

      {/* 装飾線 */}
      <div className={`w-3/4 h-1 ${styles.borderColor} mb-12 mx-auto`}></div>

      {/* 名前 */}
      <div className={`text-8xl md:text-9xl lg:text-10xl font-bold ${styles.textColor} mb-12 text-center`}>{contributor.name}</div>

      {/* 装飾線 */}
      <div className={`w-3/4 h-1 ${styles.borderColor} mb-8 mx-auto`}></div>

      {/* 日付 */}
      <div className={`text-3xl md:text-4xl ${styles.textColor} font-semibold text-center`}>
        {new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}
      </div>
    </div>
  )
}
