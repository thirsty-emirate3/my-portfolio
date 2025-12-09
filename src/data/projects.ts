import sortThumb from '../assets/thumbnails/sorting_visualizer.png';
import timerThumb from '../assets/thumbnails/hackathon_timer.png';
import sgThumb from '../assets/thumbnails/singapore_itinerary.png';
import neuralThumb from '../assets/thumbnails/neural_puzzle.png';
import typerThumb from '../assets/thumbnails/code_typer.png';
import lifeThumb from '../assets/thumbnails/thumb_game_of_life.png';
import pathThumb from '../assets/thumbnails/thumb_pathfinding.png';
import treeThumb from '../assets/thumbnails/thumb_fractal_tree.png';
import bstThumb from '../assets/thumbnails/thumb_bst.png';
import mazeThumb from '../assets/thumbnails/thumb_maze.png';
import mergeThumb from '../assets/thumbnails/thumb_merge_sort.png';
import aStarThumb from '../assets/thumbnails/thumb_a_star.png';
import nQueensThumb from '../assets/thumbnails/thumb_n_queens.png';
import hanoiThumb from '../assets/thumbnails/thumb_hanoi.png';
import tspThumb from '../assets/thumbnails/thumb_tsp.png';
import fourierThumb from '../assets/thumbnails/thumb_fourier.png';
import clothThumb from '../assets/thumbnails/thumb_cloth.png';
import boidsThumb from '../assets/thumbnails/thumb_boids.png';
import tetrisThumb from '../assets/thumbnails/thumb_tetris.png';
import minesweeperThumb from '../assets/thumbnails/thumb_minesweeper.png';
import _2048Thumb from '../assets/thumbnails/thumb_2048.png';
import snakeThumb from '../assets/thumbnails/thumb_snake.png';
import blockBreakerThumb from '../assets/thumbnails/thumb_block_breaker.png';
import memoryThumb from '../assets/thumbnails/thumb_memory.png';
import whackABugThumb from '../assets/thumbnails/thumb_whack_a_bug.png';
import simonThumb from '../assets/thumbnails/thumb_simon.png';

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  isGame: boolean;
  category?: 'Game' | 'Algorithm' | 'Project';
  component?: React.ComponentType;
}

import { SortingVisualizer } from '../components/games/SortingVisualizer';

import { NeuralPuzzle } from '../components/games/NeuralPuzzle';
import { CodeTyper } from '../components/games/CodeTyper';
import TetrisGame from '../components/games/TetrisGame';
import MinesweeperGame from '../components/games/MinesweeperGame';
import Game2048 from '../components/games/Game2048';
import SnakeGame from '../components/games/SnakeGame';
import BlockBreakerGame from '../components/games/BlockBreakerGame';
import MemoryGame from '../components/games/MemoryGame';
import WhackABugGame from '../components/games/WhackABugGame';
import SimonGame from '../components/games/SimonGame';
import MergeSortVisualizer from '../components/games/MergeSortVisualizer';
import AStarVisualizer from '../components/games/AStarVisualizer';
import NQueensVisualizer from '../components/games/NQueensVisualizer';
import HanoiVisualizer from '../components/games/HanoiVisualizer';
import TSPVisualizer from '../components/games/TSPVisualizer';
import FourierVisualizer from '../components/games/FourierVisualizer';
import ClothVisualizer from '../components/games/ClothVisualizer';
import BoidsVisualizer from '../components/games/BoidsVisualizer';
import { GameOfLife } from '../components/games/GameOfLife';
import { RecursiveTree } from '../components/games/RecursiveTree';
import { PathfindingVisualizer } from '../components/games/PathfindingVisualizer';
import { BSTVisualizer } from '../components/games/BSTVisualizer';
import { MazeVisualizer } from '../components/games/MazeVisualizer';
import { SlidePuzzle } from '../components/games/SlidePuzzle';

