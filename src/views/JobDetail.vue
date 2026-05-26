<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showContactModal = ref(false)

const openContactModal = () => {
  showContactModal.value = true
}

const email = ref('public@seeneuro.com')
const isEmail = ref(false)
const openContactEmail = () => {
  try {
    window.open(`mailto:${email.value}`, '_blank')
  } catch (error) {
    isEmail.value = true
    showContactModal.value = true
  }
}

const showMessage = ref(false)

const copyEmail = () => {
  navigator.clipboard.writeText(email.value)
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 2000)
}

const closeContactModal = () => {
  showContactModal.value = false
  isEmail.value = false
}

interface SimilarJob {
  id: number
  title: string
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
  { id: 1, title: '神经算法研究员', salary: '25k-40k' },
  { id: 2, title: '高级嵌入式软件工程师', salary: '28k-45k' },
  { id: 3, title: '临床医学总监', salary: '20k-35k' },
]
const openJobDetail = (id: number) => {
  router.push(`/careers/${id}`)
}
</script>

<template>
  <div :class="{ 'job-message': true, 'job-message--show': showMessage }">
    <span class="job-message__text">{{ $t('careers.jobDetail.emailCopied') }}</span>
  </div>
  <div class="job-detail">
    <!-- Hero Section -->
    <section class="job-detail__hero">
      <div class="job-detail__hero-bg" />
      <div class="job-detail__hero-gradient" />
      <div class="job-detail__hero-inner">
        <div class="job-detail__breadcrumb">
          <span class="job-detail__breadcrumb-item">{{ $t('careers.jobDetail.breadcrumb1') }}</span>
          <span class="job-detail__breadcrumb-sep">/</span>
          <span class="job-detail__breadcrumb-item">{{ $t('careers.jobDetail.breadcrumb2') }}</span>
          <span class="job-detail__breadcrumb-sep">/</span>
          <span class="job-detail__breadcrumb-item">{{ $t('careers.jobDetail.breadcrumb3') }}</span>
        </div>
        <div class="job-detail__hero-content">
          <h1 class="job-detail__title">数字芯片设计工程师</h1>
          <p class="job-detail__meta">35k-45k · 15薪 | 杭州 (Hangzhou)</p>
          <div class="job-detail__hero-actions">
            <button class="job-detail__apply-btn" @click="openContactModal">{{ $t('careers.jobDetail.applyNow') }}</button>
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
            <h2 class="job-detail__section-title">{{ $t('careers.jobDetail.jobDesc') }}</h2>
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
          <h2 class="job-detail__process-title">{{ $t('careers.jobDetail.recruitmentProcess') }}</h2>
          <div class="job-detail__process-steps">
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle">
                <span class="job-detail__process-shadow" />
                <span class="job-detail__process-num">1</span>
              </div>
              <span class="job-detail__process-label">{{ $t('careers.jobDetail.step1') }}</span>
            </div>
            <span class="job-detail__process-divider" />
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle">
                <span class="job-detail__process-shadow" />
                <span class="job-detail__process-num">2</span>
              </div>
              <span class="job-detail__process-label">{{ $t('careers.jobDetail.step2') }}</span>
            </div>
            <span class="job-detail__process-divider" />
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle">
                <span class="job-detail__process-shadow" />
                <span class="job-detail__process-num">3</span>
              </div>
              <span class="job-detail__process-label">{{ $t('careers.jobDetail.step3') }}</span>
            </div>
            <span class="job-detail__process-divider" />
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle">
                <span class="job-detail__process-shadow" />
                <span class="job-detail__process-num">4</span>
              </div>
              <span class="job-detail__process-label">{{ $t('careers.jobDetail.step4') }}</span>
            </div>
            <span class="job-detail__process-divider" />
            <div class="job-detail__process-step">
              <div class="job-detail__process-circle job-detail__process-circle--check">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                  <path
                    d="M0 20.5L5 6.5L14 15.5L0 20.5ZM3.3 17.2L10.35 14.7L5.8 10.15L3.3 17.2ZM12.55 11.05L11.5 10L17.1 4.4C17.6333 3.86667 18.275 3.6 19.025 3.6C19.775 3.6 20.4167 3.86667 20.95 4.4L21.55 5L20.5 6.05L19.9 5.45C19.6667 5.21667 19.375 5.1 19.025 5.1C18.675 5.1 18.3833 5.21667 18.15 5.45L12.55 11.05ZM8.55 7.05L7.5 6L8.1 5.4C8.33333 5.16667 8.45 4.88333 8.45 4.55C8.45 4.21667 8.33333 3.93333 8.1 3.7L7.45 3.05L8.5 2L9.15 2.65C9.68333 3.18333 9.95 3.81667 9.95 4.55C9.95 5.28333 9.68333 5.91667 9.15 6.45L8.55 7.05ZM10.55 9.05L9.5 8L13.1 4.4C13.3333 4.16667 13.45 3.875 13.45 3.525C13.45 3.175 13.3333 2.88333 13.1 2.65L11.5 1.05L12.55 0L14.15 1.6C14.6833 2.13333 14.95 2.775 14.95 3.525C14.95 4.275 14.6833 4.91667 14.15 5.45L10.55 9.05ZM14.55 13.05L13.5 12L15.1 10.4C15.6333 9.86667 16.275 9.6 17.025 9.6C17.775 9.6 18.4167 9.86667 18.95 10.4L20.55 12L19.5 13.05L17.9 11.45C17.6667 11.2167 17.375 11.1 17.025 11.1C16.675 11.1 16.3833 11.2167 16.15 11.45L14.55 13.05Z"
                    fill="white" />
                </svg>
              </div>
              <span class="job-detail__process-label job-detail__process-label--bold">{{ $t('careers.jobDetail.step5') }}</span>
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
              <img src="@/assets/job-detail-hr.png" alt="Dr. Zhang" class="job-detail__recruiter-avatar-img" />
            </div>
            <div class="job-detail__recruiter-info">
              <h3 class="job-detail__recruiter-name">Dr. Zhang</h3>
              <span class="job-detail__recruiter-role">{{ $t('careers.jobDetail.recruiter') }}</span>
            </div>
          </div>
          <p class="job-detail__recruiter-quote">
            {{ $t('careers.jobDetail.recruiterQuote') }}
          </p>
          <button class="job-detail__recruiter-btn job-detail__recruiter-btn--primary" @click="openContactModal">
            {{ $t('careers.jobDetail.contactNow') }}
          </button>
          <button class="job-detail__recruiter-btn job-detail__recruiter-btn--outline" @click="openContactEmail">
            {{ $t('careers.jobDetail.sendResume') }}
          </button>
        </div>

        <!-- Similar Jobs -->
        <div class="job-detail__similar">
          <h3 class="job-detail__similar-title">{{ $t('careers.jobDetail.relatedJobs') }}</h3>
          <div class="job-detail__similar-list">
            <div v-for="job in similarJobs" :key="job.id" class="job-detail__similar-item"
              @click="openJobDetail(job.id)">
              <h4 class="job-detail__similar-item-title">{{ job.title }}</h4>
              <span class="job-detail__similar-item-meta">{{ job.salary }}</span>
            </div>
          </div>
        </div>

        <!-- Location Map -->
        <div class="job-detail__map">
          <div class="job-detail__map-bg">
            <img src="@/assets/job-detail-location.png" alt="地图" class="job-detail__map-img" />
          </div>
          <div class="job-detail__map-overlay">
            <div class="job-detail__map-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path
                  d="M4.66667 5.83333C4.9875 5.83333 5.26215 5.7191 5.49062 5.49062C5.7191 5.26215 5.83333 4.9875 5.83333 4.66667C5.83333 4.34583 5.7191 4.07118 5.49062 3.84271C5.26215 3.61424 4.9875 3.5 4.66667 3.5C4.34583 3.5 4.07118 3.61424 3.84271 3.84271C3.61424 4.07118 3.5 4.34583 3.5 4.66667C3.5 4.9875 3.61424 5.26215 3.84271 5.49062C4.07118 5.7191 4.34583 5.83333 4.66667 5.83333ZM4.66667 10.1208C5.85278 9.03194 6.73264 8.04271 7.30625 7.15312C7.87986 6.26354 8.16667 5.47361 8.16667 4.78333C8.16667 3.72361 7.82882 2.8559 7.15312 2.18021C6.47743 1.50451 5.64861 1.16667 4.66667 1.16667C3.68472 1.16667 2.8559 1.50451 2.18021 2.18021C1.50451 2.8559 1.16667 3.72361 1.16667 4.78333C1.16667 5.47361 1.45347 6.26354 2.02708 7.15312C2.60069 8.04271 3.48056 9.03194 4.66667 10.1208ZM4.66667 11.6667C3.10139 10.3347 1.93229 9.09757 1.15937 7.95521C0.386458 6.81285 0 5.75556 0 4.78333C0 3.325 0.469097 2.16319 1.40729 1.29792C2.34549 0.432639 3.43194 0 4.66667 0C5.90139 0 6.98785 0.432639 7.92604 1.29792C8.86424 2.16319 9.33333 3.325 9.33333 4.78333C9.33333 5.75556 8.94688 6.81285 8.17396 7.95521C7.40104 9.09757 6.23194 10.3347 4.66667 11.6667Z"
                  fill="white" />
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
        <div class="job-detail__modal-card" @click.stop v-if="isEmail">
          <div class="job-detail__modal-email">
            <span class="job-detail__modal-email-text">{{ email }}</span>
            <svg @click="copyEmail" class="job-detail__modal-email-icon" xmlns="http://www.w3.org/2000/svg" width="30"
              height="30" viewBox="0 0 30 30" fill="none">
              <path
                d="M24.4146 22.4988H21.7222C21.0855 22.4988 20.5696 21.9832 20.5696 21.3463C20.5696 20.7094 21.0858 20.1937 21.7222 20.1937H24.4146C24.673 20.1937 24.8827 19.9834 24.8827 19.7256V5.67771C24.8827 5.4199 24.6727 5.20955 24.4146 5.20955H10.367C10.1086 5.20955 9.89883 5.4199 9.89883 5.67771V8.33962C9.89883 8.97683 9.38262 9.49216 8.74629 9.49216C8.10996 9.49216 7.59375 8.97654 7.59375 8.33962V5.67771C7.59375 4.14812 8.83799 2.90417 10.3673 2.90417H24.4148C25.9438 2.90417 27.1884 4.14783 27.1884 5.67771V19.7253C27.1881 21.2549 25.9436 22.4988 24.4146 22.4988Z"
                fill="#0264FF" stroke="#0264FF" />
              <path
                d="M19.8035 27.1093H5.75596C4.22695 27.1093 2.98242 25.8656 2.98242 24.3357V10.2882C2.98242 8.75859 4.22666 7.51465 5.75596 7.51465H19.8035C21.3325 7.51465 22.5771 8.7583 22.5771 10.2882V24.3357C22.5768 25.8656 21.3325 27.1093 19.8035 27.1093ZM5.75596 9.82002C5.49756 9.82002 5.28779 10.0304 5.28779 10.2882V24.3357C5.28779 24.5936 5.49785 24.8039 5.75596 24.8039H19.8035C20.0619 24.8039 20.2717 24.5936 20.2717 24.3357V10.2882C20.2717 10.0304 20.0616 9.82002 19.8035 9.82002H5.75596Z"
                fill="#0264FF" stroke="#0264FF" />
            </svg>
          </div>
          <p class="job-detail__modal-text">{{ $t('careers.jobDetail.copyEmailTip') }}</p>
        </div>
        <div class="job-detail__modal-card" @click.stop v-else>
          <div class="job-detail__modal-qr">
            <img src="@/assets/job-qrcode.png" alt="微信二维码" class="job-detail__modal-qr-img" />
          </div>
          <p class="job-detail__modal-text">{{ $t('careers.jobDetail.scanQrTip') }}</p>
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
  --font-alibaba: 'Alibaba PuHuiTi 3.0', 'PingFang SC', sans-serif;
  width: 100%;
  background: #F7F9FE;
}

