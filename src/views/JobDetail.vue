<script setup lang="ts">
import { ref } from 'vue'

const showContactModal = ref(false)

const openContactModal = () => {
  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
}

interface SimilarJob {
  id: number
  title: string
  department: string
  salary: string
}

const descriptionHtml = ref(`<p>1.架构与模块设计：参与脑机芯片系统级架构定义，负责关键数字模块(如神经信号数字预处理单元、片上神经网络加速器、高速低功耗数据接口、安全与控制状态机)的微架构设计与RTL实现。</p>
<p>2.RTL实现与验证：使用Verilog/SystemVerilog进行高质量的RTL编码，并搭建或维护基于UVM/形式验证的验证环境，确保功能正确性，满足植入式设备标准。</p>
<p>3.低功耗设计：深入应用芯片级、架构级、RTL级与门级低功耗技术(如电源门控、多电压域、动态电压频率调节、时钟门控)，实现超低功耗目标。</p>
<p>4.时序与物理设计协同：进行综合、静态时序分析、功耗分析，并与物理设计团队紧密合作。指导布局布线，解决时序收敛、信号完整性和可靠性问题。</p>
<p>5.系统集成与验证：负责数字子系统与模拟前端、无线收发模块的集成验证。支持芯片测试方案制定、硅后调试与性能表征。</p>
<p>6.算法硬件化：与算法科学家合作，将神经信号处理、解码、编码等复杂算法进行硬件优化、定点化与高效映射。</p>
<p><strong>任职要求：</strong></p>
<p>1.扎实的工程基础：具备严谨的数字逻辑思维、出色的分析和解决复杂问题的能力。</p>
<p>2.卓越的学习与创新：对脑科学、神经工程有强烈兴趣，能快速学习跨学科知识，并勇于在约束下进行创新。</p>
<p>3.极致的质量与可靠意识：深刻理解脑机芯片对安全性与可靠性的苛刻要求，工作细致，具有高度的责任感。</p>
<p>4.系统级视野：不仅关注模块设计，更能理解芯片在完整系统中的角色以及与生物组织的交互。</p>
<p>5.团队协作与沟通：具备出色的跨职能(算法、模拟、软件、临床)沟通能力，能清晰阐述设计权衡与决策。</p>
<p><strong>专业技能要求：</strong></p>
<p><strong>必需技能：</strong></p>
<p>1.数字设计全流程精通：熟练掌握从RTL到GDSII的设计流程，包括RTL设计、验证、综合、形式验证、静态时序分析。</p>
<p>2.硬件描述语言：精通Verilog/SystemVerilog，具备编写高质量、可综合、可复用代码的能力。</p>
<p>3.验证方法学：熟练掌握UVM或类似高级验证方法学，能构建复杂的验证环境。</p>
<p>4.低功耗技术：具备丰富的低功耗设计实践经验，熟悉UPF/CPF功耗意图描述。</p>`)

const similarJobs: SimilarJob[] = [
  { id: 1, title: '神经算法研究员', department: '研发部', salary: '25k-40k' },
  { id: 2, title: '高级嵌入式软件工程师', department: '技术部', salary: '28k-45k' },
  { id: 3, title: '临床医学总监', department: '临床事务部', salary: '20k-35k' },
]
</script>