export const projects: Project[] = [
  {
    id: 38,
    title: '15パズル (Slide)',
    description: 'バラバラになった数字のタイルをスライドさせて、1から15まで順番に並べるクラシックパズル。',
    techStack: ['React', 'Logic', 'Animation'],
    imageUrl: nQueensThumb,
    isGame: true,
    category: 'Game',
    component: SlidePuzzle,
  },
  {
    id: 1,
    title: 'Geek Hackathon Timer',
    description: 'ハッカソンで作成した高機能タイマー。Docker でデプロイし、Next.js で UI / 設定を柔軟に管理。',
    techStack: ['Next.js', 'Docker', 'TypeScript'],
    imageUrl: timerThumb,
    demoUrl: 'https://docker-next-js-geek-hackathon.vercel.app/',
    isGame: false,
    category: 'Project',
  },
  {
    id: 2,
    title: 'Singapore Itinerary',
    description: '個人開発の旅行しおりアプリ。旅程をタイムラインで俯瞰し、地図と連動してチェックできる Web 体験。',
    techStack: ['Next.js', 'React', 'TypeScript'],
    imageUrl: sgThumb,
    demoUrl: 'https://singapore-itinerary-sand.vercel.app/',
    isGame: false,
    category: 'Project',
  },
  {
    id: 4,
    title: 'ニューラルネットワーク・パズル',
    description: 'ニューラルネットワークの重みを調整して、ターゲット出力を達成するパズルゲーム。',
    techStack: ['React', 'TypeScript', 'SVG', 'Framer Motion'],
    imageUrl: neuralThumb,
    demoUrl: 'https://example.com',
    isGame: true,
    category: 'Game',
    component: NeuralPuzzle,
  },
  {
    id: 5,
    title: 'エンジニア向けコード早打ち',
    description: 'プログラマのためのタイピングゲーム。リアルなコードスニペットを使ってコーディング速度と正確性を計測。',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    imageUrl: typerThumb,
    demoUrl: 'https://example.com',
    isGame: true,
    category: 'Game',
    component: CodeTyper,
  },
  {
    id: 30,
    title: 'テトリス風パズル',
    description: '名作落ち物パズルをモダンなReactで再現。回転、スコア、レベルアップ機能を搭載。',
    techStack: ['React', 'Game Loop', 'Canvas'],
    imageUrl: tetrisThumb,
    isGame: true,
    category: 'Game',
    component: TetrisGame,
  },
  {
    id: 31,
    title: 'マインスイーパー',
    description: '論理的思考が試される地雷除去ゲーム。右クリックでの旗立てや連鎖的な開示機能を実装。',
    techStack: ['React', 'Recursion', 'Logic'],
    imageUrl: minesweeperThumb,
    isGame: true,
    category: 'Game',
    component: MinesweeperGame,
  },
  {
    id: 32,
    title: '2048パズル',
    description: '数字を合体させて2048を作る中毒性の高いパズル。滑らかなアニメーションで操作感を向上。',
    techStack: ['React', 'Framer Motion', 'Grid'],
    imageUrl: _2048Thumb,
    isGame: true,
    category: 'Game',
    component: Game2048,
  },
  {
    id: 33,
    title: 'ネオン・スネーク',
    description: 'レトロなヘビゲームをネオン風デザインでリメイク。食べた分だけ長くなる古典的アクション。',
    techStack: ['React', 'Canvas', 'Game Loop'],
    imageUrl: snakeThumb,
    isGame: true,
    category: 'Game',
    component: SnakeGame,
  },
  {
    id: 34,
    title: '物理ブロック崩し',
    description: 'マウス操作でパドルを動かすブロック崩し。物理演算によるボールの反射と破壊エフェクト。',
    techStack: ['React', 'Canvas', 'Physics'],
    imageUrl: blockBreakerThumb,
    isGame: true,
    category: 'Game',
    component: BlockBreakerGame,
  },
  {
    id: 35,
    title: 'テック神経衰弱',
    description: 'IT技術アイコンを使った神経衰弱。記憶力とテック愛が試されるカードゲーム。',
    techStack: ['React', '3D CSS', 'Memory'],
    imageUrl: memoryThumb,
    isGame: true,
    category: 'Game',
    component: MemoryGame,
  },
  {
    id: 36,
    title: 'バグ退治',
    description: '次々と現れるバグ（虫）をクリックして修正（退治）する、エンジニアの日常をゲーム化。',
    techStack: ['React', 'Framer Motion', 'Reflex'],
    imageUrl: whackABugThumb,
    isGame: true,
    category: 'Game',
    component: WhackABugGame,
  },
  {
    id: 37,
    title: '光と音の記憶 (サイモン)',
    description: '光る色と音の順番を記憶して再現する脳トレゲーム。徐々に長くなるシーケンスに挑戦。',
    techStack: ['React', 'Web Audio API', 'Memory'],
    imageUrl: simonThumb,
    isGame: true,
    category: 'Game',
    component: SimonGame,
  },
  {
    id: 6,
    title: 'ソートアルゴリズム比較',
    description: 'Bubble Sort, Quick Sort 等の挙動を視覚化。データの動きを見て計算量を直感的に理解する。',
    techStack: ['React', 'Framer Motion', 'Algorithms'],
    imageUrl: sortThumb,
    demoUrl: 'https://example.com',
    isGame: true,
    category: 'Algorithm',
    component: SortingVisualizer,
  },
  {
    id: 11,
    title: '最短経路探索 (Dijkstra)',
    description: 'カーナビのように、スタートからゴールまでの「一番近い道」を自動で探し出します。',
    techStack: ['React', 'Graph Theory', 'BFS/DFS'],
    imageUrl: pathThumb,
    isGame: true,
    category: 'Algorithm',
    component: PathfindingVisualizer,
  },
  {
    id: 12,
    title: 'ライフゲーム (Game of Life)',
    description: 'ドットが「生き物」のように増えたり減ったり。単純なルールから生まれる不思議な模様。',
    techStack: ['React', 'Canvas', 'Simulation'],
    imageUrl: lifeThumb,
    isGame: true,
    category: 'Algorithm',
    component: GameOfLife,
  },
  {
    id: 13,
    title: '再帰フラクタル (Tree)',
    description: '同じ形が繰り返し現れる「自己相似」のアート。数学が生み出す植物のような美しさ。',
    techStack: ['React', 'SVG', 'Recursion'],
    imageUrl: treeThumb,
    isGame: true,
    category: 'Algorithm',
    component: RecursiveTree,
  },
  {
    id: 14,
    title: '二分探索木 (BST)',
    description: '数字が大小関係ルールに従って、自動的にツリー状に整理整頓されていく様子。',
    techStack: ['React', 'Data Structures', 'Tree'],
    imageUrl: bstThumb,
    isGame: true,
    category: 'Algorithm',
    component: BSTVisualizer,
  },
  {
    id: 15,
    title: '迷路生成アルゴリズム',
    description: 'コンピュータが壁を掘って迷路を作る過程。行き止まりを作らずに道を広げる仕組み。',
    techStack: ['React', 'Maze Gen', 'Backtracking'],
    imageUrl: mazeThumb,
    isGame: true,
    category: 'Algorithm',
    component: MazeVisualizer,
  },
  {
    id: 20,
    title: 'マージソート (Merge Sort)',
    description: 'バラバラの数字を「分割」して「統合」しながら、背の順に綺麗に並べ替えます。',
    techStack: ['React', 'Sorting', 'Recursion'],
    imageUrl: mergeThumb,
    isGame: true,
    category: 'Algorithm',
    component: MergeSortVisualizer,
  },
  {
    id: 21,
    title: 'A* 探索 (A* Search)',
    description: '「ゴールの方向」を意識しながら進む、カーナビやゲームAIでも使われる賢い探索方法。',
    techStack: ['React', 'Pathfinding', 'Heuristics'],
    imageUrl: aStarThumb,
    isGame: true,
    category: 'Algorithm',
    component: AStarVisualizer,
  },
  {
    id: 22,
    title: 'N-クイーン問題 (N-Queens)',
    description: 'チェスのクイーンが互いに喧嘩しないように、盤面に配置するパズル。',
    techStack: ['React', 'Backtracking', 'Puzzle'],
    imageUrl: nQueensThumb,
    isGame: true,
    category: 'Algorithm',
    component: NQueensVisualizer,
  },
  {
    id: 23,
    title: 'ハノイの塔 (Hanoi)',
    description: '円盤をルール通りに隣の棒へ移すパズル。再帰的な動きの美しさが特徴。',
    techStack: ['React', 'Recursion', 'Puzzle'],
    imageUrl: hanoiThumb,
    isGame: true,
    category: 'Algorithm',
    component: HanoiVisualizer,
  },
  {
    id: 24,
    title: '巡回セールスマン問題 (TSP)',
    description: 'たくさんの都市を一度ずつ回って戻ってくる「最短ルート」を見つける難問。',
    techStack: ['React', 'Optimization', 'Genetic Algo'],
    imageUrl: tspThumb,
    isGame: true,
    category: 'Algorithm',
    component: TSPVisualizer,
  },
  {
    id: 25,
    title: 'フーリエ級数展開 (Fourier)',
    description: 'ぐるぐる回る円の動きを足し合わせると、どんな複雑な波形でも描ける不思議。',
    techStack: ['React', 'Math', 'Visualization'],
    imageUrl: fourierThumb,
    isGame: true,
    category: 'Algorithm',
    component: FourierVisualizer,
  },
  {
    id: 26,
    title: '物理シミュレーション (Cloth)',
    description: '布が風になびいたり、重力で垂れ下がったりする様子を物理法則で計算して再現。',
    techStack: ['React', 'Physics', 'Verlet'],
    imageUrl: clothThumb,
    isGame: true,
    category: 'Algorithm',
    component: ClothVisualizer,
  },
  {
    id: 27,
    title: '群知能シミュレーション (Boids)',
    description: '鳥や魚の群れが、ぶつからずに一糸乱れぬ動きをする仕組みをシミュレート。',
    techStack: ['React', 'Emergence', 'AI'],
    imageUrl: boidsThumb,
    isGame: true,
    category: 'Algorithm',
    component: BoidsVisualizer,
  },
];