.job-detail__modal-mask {
  --font-heading: 'Inter', 'PingFang SC', sans-serif;
  --font-din: 'DIN Black', sans-serif;
}

.job-message {
  position: fixed;
  top: -100%;
  left: 50%;
  z-index: 1001;
  transform: translateX(-50%);
  width: fit-content;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-white);
}

.job-message--show {
  top: 50px;
  animation: job-message-show 0.7s ease-in-out;
}

@keyframes job-message-show {
  0% {
    top: -100%;
  }

  100% {
    top: 50px;
  }
}

.job-message__text {
  margin: 0;
}


/* ========== Hero Section ========== */
.job-detail__hero {
  position: relative;
  width: 100%;
  height: 700px;
  margin: 0 auto;
  overflow: hidden;
}

.job-detail__hero-bg {
  position: absoluteß;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/job-detail-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

}

.job-detail__hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.60) 21.74%, rgba(0, 67, 203, 0.00) 100%);
}

.job-detail__hero-inner {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 142px 160px 0;
  display: flex;
  flex-direction: column;
  gap: 168px;
}

/* ========== Breadcrumb ========== */
.job-detail__breadcrumb {
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
  color: var(--color-white);
}

/* ========== Hero Content ========== */
.job-detail__hero-content {
  padding-left: 160px;
}

