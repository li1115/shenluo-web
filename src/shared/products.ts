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
    'NEURO-PNS': 'TNS',
} as const

export type RouteCode = keyof typeof PRODUCT_CODES
export type ProductCode = (typeof PRODUCT_CODES)[RouteCode]

export interface SpecRow {
    label: string
    value: string
}

interface SpecGroup {
    groupName: string
    type: 'lr' | 'tb' | 'table'
    minHeight?: string
    specs: SpecRow[]
    /** Row-based layout for complex tables (e.g. SCS electrode) */
    rows?: SpecRow[][]
}

interface FeatureCard {
    title: string
    image: string
}


export interface ProductBaseDetail {
    enName: string
    image: string
    pdfImg?: string
    specGroups: SpecGroup[]
    featureCards: FeatureCard[]
    noDATA?: boolean
}

/** 产品码 → 产品详情数据（供 ProductDetail 等页面使用） */
const PRODUCT_DATA: Record<ProductCode, ProductBaseDetail> = {
    SCS: {
        enName: 'Implantable Rechargeable Spinal Cord Stimulation . SCS',
        image: productHero1,
        pdfImg: productPdf1,
        specGroups: [
            {
                groupName: 'products.specs.scsHeader',
                type: 'lr',
                specs: [
                    { label: 'products.specs.length', value: '55' },
                    { label: 'products.specs.tempLimit', value: 'products.specs.tempSCSValue' },
                    { label: 'products.specs.width', value: '48' },
                    { label: 'products.specs.channels', value: 'products.specs.channelsSCSValue' },
                    { label: 'products.specs.thickness', value: '9.4' },
                    { label: 'products.specs.chargeType', value: 'products.specs.chargeTypeSCSValue' },
                    { label: 'products.specs.weight', value: '37.7' },
                    { label: 'products.specs.batteryCapacity', value: 'products.specs.batteryCapacitySCSValue' },
                ],
            },
            {
                groupName: 'products.specs.scsElectrodeHeader',
                type: 'table',
                specs: [],
                rows: [
                    [
                        { label: 'products.specs.electrodeType', value: '' },
                        { label: 'products.specs.contactCount', value: '' },
                        { label: 'products.specs.contactLayout', value: '' },
                        { label: 'products.specs.electrodeDiameter', value: '' },
                        { label: 'products.specs.electrodeLength', value: '' },
                    ],
                    [
                        { label: '', value: 'products.specs.punctureElectrode' },
                        { label: '', value: '8' },
                        { label: '', value: '8×1' },
                        { label: '', value: '1.35' },
                        { label: '', value: '2/16' },
                    ],
                    [
                        { label: '', value: 'products.specs.surgicalElectrode' },
                        { label: '', value: '8' },
                        { label: '', value: '2×4' },
                        { label: '', value: '' },
                        { label: '', value: 'products.specs.wirelessCharge' },
                    ],
                    [
                        { label: '', value: '' },
                        { label: '', value: '16' },
                        { label: '', value: '2×8' },
                        { label: '', value: '' },
                        { label: '', value: '' },
                    ],
                    [
                        { label: '', value: '' },
                        { label: '', value: '16' },
                        { label: '', value: '5-6-5' },
                        { label: '', value: '' },
                        { label: '', value: '' },
                    ],
                ],
            },
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
                title: '程控无界，关怀在线',
                image: productSCS3,
            },
        ]
    },
    PNS: {
        enName: 'Peripheral Nerve Stimulation . PNS',
        image: productHero2,
        pdfImg: productPdf2,
        specGroups: [
            {
                groupName: 'products.specs.pnsHeader',
                type: 'lr',
                specs: [
                    { label: 'products.specs.length', value: '64.5' },
                    { label: 'products.specs.weight', value: '28' },
                    { label: 'products.specs.width', value: '37' },
                    { label: 'products.specs.channels', value: 'products.specs.channelsPNSValue' },
                    { label: 'products.specs.thickness', value: '13' },
                    { label: 'products.specs.chargeType', value: 'products.specs.chargeTypePNSValue' },
                ],
            },
            {
                groupName: 'products.specs.pnsElectrodeHeader',
                type: 'tb',
                minHeight: '7rem',
                specs: [
                    { label: 'products.specs.electrodeDiameter', value: '0.7' },
                    { label: 'products.specs.contactCount', value: '4' },
                    { label: 'products.specs.stabilityDesign', value: 'products.specs.stabilityDesignValue' },
                    { label: 'products.specs.antiBreakDesign', value: 'products.specs.antiBreakDesignValue' },
                    { label: 'products.specs.electrodeLength', value: '15/20' },
                ],
            },
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
        enName: 'Implantable Tibial Nerve Stimulation . TNS',
        image: productHero3,
        specGroups: [],
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
        productCode: 'NEURO-PNS' as RouteCode,
        nameKey: 'home.products.tnsName',
        descKey: 'home.products.tnsDesc',
        image: product3,
    },
]