<template>
  <div class="job-detail">
    <!-- Hero Section -->
    <section class="job-detail__hero">
      <div class="job-detail__hero-bg" />
      <div class="job-detail__hero-gradient" />
      <div class="job-detail__hero-inner">
        <div class="job-detail__breadcrumb">
          <span class="job-detail__breadcrumb-item">关于我们</span>
          <span class="job-detail__breadcrumb-sep">/</span>
          <span class="job-detail__breadcrumb-item">招聘职位</span>
          <span class="job-detail__breadcrumb-sep">/</span>
          <span class="job-detail__breadcrumb-item">社招招聘</span>
        </div>
        <div class="job-detail__hero-content">
          <h1 class="job-detail__title">数字芯片设计工程师</h1>
          <p class="job-detail__meta">35k-45k · 15薪 | 杭州 (Hangzhou)</p>
          <div class="job-detail__hero-actions">
            <button class="job-detail__apply-btn">立即申请</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Grid -->
    <section class="job-detail__content">
      <!-- Left Column -->
      <div class="job-detail__left">
        <!-- Job Description -->
        <div class="job-detail__section">
          <div class="job-detail__section-heading">
            <span class="job-detail__section-accent" />
            <h2 class="job-detail__section-title">职位描述</h2>
          </div>
          <div class="job-detail__richtext" v-html="descriptionHtml" />
          <div class="job-detail__list">
            <div class="job-detail__list-item">
              <span class="job-detail__list-bullet" />
              <span class="job-detail__list-text">负责植入式脊髓神经刺激器(SCS)的系统架构设计与算法优化。</span>
            </div>
            <div class="job-detail__list-item">
              <span class="job-detail__list-bullet" />
              <span class="job-detail__list-text">领导核心芯片的功能定义与硬件电路开发。</span>
            </div>
            <div class="job-detail__list-item">
              <span class="job-detail__list-bullet" />
              <span class="job-detail__list-text">协同临床团队进行动物实验与临床试验数据分析。</span>
            </div>
            <div class="job-detail__list-item">
              <span class="job-detail__list-bullet" />
              <span class="job-detail__list-text">参与国内外医疗器械注册报批相关技术文档编写。</span>
            </div>
          </div>
        </div>

        <!-- Recruitment Process -->
        <div class="job-detail__process">
          <h2 class="job-detail__process-title">招聘流程</h2>
          <div class="job-detail__process-steps">
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle">
                <span class="job-detail__process-shadow" />
                <span class="job-detail__process-num">1</span>
              </div>
              <span class="job-detail__process-label">简历投递</span>
            </div>
            <span class="job-detail__process-divider" />
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle">
                <span class="job-detail__process-shadow" />
                <span class="job-detail__process-num">2</span>
              </div>
              <span class="job-detail__process-label">技术面试</span>
            </div>
            <span class="job-detail__process-divider" />
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle">
                <span class="job-detail__process-shadow" />
                <span class="job-detail__process-num">3</span>
              </div>
              <span class="job-detail__process-label">团队面试</span>
            </div>
            <span class="job-detail__process-divider" />
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle">
                <span class="job-detail__process-shadow" />
                <span class="job-detail__process-num">4</span>
              </div>
              <span class="job-detail__process-label">高管面谈</span>
            </div>
            <span class="job-detail__process-divider" />
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle job-detail__process-circle--check">
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
                  <path d="M18.5 5.5L9 15.5L4 10.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <span class="job-detail__process-label job-detail__process-label--bold">Offer发放</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <aside class="job-detail__sidebar">
        <!-- Recruiter Card -->
        <div class="job-detail__recruiter">
          <div class="job-detail__recruiter-top">
            <div class="job-detail__recruiter-avatar">
              <img src="" alt="Dr. Zhang" class="job-detail__recruiter-avatar-img" />
            </div>
            <div class="job-detail__recruiter-info">
              <h3 class="job-detail__recruiter-name">Dr. Zhang</h3>
              <span class="job-detail__recruiter-role">招聘总监</span>
            </div>
          </div>
          <p class="job-detail__recruiter-quote">
            "我们在寻找那些渴望用技术重塑生命质量的梦想<br />家。期待在神络医疗见到你。"
          </p>
          <button class="job-detail__recruiter-btn job-detail__recruiter-btn--primary" @click="openContactModal">
            立即沟通
          </button>
          <button class="job-detail__recruiter-btn job-detail__recruiter-btn--outline">
            投递简历
          </button>
        </div>

        <!-- Similar Jobs -->
        <div class="job-detail__similar">
          <h3 class="job-detail__similar-title">相关职位</h3>
          <div class="job-detail__similar-list">
            <div v-for="job in similarJobs" :key="job.id" class="job-detail__similar-item">
              <h4 class="job-detail__similar-item-title">{{ job.title }}</h4>
              <span class="job-detail__similar-item-meta">{{ job.department }} · {{ job.salary }}</span>
            </div>
          </div>
        </div>

        <!-- Location Map -->
        <div class="job-detail__map">
          <div class="job-detail__map-bg">
            <img src="" alt="地图" class="job-detail__map-img" />
          </div>
          <div class="job-detail__map-overlay">
            <div class="job-detail__map-location">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M5 0C2.79 0 1 1.79 1 4C1 7 5 12 5 12S9 7 9 4C9 1.79 7.21 0 5 0ZM5 5.5C4.17 5.5 3.5 4.83 3.5 4C3.5 3.17 4.17 2.5 5 2.5C5.83 2.5 6.5 3.17 6.5 4C6.5 4.83 5.83 5.5 5 5.5Z" fill="white" />
              </svg>
              <span class="job-detail__map-address">杭州余杭区杭州神络医疗科技有限公司8-5</span>
            </div>
          </div>
        </div>
      </aside>
    </section>

    <!-- Contact Modal -->
    <Teleport to="body">
      <div v-if="showContactModal" class="job-detail__modal-mask" @click="closeContactModal">
        <div class="job-detail__modal-card" @click.stop>
          <div class="job-detail__modal-qr">
            <img src="" alt="微信二维码" class="job-detail__modal-qr-img" />
          </div>
          <p class="job-detail__modal-text">扫描微信二维码联系</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.job-detail {
  --color-white: #FFFFFF;
  --color-black: #181C20;
  --color-brand: #0163FF;
  --color-text-heading: #181C20;
  --color-text-body: #434656;
  --color-text-muted: #64748B;
  --color-border: rgba(195, 197, 217, 0.2);
  --color-border-light: rgba(195, 197, 217, 0.3);
  --color-bg-process: #F1F4F9;
  --font-body: 'PingFang SC', 'Noto Sans SC', sans-serif;
  --font-heading: 'Inter', 'PingFang SC', sans-serif;
  width: 100%;
}

