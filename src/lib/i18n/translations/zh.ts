import type { Translations } from "./en";

export const zh: Translations = {
  nav: {
    registerInterest: "登记意向",
    placeBid: "提交报价",
    about: "关于我们",
    acquisitions: "交易",
  },
  hero: {
    eyebrow: "私密交易",
    headline: "为那些\n低调收购\n的人而生。",
    subheadline:
      "Blackford 为房产、名车、名表及奢侈品的私密交易提供专业服务——以您的资产所应得的审慎态度，完成每一笔交易。",
    cta1: "登记意向",
    cta2: "提交报价",
    footnote: "仅限受邀及申请客户。",
  },
  categories: {
    eyebrow: "交易领域",
    headline: "精心甄选的\n交易类别。",
    body: "每个领域均由深谙市场的专家负责管理，并可接触到传统渠道无法获取的经过溯源认证的藏品。",
    items: [
      {
        id: "real-estate",
        title: "房产",
        description:
          "卓越的住宅与庄园，在全球顶级市场以私密方式完成交易。从梅菲尔到蔚蓝海岸。",
        cta: "预约回电",
      },
      {
        id: "automobiles",
        title: "名车",
        description:
          "具备完整历史记录的名车——从重要的现代经典车型到具有历史意义的竞技赛车。",
        cta: "预约回电",
      },
      {
        id: "luxury-goods",
        title: "奢侈品",
        description:
          "来自巴黎、米兰和伦敦顶级工坊的，永恒工艺与稀有材质的杰作。",
        cta: "预约回电",
      },
      {
        id: "timepieces",
        title: "名表",
        description:
          "来自日内瓦、勒布拉苏斯及力洛克顶级制表工坊的重要腕表——以私密方式呈现给资深藏家。",
        cta: "预约回电",
      },
    ],
  },
  contact: {
    eyebrow: "联系我们",
    headline: "开启\n对话。",
    body: "我们的团队将在一个工作日内回复所有咨询。所有沟通均以绝对保密的方式处理。",
    form: {
      name: "全名",
      email: "电子邮箱",
      phone: "联系电话",
      category: "感兴趣的领域",
      categoryOptions: [
        { value: "", label: "请选择类别" },
        { value: "real-estate", label: "房产" },
        { value: "automobiles", label: "名车" },
        { value: "luxury-goods", label: "奢侈品" },
        { value: "timepieces", label: "名表" },
        { value: "other", label: "其他" },
      ],
      message: "您的咨询",
      messagePlaceholder: "请描述您的需求或意向。",
      submit: "发送咨询",
      submitting: "发送中…",
      successTitle: "咨询已收到。",
      successBody:
        "我们的团队成员将在一个工作日内与您联系。确认邮件已发送至您的邮箱。",
      errorTitle: "出现错误。",
      errorBody: "请重试或直接与我们联系。",
      minimumNote: "Blackford membership is subject to eligibility and starts at AED 100,000.",
    },
  },
  footer: {
    tagline: "私密交易，严谨执行。",
    legal: {
      privacy: "隐私政策",
      terms: "使用条款",
      cookies: "Cookie政策",
    },
    links: {
      careers: "加入我们",
      about: "关于 Blackford",
      contact: "联系我们",
    },
    social: {
      instagram: "Instagram",
      linkedin: "领英",
    },
    copyright: "© {year} Blackford。保留所有权利。",
    disclaimer:
      "Blackford 作为私密交易的专业中介运营。所有交易均受本公司条款及适用法律约束。",
  },
};
