<script setup lang="ts">
</script>

<template>
  <div class="contact-page">

    <section class="contact-page__banner">
      <div class="contact-page__banner-inner">
        <div class="contact-page__breadcrumb">
          <span class="contact-page__breadcrumb-item">{{ $t('contact.breadcrumb1') }}</span>
          <span class="contact-page__breadcrumb-sep">/</span>
          <span class="contact-page__breadcrumb-item">{{ $t('contact.breadcrumb2') }}</span>
        </div>
        <h1 class="contact-page__heading">{{ $t('contact.heading') }}</h1>
        <p class="contact-page__subheading">{{ $t('contact.subheading') }}</p>
        <div class="contact-page__breadcrumb-dot"></div>
      </div>
    </section>

    <section class="contact-page__content">
      <div class="contact-page__content-inner">
        <div class="contact-page__map">
          <div class="contact-page__map-wrapper">
            <img src="@/assets/contact-map.png" :alt="$t('contact.mapAlt')" class="contact-page__map-img" />
          </div>
        </div>

        <div class="contact-page__panel">
          <div class="contact-page__panel-header">
            <h2 class="contact-page__company-name">{{ $t('contact.companyName') }}</h2>
            <div class="contact-page__divider"></div>
          </div>

          <div class="contact-page__info-list">
            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11.998 0C17.2998 5.25695e-05 21.5974 4.29789 21.5977 9.59961C21.5977 14.9015 17.2999 23.9999 11.998 24C6.69611 24 2.39844 14.9015 2.39844 9.59961C2.39865 4.29785 6.69624 0 11.998 0ZM11.998 6C10.01 6 8.39865 7.61156 8.39844 9.59961C8.39844 11.5878 10.0098 13.2002 11.998 13.2002C13.9862 13.2001 15.5977 11.5878 15.5977 9.59961C15.5974 7.6116 13.9861 6.00005 11.998 6Z"
                    fill="#999999" fill-opacity="0.8" />
                </svg>
              </div>
              <span class="contact-page__info-text">{{ $t('contact.address') }}</span>
            </div>

            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.0074 21.1592C16.1013 21.1592 15.085 20.9878 14.0196 20.6571C11.4605 19.8612 8.93801 18.1959 6.9176 15.9673C3.89311 12.6245 2.44822 9.29388 2.72985 6.33061C2.81556 5.59592 3.04822 4.66531 4.15026 3.91837C4.99515 3.23265 5.9625 2.84082 6.72168 2.85306C7.5176 2.86531 7.78699 3.14694 8.6074 4.33469C9.86862 6.07347 9.95434 6.93061 9.90536 7.42041C9.81964 8.22857 9.37883 8.58367 8.97475 8.90204C8.87679 8.97551 8.77883 9.06123 8.69311 9.1347C8.20332 9.75918 7.60332 10.6286 10.1747 13.2857C12.3666 15.3918 13.5543 15.649 14.0564 15.6122C14.4482 15.5878 14.5952 15.3796 14.6564 15.3061L14.6686 15.2939C15.489 14.1429 15.7584 13.8612 16.5421 13.7388C17.3013 13.6163 17.6931 13.8612 19.3094 14.8776C20.7666 15.7959 21.4401 16.4082 21.2931 17.3755C21.2441 18.4286 20.436 19.8612 19.5299 20.5102C18.9054 20.9388 18.036 21.1592 17.0074 21.1592Z"
                    fill="#999999" fill-opacity="0.8" />
                </svg>
              </div>
              <span class="contact-page__info-text">{{ $t('contact.phone') }}</span>
              <span class="contact-page__info-number">{{ $t('contact.phoneNumber') }}</span>
            </div>

            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3.50781 4.02661H19.7242C20.8305 4.02661 21.7375 4.9102 21.7516 5.99302L11.6195 11.5547L1.48984 6.00005C1.49922 4.91255 2.39922 4.02661 3.50781 4.02661ZM1.48984 8.12817L1.48047 17.9625C1.48047 19.0571 2.39219 19.9524 3.50781 19.9524H19.7242C20.8398 19.9524 21.7516 19.0571 21.7516 17.9625V8.12349L11.8586 13.425C11.7062 13.5071 11.5234 13.5071 11.3734 13.425L1.48984 8.12817Z"
                    fill="#999999" fill-opacity="0.8" />
                </svg>
              </div>
              <span class="contact-page__info-text">{{ $t('contact.email') }}</span>
            </div>

            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#666666" stroke-width="1.5" />
                  <path d="M2 12h20" stroke="#666666" stroke-width="1.5" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                    stroke="#666666" stroke-width="1.5" />
                </svg>
              </div>
              <span class="contact-page__info-text">{{ $t('contact.website') }}</span>
            </div>

            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_485_5228)">
                    <path
                      d="M11.9989 0.525757C5.68688 0.525757 0.570312 5.64347 0.570312 11.9543C0.570312 18.2675 5.68688 23.3829 11.9989 23.3829C18.3109 23.3829 23.4275 18.2675 23.4275 11.9543C23.4275 5.64347 18.3109 0.525757 11.9989 0.525757ZM11.1829 7.01376C10.111 6.92651 9.06119 6.66116 8.0766 6.22861C8.85717 4.17376 10.0103 2.77947 11.1829 2.32461V7.01376ZM11.1829 8.6469V11.1383H7.12346C7.17603 9.92918 7.3406 8.8069 7.59203 7.79319C8.73408 8.27271 9.94722 8.56113 11.1829 8.6469ZM11.1829 12.7726V15.264C9.94761 15.3499 8.73486 15.6384 7.59317 16.1178C7.32576 15.0207 7.16879 13.8997 7.1246 12.7715H11.1817L11.1829 12.7726ZM11.1829 16.8983V21.5863C10.0103 21.1315 8.85717 19.736 8.0766 17.6823C9.06111 17.2496 10.111 16.9842 11.1829 16.8972V16.8983ZM12.8149 16.8983C13.912 16.9898 14.9577 17.2572 15.9212 17.6823C15.1406 19.736 13.9875 21.1315 12.8149 21.5863V16.8972V16.8983ZM12.8149 15.264V12.7726H16.8743C16.83 13.9005 16.6731 15.0211 16.4057 16.1178C15.2637 15.6381 14.0506 15.3497 12.8149 15.264ZM12.8149 11.1383V8.6469C14.0502 8.561 15.2629 8.27258 16.4046 7.79319C16.656 8.8069 16.8217 9.92918 16.8732 11.1395H12.816L12.8149 11.1383ZM12.8149 7.01261V2.32576C13.9875 2.78061 15.1406 4.17604 15.9212 6.22976C14.9367 6.66253 13.8868 6.92789 12.8149 7.0149V7.01261ZM16.1052 3.07319C16.9578 3.46922 17.7492 3.98574 18.4549 4.6069C18.112 4.90976 17.7417 5.18061 17.3577 5.43319C17.0336 4.6004 16.6132 3.80836 16.1052 3.07319ZM6.63888 5.43319C6.25452 5.18343 5.88793 4.90734 5.54174 4.6069C6.24782 3.98596 7.03955 3.46982 7.8926 3.07433C7.38432 3.80896 6.96392 4.60065 6.64003 5.43319H6.63888ZM6.10974 7.03661C5.76688 8.2949 5.54974 9.67661 5.49031 11.1395H2.2446C2.40594 9.17602 3.15865 7.30758 4.40346 5.78061C4.92917 6.25147 5.50403 6.66861 6.11088 7.03776L6.10974 7.03661ZM5.49031 12.7715C5.54974 14.2332 5.7646 15.6149 6.10974 16.8743C5.50288 17.2423 4.92917 17.6595 4.40117 18.1303C3.15677 16.6032 2.40446 14.7348 2.24346 12.7715H5.49031ZM6.63888 18.4766C6.99203 19.3635 7.4126 20.1589 7.89146 20.8378C7.03879 20.4417 6.24746 19.9252 5.54174 19.304C5.8846 19.0012 6.25603 18.7303 6.63888 18.4766ZM17.3566 18.4766C17.7395 18.7303 18.1109 19.0012 18.4537 19.304C17.748 19.9249 16.9567 20.441 16.104 20.8366C16.6124 20.1016 17.0328 19.3095 17.3566 18.4766ZM17.8857 16.8743C18.2286 15.6149 18.4457 14.2332 18.5052 12.7715H21.752C21.5907 14.7349 20.838 16.6034 19.5932 18.1303C19.064 17.6596 18.4924 17.2387 17.8857 16.8732V16.8743ZM18.5052 11.1395C18.4537 9.7529 18.2459 8.37657 17.8857 7.03661C18.4927 6.67135 19.0646 6.2509 19.5943 5.78061C20.8387 7.30772 21.591 9.17614 21.752 11.1395H18.5052Z"
                      fill="#999999" fill-opacity="0.8" />
                  </g>
                  <defs>
                    <clipPath id="clip0_485_5228">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span class="contact-page__info-text">{{ $t('contact.zipcode') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  --font-heading: 'Alibaba PuHuiTi 3.0', 'PingFang SC', sans-serif;
}

.contact-page__banner {
  width: 100%;
  height: 959px;
  background: #696969;
  position: relative;
  box-sizing: border-box;
  background-image: url('@/assets/concat-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.contact-page__banner-inner {
  position: relative;
  width: 100%;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 135px 160px 0;
  display: flex;
  flex-direction: column;
}

/* ========== Breadcrumb ========== */
.contact-page__breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 27px;
}

.contact-page__breadcrumb-item {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.0536em;
  color: var(--color-white);
}

.contact-page__breadcrumb-sep {
  color: var(--color-white);
}

.contact-page__heading {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 86px;
  color: #FFFFFF;
  margin: 0;
  line-height: 1;
  margin-top: 200px;
}

.contact-page__subheading {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 78px;
  color: #FFFFFF;
  margin: 0;
  line-height: 1;
  margin-top: 10px;
}

.contact-page__content {
  width: 100%;
  background: #FFFFFF;
  box-sizing: border-box;
}

.contact-page__content-inner {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 1568px;
  margin: 0 auto;
  padding: 196px 0 200px 0;
  margin: 0 auto;
  box-sizing: border-box;
}

.contact-page__map {
  width: 800px;
  height: 563px;
  background: #BDBDBD;
  border-radius: 18px 0 0 18px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}



.contact-page__map-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.contact-page__panel {
  width: 659px;
  height: 563px;
  background: #F6F6F6;
  border-radius: 0 18px 18px 0;
  padding: 130px 60px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 38px;
  flex-shrink: 0;
}

.contact-page__panel-header {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.contact-page__company-name {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 34px;
  color: #000000;
  margin: 0;
  line-height: 1;
}

.contact-page__divider {
  width: 100%;
  height: 1px;
  background: #EEEEEE;
  flex-shrink: 0;
}

.contact-page__info-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

.contact-page__info-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-page__info-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-page__info-text {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 18px;
  color: #666666;
  line-height: 1.4;
}

.contact-page__info-number {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 24px;
  line-height: 24px;
  color: #0163FF;
}

/* ========== Responsive (1600px / 1280px / 1024px / 768px / 480px) ========== */
@media (max-width: 1600px) {
  .contact-page__banner {
    height: clamp(420px, 42vw, 959px);
  }
  .contact-page__banner-inner {
    padding: clamp(80px, 7vw, 135px) clamp(24px, 6vw, 160px) 0;
  }
  .contact-page__heading {
    font-size: clamp(36px, 4.5vw, 86px);
    margin-top: clamp(60px, 10.5vw, 200px);
  }
  .contact-page__subheading {
    font-size: clamp(32px, 4vw, 78px);
  }
  .contact-page__content-inner {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: clamp(60px, 8vw, 196px) clamp(24px, 6vw, 116px) clamp(60px, 8vw, 200px);
  }
  .contact-page__map {
    width: 100%;
    max-width: 800px;
    height: clamp(280px, 25vw, 563px);
    border-radius: 18px 18px 0 0;
  }
  .contact-page__panel {
    width: 100%;
    max-width: 800px;
    height: auto;
    border-radius: 0 0 18px 18px;
    padding: clamp(30px, 4vw, 130px) clamp(20px, 3vw, 60px) clamp(30px, 4vw, 100px);
    gap: clamp(20px, 2.5vw, 38px);
  }
  .contact-page__company-name {
    font-size: clamp(22px, 1.8vw, 34px);
  }
  .contact-page__info-text {
    font-size: clamp(14px, 0.95vw, 18px);
  }
  .contact-page__info-number {
    font-size: clamp(18px, 1.25vw, 24px);
  }
  .contact-page__info-list {
    gap: clamp(12px, 1vw, 18px);
  }
}

@media (max-width: 1280px) {
  .contact-page__banner {
    height: auto;
    min-height: 400px;
  }
  .contact-page__banner-inner {
    padding: 80px 32px 40px;
  }
  .contact-page__heading {
    margin-top: 60px;
  }
}

@media (max-width: 1024px) {
  .contact-page__banner {
    min-height: 360px;
  }
  .contact-page__content-inner {
    padding: 40px 24px 50px;
  }
}

@media (max-width: 768px) {
  .contact-page__banner {
    min-height: 300px;
  }
  .contact-page__banner-inner {
    padding: 60px 16px 30px;
  }
  .contact-page__heading {
    font-size: 36px;
    margin-top: 40px;
  }
  .contact-page__subheading {
    font-size: 30px;
  }
  .contact-page__map {
    height: 240px;
  }
  .contact-page__panel {
    padding: 24px 16px;
    gap: 16px;
  }
  .contact-page__company-name {
    font-size: 22px;
  }
  .contact-page__info-text {
    font-size: 14px;
  }
  .contact-page__info-number {
    font-size: 18px;
  }
  .contact-page__content-inner {
    padding: 30px 16px 40px;
  }
  .contact-page__info-list {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .contact-page__banner {
    min-height: 240px;
  }
  .contact-page__banner-inner {
    padding: 50px 12px 20px;
  }
  .contact-page__heading {
    font-size: 28px;
  }
  .contact-page__subheading {
    font-size: 24px;
  }
  .contact-page__map {
    height: 200px;
  }
  .contact-page__panel {
    padding: 20px 14px;
  }
  .contact-page__company-name {
    font-size: 18px;
  }
  .contact-page__info-text {
    font-size: 13px;
  }
  .contact-page__info-number {
    font-size: 16px;
  }
  .contact-page__content-inner {
    padding: 24px 12px 30px;
  }
}
</style>