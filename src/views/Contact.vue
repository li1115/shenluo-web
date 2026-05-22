<script setup lang="ts">
</script>

<template>
  <div class="contact-page">
    <section class="contact-page__banner">
      <div class="contact-page__banner-inner">
        <h1 class="contact-page__heading">联系我们</h1>
        <p class="contact-page__subheading">CONTACTUS</p>
        <div class="contact-page__breadcrumb-dot"></div>
        <p class="contact-page__breadcrumb">首页>联系我们</p>
      </div>
    </section>

    <section class="contact-page__content">
      <div class="contact-page__content-inner">
        <div class="contact-page__map">
          <div class="contact-page__map-wrapper">
            <img
              src=""
              alt="地图"
              class="contact-page__map-img"
            />
          </div>
        </div>

        <div class="contact-page__panel">
          <div class="contact-page__panel-header">
            <h2 class="contact-page__company-name">杭州神络科医疗技有限公司</h2>
            <div class="contact-page__divider"></div>
          </div>

          <div class="contact-page__info-list">
            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="9" r="2.5" stroke="#666666" stroke-width="1.5"/>
                </svg>
              </div>
              <span class="contact-page__info-text">地址：浙江省杭州市余杭区余杭街道科技大道8-5号4幢3-5层</span>
            </div>

            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="contact-page__info-text">电话：</span>
              <span class="contact-page__info-number">0571-88560292</span>
            </div>

            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="contact-page__info-text">邮箱：service@seeneuro.com</span>
            </div>

            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#666666" stroke-width="1.5"/>
                  <path d="M2 12h20" stroke="#666666" stroke-width="1.5"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#666666" stroke-width="1.5"/>
                </svg>
              </div>
              <span class="contact-page__info-text">网址：http://www.seeneuro.com/</span>
            </div>

            <div class="contact-page__info-row">
              <div class="contact-page__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#666666" stroke-width="1.5"/>
                  <line x1="3" y1="9" x2="21" y2="9" stroke="#666666" stroke-width="1.5"/>
                  <line x1="8" y1="3" x2="8" y2="9" stroke="#666666" stroke-width="1.5"/>
                </svg>
              </div>
              <span class="contact-page__info-text">邮编：310000</span>
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
}

.contact-page__banner-inner {
  position: relative;
  width: 100%;
  max-width: 1910px;
  height: 100%;
  margin: 0 auto;
}

.contact-page__heading {
  position: absolute;
  left: 158px;
  top: 475px;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 86px;
  color: #FFFFFF;
  margin: 0;
  line-height: 1;
}

.contact-page__subheading {
  position: absolute;
  left: 156px;
  top: 576px;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 78px;
  color: #FFFFFF;
  margin: 0;
  line-height: 1;
}

.contact-page__breadcrumb {
  position: absolute;
  left: 197px;
  top: 827px;
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 18px;
  color: #FFFFFF;
  margin: 0;
  line-height: 25px;
}

.contact-page__breadcrumb-dot {
  position: absolute;
  left: 164px;
  top: 831px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #D9D9D9;
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
  max-width: 1910px;
  margin: 0 auto;
  padding: 221px 155px 175px 150px;
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

.contact-page__map-wrapper {
  position: absolute;
  left: -119px;
  top: -87px;
  width: 1038px;
  height: 737px;
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
  padding: 100px 60px;
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
  width: 348px;
}

.contact-page__info-row {
  display: flex;
  align-items: center;
  gap: 5px;
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

@media (max-width: 1600px) {
  .contact-page__banner {
    height: 600px;
  }

  .contact-page__heading {
    left: 40px;
    top: 280px;
    font-size: 56px;
  }

  .contact-page__subheading {
    left: 40px;
    top: 350px;
    font-size: 48px;
  }

  .contact-page__breadcrumb {
    left: 40px;
    top: 520px;
  }

  .contact-page__breadcrumb-dot {
    left: 7px;
    top: 524px;
  }

  .contact-page__content-inner {
    flex-direction: column;
    align-items: center;
    padding: 60px 40px;
  }

  .contact-page__map {
    width: 100%;
    max-width: 800px;
    height: 400px;
    border-radius: 18px 18px 0 0;
  }

  .contact-page__panel {
    width: 100%;
    max-width: 800px;
    height: auto;
    border-radius: 0 0 18px 18px;
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .contact-page__banner {
    height: 400px;
  }

  .contact-page__heading {
    left: 20px;
    top: 180px;
    font-size: 40px;
  }

  .contact-page__subheading {
    left: 20px;
    top: 230px;
    font-size: 32px;
  }

  .contact-page__breadcrumb {
    left: 40px;
    top: 340px;
    font-size: 14px;
  }

  .contact-page__breadcrumb-dot {
    left: 7px;
    top: 344px;
    width: 14px;
    height: 14px;
  }

  .contact-page__map {
    height: 300px;
  }

  .contact-page__panel {
    padding: 30px 20px;
  }

  .contact-page__company-name {
    font-size: 24px;
  }

  .contact-page__info-text {
    font-size: 14px;
  }

  .contact-page__info-number {
    font-size: 18px;
  }
}
</style>