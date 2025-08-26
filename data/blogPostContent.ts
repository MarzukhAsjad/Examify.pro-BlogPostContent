export type BlogPostContent = {
  slug: string
  title: string
  date: string
  authors: string[]
  tags: string[]
  image: string
  featured?: boolean
  links?: {
    socialMedia?: {
      instagram?: string
      threads?: string
      twitter?: string
      linkedin?: string
      facebook?: string
    }
    external?: {
      website?: string
      article?: string
      resource?: string
      download?: string
    }
    internal?: {
      relatedPost?: string
      page?: string
      section?: string
    }
    position?: 'top' | 'middle' | 'bottom' | 'custom'
    customPosition?: number // For custom positioning within richContent
  }
  excerpt?: string
  content?: string
  others?: string
  richContent?: RichContentBlock[]
}

export type RichContentBlock = {
  type: 'text' | 'image' | 'quote' | 'subheading'
  content: string
  imageUrl?: string
  imageCaption?: string
  imageAlt?: string
  quoteAuthor?: string
  className?: string
}

// Full blog post content data for detail pages
export const blogPostContent: BlogPostContent[] = [
  {
    slug: 'dse-chinese-12-prescribed-texts-high-score-strategy',
    title: 'DSE 中文｜12篇指定範文高分實戰：三步讀、三步答、三步記',
    date: '2025-01-16',
    authors: ['Examify Team'],
    tags: ['DSE', 'Chinese', 'Education', 'Study Tips'],
    image: '/learning.avif',
    links: {
      socialMedia: {
        instagram: 'https://www.instagram.com/examify.hk',
        facebook: 'https://www.facebook.com/examify.hk'
      },
      external: {
        website: 'https://examify.pro'
      },
      position: 'bottom'
    },
    excerpt: '深入探討DSE中文指定範文的高分策略，提供三步讀、三步答、三步記的實戰技巧。',
    content: '想在指定範文拿高分，關鍵不在「背幾多」，而在「背得啱＋用得準」。',
    others: '最後，操卷請練「換題不換法」：換篇章但不換答題骨架，讓你在陌生題目中也能穩住節奏。',
    richContent: [
      {
        type: 'text',
        content: '想在指定範文拿高分，關鍵不在「背幾多」，而在「背得啱＋用得準」。'
      },
      {
        type: 'subheading',
        content: '讀時用「三步讀」'
      },
      {
        type: 'text',
        content: '先看作者背景與體裁功能（論、記、表、傳），再標記結構轉折（如總分、層遞、以事證理），最後抓手法到作用（比喻、對比、排比、借景抒情如何推主題）。'
      },
      {
        type: 'subheading',
        content: '先以主題分組'
      },
      {
        type: 'text',
        content: '一是家國責任與治亂之道（出師表、六國論、廉頗藺相如列傳、曹劌論戰）二是修身與學習（師說、勸學、魚我所欲也）'
      },
      {
        type: 'text',
        content: '三是山水與人生境界（岳陽樓記、始得西山宴游記、逍遙遊、桃花源記、陋室銘）。'
      },
      {
        type: 'text',
        content: '每組各挑兩句「金句＋作用」建立連結，例如六國論「弊在賂秦也」對應「先總後分」論證法；岳陽樓記「先天下之憂而憂」對應「借景起議」。'
      },
      {
        type: 'subheading',
        content: '答時用「三步答」'
      },
      {
        type: 'text',
        content: '引句不超兩行→解意不講故事→手法＋作用直擊題旨'
      },
      {
        type: 'text',
        content: '例如問「作者如何表現政治理想」，你可先引「先天下之憂而憂」，解作「以公眾福祉為先」，再指出「借景抒情，由洞庭湖風景轉入天下興亡，完成由景至理的提升」，最後回扣「展現士大夫責任」。'
      },
      {
        type: 'subheading',
        content: '記憶用「三步記」'
      },
      {
        type: 'text',
        content: '1）情境化背記（把金句放回故事或山水場景）'
      },
      {
        type: 'text',
        content: '2）對應題型口訣（人物德行→抓言行與抉擇；論證有效→抓例證種類與邏輯關係）'
      },
      {
        type: 'text',
        content: '3）混合練（同主題跨篇對讀，避免單篇孤立）。'
      },
      {
        type: 'image',
        content: '',
        imageUrl: '/english-dashboard.png',
        imageCaption: 'DSE中文指定範文學習策略圖解，展示三步讀、三步答、三步記的學習方法。',
        imageAlt: 'DSE Chinese Prescribed Texts Study Strategy'
      },
      {
        type: 'subheading',
        content: '常見失分位包括'
      },
      {
        type: 'text',
        content: '• 朝代體裁張冠李戴'
      },
      {
        type: 'text',
        content: '• 手法只點名不解效'
      },
      {
        type: 'text',
        content: '• 引用錯字漏標點'
      },
      {
        type: 'subheading',
        content: '改進方法'
      },
      {
        type: 'text',
        content: '建立「小卡」——卡面寫金句，卡背寫「手法＋作用＋可回應的題型」，每天三分鐘過一遍。作文融合亦重要：議論文可巧用指定文金句作論據（如以「賂秦」比喻當代「短視交易」），既有文學積累，又與時事對話。'
      },
      {
        type: 'quote',
        content: '最後，操卷請練「換題不換法」：換篇章但不換答題骨架，讓你在陌生題目中也能穩住節奏。',
        quoteAuthor: '資深DSE中文導師'
      }
    ]
  },
  
  {
    slug: 'dse-maths-quadratic-functions-inequalities',
    title: 'DSE 數學｜二次函數與二次不等式高分技巧（判別式＋圖像＋參數題一網打盡）',
    date: '2025-01-16',
    authors: ['Examify Team'],
    tags: ['DSE', 'Mathematics', 'Education', 'Study Tips'],
    image: '/physics-dashboard.png',
    links: {
      socialMedia: {
        instagram: 'https://www.instagram.com/examify.hk',
        facebook: 'https://www.facebook.com/examify.hk'
      },
      external: {
        website: 'https://examify.pro'
      },
      position: 'bottom'
    },
    excerpt: '掌握二次函數與二次不等式的核心技巧，透過判別式、圖像分析與參數題解題方法提升數學成績。',
    content: '想在二次題型穩拿分，別只背公式，要把「判別式、頂點、號性圖」三件武器合成一套流程。',
    others: '操作口訣：畫「根號線」標 r1、r2，再按 a 的正負標記區間號性，一眼讀出解集與是否包含端點（看 ≥ 或 >）。',
    richContent: [
      {
        type: 'text',
        content: '想在二次題型穩拿分，別只背公式，要把「判別式、頂點、號性圖」三件武器合成一套流程。以下把高頻題型拆解為可操作的步驟，特別適用於選擇題與短題。'
      },
      {
        type: 'subheading',
        content: '一、核心骨架（一定要內化）'
      },
      {
        type: 'text',
        content: '標準式：f(x)=ax²+bx+c（a≠0）'
      },
      {
        type: 'text',
        content: '判別式：Δ=b²−4ac（決定根的性質）'
      },
      {
        type: 'text',
        content: 'Δ>0 兩相異實根；Δ=0 一重根；Δ<0 無實根'
      },
      {
        type: 'text',
        content: '頂點與對稱軸：'
      },
      {
        type: 'text',
        content: '對稱軸 x=−b/(2a)'
      },
      {
        type: 'text',
        content: '頂點最值 fmin/max=f(−b/2a)'
      },
      {
        type: 'text',
        content: '配方法：f(x)=a(x−h)²+k，其中 h=−b/(2a), k=f(h)'
      },
      {
        type: 'text',
        content: '根與係數（Viète）：'
      },
      {
        type: 'text',
        content: '根和 r₁+r₂=−b/a；根積 r₁r₂=c/a'
      },
      {
        type: 'subheading',
        content: '二、三大解題引擎（考場通用流程）'
      },
      {
        type: 'text',
        content: '判別式法（交點/根數/恆成立）'
      },
      {
        type: 'text',
        content: '「兩交點/相切/不相交」：直線代入二次，得二次方程，以 Δ 判斷數目。'
      },
      {
        type: 'text',
        content: '「恆正/恆負」：'
      },
      {
        type: 'text',
        content: '對所有 x，f(x)>0 ⇔ a>0 且 Δ<0'
      },
      {
        type: 'text',
        content: '對所有 x，f(x)≥0 ⇔ a>0 且 Δ≤0'
      },
      {
        type: 'text',
        content: '對所有 x，f(x)<0 ⇔ a<0 且 Δ<0'
      },
      {
        type: 'text',
        content: '對所有 x，f(x)≤0 ⇔ a<0 且 Δ≤0'
      },
      {
        type: 'text',
        content: '「至少一實根」：Δ≥0；「重根」：Δ=0'
      },
      {
        type: 'subheading',
        content: '圖像號性法（不等式最速判）'
      },
      {
        type: 'text',
        content: '若 Δ>0，設 r₁<r₂：'
      },
      {
        type: 'text',
        content: 'a>0：外正內負（x<r₁ 或 x>r₂ 時 f>0；r₁<x<r₂ 時 f<0）'
      },
      {
        type: 'text',
        content: 'a<0：外負內正（反之）'
      },
      {
        type: 'text',
        content: '若 Δ=0：'
      },
      {
        type: 'text',
        content: 'a>0：全域 ≥0，等號在重根'
      },
      {
        type: 'text',
        content: 'a<0：全域 ≤0，等號在重根'
      },
      {
        type: 'text',
        content: '若 Δ<0：f 的號性與 a 相同（全域同號）'
      },
      {
        type: 'image',
        content: '',
        imageUrl: '/main-dashboard.png',
        imageCaption: '二次函數圖像分析圖解，展示判別式、頂點與號性圖的關係。',
        imageAlt: 'Quadratic Function Graph Analysis'
      },
      {
        type: 'subheading',
        content: '頂點最值法（範圍/參數優化）'
      },
      {
        type: 'text',
        content: '求最小/最大值：直接算 h=−b/2a、k=f(h)，a>0 取最小值 k；a<0 取最大值 k。'
      },
      {
        type: 'text',
        content: '轉化不等式：'
      },
      {
        type: 'text',
        content: '令 f(x)=a(x−h)²+k，則'
      },
      {
        type: 'text',
        content: 'a>0：f(x)≥k，f(x)∈[k, +∞)'
      },
      {
        type: 'text',
        content: 'a<0：f(x)≤k，f(x)∈(−∞, k]'
      },
      {
        type: 'subheading',
        content: '參數題常見套路'
      },
      {
        type: 'text',
        content: '使 f(x)≥m 對所有 x：先求最小值 k，令 k≥m'
      },
      {
        type: 'text',
        content: '使方程 f(x)=k 有兩實根：令 Δk>0（把 c 改為 c−k 再計 Δ）'
      },
      {
        type: 'subheading',
        content: '三、HKDSE 高頻題型與模板語句'
      },
      {
        type: 'text',
        content: '與直線/圓的關係（最常見）'
      },
      {
        type: 'text',
        content: '直線 y=mx+c 與拋物線 y=ax²+bx+d 相交：代入得 ax²+(b−m)x+(d−c)=0，以 Δ 判'
      },
      {
        type: 'text',
        content: '要「切線斜率 m」：令 Δ=0 解 m'
      },
      {
        type: 'subheading',
        content: '根位置判斷（在某區間內）'
      },
      {
        type: 'text',
        content: '要兩根皆大於 p（且 a>0 時最易）：檢 f(p)>0 且 頂點 h>p；或作新變量 t=x−p，轉化為「兩根皆正」以號性圖判定'
      },
      {
        type: 'text',
        content: '要一根在 (p,q) 內：可檢 f(p)·f(q)<0（介值與號性）'
      },
      {
        type: 'subheading',
        content: '參數不等式（MC 常用秒殺）'
      },
      {
        type: 'text',
        content: 'f(x)>0 對所有 x：a>0 且 Δ<0'
      },
      {
        type: 'text',
        content: 'f(x)≥0 對所有 x：a>0 且 Δ≤0'
      },
      {
        type: 'text',
        content: 'f(x) 在 [L,U]：配方求 k，再以 a 的正負確定範圍端點'
      },
      {
        type: 'quote',
        content: '操作口訣：畫「根號線」標 r₁、r₂，再按 a 的正負標記區間號性，一眼讀出解集與是否包含端點（看 ≥ 或 >）。',
        quoteAuthor: '資深DSE數學導師'
      }
    ]
  },
  {
    slug: 'private-tutoring-hkdse-booster',
    title: '私人補習，真係DSE嘅助推器｜心得blog',
    date: '2025-01-15',
    authors: ['Examify Team'],
    tags: ['Education', 'HKDSE', 'Tutoring', 'Featured'],
    image: '/learning.avif',
    featured: true,
    links: {
      socialMedia: {
        instagram: 'https://www.instagram.com/examify.hk',
        facebook: 'https://www.facebook.com/examify.hk'
      },
      external: {
        website: 'https://examify.pro'
      },
      position: 'bottom'
    },
    excerpt: '深入探討私人補習如何成為HKDSE考試的關鍵助推器，提供實用的選擇指南和學習策略。',
    content: '講真，香港教育節奏快、競爭大，校內老師要照顧成班人，要逐個執細位好難。到咗HKDSE呢段關鍵期，私人補習就好似幫你開咗「得分後台」：一對一對症下藥，唔使再喺大班度捱運氣。',
    others: '揀啱導師，搵啱方法，你嘅努力就會變成實打實嘅成績。',
    richContent: [
      {
        type: 'text',
        content: '講真，香港教育節奏快、競爭大，校內老師要照顧成班人，要逐個執細位好難。到咗HKDSE呢段關鍵期，私人補習就好似幫你開咗「得分後台」：一對一對症下藥，唔使再喺大班度捱運氣。'
      },
      {
        type: 'subheading',
        content: '私人補習有幾貼地？'
      },
      {
        type: 'text',
        content: '私人補習唔係簡單嘅「補課」，而係一套完整嘅學習加速系統。佢嘅優勢可以分為幾個核心層面：'
      },
      {
        type: 'text',
        content: '• 極度針對：導師按你嘅校內進度、弱項同DSE評分準則度身訂做。英文Paper 2會幫你建立「主題句→例證→連接語」專屬模板；中文閱讀就用你易混淆嘅關鍵字做對位訓練；數學按你最常失分嘅題型（概率/統計/幾何）逐個拆。'
      },
      {
        type: 'text',
        content: '• 即時回饋：寫作現場改、口試即場糾正語調節奏；理科實驗題重點係步驟+數據解讀，導師會用考官口徑去改，避免不必要扣分。'
      },
      {
        type: 'text',
        content: '• 時間彈性：放學、補課、活動表逼爆？私人補習可以夜晚Zoom、周末面授、甚至考前密集，真係配合香港學生嘅生活節奏。'
      },
      {
        type: 'text',
        content: '• 數據化進步：唔係「操多就得」，而係用Past Paper記錄命中率、錯題類型同用時，清楚見到「由3→4→5」嘅梯級。'
      },
      {
        type: 'text',
        content: '• SBA/校本支援：題材構思、資料整理、表達排練一條龍，避免臨尾爆煲。'
      },
      {
        type: 'subheading',
        content: '點解唔揀大班，偏要私人？'
      },
      {
        type: 'text',
        content: '大班補習有佢嘅優點，但係私人補習提供咗更精準嘅學習體驗：'
      },
      {
        type: 'text',
        content: '• 大班有氣氛但節奏一刀切；私人補習可以用你習慣嘅語言（粵/英/普）講解，補返你學校冇時間講嘅「為何如此」。'
      },
      {
        type: 'text',
        content: '• 省通勤成本：唔駛周圍撲堂，專注度更高；每分鐘都用喺你弱點上，CP值其實更高。'
      },
      {
        type: 'image',
        content: '',
        imageUrl: '/main-dashboard.png',
        imageCaption: '私人補習提供個性化學習體驗，針對每個學生的具體需求制定學習計劃。',
        imageAlt: 'Personalized Learning Dashboard'
      },
      {
        type: 'subheading',
        content: '揀私人導師清單（超實用！）'
      },
      {
        type: 'text',
        content: '揀啱導師係成功嘅關鍵，以下係實用嘅選擇指南：'
      },
      {
        type: 'text',
        content: '• 要求試改：先畀一篇作文/一份數學卷，睇佢點改、點解釋、畀唔畀到可複製框架。'
      },
      {
        type: 'text',
        content: '• 睇證據唔聽神話：過往學生的前後對比、真實腳本/卷面，而唔係只曬獎狀。'
      },
      {
        type: 'text',
        content: '• 合約清晰：堂數、改功課次數、臨考加課安排寫明白。'
      },
      {
        type: 'text',
        content: '• 避雷訊號：只派筆記唔改功課；話「包5**」；成堂吹水；無跟進紀錄。'
      },
      {
        type: 'quote',
        content: '私人補習唔係神藥，但係最貼地嘅提速器：用你聽得入耳嘅方法，針對你拎得返嘅分，建立可複製嘅答題流程同穩定臨場節奏。',
        quoteAuthor: '資深DSE導師'
      },
      {
        type: 'subheading',
        content: '最後想講'
      },
      {
        type: 'text',
        content: 'DSE唔靠彩數；當你有清晰地圖、每日小步進，5、5*甚至5**都變成有跡可尋。揀啱導師，搵啱方法，你嘅努力就會變成實打實嘅成績。'
      },
      {
        type: 'text',
        content: '記住，私人補習係投資，唔係消費。揀啱導師，配合你嘅學習風格同目標，DSE之路就會變得更加清晰同有效率。'
      }
    ]
  },
  {
    slug: 'chatjupas-whatsapp-ai',
    title: 'ChatJupas神器 喺WhatsApp度同你即刻對話，拎齊晒升學資料！📚',
    date: '2025-08-01',
    authors: ['Nardo', 'Bolly'],
    tags: ['AI Technology', 'Trending', 'Featured'],
    image: '/learning.avif',
    featured: true,
    links: {
      socialMedia: {
        instagram: 'https://www.instagram.com/p/DLzHXFNzSrk/?igsh=dTRtd2psOWd1NHd1',
        threads: 'https://www.threads.net/@examify.hk/post/CxYz1234567'
      },
      external: {
        website: 'https://examify.pro'
      },
      internal: {
        relatedPost: 'social-media-relationships-sales'
      },
      position: 'middle' 
    },
    excerpt: 'Discover how ChatJupas AI on WhatsApp can help students get all the necessary information for university applications instantly.',
    content: 'This is some demo content for the featured blog post. It talks about how ChatJupas AI on WhatsApp can help students get all the necessary information for university applications instantly. This tool aims to simplify the JUPAS application process and provide personalized guidance.',
    others: 'Additional demo content for the featured post. This section can contain more detailed information, tips, or related content that complements the main article.',
    richContent: [
      {
        type: 'text',
        content: 'Purple clouds drifted lazily over the silent city as a cat pondered the meaning of breakfast.'
      },
      {
        type: 'subheading',
        content: 'Unexpected Adventures Await'
      },
      {
        type: 'text',
        content: 'Beneath the old oak tree, a group of squirrels debated the merits of acorn storage versus immediate consumption.'
      },
      {
        type: 'image',
        content: '',
        imageUrl: '/main-dashboard.png',
        imageCaption: 'ChatJupas AI interface showing the intuitive dashboard design that helps students navigate university applications with ease.',
        imageAlt: 'ChatJupas AI Dashboard Interface'
      },
      {
        type: 'text',
        content: 'A single red balloon escaped the grasp of a child, floating upward into the unknown with dreams of distant lands.'
      },
      {
        type: 'quote',
        content: 'Sometimes, the smallest pebble can cause the largest ripple in the pond of life.',
        quoteAuthor: 'Dr. Sarah Chen, Education Technology Expert'
      },
      {
        type: 'subheading',
        content: 'Whimsical Possibilities'
      },
      {
        type: 'text',
        content: 'On Tuesdays, the library whispers secrets to those who listen closely between the stacks of forgotten books.'
      },
      {
        type: 'image',
        content: '',
        imageUrl: '/english-dashboard.png',
        imageCaption: 'Students can access comprehensive information about English programmes through the intuitive ChatJupas interface.',
        imageAlt: 'English Programme Dashboard'
      },
      {
        type: 'text',
        content: 'Rain tapped gently on the window as a dog dreamed of chasing butterflies through endless fields.'
      },
      {
        type: 'subheading',
        content: 'A Glimpse Into Tomorrow'
      },
      {
        type: 'text',
        content: 'With every sunrise, a new story begins, waiting for someone curious enough to turn the first page.'
      },
      {
        type: 'image',
        content: '',
        imageUrl: '/physics-dashboard.png',
        imageCaption: 'Specialized dashboard for science and physics programmes, demonstrating the platform\'s versatility across different academic disciplines.',
        imageAlt: 'Physics Programme Dashboard'
      },
      {
        type: 'text',
        content: 'In the heart of the city, laughter echoed as strangers became friends over cups of steaming tea.'
      }
    ]
  },
  {
    slug: 'social-media-relationships-sales',
    title: 'Leveraging Social Media to Build Relationships and Drive Sales',
    date: '2025-07-24',
    authors: ['Arthur'],
    tags: ['Business'],
    image: '/main-dashboard.png',
    links: {
      socialMedia: {
        linkedin: 'https://www.linkedin.com/posts/activity-123456789',
        twitter: 'https://twitter.com/username/status/123456789'
      },
      external: {
        article: 'https://hbr.org/2025/social-media-marketing',
        resource: 'https://buffer.com/social-media-guide'
      },
      position: 'middle' // Social media appears in the middle of the article
    },
    excerpt: 'Explore strategies for using social media platforms to foster meaningful connections with your audience.',
    content: 'Explore strategies for using social media platforms to foster meaningful connections with your audience, which can ultimately lead to increased sales and brand loyalty. This post delves into various social media marketing techniques and best practices.',
    others: 'This post delves into various social media marketing techniques and provides actionable insights for businesses looking to improve their online presence.'
  },
  {
    slug: 'crypto-volatility-regulatory',
    title: 'Cryptocurrency Experiences Volatility as Regulatory Concerns Persist',
    date: '2025-07-14',
    authors: ['Nardo'],
    tags: ['Business', 'Regulation'],
    image: '/physics-dashboard.png',
    links: {
      external: {
        website: 'https://coinmarketcap.com',
        resource: 'https://www.sec.gov/crypto'
      },
      position: 'bottom' // Social media appears at the bottom of the article
    },
    excerpt: 'An analysis of the recent fluctuations in the cryptocurrency market and regulatory discussions.',
    content: 'An analysis of the recent fluctuations in the cryptocurrency market and the ongoing discussions around regulatory frameworks that could impact its future. This comprehensive overview examines market trends and policy implications.',
    others: 'Insights into market trends and policy implications for cryptocurrency investors and businesses operating in the digital asset space.'
  },
  {
    slug: 'data-analytics-decision-making',
    title: 'Leveraging Data Analytics for Better Decision-Making in Business',
    date: '2025-07-13',
    authors: ['Matthew'],
    tags: ['Business', 'Analytics'],
    image: '/english-dashboard.png',
    links: {
      socialMedia: {
        linkedin: 'https://www.linkedin.com/posts/activity-987654321'
      },
      external: {
        download: 'https://example.com/analytics-guide.pdf',
        resource: 'https://www.tableau.com/learn/articles/data-analytics'
      },
      internal: {
        relatedPost: 'crypto-volatility-regulatory'
      },
      position: 'custom',
      customPosition: 3 // Social media appears after the 3rd richContent block
    },
    excerpt: 'Discover how businesses can harness the power of data analytics to gain actionable insights.',
    content: 'Discover how businesses can harness the power of data analytics to gain actionable insights, optimize operations, and make more informed strategic decisions. This guide provides practical tips for implementing data-driven strategies.',
    others: 'Practical tips for implementing data-driven strategies and building a culture of analytics within your organization.'
  }
]


//hello