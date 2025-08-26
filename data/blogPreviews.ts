export type BlogPreview = {
  slug: string
  title: string
  date: string
  authors: string[]
  tags: string[]
  image: string
  featured?: boolean
  excerpt?: string
}

// Blog preview data for overview page (reverse-chronological; one featured)
export const blogPreviews: BlogPreview[] = [
  {
    slug: 'dse-chinese-12-prescribed-texts-high-score-strategy',
    title: 'DSE 中文｜12篇指定範文高分實戰：三步讀、三步答、三步記',
    date: '2025-01-16',
    authors: ['Examify Team'],
    tags: ['DSE', 'Chinese', 'Education', 'Study Tips'],
    image: '/learning.avif',
    excerpt: '深入探討DSE中文指定範文的高分策略，提供三步讀、三步答、三步記的實戰技巧。'
  },
  {
    slug: 'dse-maths-quadratic-functions-inequalities',
    title: 'DSE 數學｜二次函數與二次不等式高分技巧（判別式＋圖像＋參數題一網打盡）',
    date: '2025-01-16',
    authors: ['Examify Team'],
    tags: ['DSE', 'Mathematics', 'Education', 'Study Tips'],
    image: '/physics-dashboard.png',
    excerpt: '掌握二次函數與二次不等式的核心技巧，透過判別式、圖像分析與參數題解題方法提升數學成績。'
  },
  {
    slug: 'private-tutoring-hkdse-booster',
    title: '私人補習，真係DSE嘅助推器｜心得blog',
    date: '2025-01-15',
    authors: ['Examify Team'],
    tags: [
      'Education',
      'HKDSE',
      'Tutoring',
      'Featured',
      '家長心得',
      '考試技巧',
      '升學資訊',
      '中文',
      '英文',
      '數學',
      '學習心得',
      '個人興趣'
    ],
    image: '/learning.avif',
    featured: true,
    excerpt: '深入探討私人補習如何成為HKDSE考試的關鍵助推器，提供實用的選擇指南和學習策略。'
  },
  {
    slug: 'chatjupas-whatsapp-ai',
    title: 'ChatJupas神器 喺WhatsApp度同你即刻對話，拎齊晒升學資料！📚',
    date: '2025-08-01',
    authors: ['Nardo', 'Bolly'],
    tags: ['AI Technology', 'Trending'],
    image: '/learning.avif',
    excerpt: 'Discover how ChatJupas AI on WhatsApp can help students get all the necessary information for university applications instantly.'
  },
  {
    slug: 'social-media-relationships-sales',
    title: 'Leveraging Social Media to Build Relationships and Drive Sales',
    date: '2025-07-24',
    authors: ['Arthur'],
    tags: ['Business'],
    image: '/main-dashboard.png',
    excerpt: 'Explore strategies for using social media platforms to foster meaningful connections with your audience.'
  },
  {
    slug: 'crypto-volatility-regulatory',
    title: 'Cryptocurrency Experiences Volatility as Regulatory Concerns Persist',
    date: '2025-07-14',
    authors: ['Nardo'],
    tags: ['Business', 'Regulation'],
    image: '/physics-dashboard.png',
    excerpt: 'An analysis of the recent fluctuations in the cryptocurrency market and regulatory discussions.'
  },
  {
    slug: 'data-analytics-decision-making',
    title: 'Leveraging Data Analytics for Better Decision-Making in Business',
    date: '2025-07-13',
    authors: ['Matthew'],
    tags: ['Business', 'Analytics'],
    image: '/english-dashboard.png',
    excerpt: 'Discover how businesses can harness the power of data analytics to gain actionable insights.'
  }
]
