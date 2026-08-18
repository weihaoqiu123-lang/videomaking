import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ExternalLink, Play, Volume2, VolumeX, X } from 'lucide-react';
import type { ServiceId, ServiceTierId } from '../data/serviceCatalog';
import { AI_SHOWCASE_TIERS, SERVICE_CATALOG } from '../data/serviceCatalog';
import {
  findPortfolioWork,
  portfolioMembers,
  portfolioSections,
  popularWorks,
  type PortfolioItem,
} from '../data/portfolioData';

interface PortfolioViewProps {
  onNavigateToOrderCreate: (videoTypeId?: ServiceId) => void;
  onSelectWorkToOrder?: (work?: PortfolioItem, videoTypeId?: ServiceId) => void;
  focusWorkId?: string | null;
  onFocusWorkConsumed?: () => void;
}

const HERO_VIDEO_URL = 'https://videos.pexels.com/video-files/853800/853800-hd_1920_1080_30fps.mp4';
const marqueeStills = Array.from(
  { length: 21 },
  (_, index) => `/portfolio/showreel/still-${String(index + 1).padStart(2, '0')}.webp`,
);
const marqueeRows = [
  marqueeStills.slice(0, 7),
  marqueeStills.slice(7, 14),
  marqueeStills.slice(14, 21),
];

