import geekHackathonImg from '../components/geekHackathonTimer.png';
import singaporeImg from '../components/singapore.png';

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  isGame: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Geek Hackathon Timer',
    description: 'ハッカソンで作成した高機能タイマー。Docker でデプロイし、Next.js で UI / 設定を柔軟に管理。',
    techStack: ['Next.js', 'Docker', 'TypeScript'],
    imageUrl: geekHackathonImg,
    demoUrl: 'https://docker-next-js-geek-hackathon.vercel.app/',
    isGame: false,
  },
  {
    id: 2,
    title: 'Singapore Itinerary',
    description: '個人開発の旅行しおりアプリ。旅程をタイムラインで俯瞰し、地図と連動してチェックできる Web 体験。',
    techStack: ['Next.js', 'React', 'TypeScript'],
    imageUrl: singaporeImg,
    demoUrl: 'https://singapore-itinerary-sand.vercel.app/',
    isGame: false,
  },
  {
    id: 3,
    title: 'Mini Games (Neon Runner ほか)',
    description: 'Unity / WebGL で制作中の自作ミニゲームコレクション。Neon Runner などを順次ブラウザ対応予定。',
    techStack: ['Unity', 'C#', 'WebGL'],
    imageUrl: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 4,
    title: 'Photon Drift',
    description: 'ネオンコリドーを滑空する自作ランナー。Cinemachine でドリフトカメラを実装中。',
    techStack: ['Unity', 'WebGL', 'Cinemachine'],
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 5,
    title: 'Aurora Dash',
    description: '極光の中をパークールする横スクロール。シェーダー演出を含む自作 WebGL プロトタイプ。',
    techStack: ['Unity', 'WebGL', 'Shader Graph'],
    imageUrl: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 6,
    title: 'Gravity Flip',
    description: '重力反転ギミックの自作パズルラン。タイムアタック対応の短編コースを構築中。',
    techStack: ['Unity', 'WebGL', 'C#'],
    imageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 7,
    title: 'Echo Runner',
    description: 'サウンド波形を足場にする自作リズムランナー。BPM連動ギミックを開発中。',
    techStack: ['Unity', 'WebGL', 'FMOD'],
    imageUrl: 'https://images.unsplash.com/photo-1470229522910-023c28b1dfd7?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 8,
    title: 'Holo Sprint',
    description: 'ホログラム障害物を抜けるスプリント。ゴースト機能を自作で実装予定。',
    techStack: ['Unity', 'WebGL', 'URP'],
    imageUrl: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 9,
    title: 'Orbital Shield',
    description: '惑星軌道上でシールドを操る自作タワーディフェンス。VFX Graph で電磁演出を制作中。',
    techStack: ['Unity', 'WebGL', 'VFX Graph'],
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 10,
    title: 'Cyber Tiles',
    description: '床パネル順序でエフェクトが変化するスコアアタック。入力システムを自作チューニング中。',
    techStack: ['Unity', 'WebGL', 'Input System'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 11,
    title: 'Pulse Jumper',
    description: 'ハートビート同期の縦スクロール。DOTween で演出を調整中の自作プロトタイプ。',
    techStack: ['Unity', 'WebGL', 'DOTween'],
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 12,
    title: 'Wave Rider',
    description: '海上ドローンを操作するウェーブサーフ。ブーストとカーブ挙動を自作チューニング中。',
    techStack: ['Unity', 'WebGL', 'Cinemachine'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
  {
    id: 13,
    title: 'Nebula Trail',
    description: '星雲を駆けるライドシューター。ロックオンとドリフトを自作で組み合わせて開発中。',
    techStack: ['Unity', 'WebGL', 'C#'],
    imageUrl: 'https://images.unsplash.com/photo-1447433819943-74a20887a81e?auto=format&fit=crop&w=1200&q=80',
    isGame: true,
  },
];
