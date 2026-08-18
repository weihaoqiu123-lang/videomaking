import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Clock3,
  ExternalLink,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import type { ServiceId, ServiceTierId } from '../data/serviceCatalog';
import { SERVICE_CATALOG } from '../data/serviceCatalog';
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

const WorkCard: React.FC<{
  work: PortfolioItem;
  onOpen: (work: PortfolioItem) => void;
  vertical?: boolean;
}> = ({ work, onOpen, vertical }) => (
  <button
    type="button"
    className={`pv2-work-card ${vertical ? 'pv2-work-card-vertical' : ''}`}
    onClick={() => onOpen(work)}
    aria-label={`播放 ${work.title}`}
  >
    <span className="pv2-work-media">
      <img src={work.image} alt={work.productName} loading="lazy" />
      <span className="pv2-play"><Play size={17} fill="currentColor" /></span>
    </span>
    <span className="pv2-work-copy">
      <span>
        <strong>{work.title}</strong>
        <small>{work.productName}</small>
      </span>
      <span className="pv2-work-meta">
        {work.tierName && <b>{work.tierName}</b>}
        <small>{work.creatorName} / {work.duration}</small>
      </span>
    </span>
  </button>
);

const WorkModal: React.FC<{
  work: PortfolioItem | null;
  onClose: () => void;
}> = ({ work, onClose }) => {
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
            aria-labelledby="pv2-modal-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.22 }}
          >
            <button type="button" className="pv2-modal-close" onClick={onClose} aria-label="关闭作品预览">
              <X size={20} />
            </button>
            <div className={`pv2-modal-media ${work.aspectRatio === '9:16' ? 'is-vertical' : ''}`}>
              {work.videoUrl ? (
                <video ref={videoRef} src={work.videoUrl} controls autoPlay playsInline poster={work.image} />
              ) : (
                <>
                  <img src={work.image} alt={work.productName} />
                  <span className="pv2-media-pending">完整视频待补充</span>
                </>
              )}
            </div>
            <div className="pv2-modal-content">
              <span className="pv2-modal-type">{work.videoTypeName}</span>
              <h3 id="pv2-modal-title">{work.title}</h3>
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

  const reveal = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 } };

  const openMemberWork = (workId: string) => {
    const selected = findPortfolioWork(workId);
    if (selected) setActiveWork(selected);
  };

  return (
    <div className="portfolio-shell-v2">
      <section className="pv2-hero" aria-labelledby="pv2-hero-title">
        <div className="pv2-hero-orbit" aria-hidden="true">
          <span className="pv2-orbit-disc" />
          <span className="pv2-orbit-frame" />
          <span className="pv2-orbit-glow" />
        </div>
        <motion.div
          className="pv2-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className="pv2-brand-line"><Sparkles size={15} /> HOOYA VIDEO</span>
          <h1 id="pv2-hero-title">HOOYA<br />视频制作服务页</h1>
          <p>欢迎各位同事。这里汇总了视频组近期优秀作品、视频服务类型和制作排期，确认需求后即可进入下单。</p>
          <div className="pv2-hero-actions">
            <button type="button" className="pv2-button pv2-button-primary" onClick={() => document.getElementById('portfolio-work')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })}>
              查看作品 <ArrowRight size={16} />
            </button>
            <button type="button" className="pv2-button pv2-button-ghost" onClick={() => onNavigateToOrderCreate()}>
              进入下单系统 <ExternalLink size={15} />
            </button>
          </div>
        </motion.div>
        <div className="pv2-hero-index" aria-hidden="true">
          <span>作品</span><strong>24</strong>
          <span>服务</span><strong>7</strong>
        </div>
      </section>

      <motion.section className="pv2-popular pv2-section" {...reveal}>
        <div className="pv2-section-heading">
          <h2>近期热门视频</h2>
          <p>用最近 30 天的播放与销售表现，帮助运营快速找到值得参考的方向。</p>
        </div>
        <div className="pv2-popular-grid">
          {popularWorks.map((work, index) => (
            <button key={work.id} type="button" className={`pv2-popular-card pv2-popular-card-${index + 1}`} onClick={() => setActiveWork(work)}>
              <img src={work.image} alt={work.productName} />
              <span className="pv2-popular-shade" />
              <span className="pv2-popular-copy">
                <span><b>{work.title}</b><small>{work.videoTypeName} / {work.creatorName}</small></span>
                <span className="pv2-metric"><strong>{work.metric.value}</strong><b>{work.metric.label}</b><small>{work.metric.period} / 演示数据</small></span>
              </span>
            </button>
          ))}
        </div>
      </motion.section>

      <section className="pv2-work pv2-section" id="portfolio-work">
        <div className="pv2-section-heading">
          <h2>按服务类型查看作品</h2>
          <p>点击作品可查看完整信息。正式视频素材到位后，静态封面会直接替换为播放器。</p>
        </div>

        {portfolioSections.map((section) => {
          const displayedWorks = section.serviceId === 'ai_showcase' ? aiWorks : section.works;
          const isVertical = section.serviceId === 'ugc';
          return (
            <motion.article className="pv2-work-section" key={section.serviceId} {...reveal}>
              <header className="pv2-work-section-head">
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.intro}</p>
                </div>
                <button type="button" onClick={() => onNavigateToOrderCreate(section.serviceId)}>
                  创建此类型视频需求 <ArrowRight size={15} />
                </button>
              </header>
              <div className="pv2-service-meta">
                <span><Clock3 size={14} /> {section.duration}</span>
                <span><BarChart3 size={14} /> {section.price}</span>
              </div>
              {section.tiers && (
                <div className="pv2-tier-tabs" role="tablist" aria-label="产品 AI 展示视频档位">
                  {section.tiers.map((tier) => (
                    <button
                      type="button"
                      key={tier.id}
                      role="tab"
                      aria-selected={activeAiTier === tier.id}
                      className={activeAiTier === tier.id ? 'is-active' : ''}
                      onClick={() => setActiveAiTier(tier.id)}
                    >
                      {tier.name}
                    </button>
                  ))}
                </div>
              )}
              <div className={`pv2-work-grid ${isVertical ? 'pv2-work-grid-vertical' : ''}`}>
                {displayedWorks.map((item) => (
                  <WorkCard key={item.id} work={item} onOpen={setActiveWork} vertical={isVertical} />
                ))}
              </div>
            </motion.article>
          );
        })}
      </section>

      <motion.section className="pv2-pricing pv2-section" {...reveal}>
        <div className="pv2-section-heading">
          <h2>服务与内部结算参考</h2>
          <p>同一成片用于不同渠道不重复收费。新增画幅、版本或重新制作时按对应服务计费。</p>
        </div>
        <div className="pv2-pricing-list">
          {SERVICE_CATALOG.filter((service) => !service.customQuote).map((service) => (
            <article key={service.id}>
              <span>{service.number}</span>
              <div><h3>{service.name}</h3><p>{service.summary}</p></div>
              <div><strong>{service.priceLabel}</strong><small>{service.duration}</small></div>
              <button type="button" onClick={() => onNavigateToOrderCreate(service.id)} aria-label={`创建${service.name}需求`}><ArrowRight size={17} /></button>
            </article>
          ))}
        </div>
        <p className="pv2-pricing-note">价格为公司内部结算参考。下单时无需支付，最终以视频组确认为准。</p>
      </motion.section>

      <motion.section className="pv2-team pv2-section" {...reveal}>
        <div className="pv2-section-heading">
          <h2>制作团队与排队状态</h2>
          <p>状态根据当前任务数自动计算。点击代表作品可查看对应制作方向。</p>
        </div>
        <div className="pv2-team-grid">
          {portfolioMembers.map((member) => {
            const representative = findPortfolioWork(member.representativeWorkId);
            return (
              <article className="pv2-member" key={member.id}>
                <div className="pv2-member-profile">
                  <img src={member.avatar} alt={member.name} />
                  <div><h3>{member.name}</h3><p>{member.specialty}</p></div>
                  <span className={`pv2-status pv2-status-${member.statusKey}`}>{member.status}</span>
                </div>
                <button type="button" className="pv2-member-work" onClick={() => openMemberWork(member.representativeWorkId)}>
                  <img src={representative?.image} alt={representative?.productName || `${member.name}代表作品`} />
                  <span><small>代表作品</small><strong>{representative?.title}</strong></span>
                  <Play size={16} fill="currentColor" />
                </button>
                <p className="pv2-member-estimate">{member.estimate}</p>
              </article>
            );
          })}
        </div>
      </motion.section>

      <section className="pv2-custom pv2-section">
        <div>
          <span>非标准项目</span>
          <h2>定制 / 专项需求</h2>
          <p>适用于品牌宣传片、特殊人物拍摄、社媒 how-to 或其他需要单独确认方案的项目。</p>
        </div>
        <div>
          <strong>确认方案后报价</strong>
          <button type="button" className="pv2-button pv2-button-primary" onClick={() => onNavigateToOrderCreate('custom')}>
            提交专项需求 <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <WorkModal work={activeWork} onClose={() => setActiveWork(null)} />
    </div>
  );
};