const WorkModal: React.FC<{ work: PortfolioItem | null; onClose: () => void }> = ({ work, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!work) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [work, onClose]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          className="pv2-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.div
            className="pv2-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.22 }}
          >
            <button type="button" className="pv2-modal-close" onClick={onClose} aria-label="关闭作品预览"><X size={20} /></button>
            <div className={`pv2-modal-media ${work.aspectRatio === '9:16' ? 'is-vertical' : ''}`}>
              {work.videoUrl ? (
                <video ref={videoRef} src={work.videoUrl} controls autoPlay playsInline poster={work.image} />
              ) : (
                <><img src={work.image} alt={work.productName} /><span className="pv2-media-pending">完整视频待补充</span></>
              )}
            </div>
            <div className="pv2-modal-content">
              <span className="pv2-modal-type">{work.videoTypeName}</span>
              <h3 id="portfolio-modal-title">{work.title}</h3>
              <p>{work.description}</p>
              <dl>
                <div><dt>档位</dt><dd>{work.tierName || '标准服务'}</dd></div>
                <div><dt>制作人</dt><dd>{work.creatorName}</dd></div>
                <div><dt>时长</dt><dd>{work.duration}</dd></div>
              </dl>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onNavigateToOrderCreate,
  focusWorkId,
  onFocusWorkConsumed,
}) => {
  const reduceMotion = useReducedMotion();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const memberRailRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [activeWork, setActiveWork] = useState<PortfolioItem | null>(null);
  const [activeAiTier, setActiveAiTier] = useState<ServiceTierId>('standard');

  const aiWorks = useMemo(() => {
    const aiSection = portfolioSections.find((section) => section.serviceId === 'ai_showcase');
    return aiSection?.tiers?.find((tier) => tier.id === activeAiTier)?.works || [];
  }, [activeAiTier]);

  useEffect(() => {
    if (!focusWorkId) return;
    const work = findPortfolioWork(focusWorkId);
    if (work) setActiveWork(work);
    onFocusWorkConsumed?.();
  }, [focusWorkId, onFocusWorkConsumed]);

  const toggleSound = () => {
    if (!heroVideoRef.current) return;
    heroVideoRef.current.muted = !heroVideoRef.current.muted;
    setMuted(heroVideoRef.current.muted);
  };

  const scrollMembers = (direction: number) => {
    memberRailRef.current?.scrollBy({ left: direction * 360, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const openMemberWork = (workId: string) => {
    const selected = findPortfolioWork(workId);
    if (selected) setActiveWork(selected);
  };

  const featuredService = SERVICE_CATALOG[0];
  const compactServices = SERVICE_CATALOG.slice(1, 6);
  const customService = SERVICE_CATALOG[6];

  return (
    <div className="portfolio-root">
      <section className="hero" id="top" aria-labelledby="portfolio-hero-title">
        <div className="hero-media" aria-hidden="true">
          <img className="hero-fallback" src="/portfolio/showreel/still-01.webp" alt="" />
          <video
            ref={heroVideoRef}
            className="hero-video"
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            poster="/portfolio/showreel/still-01.webp"
            onError={(event) => { event.currentTarget.style.display = 'none'; }}
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
          <div className="hero-media-tint" />
        </div>

        <header className="portfolio-topbar">
          <a className="portfolio-brand" href="#top" aria-label="HOOYA 视频制作服务页首页"><span aria-hidden="true">V</span><b>HOOYA VIDEO</b></a>
          <nav aria-label="作品集导航"><a href="#portfolio-work">精选作品</a><a href="#services">服务与价格</a><a href="#team">制作团队</a></nav>
          <button type="button" className="portfolio-nav-order" onClick={() => onNavigateToOrderCreate()}>进入下单系统 <ExternalLink size={15} /></button>
        </header>

        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">VIDEO CREATIVE DEPARTMENT 2026</p>
          <h1 id="portfolio-hero-title">HOOYA<br /><em>视频制作服务页</em></h1>
          <p className="hero-intro">欢迎各位同事。这里汇总了视频组近期优秀作品、视频服务类型和制作排期，确认需求后即可进入下单。</p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => document.getElementById('portfolio-work')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })}>查看作品 <ArrowRight size={17} /></button>
            <button type="button" className="hero-secondary-button" onClick={() => onNavigateToOrderCreate()}>进入下单系统 <ExternalLink size={16} /></button>
          </div>
        </motion.div>

        <button className="sound-toggle" type="button" onClick={toggleSound} aria-label={muted ? '打开背景视频声音' : '关闭背景视频声音'}>
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}{muted ? 'SOUND OFF' : 'SOUND ON'}
        </button>
      </section>

      <section className="work-section" id="portfolio-work" aria-labelledby="popular-title">
        <div className="work-container">
          <div className="work-header">
            <div className="section-topline"><p>RECENT PERFORMANCE</p><p>最近 30 天，演示数据</p></div>
            <div className="work-heading-row"><h2 id="popular-title">近期热门视频</h2><p className="work-subdesc">三个经过数据验证的作品方向，帮助运营快速判断值得参考的内容。</p></div>
          </div>
          <div className="portfolio-popular-grid">
            {popularWorks.map((work, index) => (
              <button key={work.id} type="button" className={`portfolio-popular-card card-${index + 1}`} onClick={() => setActiveWork(work)}>
                <img src={work.image} alt={work.productName} /><span className="portfolio-popular-shade" />
                <span className="portfolio-popular-copy">
                  <span><b>{work.title}</b><small>{work.videoTypeName} / {work.creatorName}</small></span>
                  <span className="portfolio-metric"><strong>{work.metric.value}</strong><b>{work.metric.label}</b><small>{work.metric.period}</small></span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-showreel" aria-label="作品画面预览">
          {marqueeRows.map((row, rowIndex) => (
            <div className={`showreel-row row-${rowIndex + 1}`} key={rowIndex}>
              <div className="showreel-track">
                {[...row, ...row].map((image, imageIndex) => <img key={`${rowIndex}-${imageIndex}`} src={image} alt="" loading="lazy" />)}
              </div>
            </div>
          ))}
        </div>

        <div className="work-container portfolio-types-wrap">
          <div className="work-header portfolio-catalog-heading">
            <div className="section-topline"><p>PORTFOLIO BY SERVICE</p><p>点击作品查看完整信息</p></div>
            <div className="work-heading-row"><h2>先看作品，再选类型。</h2></div>
          </div>
          <div className="portfolio-types">
            {portfolioSections.map((section, sectionIndex) => {
              const displayedWorks = section.serviceId === 'ai_showcase' ? aiWorks : section.works;
              const isVertical = section.serviceId === 'ugc';
              return (
                <article className="portfolio-category" key={section.serviceId}>
                  <header className="category-header">
                    <div className="category-title-block"><span className="category-num">{String(sectionIndex + 1).padStart(2, '0')}</span><div><h3>{section.title}</h3><p className="category-desc">{section.intro}</p></div></div>
                    <button type="button" className="category-order-btn" onClick={() => onNavigateToOrderCreate(section.serviceId)}>创建此类型视频需求 <ArrowRight size={15} /></button>
                  </header>
                  {section.tiers && (
                    <div className="portfolio-tier-tabs" role="tablist" aria-label="产品 AI 展示视频档位">
                      {section.tiers.map((tier) => (
                        <button type="button" key={tier.id} role="tab" aria-selected={activeAiTier === tier.id} className={activeAiTier === tier.id ? 'is-active' : ''} onClick={() => setActiveAiTier(tier.id)}>{tier.name}</button>
                      ))}
                    </div>
                  )}
                  <div className={`work-grid ${isVertical ? 'is-vertical' : ''}`}>
                    {displayedWorks.map((work) => (
                      <button key={work.id} type="button" className={`work-card ${isVertical ? 'is-vertical' : ''}`} onClick={() => setActiveWork(work)} aria-label={`播放 ${work.title}`}>
                        <span className="work-cover-wrap"><img src={work.image} alt={work.productName} loading="lazy" /><span className="work-overlay"><span className="play-badge"><Play size={13} fill="currentColor" /> PREVIEW</span></span></span>
                        <span className="work-info"><span className="work-info-main"><strong className="work-title">{work.title}</strong><small className="work-sub">{work.productName}</small></span><span className="work-card-meta"><b>{work.tierName || work.creatorName}</b><small>{work.duration}</small></span></span>
                      </button>
                    ))}
                  </div>
                  <div className="category-foot"><span>{section.duration}</span><span>{section.price}</span></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services" id="services" aria-labelledby="services-title">
        <div className="section-topline light-line"><p>视频方案与价格</p><p>公司内部结算参考</p></div>
        <div className="service-layout">
          <div className="service-lead">
            <div className="section-title-row"><div><p>HOW TO CHOOSE</p><h2 id="services-title">选择合适的<br /><em>视频方案</em></h2><small>根据素材条件、产品难度和成片目标选择。价格与具体要求将在提交前再次确认。</small></div><span>7 种服务</span></div>
            <div className="selection-guide" aria-label="视频类型快速选择">
              <div className="guide-item"><span>只有产品图片和资料</span><strong>产品 AI 展示视频</strong></div>
              <div className="guide-item"><span>有真实样品，需要展示细节</span><strong>产品实拍展示视频</strong></div>
              <div className="guide-item"><span>用于社媒发布或广告测试</span><strong>社媒 UGC 广告</strong></div>
              <div className="guide-item"><span>已有素材，只需要重新剪辑</span><strong>纯剪辑任务</strong></div>
            </div>
          </div>
          <div className="service-list">
            <article className="service-card service-featured">
              <div className="service-card-head"><span className="service-no">{featuredService.number}</span><div className="service-card-title"><h3>{featuredService.name}</h3><p>{featuredService.summary}</p><div className="service-tags"><span>无样品可做</span><span>支持横版与竖版</span><span>最快 30 秒成片</span></div></div><button type="button" className="service-order" onClick={() => onNavigateToOrderCreate(featuredService.id)}>创建需求 <ArrowRight size={15} /></button></div>
              <div className="service-tiers tiers-3">{AI_SHOWCASE_TIERS.map((tier) => <div className="service-tier" key={tier.id}><div className="tier-top"><h4>{tier.name}</h4><strong>{tier.price} USD</strong></div><p>{tier.description}</p><div className="tier-spec">{tier.duration} / {tier.resolution}</div></div>)}</div>
              <div className="service-card-foot"><p>横竖双版按对应档位基础费用 ×1.5 计算。</p><a href="#portfolio-work">查看作品示范</a></div>
            </article>
            <div className="compact-service-grid">
              {compactServices.map((service) => (
                <article className="compact-service-card" key={service.id}><header><span>{service.number}</span><strong>{service.priceLabel}</strong></header><h3>{service.name}</h3><p>{service.summary}</p><div className="compact-service-tags"><span>{service.duration}</span><span>{service.materialHint}</span></div><footer><a href="#portfolio-work">查看作品示范</a><button type="button" className="compact-order" onClick={() => onNavigateToOrderCreate(service.id)}>创建需求 <ArrowRight size={14} /></button></footer></article>
              ))}
            </div>
            <aside className="special-service">
              <div><span>非标准项目</span><h3>{customService.name}</h3><p>{customService.summary}</p></div>
              <div className="special-service-side"><div className="service-tags"><span>项目 Brief</span><span>参考作品</span><span>期望时间</span></div><p>确认方案后报价</p><button type="button" onClick={() => onNavigateToOrderCreate(customService.id)}>提交专项需求 <ArrowRight size={15} /></button></div>
            </aside>
          </div>
        </div>

        <section className="team-showcase" id="team" aria-labelledby="team-title">
          <div className="team-heading-wide"><div><p>制作团队与排队状态</p><h2 id="team-title">查看制作人，了解<br /><em>当前接单情况</em></h2><small>状态根据当前任务数自动计算。点击代表作品可查看对应制作方向。</small></div><div className="rail-controls" aria-label="成员列表翻页"><button type="button" onClick={() => scrollMembers(-1)} aria-label="查看上一组成员"><ArrowLeft size={18} /></button><button type="button" onClick={() => scrollMembers(1)} aria-label="查看下一组成员"><ArrowRight size={18} /></button></div></div>
          <div className="member-rail" ref={memberRailRef}>
            {portfolioMembers.map((member, index) => {
              const representative = findPortfolioWork(member.representativeWorkId);
              return (
                <article className="member-tile" key={member.id}>
                  <div className="member-profile"><img className="member-avatar" src={member.avatar} alt={`${member.name} 的头像`} loading="lazy" /><span className={`availability ${member.statusKey}`}><i />{member.status}</span><span className="member-number">{String(index + 1).padStart(2, '0')}</span></div>
                  <div className="member-tile-copy"><p>VIDEO CREATOR</p><h3>{member.name}</h3><div className="member-tags">{member.specialty.split('/').map((skill) => <span key={skill}>{skill.trim()}</span>)}</div><div className="queue-row"><span>当前排队情况</span><strong>{member.currentTasks} 个任务，{member.estimate}</strong></div><button type="button" className="member-work member-work-button" onClick={() => openMemberWork(member.representativeWorkId)}><img src={representative?.image} alt={representative?.productName || `${member.name}代表作品`} loading="lazy" /><span>{representative?.title || '代表作品'}</span></button></div>
                </article>
              );
            })}
          </div>
        </section>

        <footer className="final-cta"><p>HOOYA VIDEO</p><h2>让好产品，<em>被更多人看见。</em></h2><button type="button" className="primary-button" onClick={() => onNavigateToOrderCreate()}>进入下单系统 <ArrowRight size={17} /></button><div className="footer-note">从创意到成片，为每一次产品表达提供更合适的画面。</div></footer>
      </section>

      <WorkModal work={activeWork} onClose={() => setActiveWork(null)} />
    </div>
  );
};