.job-detail__title {
  font-family: var(--font-alibaba);
  font-weight: 900;
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
  color: var(--color-white);
  margin: 0 0 32px 0;
}

.job-detail__hero-actions {
  display: flex;
  gap: 16px;
}

.job-detail__apply-btn {
  position: relative;
  width: 235.56px;
  height: 62px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.00);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10);
  display: flex;
  padding: 16.5px 32px 17.5px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--color-brand);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  /* 155.556% */
}

.job-detail__apply-btn:hover {
  opacity: 0.9;
}

/* ========== Content Grid ========== */
.job-detail__content {
  display: flex;
  gap: 48px;
  /* max-width: 1280px; */
  margin: 0 320px;
  padding: 91px 0;
}

/* ========== Left Column ========== */
.job-detail__left {
  flex: 1;
  min-width: 0;
}

.job-detail__section {
  margin-bottom: 64px;
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
  margin-bottom: 7.5ßpx;
}

/* ========== Right Sidebar ========== */
.job-detail__sidebar {
  flex: 0 0 395px;
  width: 395px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  margin: 0 0 23px 0;
}

.job-detail__recruiter-btn {
  width: 100%;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 12px 0 12px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.job-detail__recruiter-btn:hover {
  opacity: 0.9;
}

.job-detail__recruiter-btn--primary {
  background: var(--color-brand);
  color: var(--color-white);
  margin-bottom: 12px;
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
  justify-content: center;
}

.job-detail__modal-qr {
  width: 243px;
  height: 243px;
  background: #585858;
  border-radius: 0;
  overflow: hidden;
}

.job-detail__modal-email {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0264FF;
  text-align: center;
  font-family: "DIN Black";
  font-size: 34px;
  font-style: normal;
  font-weight: 900;
  line-height: 26px;
  /* 76.471% */
}
.job-detail__modal-email-icon {
  cursor: pointer;
}

.job-detail__modal-qr-img {
  width: 243px;
  height: 253px;
  object-fit: cover;
  margin-top: -5px;
}

.job-detail__modal-text {
  font-family: var(--font-din);
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