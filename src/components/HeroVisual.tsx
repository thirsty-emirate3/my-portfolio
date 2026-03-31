import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const heroSlides = [
    {
        src: '/mcdonalds.png',
        title: '飲食店バイトでのマネジメント経験',
        detail: '外国人スタッフとの連携ミスで地域コンテスト3位に留まったが、トレーナーとして指示の英語統一と適材適所の配置を提案・実行。抵抗のあるメンバーとも対話しながら役割とシフトを調整し、定着させた結果、提供時間を約30%短縮し地域コンテスト1位を達成。多様な価値観を持つチームをまとめて成果に結びつけた。',
        period: '2021 – 2024',
    },
    {
        src: '/foregin_internship.png',
        title: '未知の環境でのチャンレンジ',
        detail: '大学4年次に海外の語学学校でインターンシップに参加し、チームでの成果創出を意識して専門外のSNSマーケティングに挑戦した。当初は定型業務を担当していたが、限られた期間の中でチームに価値を出せていないことに危機感を抱き、SNS運用への挑戦を提案し「フォロワー数を2倍にする」という目標を共有した。SNSトレンドを分析し話題性の高い発信へ刷新するとともに、他校比較を通じて自校の強みを再整理し、伝わるコンテンツへ再設計した。さらに役割分担を見直しながらチームで改善を重ねた。その結果、3週間でフォロワー数を2倍以上に伸ばすことができた。この経験から、周囲を巻き込みながらチームで成果を創出する力を身につけた。',
        period: '2024',
    },
    {
        src: '/warpspace.png',
        title: '長期インターン（エンジニア）',
        detail: '宇宙通信ベンチャーで幅広い技術を学ぶ。',
        period: '2024 – 現在',
    },
    {
        src: '/my_app.png',
        title: '趣味開発 / ハッカソン',
        detail: 'ハッカソンや個人開発で複数アプリを制作し、ユーザー視点を重視した設計を実践。',
        period: '2021 –',
    },
    {
        src: '/my_lab.png',
        title: '研究室',
        detail: '計算知能・マルチメディア研究室に所属し、グラフェンスライムという未知分野の研究に挑戦中。',
        period: '2024 –',
    },
    {
        src: '/youtube_activity.svg',
        title: 'YouTube活動',
        detail: 'YouTube運営を通して顧客視点を培った（登録者1.8万人）。企画から分析・改善まで回し、反応を見ながら「伝え方」と「導線」を磨いた。',
        period: '2021 –',
    },
];

export const HeroVisual = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSlide = heroSlides[activeIndex];

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
        }, 12000);

        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.16),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.16),transparent_55%)]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="relative z-10 w-full h-full"
            >
                <div className="relative w-full h-full overflow-hidden rounded-[1.5rem] bg-white/20 shadow-[0_30px_70px_rgba(15,23,42,0.22)]">
                    <div className="relative h-full w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSlide.src}
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div
                                    className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-30 blur-xl"
                                    style={{ backgroundImage: `url(${activeSlide.src})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-slate-900/12" />
                                <div className="absolute inset-0">
                                    <img
                                        src={activeSlide.src}
                                        alt="Haruto Suzaki portfolio visual"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
                        <div className="absolute bottom-4 right-4 flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                {heroSlides.map((slide, index) => (
                                    <span
                                        key={slide.src}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
