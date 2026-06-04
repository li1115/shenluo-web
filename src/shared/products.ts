import product1 from '@/assets/product-1.png'
import product2 from '@/assets/product-2.png'
import product3 from '@/assets/product-3.png'
import productPdf1 from '@/assets/product-pdf-1.png'
import productPdf2 from '@/assets/product-pdf-2.png'

import productHero1 from '@/assets/product-hero-1.png'
import productHero2 from '@/assets/product-hero-2.png'
import productHero3 from '@/assets/product-hero-3.png'

import productSCS1 from '@/assets/product-SCS-1.png'
import productSCS2 from '@/assets/product-SCS-2.png'
import productSCS3 from '@/assets/product-SCS-3.png'

import productPNS1 from '@/assets/product-PNS-1.png'
import productPNS2 from '@/assets/product-PNS-2.png'
import productPNS3 from '@/assets/product-PNS-3.png'

/** 产品码常量 */
export const PRODUCT_CODES = {
    'BCI-PLATFORM': 'SCS',
    'NEURO-STIM': 'PNS',
    TNS: 'TNS',
} as const

export type RouteCode = keyof typeof PRODUCT_CODES
export type ProductCode = (typeof PRODUCT_CODES)[RouteCode]

interface SpecRow {
    label: string
    value: string
}

interface FeatureCard {
    title: string
    image: string
}


export interface ProductBaseDetail {
    enName: string
    image: string
    pdfImg?: string
    specsLeft: SpecRow[]
    specsRight: SpecRow[]
    featureCards: FeatureCard[]
    noDATA?: boolean
}

 export const TNSBase = {
    productCode: PRODUCT_CODES['TNS'],
    id: 3,
    name: '植入式胫神经刺激系统TNS',
    description: '脊髓神经刺激系统(Spinal Cord Stimulation，SCS)，是一种成熟的疼痛治疗方法，已被医生使用了50多年。作为微创可逆的先进医疗技术，旨在缓解疼痛，提高患者生活能力和生活质量。主要用于治疗躯干、四肢的慢性顽固性疼痛（如腰椎术后疼痛综合征、复杂性区域疼痛综合征等）。通过微创植入电极至脊髓硬膜外腔',
}
/** 产品码 → 产品详情数据（供 ProductDetail 等页面使用） */
const PRODUCT_DATA: Record<ProductCode, ProductBaseDetail> = {
    SCS: {
        enName: 'Spinal Cord Stimulation . SCS',
        image: productHero1,
        pdfImg: productPdf1,
        specsLeft: [
            { label: 'products.specs.length', value: '55' },
            { label: 'products.specs.width', value: '48' },
            { label: 'products.specs.thickness', value: '9.4' },
            { label: 'products.specs.weight', value: '37.7' },
        ],
        specsRight: [
            { label: 'products.specs.tempLimit', value: 'products.specs.tempSCSValue' },
            { label: 'products.specs.channels', value: 'products.specs.channelsSCSValue' },
            { label: 'products.specs.chargeType', value: 'products.specs.chargeTypeSCSValue' },
            { label: 'products.specs.batteryCapacity', value: 'products.specs.batteryCapacitySCSValue' },
        ],
        featureCards: [
            {
                title: '轻巧舒心，充电省心',
                image: productSCS1,
            },
            {
                title: '灵活编程，精准适应',
                image: productSCS2,
            },
            {
                title: '远程调控',
                image: productSCS3,
            },
        ]
    },
    PNS: {
        enName: 'Peripheral Nervous System . PNS',
        image: productHero2,
        pdfImg: productPdf2,
        specsLeft: [
            { label: 'products.specs.length', value: '55' },
            { label: 'products.specs.width', value: '48' },
            { label: 'products.specs.thickness', value: '9.4' },
            { label: 'products.specs.weight', value: '28' },
        ],
        specsRight: [
            { label: 'products.specs.tempLimit', value: 'products.specs.tempPNSValue' },
            { label: 'products.specs.channels', value: 'products.specs.channelsPNSValue' },
            { label: 'products.specs.chargeType', value: 'products.specs.chargeTypePNSValue' },
            { label: 'products.specs.batteryCapacity', value: 'products.specs.batteryCapacityPNSValue' },
        ],
        featureCards: [
            {
                title: '设备小巧，超长植入时间',
                image: productPNS1,
            },
            {
                title: '电级防位移设计',
                image: productPNS2,
            },
            {
                title: '植入免缝合',
                image: productPNS3,
            },
        ]
    },
    TNS: {
        enName: 'Implantable Tibial Nerve Stimulation System . TNS',
        image: productHero3,
        specsLeft: [],
        specsRight: [],
        featureCards: [],
        noDATA: true,
    }
}

/** 产品详情数据 */
export const getProductDetailData = (productCode: ProductCode) => {
    return PRODUCT_DATA[productCode]
}

/** 首页产品卡片数据（i18n key，使用时需 $t() 翻译） */
export const productsData = [
    {
        productCode: 'BCI-PLATFORM' as RouteCode,
        nameKey: 'home.products.scsName',
        descKey: 'home.products.scsDesc',
        image: product1,
    },
    {
        productCode: 'NEURO-STIM' as RouteCode,
        nameKey: 'home.products.pnsName',
        descKey: 'home.products.pnsDesc',
        image: product2,
    },
    {
        productCode: 'TNS' as RouteCode,
        nameKey: 'home.products.tnsName',
        descKey: 'home.products.tnsDesc',
        image: product3,
    },
]