import type { Translations } from "./en";

export const ar: Translations = {
  nav: {
    registerInterest: "تسجيل الاهتمام",
    placeBid: "تقديم عرض",
    about: "عن بلاكفورد",
    acquisitions: "الاستحواذات",
  },
  hero: {
    eyebrow: "صفقات خاصة",
    headline: "لمن يستحوذ\nبصمت\nواحترافية.",
    subheadline:
      "تُيسّر بلاكفورد المعاملات الخاصة في العقارات والسيارات والساعات والسلع الفاخرة — بالتكتم الذي تستحقه استثماراتك.",
    cta1: "تسجيل الاهتمام",
    cta2: "تقديم عرض",
    footnote: "بالدعوة والتقديم فقط.",
  },
  categories: {
    eyebrow: "مجالات الاستحواذ",
    headline: "نطاق متكامل\nمن الفئات.",
    body: "تُدار كل فئة من قِبل متخصصين يمتلكون معرفة عميقة بالسوق والوصول إلى مخزون موثق الأصل غير متاح عبر القنوات التقليدية.",
    items: [
      {
        id: "real-estate",
        title: "العقارات",
        description:
          "مساكن وعقارات متميزة، تُعقد صفقاتها بصورة خاصة في أرقى الأسواق العالمية. من مايفير إلى كوت دازور.",
        cta: "طلب مكالمة",
      },
      {
        id: "automobiles",
        title: "السيارات",
        description:
          "سيارات موثقة السجل — من الكلاسيكيات الحديثة المميزة إلى المركبات ذات الأهمية التاريخية.",
        cta: "طلب مكالمة",
      },
      {
        id: "luxury-goods",
        title: "السلع الفاخرة",
        description:
          "قطع من الحِرَف الدائمة والمواد النادرة، من كبار دور الأزياء في باريس وميلانو ولندن.",
        cta: "طلب مكالمة",
      },
      {
        id: "timepieces",
        title: "الساعات",
        description:
          "ساعات نادرة من كبار دور الصناعة السويسرية — مُقدَّمة بصورة خاصة لكبار هواة الجمع.",
        cta: "طلب مكالمة",
      },
    ],
  },
  contact: {
    eyebrow: "تواصل معنا",
    headline: "ابدأ\nمحادثة.",
    body: "يردّ فريقنا على جميع الاستفسارات خلال يوم عمل واحد. تُعالَج جميع المراسلات بسرية تامة.",
    form: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      category: "مجال الاهتمام",
      categoryOptions: [
        { value: "", label: "اختر فئة" },
        { value: "real-estate", label: "العقارات" },
        { value: "automobiles", label: "السيارات" },
        { value: "luxury-goods", label: "السلع الفاخرة" },
        { value: "timepieces", label: "الساعات" },
        { value: "other", label: "أخرى" },
      ],
      message: "استفسارك",
      messagePlaceholder: "يرجى وصف اهتمامك أو متطلباتك.",
      submit: "إرسال الاستفسار",
      submitting: "جارٍ الإرسال…",
      successTitle: "تم استلام استفسارك.",
      successBody: "سيتواصل معك أحد أعضاء فريقنا خلال يوم عمل واحد. تم إرسال تأكيد إلى بريدك الإلكتروني.",
      errorTitle: "حدث خطأ ما.",
      errorBody: "يرجى المحاولة مجدداً أو التواصل معنا مباشرة.",
      minimumNote: "Blackford membership is subject to eligibility and starts at AED 100,000.",
    },
  },
  footer: {
    tagline: "معاملات خاصة، تُنفَّذ باحترافية.",
    legal: {
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      cookies: "سياسة ملفات تعريف الارتباط",
    },
    links: {
      careers: "الوظائف",
      about: "عن بلاكفورد",
      contact: "تواصل معنا",
    },
    social: {
      instagram: "إنستغرام",
      linkedin: "لينكد إن",
    },
    copyright: "© {year} بلاكفورد. جميع الحقوق محفوظة.",
    disclaimer:
      "تعمل بلاكفورد بوصفها مُيسِّرة للمعاملات الخاصة. تخضع جميع المعاملات لشروطنا والقانون المعمول به.",
  },
};