/* ========== Hero Section ========== */
.job-detail__hero {
  position: relative;
  width: 1920px;
  height: 614px;
  margin: 0 auto;
  overflow: hidden;
}

.job-detail__hero-bg {
  position: absolute;
  inset: 0;
  background: #696969;
}

.job-detail__hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 67, 203, 0.9) 0%, rgba(0, 67, 203, 0.4) 100%);
}

.job-detail__hero-inner {
  position: relative;
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;
}

/* ========== Breadcrumb ========== */
.job-detail__breadcrumb {
  position: absolute;
  left: 160px;
  top: 32px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.job-detail__breadcrumb-item {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.0536em;
  color: var(--color-white);
}

.job-detail__breadcrumb-sep {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.0536em;
  color: var(--color-white);
}

/* ========== Hero Content ========== */
.job-detail__hero-content {
  position: absolute;
  left: 320px;
  top: 176px;
  width: 1280px;
}

.job-detail__title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 72px;
  line-height: 72px;
  letter-spacing: -0.05em;
  color: var(--color-white);
  margin: 0 0 16px 0;
  max-width: 620px;
}

.job-detail__meta {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #DCE1FF;
  margin: 0 0 32px 0;
}

.job-detail__hero-actions {
  display: flex;
  gap: 16px;
}

.job-detail__apply-btn {
  position: relative;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: var(--color-brand);
  background: var(--color-white);
  border: none;
  border-radius: 6px;
  padding: 16.5px 32px 17.5px;
  cursor: pointer;
  box-shadow: 0px 8px 10px -6px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s;
}

.job-detail__apply-btn:hover {
  opacity: 0.9;
}

/* ========== Content Grid ========== */
.job-detail__content {
  display: flex;
  gap: 48px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 0;
}

/* ========== Left Column ========== */
.job-detail__left {
  flex: 1;
  min-width: 0;
}

.job-detail__section {
  margin-bottom: 60px;
}

.job-detail__section-heading {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.job-detail__section-accent {
  width: 4px;
  height: 24px;
  background: var(--color-brand);
  border-radius: 2px;
  flex-shrink: 0;
}

.job-detail__section-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  letter-spacing: -0.025em;
  color: var(--color-text-heading);
  margin: 0;
}

.job-detail__richtext {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: var(--color-text-body);
  margin-bottom: 24px;
}

.job-detail__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.job-detail__list-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.job-detail__list-bullet {
  width: 8px;
  height: 8px;
  background: var(--color-brand);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 9px;
}

.job-detail__list-text {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: var(--color-text-body);
}

/* ========== Process Section ========== */
.job-detail__process {
  background: var(--color-bg-process);
  border-radius: 16px;
  padding: 40px;
}

.job-detail__process-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: var(--color-text-heading);
  margin: 0 0 40px 0;
  text-align: center;
}

.job-detail__process-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-detail__process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.job-detail__process-circle {
  position: relative;
  width: 48px;
  height: 48px;
  background: var(--color-brand);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.job-detail__process-circle--check {
  background: var(--color-brand);
}

.job-detail__process-shadow {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  border-radius: 12px;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.job-detail__process-num {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-white);
}

.job-detail__process-label {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-heading);
  text-align: center;
}

.job-detail__process-label--bold {
  font-family: var(--font-heading);
  font-weight: 600;
}

