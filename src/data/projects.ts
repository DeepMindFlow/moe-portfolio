import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'algo-trading',
    num: '01',
    year: '2026',
    title: 'Algorithmic Trading Engine',
    description:
      'Predicts NASDAQ stock price direction using a Kaggle dataset. Multiple models — XGBoost, RNN, LSTM, and an LSTM + Transformer hybrid — are compared against each other to evaluate performance across dataset characteristics. Decision logic applies Walk-Forward validation, Stop Loss/Take Profit rules, Backtesting, and a Confidence scoring system to determine optimal trade signals.',
    tags: ['XGBoost', 'RNN', 'LSTM', 'Transformer', 'Backtesting', 'Python'],
    href: '#',
    previewGradient: 'linear-gradient(135deg, #2b5ce6 0%, #050507 50%, #1847d1 100%)',
  },
  {
    id: 'nmt',
    num: '02',
    year: '2026',
    title: 'Neural Machine Translation',
    description:
      'LSTM, Seq2Seq with attention, and a full Transformer implemented from scratch in PyTorch. This product development is based in Deep Learning (CS7643).',
    tags: ['NLP', 'PyTorch', 'Transformer'],
    href: '#',
    previewGradient: 'linear-gradient(135deg, #050507 0%, #1847d1 50%, #050507 100%)',
  },
  {
    id: 'stock-risk',
    num: '03',
    year: '2025',
    title: 'Stock Risk Modeling',
    description:
      'Hybrid pipeline: XGBoost return prediction → Monte Carlo simulation → VaR & Expected Shortfall scores for investment decision support. This product development is based in Data & Visual Analytics (CSE6242).',
    tags: ['XGBoost', 'Risk', 'Monte Carlo'],
    href: '#',
    previewGradient: 'linear-gradient(135deg, #2b5ce6 0%, #050507 50%, #1847d1 100%)',
  },
  {
    id: 'dreamseeker',
    num: '04',
    year: '2024',
    title: 'DreamSeeker v1',
    description:
      'A from-scratch recommendation engine prioritizing interpretability. Built with pure NumPy, PostgreSQL, and deployed on Render via Streamlit — no convenience wrappers, just math.',
    tags: ['Recommendation System', 'Logistic Regression', 'PostgreSQL', 'Streamlit'],
    href: '#',
    featured: true,
    previewGradient: 'linear-gradient(135deg, #1847d1 0%, #050507 40%, #2b5ce6 70%, #d0dcff 100%)',
  },
]
