import React from 'react';

export const PlaceholderApp: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-600">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold mb-2">Under Construction</h2>
            <p>このアルゴリズム可視化アプリは現在開発中です。</p>
            <p className="text-sm mt-4 text-slate-400">Implementation coming soon.</p>
        </div>
    );
};