.job-detail__process-divider {
  flex: 1;
  height: 1px;
  background: var(--color-border-light);
  flex-shrink: 0;
  margin-bottom: 16px;
}

/* ========== Right Sidebar ========== */
.job-detail__sidebar {
  width: 400px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 392px;
}

/* ========== Recruiter Card ========== */
.job-detail__recruiter {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 33px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.job-detail__recruiter-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.job-detail__recruiter-avatar {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #E0E0E0;
}

.job-detail__recruiter-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.job-detail__recruiter-info {
  display: flex;
  flex-direction: column;
}

.job-detail__recruiter-name {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: var(--color-text-heading);
  margin: 0;
}

.job-detail__recruiter-role {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-body);
}

.job-detail__recruiter-quote {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 22.75px;
  color: var(--color-text-body);
  margin: 0 0 22px 0;
}

.job-detail__recruiter-btn {
  width: 100%;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 13px 0 12px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.job-detail__recruiter-btn:hover {
  opacity: 0.9;
}

.job-detail__recruiter-btn--primary {
  background: var(--color-brand);
  color: var(--color-white);
  margin-bottom: 19px;
}

.job-detail__recruiter-btn--outline {
  background: transparent;
  color: var(--color-brand);
  border-color: var(--color-brand);
}

/* ========== Similar Jobs ========== */
.job-detail__similar {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.job-detail__similar-title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.025em;
  color: var(--color-text-heading);
  margin: 0 0 24px 0;
}

.job-detail__similar-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.job-detail__similar-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.job-detail__similar-item-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-heading);
  margin: 0;
}

.job-detail__similar-item-meta {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-body);
}

/* ========== Map ========== */
.job-detail__map {
  position: relative;
  height: 192px;
  border-radius: 16px;
  overflow: hidden;
}

.job-detail__map-bg {
  position: absolute;
  inset: 0;
  background: #BDBDBD;
}

.job-detail__map-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.job-detail__map-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 67, 203, 0.2);
  display: flex;
  align-items: flex-end;
  padding: 24px;
}

.job-detail__map-location {
  display: flex;
  align-items: center;
  gap: 8px;
}

.job-detail__map-address {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-white);
}

/* ========== Contact Modal ========== */
.job-detail__modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.job-detail__modal-card {
  width: 604px;
  height: 633px;
  background: var(--color-white);
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.job-detail__modal-qr {
  width: 243px;
  height: 243px;
  background: #585858;
  border-radius: 0;
  margin-top: 160px;
  overflow: hidden;
}

.job-detail__modal-qr-img {
  width: 243px;
  height: 253px;
  object-fit: cover;
  margin-top: -5px;
}

.job-detail__modal-text {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: var(--color-black);
  margin: 40px 0 0 0;
}

/* ========== Responsive ========== */
@media (max-width: 1600px) {
  .job-detail__hero {
    width: 100%;
    height: 480px;
  }

  .job-detail__hero-inner {
    max-width: 1280px;
  }

  .job-detail__breadcrumb {
    left: 32px;
  }

  .job-detail__hero-content {
    left: 32px;
    top: 140px;
    width: auto;
    right: 32px;
  }

  .job-detail__title {
    font-size: 56px;
    line-height: 56px;
  }

  .job-detail__content {
    padding: 60px 32px;
    gap: 40px;
  }

  .job-detail__sidebar {
    width: 360px;
  }
}

@media (max-width: 768px) {
  .job-detail__hero {
    height: 380px;
  }

  .job-detail__breadcrumb {
    left: 20px;
    top: 24px;
  }

  .job-detail__hero-content {
    left: 20px;
    right: 20px;
    top: 100px;
    width: auto;
  }

  .job-detail__title {
    font-size: 36px;
    line-height: 40px;
  }

  .job-detail__meta {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;
  }

  .job-detail__apply-btn {
    font-size: 16px;
    padding: 12px 24px;
  }

  .job-detail__content {
    flex-direction: column;
    padding: 40px 20px;
    gap: 32px;
  }

  .job-detail__sidebar {
    width: 100%;
    padding-bottom: 0;
  }

  .job-detail__process {
    padding: 24px;
  }

  .job-detail__process-steps {
    flex-wrap: wrap;
    gap: 16px;
  }

  .job-detail__process-divider {
    display: none;
  }

  .job-detail__section-heading {
    margin-bottom: 24px;
  }

  .job-detail__section-title {
    font-size: 22px;
    line-height: 30px;
  }
}
</style>