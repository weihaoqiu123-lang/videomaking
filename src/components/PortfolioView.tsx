import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  portfolioCategories,
  serviceTypes,
  selectionGuide,
  specialService,
  members,
  testimonials
} from '../data/portfolioData';

interface PortfolioViewProps {
  onNavigateToOrderCreate: (videoTypeId?: string) => void;
  onSelectWorkToOrder: (work: any, videoTypeId?: string) => void;
  onSelectCreatorToOrder?: (creatorId: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onNavigateToOrderCreate,
  onSelectWorkToOrder,
  onSelectCreatorToOrder,
}) => {
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [activeWorkModal, setActiveWorkModal] = useState<any | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollRail = (direction: 'left' | 'right') => {
    if (railRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      railRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-root">
      
      {/* ======================================================== */}
      {/* 01. HERO SECTION (Codex 100svh Video Background) */}
      {/* ======================================================== */}
      <section className="hero" id="hero">
        <div className="hero-media" aria-hidden="true">
          <img
            className="hero-fallback"
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=86"
            alt=""
          />
          <video
            ref={heroVideoRef}
            className={`hero-video ${heroVideoReady ? 'is-ready' : ''}`}
            autoPlay
            loop
            muted={muted}
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=86"
            src="https://videos.pexels.com/video-files/853800/853800-hd_1920_1080_30fps.mp4"
            onCanPlay={() => setHeroVideoReady(true)}
            onError={() => setHeroVideoReady(false)}
          />
          <div className="hero-media-tint" />
        </div>

        {/* TOPBAR */}
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">V</span>
            <span>VIDEO LAB</span>
          </div>

          <nav>
            <a href="#work">精选作品</a>
            <a href="#services">服务与价格</a>
            <a href="#team">选择制作人</a>
          </nav>

          <button
            onClick={() => onNavigateToOrderCreate()}
            className="nav-order"
          >
            创建视频需求 ↗
          </button>
        </header>

        {/* HERO COPY */}
        <div className="hero-copy">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <span />
            VIDEO CREATIVE DEPARTMENT · 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            让产品，<br />
            <em>被真正看见。</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-intro"
          >
            浏览视频组代表作品与不同视频方案，找到适合产品的视觉方向并直接发起视频需求。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-actions"
          >
            <button
              onClick={() => onNavigateToOrderCreate()}
              className="primary-button"
            >
              <span>创建视频需求</span>
              <span>↗</span>
            </button>
          </motion.div>
        </div>

        {/* SOUND TOGGLE — keep Codex hero interaction */}
        <button
          type="button"
          className="sound-toggle"
          onClick={() => {
            const nextMuted = !muted;
            setMuted(nextMuted);
            if (heroVideoRef.current) heroVideoRef.current.muted = nextMuted;
          }}
          aria-label={muted ? '打开背景视频声音' : '关闭背景视频声音'}
        >
          <span className={`sound-bars ${muted ? 'muted' : ''}`} aria-hidden="true">
            <i /><i /><i /><i />
          </span>
          {muted ? 'SOUND OFF' : 'SOUND ON'}
        </button>

        {/* SCROLL CUE */}
        <div className="scroll-cue">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>

        {/* HERO INDEX */}
        <div className="hero-index">
          <span>01</span> / 05
        </div>
      </section>

      {/* ======================================================== */}
      {/* 02. SELECTED WORKS PORTFOLIO GRID (Static 1200px Grid) */}
      {/* ======================================================== */}
      <section className="work-section" id="work">
        <div className="work-container">
          {/* SECTION HEADER */}
          <div className="work-header">
            <div className="section-topline">
              <p><span>✦</span> SELECTED WORKS</p>
              <p>REPRESENTATIVE PORTFOLIO</p>
            </div>

            <div className="work-heading-row">
              <h2>代表作品 <span>15</span></h2>
              <p className="work-subdesc">
                按视频类型探索代表性作品，直观参考不同制作风格与视觉效果。点击预览成片，可直接参考发单。
              </p>
            </div>
          </div>

          {/* CATEGORY SECTIONS (STATIC GRID) */}
          <div className="portfolio-types">
            {portfolioCategories.map((cat) => (
              <article key={cat.id} className="portfolio-category" id={`cat-${cat.id}`}>
                {/* CATEGORY HEADER */}
                <div className="category-header">
                  <div className="category-title-block">
                    <span className="category-num">{cat.index}</span>
                    <div>
                      <h3>{cat.title}</h3>
                      <p className="category-desc">{cat.intro}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToOrderCreate(cat.videoTypeId)}
                    className="category-order-btn"
                  >
                    <span>创建此类型视频需求</span>
                    <span className="arrow">↗</span>
                  </button>
                </div>

                {/* 3-COLUMN STATIC GRID */}
                <div className="work-grid">
                  {cat.works.map((work) => (
                    <div
                      key={work.id}
                      className="work-card"
                    >
                      {/* COVER IMAGE WITH 4:3 ASPECT RATIO */}
                      <div
                        className="work-cover-wrap"
                        onClick={() => setActiveWorkModal(work)}
                      >
                        <img src={work.image} alt={work.title} loading="lazy" />
                        <div className="work-overlay">
                          <div className="play-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5,3 19,12 5,21" />
                            </svg>
                            <span>PREVIEW</span>
                          </div>
                        </div>
                      </div>

                      {/* TEXT BELOW COVER */}
                      <div className="work-info">
                        <div className="work-info-main" onClick={() => setActiveWorkModal(work)}>
                          <h4 className="work-title">{work.productName}</h4>
                          <p className="work-sub">{cat.title} · {work.meta.split('·')[1]?.trim() || work.meta}</p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectWorkToOrder(work, cat.videoTypeId);
                          }}
                          className="work-ref-action"
                          title="参考此作品创建需求"
                        >
                          <span>参考此作品</span>
                          <span className="arrow">↗</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 04. SERVICES & PRICES SECTION */}
      {/* ======================================================== */}
      <section className="services" id="services">
        <div className="section-topline light-line">
          <p><span>✦</span> 02 视频方案与价格</p>
          <p>INTERNAL REFERENCE ONLY</p>
        </div>

        <div className="service-layout">
          {/* SIDEBAR GUIDE */}
          <div>
            <div className="section-title-row">
              <div>
                <p>HOW TO CHOOSE</p>
                <h2>选择合适的<br /><em>视频方案</em></h2>
                <small>内部结算参考，最终以视频组确认口径为准；下单时无需支付。</small>
              </div>
              <span>6 种方向</span>
            </div>

            <div className="selection-guide">
              {selectionGuide.map((item, idx) => (
                <div key={idx} className="guide-item">
                  <span>{item.situation}</span>
                  <strong>{item.service} →</strong>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICE LIST */}
          <div className="service-list">
            {/* FEATURED: AI DISPLAY */}
            {serviceTypes.slice(0, 1).map((srv) => (
              <div key={srv.id} className="service-card service-featured">
                <div className="service-card-head">
                  <span className="service-no">01</span>
                  <div className="service-card-title">
                    <h3>{srv.name}</h3>
                    <p>{srv.useFor}</p>
                    <div className="service-tags">
                      {srv.tags.map((t, i) => (
                        <span key={i}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToOrderCreate(srv.videoTypeId)}
                    className="service-order"
                  >
                    <span>创建此类需求</span>
                    <span>↗</span>
                  </button>
                </div>

                <div className="service-tiers tiers-3">
                  {srv.tiers.map((tier, i) => (
                    <div key={i} className="service-tier">
                      <div className="tier-top">
                        <h4>{tier.name}</h4>
                        <strong>{tier.price}</strong>
                      </div>
                      <p>{tier.bestFor}</p>
                      <div className="tier-spec">{tier.delivery}</div>
                    </div>
                  ))}
                </div>

                <div className="service-card-foot">
                  <p>{srv.note}</p>
                  <a href="#work">查看作品示范 ↗</a>
                </div>
              </div>
            ))}

            {/* COMPACT SERVICE GRID */}
            <div className="compact-service-grid">
              {serviceTypes.slice(1).map((srv, idx) => (
                <div key={srv.id} className="compact-service-card">
                  <header>
                    <span>0{idx + 2}</span>
                    <strong>{srv.tiers[0]?.price || '评估后报价'}</strong>
                  </header>

                  <h3>{srv.name}</h3>
                  <p>{srv.useFor}</p>

                  <div className="compact-service-tags">
                    {srv.tags.map((t, i) => (
                      <span key={i}>{t}</span>
                    ))}
                  </div>

                  <footer>
                    <a href="#work">查看作品示范</a>
                    <button
                      onClick={() => onNavigateToOrderCreate(srv.videoTypeId)}
                      className="compact-order"
                    >
                      创建需求 <span>↗</span>
                    </button>
                  </footer>
                </div>
              ))}
            </div>

            {/* SPECIAL SERVICE */}
            <div className="special-service">
              <div>
                <span>SPECIAL REQUEST</span>
                <h3>{specialService.name}</h3>
                <p>{specialService.useFor}</p>
              </div>

              <div className="special-service-side">
                <div className="service-tags">
                  {specialService.tags.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>

                <button
                  onClick={() => onNavigateToOrderCreate('vt_01')}
                >
                  <span>提交专项需求</span>
                  <span>↗</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* 05. TEAM SHOWCASE (10 Member Rail) */}
        {/* ======================================================== */}
        <div className="team-showcase" id="team">
          <div className="team-heading-wide">
            <div>
              <p>✦ 03 制作人员与状态</p>
              <h2>选择制作人，<em>查看当前接单情况</em></h2>
              <small>所有制作人均可承接常规需求；如需加急或特定风格，请参考当前队列状态。</small>
            </div>

            <div className="rail-controls">
              <button onClick={() => scrollRail('left')} title="向左滚动">←</button>
              <button onClick={() => scrollRail('right')} title="向右滚动">→</button>
            </div>
          </div>

          <div className="member-rail" ref={railRef}>
            {members.map((m, idx) => (
              <div key={m.id} className="member-tile">
                <div className="member-profile">
                  <span className={`availability ${m.tone}`}>
                    <i />
                    <span>{m.status}</span>
                  </span>

                  <img src={m.avatar} alt={m.name} className="member-avatar" />
                  <span className="member-number">0{idx + 1}</span>
                </div>

                <div className="member-tile-copy">
                  <p>{m.role}</p>
                  <h3>{m.name}</h3>

                  <div className="member-tags">
                    {m.skills.map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>

                  <div className="queue-row">
                    <span>当前接单状态</span>
                    <strong>{m.queue}</strong>
                  </div>

                  <div className="member-work">
                    <img src={m.workImage} alt={m.name} />
                    <span>代表作品示范</span>
                  </div>

                  <button
                    disabled={m.tone === 'full'}
                    onClick={() => {
                      if (onSelectCreatorToOrder) {
                        onSelectCreatorToOrder(m.id);
                      } else {
                        onNavigateToOrderCreate();
                      }
                    }}
                    className="member-order-btn"
                  >
                    {m.tone === 'full' ? '暂不可接单' : '由TA制作 ↗'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 06. TESTIMONIALS */}
        {/* ======================================================== */}
        <div className="feedback-section">
          <div className="feedback-heading">
            <p>✦ 04 项目反馈</p>
            <h2>业务评价 <span>· 示例内容</span></h2>
          </div>

          <div className="feedback-marquee">
            <div className="feedback-track">
              {[...testimonials, ...testimonials].map((t, idx) => (
                <blockquote key={idx}>
                  <span>“</span>
                  <p>{t.quote}</p>
                  <footer>
                    <strong>{t.person} · {t.role}</strong>
                    <small>{t.project}</small>
                    <i>✦</i>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 07. FINAL CTA */}
        {/* ======================================================== */}
        <div className="final-cta">
          <p>✦ CREATE VIDEO REQUEST</p>
          <h2>让好产品，<em>被更多人看见。</em></h2>
          <button
            onClick={() => onNavigateToOrderCreate()}
            className="primary-button"
          >
            <span>创建视频需求</span>
            <span>↗</span>
          </button>
          <p className="footer-note">填写产品基础信息、制作要求并选择制作人员，提交后直接进入视频组制作队列。</p>
        </div>

      </section>

      {/* WORK DETAIL PREVIEW MODAL */}
      {activeWorkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-[#111514] rounded-2xl border border-white/20 max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-4 bg-black/40 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#cfff20] text-black">
                  {activeWorkModal.videoTypeName || '精选作品'}
                </span>
                <h3 className="text-sm font-bold text-white">{activeWorkModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveWorkModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-rose-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="relative w-full aspect-16/9 bg-black rounded-xl overflow-hidden border border-white/10">
                <img
                  src={activeWorkModal.image || activeWorkModal.thumbnail}
                  alt={activeWorkModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-black/40 p-4 rounded-xl border border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-white/50 block font-mono">制作人员</span>
                  <p className="text-xs font-bold text-white mt-0.5">{activeWorkModal.creator}</p>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block font-mono">分类职责</span>
                  <p className="text-xs font-bold text-white mt-0.5">{activeWorkModal.role}</p>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block font-mono">规格</span>
                  <p className="text-xs font-bold text-white mt-0.5">{activeWorkModal.meta}</p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#cfff20]">// 作品说明</span>
                <p className="text-xs text-white/80 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/10">
                  {activeWorkModal.description}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-black/60 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/50">将带入此作品参数直接跳转至需求创建</span>
              <button
                onClick={() => {
                  onSelectWorkToOrder(activeWorkModal, activeWorkModal.videoTypeId);
                  setActiveWorkModal(null);
                }}
                className="px-5 py-2.5 rounded-full bg-[#cfff20] text-black font-bold text-xs hover:bg-[#dcff63] transition-colors cursor-pointer"
              >
                参考此作品创建需求 ↗
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
