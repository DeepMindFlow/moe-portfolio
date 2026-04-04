import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'algo-trading',
    num: '01',
    year: '2026',
    title: 'Algorithmic Trading Engine',
    description:
      'Predicts NASDAQ stock price direction using a Kaggle dataset. Multiple models — XGBoost, RNN, LSTM, and an LSTM + Transformer hybrid — are compared against each other to evaluate performance across dataset characteristics. Decision logic applies Walk-Forward validation, Stop Loss/Take Profit rules, Backtesting, and a Confidence scoring system to determine optimal trade signals.',
    terminalText:
      'Multi-model NASDAQ price direction prediction. XGBoost vs LSTM vs LSTM+Transformer — evaluated with Walk-Forward validation, Backtesting, and Confidence scoring.',
    tags: ['XGBoost', 'RNN', 'LSTM', 'Transformer', 'Backtesting', 'Python'],
    href: 'https://algo-trader-rosy.vercel.app/',
    previewGradient: 'linear-gradient(135deg, #2b5ce6 0%, #050507 50%, #1847d1 100%)',
    metrics: [
      { label: 'Model Accuracy', value: '80%', percent: 80 },
      { label: 'Win Rate', value: '65%', percent: 65 },
      { label: 'Sharpe Ratio', value: '2.2', percent: 73 }, /* Share Ratio (2.2) / Ceiling (3.0) = 0.7333 (73%) */
    ],
  },
  {
    id: 'nmt',
    num: '02',
    year: '2026',
    title: 'Neural Machine Translation',
    description:
      'LSTM, Seq2Seq with attention, and a full Transformer implemented from scratch in PyTorch. This product development is based in Deep Learning (CS7643).',
    terminalText:
      'LSTM, Seq2Seq with cosine similarity attention, and a full Transformer — built from scratch in PyTorch. Perfect score on CS7643 Assignment 3.',
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
    terminalText:
      'Hybrid XGBoost + Monte Carlo pipeline. Blends normal and stress market params to generate VaR, ES, and risk scores across a 16-file SQLite workflow.',
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
    terminalText:
      'Logistic regressor predicting solo activities for adventurers — encouraging genuine community building and adult friendship through shared experiences.',
    tags: ['Recommendation System', 'Logistic Regression', 'PostgreSQL', 'Streamlit'],
    href: '#',
    featured: true,
    previewGradient: 'linear-gradient(135deg, #1847d1 0%, #050507 40%, #2b5ce6 70%, #d0dcff 100%)',
  },
]
