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
    title: 'Neon Runner VR-lite',
    description: 'シンセウェーブな夜景を疾走する、自作のランナー系WebGLゲーム。',
    techStack: ['Unity', 'C#', 'Cinemachine'],
    imageUrl: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=900&q=80',
    demoUrl: 'https://funhtml5games.com?embed=neonrace',
    isGame: true,
  },
  {
    id: 2,
    title: 'Orbital Defense',
    description: 'AIコアを守り抜くタワーディフェンス。シェーダーでネオン粒子を演出。',
    techStack: ['Unity', 'C#', 'Shader Graph'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80',
    demoUrl: 'https://funhtml5games.com?embed=planetdefense',
    isGame: true,
  },
  {
    id: 3,
    title: 'AI Creative Lab',
    description: '生成AIのアウトプットを展示するランディングサイト。グラスモーフィズムで世界観を統一。',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    imageUrl: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80',
    demoUrl: 'https://example.com/creative-lab',
    repoUrl: 'https://github.com/example/creative-lab',
    isGame: false,
  },
  {
    id: 4,
    title: 'Metaverse Studio',
    description: '3Dプロダクトのビジュアライゼーションサイト。スクロールに連動したモーションを実装。',
    techStack: ['Next.js', 'Three.js', 'GSAP'],
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    demoUrl: 'https://example.com/metaverse-studio',
    repoUrl: 'https://github.com/example/metaverse-studio',
    isGame: false,
  },
];
