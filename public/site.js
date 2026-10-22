/* Marina Berdysheva — prototype interactions. No server-side form delivery yet. */
(async () => {
  'use strict';
  const asset = (id, width = 1500) => `https://images.unsplash.com/${id}?w=${width}&q=85`;
  const names = ['lighting','fashion','beauty','electronics','home','industrial'];
  const services = ['video','videoGeneration','infographics','photoGeneration','layout'];
  const media = {
    lighting:['photo-1540932239986-30128078f3c5','photo-1507473885765-e6ed057f782c','photo-1600607687939-ce8a6c25118c','photo-1542728928-1413d1894ed1','photo-1600210492486-724fe5c67fb0','photo-1600607687920-4e2a09cf159d'],
    fashion:['photo-1483985988355-763728e1935b','photo-1529139574466-a303027c1d8b','photo-1542291026-7eec264c27ff','photo-1551232864-3f0890e580d9','photo-1515886657613-9f3515b0c78f','photo-1547949003-9792a18a2601'],
    beauty:['photo-1608248543803-ba4f8c70ae0b','photo-1596462502278-27bfdc403348','photo-1570172619644-dfd03ed5d881','photo-1556228720-195a672e8a03','photo-1620916566398-39f1143ab7be','photo-1611930022073-b7a4ba5fcccd'],
    electronics:['photo-1498049794561-7780e7231661','photo-1523275335684-37898b6baf30','photo-1505740420928-5e560c06d30e','photo-1512499617640-c74ae3a79d37','photo-1517336714731-489689fd1ca8','photo-1583394838336-acd977736f90'],
    home:['photo-1600607687920-4e2a09cf159d','photo-1555041469-a586c61ea9bc','photo-1600210492486-724fe5c67fb0','photo-1513506003901-1e6a229e2d15','photo-1578749556568-bc2c40e68b61','photo-1490312278390-ab64016e0aa9'],
    industrial:['photo-1581092160607-ee22621dd758','photo-1504917595217-d4dc5ebe6122','photo-1581091226825-a6a2a5aee158','photo-1565514020179-026b92b84bb6','photo-1532094349884-543bc11b234d','photo-1581092580497-e0d23cbdf1dc']
  };
  // Demonstration images only: not represented as Marina's completed projects.
  // Replace these IDs with original project files before publishing the portfolio.
  const serviceMedia = {
    video:['photo-1523275335684-37898b6baf30','photo-1505740420928-5e560c06d30e','photo-1608248543803-ba4f8c70ae0b','photo-1512499617640-c74ae3a79d37','photo-1542291026-7eec264c27ff','photo-1540932239986-30128078f3c5'],
    videoGeneration:['photo-1518709268805-4e9042af9f23','photo-1485846234645-a62644f84728','photo-1519608487953-e999c86e7455','photo-1520639888713-7851133b1ed0','photo-1483985988355-763728e1935b','photo-1531297484001-80022131f5a1'],
    infographics:['photo-1523275335684-37898b6baf30','photo-1608248543803-ba4f8c70ae0b','photo-1505740420928-5e560c06d30e','photo-1542291026-7eec264c27ff','photo-1583394838336-acd977736f90','photo-1498049794561-7780e7231661'],
    photoGeneration:['photo-1497366754035-f200968a6e72','photo-1600607687920-4e2a09cf159d','photo-1500530855697-b586d89ba3ee','photo-1518709268805-4e9042af9f23','photo-1515886657613-9f3515b0c78f','photo-1540932239986-30128078f3c5'],
    layout:['photo-1544947950-fa07a98d237f','photo-1513542789411-b6a5d4f31634','photo-1506784983877-45594efa4cbe','photo-1455390582262-044cdead277a','photo-1524578271613-d550eacf6090','photo-1545235617-9465d2a55698']
  };
  // To show real playable clips, put the files in public/media and set an URL below.
  const serviceVideos = { video: null, videoGeneration: null };
  const serviceSpecs = {
    RU: {
      video:['Видео для карточек товара','Детали в движении','Ролики для рекламы'],
      videoGeneration:['Анимированные сцены','Движение камеры','Вертикальные форматы'],
      infographics:['Карточки маркетплейсов','Размеры и материалы','Преимущества товара'],
      photoGeneration:['Предметные композиции','Смена окружения','Рекламные образы'],
      layout:['Фотокниги и альбомы','Календари','Макеты для печати']
    },
    EN: {
      video:['Product showcase videos','Motion details','Campaign edits'],
      videoGeneration:['Animated scenes','Camera motion','Vertical formats'],
      infographics:['Marketplace product cards','Sizes and materials','Product highlights'],
      photoGeneration:['Product compositions','New environments','Campaign visuals'],
      layout:['Photo books and albums','Calendars','Print-ready layouts']
    },
    TH: {
      video:['วิดีโอสินค้า','รายละเอียดการเคลื่อนไหว','วิดีโอโฆษณา'],
      videoGeneration:['ฉากเคลื่อนไหว','การเคลื่อนกล้อง','วิดีโอแนวตั้ง'],
      infographics:['การ์ดสินค้า','ขนาดและวัสดุ','จุดเด่นสินค้า'],
      photoGeneration:['ภาพจัดองค์ประกอบ','เปลี่ยนฉากสินค้า','ภาพโฆษณา'],
      layout:['อัลบั้มภาพ','ปฏิทิน','งานออกแบบสิ่งพิมพ์']
    }
  };
  const I18N = {
    RU: {
      menu:'МЕНЮ',portfolio:'ПОРТФОЛИО',about:'ОБО МНЕ',contacts:'КОНТАКТЫ',
      heroTop:'PRODUCT RETOUCHING · ART DIRECTION',heroTitle:'Опыт, который виден в деталях.',heroSub:'ПРЕДМЕТНАЯ РЕТУШЬ ДЛЯ БРЕНДОВ И ПРОИЗВОДИТЕЛЕЙ ПО ВСЕМУ МИРУ',
      statsKicker:'ОПЫТ И РЕЗУЛЬТАТЫ',statsTitle:'Точность, проверенная временем',statYears:'лет в фотографии и ретуши',statPhotos:'обработанных фотографий',statClients:'клиентов и проектов',comingData:'цифра будет добавлена позже',
      portfolioKicker:'ИЗБРАННЫЕ НАПРАВЛЕНИЯ',portfolioTitle:'Портфолио',portfolioDesc:'Каждое направление — отдельный мир фактур, форм, света и деталей.',viewWork:'СМОТРЕТЬ РАБОТЫ',
      cat_lighting:'Люстры и светильники',cat_fashion:'Одежда и аксессуары',cat_beauty:'Косметика и БАДы',cat_electronics:'Электроника и техника',cat_home:'Дом и декор',cat_industrial:'Инструменты и промышленные изделия',
      cat_lighting_desc:'Металл, стекло, свет и отражения',cat_fashion_desc:'Одежда, обувь, сумки, каталожная ретушь',cat_beauty_desc:'Бьюти-продукты, упаковка и детали',cat_electronics_desc:'От небольших гаджетов до бытовой техники',cat_home_desc:'Мебель, посуда, предметы интерьера',cat_industrial_desc:'Материалы, детали, конструкция',
      aboutKicker:'О МОЁМ ПОДХОДЕ',aboutHeadline:'Один контакт.<br>Единый стандарт.',aboutPara:'Вы работаете напрямую со мной — от обсуждения задачи до финального результата. Более 20 лет опыта в фотографии помогают мне понимать не только обработку, но и то, как изображение должно работать для бренда.',aboutFeature1:'Личная ответственность за каждый проект',aboutFeature2:'Единый визуальный стандарт для каталога',aboutFeature3:'Работа с крупными объёмами и масштабирование',aboutCta:'ОБСУДИТЬ СОТРУДНИЧЕСТВО',
      capKicker:'БОЛЬШЕ, ЧЕМ ОДНА ФОТОГРАФИЯ',capTitle:'Больше возможностей для вашего продукта',capSub:'Дополнительные форматы для каталогов, рекламы и маркетплейсов.',
      service_video:'Предметное видео',service_video_desc:'Товар в движении',service_videoGeneration:'Видеогенерация',service_videoGeneration_desc:'Новые сцены и движение',service_infographics:'Инфографика и карточки',service_infographics_desc:'Подача преимуществ товара',service_photoGeneration:'Фотогенерация',service_photoGeneration_desc:'Предмет в новых визуальных мирах',service_layout:'Вёрстка',service_layout_desc:'Альбомы, кружки, календари и полиграфия',
      contactKicker:'НАЧНЁМ ДИАЛОГ',contactTitle:'Расскажите<br>о своём товаре.',contactDesc:'Опишите, что продаёте и какая обработка вам нужна. Я помогу определить оптимальный формат сотрудничества.',contactNote:'Для ответа достаточно email или телефона. Остальные поля — по желанию.',formCategory:'Категория товара',formChoose:'Выберите категорию (по желанию)',formTask:'Какая обработка вам нужна?',formTaskPh:'Расскажите о товаре и задаче — необязательно',formPhone:'Номер телефона',formWebsite:'Сайт с вашими товарами',formHint:'* Укажите хотя бы один контакт: email или телефон. Остальное — необязательно.',formSend:'ПОДГОТОВИТЬ ЗАПРОС',formCopy:'СКОПИРОВАТЬ ТЕКСТ',other:'Другое',
      trustKicker:'ПОЧЕМУ СО МНОЙ РАБОТАЮТ',trustTitle:'За что меня ценят',trustLead:'Не только за красивую картинку. За внимание к задаче, предсказуемый результат и спокойный процесс работы.',trustOneTitle:'Понимаю изображение целиком',trustOneText:'20+ лет в фотографии помогают работать не только с пикселями, но и со светом, объёмом, отражениями и характером материала.',trustTwoTitle:'Всегда на связи лично',trustTwoText:'Мы обсуждаем задачи напрямую. Я отвечаю за решения, согласования и итоговый результат — без цепочки менеджеров.',trustThreeTitle:'Держу единый визуальный уровень',trustThreeText:'Для каталогов важна не одна эффектная фотография, а согласованность десятков и сотен кадров: цвет, фактура, фон и детализация.',trustFourTitle:'Работаю с разным масштабом',trustFourText:'От одного сложного рекламного изображения до объёмной товарной серии. Процесс и ресурсы подстраиваются под конкретный проект.',footerKicker:'ЕСТЬ ЗАДАЧА ПО РЕТУШИ?',footerTitle:'Давайте сделаем<br>её красивой.',footerCta:'ОБСУДИТЬ ПРОЕКТ',footerPersonLabel:'АВТОРСКАЯ РЕТУШЬ',footerFullName:'Марина Бердышева',footerRole:'Предметная ретушь для брендов и производителей по всему миру',footerPhoneLabel:'ТЕЛЕФОНЫ',footerRuPhone:'РОССИЯ · ЛИЧНЫЙ',footerThaiPhone:'ТАИЛАНД · НОМЕР УТОЧНЯЕТСЯ',footerSocialLabel:'СВЯЗАТЬСЯ',footerSocialHint:'Telegram: ссылка позже · Email: пока через форму',
      copyrightLine:'© 2026 Marina Berdysheva สงวนลิขสิทธิ์',legalNotice:'การใช้งาน คัดลอก หรือเผยแพร่ภาพถ่าย ข้อความ และองค์ประกอบการออกแบบเว็บไซต์ ต้องได้รับอนุญาตจากเจ้าของลิขสิทธิ์ ยกเว้นตามที่กฎหมายอนุญาต และต้องระบุลิงก์ต้นทางเมื่อได้รับอนุญาต',serviceKicker:'บริการเพิ่มเติม',serviceGalleryDesc:'ตัวอย่างรูปแบบการนำเสนอผลงาน จะเพิ่มผลงานจริงในภายหลัง',serviceGalleryDisclaimer:'ภาพเหล่านี้เป็นเพียงภาพตัวอย่าง ไม่ใช่ผลงานลูกค้า จะเปลี่ยนเป็นผลงานจริงและวิดีโอภายหลัง',serviceVideoPlaceholder:'ตัวอย่างวิดีโอจะปรากฏเมื่อเพิ่มไฟล์ผลงาน',serviceDemoLabel:'ตัวอย่างเลย์เอาต์',galleryInquiry:'พูดคุยเกี่ยวกับงาน ↗',galleryServicesBack:'← กลับสู่บริการอื่น ๆ',galleryServicesBack:'← КО ВСЕМ ВОЗМОЖНОСТЯМ',galleryKicker:'ПРЕДМЕТНАЯ РЕТУШЬ',galleryBack:'← КО ВСЕМ КАТЕГОРИЯМ',galleryDesc:'Примеры расположения фотографий. В финальной версии здесь будут работы из портфолио.',galleryText:'Детали создают разницу.',copyrightLine:'© 2026 Марина Бердышева. Все права защищены.',legalNotice:'Любое использование, копирование или распространение фотографий, текстов, подборок работ и элементов оформления сайта допускается с разрешения правообладателя, кроме случаев, предусмотренных законом. При согласованном использовании обязательна ссылка на источник — этот сайт.', serviceKicker:'ДОПОЛНИТЕЛЬНЫЕ ВОЗМОЖНОСТИ', serviceGalleryDesc:'Подборка примеров оформления и форматов. Реальные работы будут добавлены после подготовки портфолио.', serviceGalleryDisclaimer:'Сейчас здесь демонстрационные материалы — не выполненные заказы. Заменим их настоящими работами, видеороликами и макетами.', serviceVideoPlaceholder:'Здесь будет видео — добавим после подготовки работ', serviceDemoLabel:'ДЕМОНСТРАЦИЯ РАСКЛАДКИ', galleryInquiry:'ОБСУДИТЬ ПРОЕКТ ↗', demoNotice:'Демонстрационный прототип · изображения и бренды — примеры, не перечень клиентов',toTop:'НАВЕРХ ↑',errorContact:'Пожалуйста, укажите email или номер телефона, чтобы я могла ответить.',errorEmail:'Проверьте адрес электронной почты.',errorPhone:'Проверьте номер телефона.',prepared:'Заявка подготовлена. Отправка с сайта пока не подключена — скопируйте текст и отправьте после подключения контактов.',copied:'Текст скопирован.'
    },
    EN: {
      menu:'MENU',portfolio:'PORTFOLIO',about:'ABOUT',contacts:'CONTACT',heroTop:'PRODUCT RETOUCHING · ART DIRECTION',heroTitle:'Experience in every detail.',heroSub:'HIGH-END PRODUCT RETOUCHING FOR BRANDS WORLDWIDE',
      statsKicker:'EXPERIENCE & RESULTS',statsTitle:'Precision built over time',statYears:'years in photography & retouching',statPhotos:'retouched photographs',statClients:'clients and projects',comingData:'to be confirmed',
      portfolioKicker:'SELECTED CATEGORIES',portfolioTitle:'Portfolio',portfolioDesc:'Different objects, the same care for textures, lighting and detail.',viewWork:'VIEW PORTFOLIO ',
      cat_lighting:'Lighting & Chandeliers',cat_fashion:'Fashion & Accessories',cat_beauty:'Beauty & Wellness',cat_electronics:'Electronics & Appliances',cat_home:'Home & Living',cat_industrial:'Industrial & Tools',
      cat_lighting_desc:'Glass, metal, light and reflections',cat_fashion_desc:'Apparel, shoes, bags and lookbooks',cat_beauty_desc:'Skincare, packaging and wellness',cat_electronics_desc:'From small gadgets to appliances',cat_home_desc:'Furniture, tableware and décor',cat_industrial_desc:'Materials, construction and detail',
      aboutKicker:'HOW I WORK',aboutHeadline:'One contact.<br>One standard.',aboutPara:'Work directly with me from the first discussion to final delivery. Over 20 years of photographic experience informs every retouching decision — and how your images perform for your brand.',aboutFeature1:'Personal accountability for each project',aboutFeature2:'Consistent visual standards across catalogs',aboutFeature3:'Capacity for high-volume production',aboutCta:'DISCUSS A PROJECT ↗',
      capKicker:'BEYOND A SINGLE IMAGE',capTitle:'More ways to present your product',capSub:'Additional formats for e-commerce, campaigns and catalogs.',
      service_video:'Product Video',service_video_desc:'Bring the product into motion',service_videoGeneration:'AI Video Generation',service_videoGeneration_desc:'New scenes and movement',service_infographics:'Infographics & Product Cards',service_infographics_desc:'Communicate product benefits',service_photoGeneration:'AI Image Generation',service_photoGeneration_desc:'Creative environments for products',service_layout:'Layout & Print Design',service_layout_desc:'Albums, mugs, calendars & print',
      contactKicker:'GET IN TOUCH',contactTitle:'Tell me about<br>your product.',contactDesc:'Describe the products you sell and the editing you need. We can determine the right approach together.',contactNote:'Email or phone is enough to reply. Other fields are optional.',formCategory:'Product category',formChoose:'Choose a category (optional)',formTask:'What do you need?',formTaskPh:'Tell me about your products and task — optional',formPhone:'Phone number',formWebsite:'Your product website',formHint:'* Please include at least an email or phone number. All other fields are optional.',formSend:'PREPARE REQUEST',formCopy:'COPY MESSAGE',other:'Other',trustKicker:'WHY CLIENTS WORK WITH ME',trustTitle:'What clients value',trustLead:'Not just an attractive image, but careful attention to the brief, consistent results and an easy collaboration.',trustOneTitle:'I see the whole image',trustOneText:'Over 20 years in photography help me understand light, depth, reflections and materials — not just pixels.',trustTwoTitle:'Direct personal communication',trustTwoText:'You work with me directly. I remain responsible for decisions, feedback and final delivery.',trustThreeTitle:'Consistency across collections',trustThreeText:'A strong catalogue depends on coherent color, backgrounds, materials and finish — across every image.',trustFourTitle:'Flexible project capacity',trustFourText:'From one demanding hero image to a large product series, the workflow adapts to your project.',footerKicker:'HAVE A RETOUCHING PROJECT?',footerTitle:'Let’s make it<br>beautiful.',footerCta:'DISCUSS YOUR PROJECT',footerPersonLabel:'INDEPENDENT RETOUCHING',footerFullName:'Marina Berdysheva',footerRole:'High-end product retouching for brands and manufacturers worldwide',footerPhoneLabel:'PHONE',footerRuPhone:'RUSSIA · PERSONAL',footerThaiPhone:'THAILAND · NUMBER PENDING',footerSocialLabel:'CONNECT',footerSocialHint:'Telegram link pending · Email via the contact form for now',
      copyrightLine:'© 2026 Marina Berdysheva. All rights reserved.',legalNotice:'Use, copying or distribution of photographs, texts, portfolio selections or website design elements requires the copyright holder’s permission, except where permitted by law. Approved use must include a link to this website as the source.',serviceKicker:'ADDITIONAL CAPABILITIES',serviceGalleryDesc:'Preview of presentation formats. Actual portfolio pieces will be added as they are prepared.',serviceGalleryDisclaimer:'These are demonstration images, not completed client projects. They will be replaced with original work, videos and layouts.',serviceVideoPlaceholder:'Video preview will appear here once your work is ready',serviceDemoLabel:'LAYOUT PREVIEW',galleryInquiry:'DISCUSS A PROJECT ↗',galleryServicesBack:'← ALL CAPABILITIES',galleryKicker:'PRODUCT RETOUCHING',galleryBack:'← ALL CATEGORIES',galleryDesc:'Layout examples. Final galleries will feature actual portfolio work.',galleryText:'The difference is in the details.',demoNotice:'Concept preview · images and brand names are illustrative, not a client list',toTop:'BACK TO TOP ↑',errorContact:'Please enter an email or phone number so I can reply.',errorEmail:'Please check the email address.',errorPhone:'Please check the phone number.',prepared:'Message prepared. Delivery is not connected yet — copy the request until a contact endpoint is added.',copied:'Message copied.'
    },
    TH: {
      menu:'เมนู',portfolio:'ผลงาน',about:'เกี่ยวกับฉัน',contacts:'ติดต่อ',heroTop:'PRODUCT RETOUCHING · ART DIRECTION',heroTitle:'ประสบการณ์ที่เห็นได้ในทุกรายละเอียด',heroSub:'รีทัชภาพสินค้าสำหรับแบรนด์ทั่วโลก',
      statsKicker:'ประสบการณ์และผลงาน',statsTitle:'ความประณีตจากประสบการณ์',statYears:'ปีในงานถ่ายภาพและรีทัช',statPhotos:'ภาพที่รีทัช',statClients:'ลูกค้าและโปรเจกต์',comingData:'รอยืนยันข้อมูล',
      portfolioKicker:'หมวดหมู่ผลงาน',portfolioTitle:'ผลงาน',portfolioDesc:'ใส่ใจพื้นผิว แสง รูปทรง และรายละเอียดของสินค้าทุกประเภท',viewWork:'ชมผลงาน',
      cat_lighting:'โคมไฟและแชนเดอเลียร์',cat_fashion:'แฟชั่นและเครื่องประดับ',cat_beauty:'ความงามและสุขภาพ',cat_electronics:'อิเล็กทรอนิกส์และเครื่องใช้ไฟฟ้า',cat_home:'บ้านและของตกแต่ง',cat_industrial:'เครื่องมือและอุตสาหกรรม',
      cat_lighting_desc:'แก้ว โลหะ แสงและเงาสะท้อน',cat_fashion_desc:'เสื้อผ้า รองเท้า กระเป๋า',cat_beauty_desc:'เครื่องสำอางและบรรจุภัณฑ์',cat_electronics_desc:'อุปกรณ์และเครื่องใช้ไฟฟ้า',cat_home_desc:'เฟอร์นิเจอร์ ภาชนะ และของตกแต่ง',cat_industrial_desc:'วัสดุ โครงสร้าง และรายละเอียด',
      aboutKicker:'แนวทางการทำงาน',aboutHeadline:'ติดต่อคนเดียว<br>คุณภาพมาตรฐานเดียว',aboutPara:'ติดต่อและทำงานกับฉันโดยตรงตั้งแต่เริ่มต้นจนส่งมอบงาน ด้วยประสบการณ์ถ่ายภาพมากกว่า 20 ปี ฉันเข้าใจความสำคัญของภาพต่อแบรนด์ของคุณ',aboutFeature1:'รับผิดชอบงานแต่ละโปรเจกต์ด้วยตนเอง',aboutFeature2:'คุณภาพภาพที่สม่ำเสมอทั้งแคตตาล็อก',aboutFeature3:'รองรับงานจำนวนมาก',aboutCta:'พูดคุยเกี่ยวกับโปรเจกต์ ↗',
      capKicker:'มากกว่าภาพนิ่ง',capTitle:'มากกว่าภาพสินค้า',capSub:'รูปแบบเพิ่มเติมสำหรับโฆษณาและอีคอมเมิร์ซ',
      service_video:'วิดีโอสินค้า',service_video_desc:'สินค้าที่เคลื่อนไหว',service_videoGeneration:'สร้างวิดีโอด้วย AI',service_videoGeneration_desc:'ฉากและการเคลื่อนไหวใหม่',service_infographics:'อินโฟกราฟิกและการ์ดสินค้า',service_infographics_desc:'สื่อสารจุดเด่นของสินค้า',service_photoGeneration:'สร้างภาพด้วย AI',service_photoGeneration_desc:'ภาพสินค้าในฉากใหม่',service_layout:'ออกแบบเลย์เอาต์',service_layout_desc:'อัลบั้ม แก้ว ปฏิทิน และงานพิมพ์',
      contactKicker:'ติดต่อเรา',contactTitle:'เล่าให้ฟัง<br>เกี่ยวกับสินค้าของคุณ',contactDesc:'บอกเกี่ยวกับสินค้าและงานรีทัชที่ต้องการ',contactNote:'แจ้งอีเมลหรือหมายเลขโทรศัพท์อย่างใดอย่างหนึ่งก็เพียงพอ',formCategory:'หมวดหมู่สินค้า',formChoose:'เลือกหมวดหมู่ (ไม่บังคับ)',formTask:'คุณต้องการงานแบบใด?',formTaskPh:'อธิบายงานที่ต้องการ (ไม่บังคับ)',formPhone:'หมายเลขโทรศัพท์',formWebsite:'เว็บไซต์สินค้าของคุณ',formHint:'* กรุณาระบุอีเมลหรือโทรศัพท์อย่างน้อยหนึ่งรายการ',formSend:'เตรียมข้อความ',formCopy:'คัดลอกข้อความ',other:'อื่น ๆ',trustKicker:'เหตุผลที่ร่วมงานกับฉัน',trustTitle:'สิ่งที่ลูกค้าให้ความสำคัญ',trustLead:'ไม่ใช่แค่ภาพสวย แต่ยังรวมถึงความเข้าใจในงาน คุณภาพที่สม่ำเสมอ และการสื่อสารที่ง่าย',trustOneTitle:'เข้าใจภาพในทุกมิติ',trustOneText:'ประสบการณ์ถ่ายภาพกว่า 20 ปีช่วยให้เข้าใจแสง มิติ พื้นผิว และเงาสะท้อน',trustTwoTitle:'สื่อสารโดยตรงกับฉัน',trustTwoText:'คุณพูดคุยและติดตามงานกับฉันโดยตรง ฉันรับผิดชอบการตัดสินใจและผลงานสุดท้าย',trustThreeTitle:'คุณภาพสม่ำเสมอทั้งคอลเลกชัน',trustThreeText:'ภาพจำนวนมากต้องมีโทนสี พื้นหลัง และรายละเอียดที่สอดคล้องกัน',trustFourTitle:'ยืดหยุ่นตามขนาดงาน',trustFourText:'ตั้งแต่ภาพโฆษณาที่ต้องใส่ใจเป็นพิเศษจนถึงงานแคตตาล็อกจำนวนมาก',footerKicker:'มีโปรเจกต์รีทัชใช่ไหม?',footerTitle:'มาทำให้ภาพ<br>สวยยิ่งขึ้น',footerCta:'พูดคุยเกี่ยวกับงาน',footerPersonLabel:'รีทัชภาพสินค้าโดยผู้เชี่ยวชาญ',footerFullName:'Marina Berdysheva',footerRole:'รีทัชภาพสินค้าสำหรับแบรนด์และผู้ผลิตทั่วโลก',footerPhoneLabel:'โทรศัพท์',footerRuPhone:'รัสเซีย · ส่วนตัว',footerThaiPhone:'ไทย · รอเพิ่มหมายเลข',footerSocialLabel:'ติดต่อ',footerSocialHint:'รอเพิ่มลิงก์ Telegram · อีเมลติดต่อผ่านแบบฟอร์มชั่วคราว',
      copyrightLine:'© 2026 Marina Berdysheva สงวนลิขสิทธิ์',legalNotice:'การใช้งาน คัดลอก หรือเผยแพร่ภาพถ่าย ข้อความ และองค์ประกอบการออกแบบเว็บไซต์ ต้องได้รับอนุญาตจากเจ้าของลิขสิทธิ์ ยกเว้นตามที่กฎหมายอนุญาต และต้องระบุลิงก์ต้นทางเมื่อได้รับอนุญาต',serviceKicker:'บริการเพิ่มเติม',serviceGalleryDesc:'ตัวอย่างรูปแบบการนำเสนอผลงาน จะเพิ่มผลงานจริงในภายหลัง',serviceGalleryDisclaimer:'ภาพเหล่านี้เป็นเพียงภาพตัวอย่าง ไม่ใช่ผลงานลูกค้า จะเปลี่ยนเป็นผลงานจริงและวิดีโอภายหลัง',serviceVideoPlaceholder:'ตัวอย่างวิดีโอจะปรากฏเมื่อเพิ่มไฟล์ผลงาน',serviceDemoLabel:'ตัวอย่างเลย์เอาต์',galleryInquiry:'พูดคุยเกี่ยวกับงาน ↗',galleryServicesBack:'← กลับสู่บริการอื่น ๆ',galleryKicker:'รีทัชภาพสินค้า',galleryBack:'← ทุกหมวดหมู่',galleryDesc:'ตัวอย่างการจัดภาพ จะเปลี่ยนเป็นผลงานจริงภายหลัง',galleryText:'ความแตกต่างอยู่ในรายละเอียด',copyrightLine:'© 2026 Marina Berdysheva สงวนลิขสิทธิ์',legalNotice:'การใช้ คัดลอก หรือเผยแพร่ภาพ ข้อความ และองค์ประกอบการออกแบบต้องได้รับอนุญาตจากเจ้าของสิทธิ์ ยกเว้นที่กฎหมายอนุญาต และต้องระบุลิงก์อ้างอิงเว็บไซต์นี้เมื่อได้รับอนุญาต',serviceKicker:'บริการเพิ่มเติม',serviceGalleryDesc:'ตัวอย่างรูปแบบการนำเสนอผลงาน จะเพิ่มผลงานจริงในภายหลัง',serviceGalleryDisclaimer:'ภาพเหล่านี้เป็นเพียงตัวอย่าง ไม่ใช่ผลงานลูกค้า จะเพิ่มวิดีโอและภาพผลงานจริงภายหลัง',serviceVideoPlaceholder:'เพิ่มตัวอย่างวิดีโอได้ภายหลัง',serviceDemoLabel:'ตัวอย่างการจัดวาง',galleryInquiry:'พูดคุยเกี่ยวกับงาน ↗',demoNotice:'เว็บไซต์ตัวอย่าง · ภาพและชื่อแบรนด์เป็นตัวอย่าง ไม่ใช่รายชื่อลูกค้า',toTop:'กลับด้านบน ↑',errorContact:'กรุณากรอกอีเมลหรือโทรศัพท์เพื่อติดต่อกลับ',errorEmail:'กรุณาตรวจสอบอีเมล',errorPhone:'กรุณาตรวจสอบหมายเลขโทรศัพท์',prepared:'เตรียมข้อความแล้ว ยังไม่ได้เชื่อมต่อระบบส่ง กรุณาคัดลอกข้อความ',copied:'คัดลอกเรียบร้อย'
    }
  };
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  // User-editable data lives in public/content/site.json.
  let editedContent=window.__PORTFOLIO_CONTENT__ || null;
  if(!editedContent){try{const r=await fetch('/content/site.json',{cache:'no-store'});if(r.ok)editedContent=await r.json()}catch(_e){console.warn('Editable content not loaded; using preview fallbacks')}}
  if(editedContent?.translations){for(const code of ['RU','EN','TH'])Object.assign(I18N[code],editedContent.translations[code]||{});}
  // Editable cover images (hero, category and capability cards).
  if(editedContent?.covers){
    const v=editedContent.covers;
    if(v.hero){const hero=document.querySelector('.hero');if(hero)hero.style.backgroundImage=`url(${JSON.stringify(v.hero).slice(1,-1)})`;}
    for(const [key,url] of Object.entries(v)){
      if(!url||key==='hero')continue;
      const [type,id]=key.split('/');const el=document.querySelector(type==='category'?`[data-category="${id}"] img`:`[data-service="${id}"] img`);
      if(el)el.src=url;
    }
  }
  let lang = 'RU';
  let preparedMessage = '';
  const tr = key => I18N[lang][key] ?? I18N.RU[key] ?? key;
  function translate(next) {
    lang = I18N[next] ? next : 'RU';
    document.documentElement.lang = lang.toLowerCase();
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n, val = tr(key);
      if (['aboutHeadline','contactTitle','footerTitle'].includes(key)) el.innerHTML = val;
      else el.textContent = val;
    });
    $$('[data-placeholder-i18n]').forEach(el => { el.placeholder = tr(el.dataset.placeholderI18n); });
    $$('.lang-switch').forEach(el=>{const active = el.dataset.lang===lang;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
    const item = currentView(); if(item) renderGallery(item);
    $('#form-error').style.display='none';$('#form-success').style.display='none';
  }
  const menuToggle = $('#menu-toggle'), mainNav = $('#main-nav'), drop = $('#nav-dropdown'), trigger = $('#portfolio-trigger');
  const closeMenus = () => {mainNav.classList.remove('is-visible');menuToggle.setAttribute('aria-expanded','false');drop.classList.remove('is-open');trigger.setAttribute('aria-expanded','false')};
  menuToggle.addEventListener('click',()=>{const open=!mainNav.classList.contains('is-visible');mainNav.classList.toggle('is-visible',open);menuToggle.setAttribute('aria-expanded',String(open))});
  trigger.addEventListener('click',()=>{const open=!drop.classList.contains('is-open');drop.classList.toggle('is-open',open);trigger.setAttribute('aria-expanded',String(open))});
  $$('.main-nav a').forEach(el=>el.addEventListener('click',closeMenus));
  $$('.lang-switch').forEach(el=>el.addEventListener('click',()=>translate(el.dataset.lang)));
  document.addEventListener('click', e=>{if(!drop.contains(e.target)) {drop.classList.remove('is-open');trigger.setAttribute('aria-expanded','false')}});
  const header = $('#site-header'), home = $('#home-view'), gallery = $('#gallery-view');
  // The same gallery component supports product categories and creative services.
  const currentView = () => {
    const match = location.hash.match(/^#(category|service)\/([a-zA-Z]+)$/);
    if (!match) return null;
    const [ , type, id ] = match;
    if (type === 'category' && names.includes(id)) return {type,id};
    if (type === 'service' && services.includes(id)) return {type,id};
    return null;
  };
  const galleryTypes = ['wide','regular','regular','tall','text-tile','wide','regular','regular','wide','regular','tall','regular'];
  function galleryImage(photo, title, index, kind) {
    const safeTitle=title.replace(/"/g,'&quot;');
    const img=asset(photo,1250);
    return `<button class="gallery-item ${kind==='regular'?'':kind}" type="button" data-photo="${photo}" aria-label="${safeTitle}: ${index+1}"><img src="${img}" loading="lazy" alt="${safeTitle}: ${index+1}" /><span class="gallery-item__label">${tr('serviceDemoLabel')}</span></button>`;
  }
  function renderGallery(view) {
    if(!view) return;
    const {type,id}=view, isService=type==='service';
    const title=tr(isService?'service_'+id:'cat_'+id);
    const sub=tr(isService?'service_'+id+'_desc':'cat_'+id+'_desc');
    const list=isService?serviceMedia[id]:media[id];
    $('#gallery-title').textContent=title;
    $('#gallery-kicker').textContent=tr(isService?'serviceKicker':'galleryKicker');
    $('#gallery-desc').textContent=sub+'. '+tr(isService?'serviceGalleryDesc':'galleryDesc');
    const tags=$('#gallery-tags');
    tags.innerHTML='';
    if(isService){
      (serviceSpecs[lang][id]||[]).forEach(label=>{const badge=document.createElement('span');badge.textContent=label;tags.append(badge)});
    }
    const back=$('#gallery-back');
    back.href=isService?'#capabilities':'#portfolio';
    back.textContent=tr(isService?'galleryServicesBack':'galleryBack');
    $('#gallery-endnote').hidden=!isService;
    let items=[];
    if(isService){
      if(id==='video'||id==='videoGeneration'){
        const videoSrc=serviceVideos[id];
        items.push(videoSrc
          ? `<div class="gallery-item gallery-video-slot wide"><video src="${videoSrc}" controls playsinline muted loop preload="metadata"></video></div>`
          : `<div class="gallery-item gallery-video-placeholder wide"><div class="gallery-video-placeholder__mark" aria-hidden="true">▷</div><span>${tr('serviceVideoPlaceholder')}</span></div>`
        );
      }else{
        items.push(`<div class="gallery-item gallery-service-intro wide"><span class="gallery-service-intro__eyebrow">${tr('serviceKicker')}</span><strong>${title}</strong><p>${sub}</p><small>${tr('serviceDemoLabel')}</small></div>`);
      }
    }
    const custom=editedContent?.galleries?.[`${type}/${id}`];
    if(Array.isArray(custom) && custom.length){
      for(const [i,entry] of custom.entries()){
        if(entry.type==='text'){
          const text=document.createElement('span');text.textContent=entry.text?.[lang]||entry.text?.RU||'';
          items.push(`<div class="gallery-item text-tile" data-text-index="${i}"></div>`);
          continue;
        }
        if(entry.type==='video'){
          items.push(`<div class="gallery-item gallery-video-slot" data-video-index="${i}"></div>`);continue;
        }
        if(!entry.src)continue;
        const wide=entry.featured?' featured':'';
        items.push(`<button class="gallery-item fluid-item${wide}" type="button" data-edit-index="${i}" aria-label="Open image ${i+1}"><img loading="lazy" alt="" /></button>`);
      }
    } else items.push(...galleryTypes.map((kind,i)=>kind==='text-tile'
      ? `<div class="gallery-item text-tile"><span>${isService?serviceSpecs[lang][id][i%3]:tr('galleryText')}</span></div>`
      : galleryImage(list[i%list.length],title,i,kind)
    ));
    $('#gallery-grid').innerHTML=items.join('');
    $('#gallery-grid').classList.toggle('is-service',isService);
    if(Array.isArray(custom) && custom.length){
      for(const [i,entry] of custom.entries()){
        const btn=$(`#gallery-grid [data-edit-index="${i}"]`);
        if(btn){const img=btn.querySelector('img');img.src=entry.src;img.alt=entry.alt?.[lang]||entry.alt?.RU||title;btn.dataset.photo=entry.src;}
        const tile=$(`#gallery-grid [data-text-index="${i}"]`);
        if(tile){const t=document.createElement('span');t.textContent=entry.text?.[lang]||entry.text?.RU||'';tile.append(t);}
        const video=$(`#gallery-grid [data-video-index="${i}"]`);
        if(video&&entry.src){const v=document.createElement('video');v.src=entry.src;v.controls=true;v.playsInline=true;v.preload='metadata';v.poster=entry.poster||'';video.append(v);}
      }
      requestAnimationFrame(layoutFluidGrid);
      $('#gallery-grid').querySelectorAll('.fluid-item img').forEach(img=>img.addEventListener('load',layoutFluidGrid,{once:true}));
    }

    // Photos used in this prototype come from a stock image service.
    // The labels make that explicit, rather than implying they are client results.
    $('#gallery-grid').querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.style.visibility='hidden'}, {once:true}));
  }
  // Semi-automatic grid: intrinsic ratios determine height; featured photos occupy two columns.
  function layoutFluidGrid(){
    const grid=$('#gallery-grid');if(!grid)return;
    const style=getComputedStyle(grid);const gap=parseFloat(style.rowGap)||12;
    const row=10;const width=grid.clientWidth;
    const cols=width<600?1:width<1024?2:3;
    const cell=(width-gap*(cols-1))/cols;
    grid.querySelectorAll('.fluid-item').forEach(btn=>{
      const img=btn.querySelector('img');const two=btn.classList.contains('featured')&&cols>1;
      const w=two?2*cell+gap:cell;
      const ratio=img.naturalWidth&&img.naturalHeight?img.naturalWidth/img.naturalHeight:1.25;
      const h=Math.min(1000,Math.max(95,w/ratio));
      btn.style.gridColumn=`span ${two?2:1}`;
      btn.style.height=`${h}px`;
      btn.style.gridRow=`span ${Math.ceil((h+gap)/(row+gap))}`;
    });
  }
  addEventListener('resize',()=>{if(currentView())layoutFluidGrid()},{passive:true});
  function route() {
    const view=currentView();
    home.hidden=!!view;gallery.hidden=!view;
    header.classList.toggle('in-gallery',!!view);
    closeMenus();
    if(view){renderGallery(view);window.scrollTo({top:0,left:0,behavior:"instant"})}
    else if(location.hash && document.getElementById(location.hash.slice(1))) {requestAnimationFrame(()=>document.getElementById(location.hash.slice(1)).scrollIntoView())}
    else if(!location.hash){window.scrollTo(0,0)}
    updateHeader();
  }
  function updateHeader(){header.classList.toggle('is-solid',!!currentView()||window.scrollY>40)}
  addEventListener('hashchange',route);addEventListener('scroll',updateHeader,{passive:true});
  let previousFocus=null;
  const lb=$('#lightbox'), lbImage=$('#lightbox-img');
  async function openLightbox(imgId) {
    previousFocus=document.activeElement;
    lb.hidden=false;lb.style.background='rgba(28,28,28,.97)';lbImage.crossOrigin='anonymous';lbImage.src=/^(https?:|\/|data:)/.test(imgId)?imgId:asset(imgId,2000);
    lbImage.onload=()=>{
      try{
        const canvas=document.createElement('canvas');canvas.width=90;canvas.height=90;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(lbImage,0,0,90,90);
        const data=ctx.getImageData(0,0,90,90).data;const colors=[];
        for(let i=0;i<90;i+=6){for(const [x,y] of [[i,0],[i,89],[0,i],[89,i]]){const p=(y*90+x)*4;colors.push([data[p],data[p+1],data[p+2]])}}
        const mean=[0,1,2].map(c=>colors.reduce((a,v)=>a+v[c],0)/colors.length);
        const err=colors.reduce((sum,c)=>sum+Math.max(...c.map((v,i)=>Math.abs(v-mean[i]))),0)/colors.length;
        if(err<15){lb.style.background=`rgb(${mean.map(v=>Math.round(v)).join(',')})`;$('#lightbox-caption').style.background='#0009'}
      }catch(_e){/* external image CORS may block sampling; use neutral background */}
    };
    $('#lightbox-close').focus();document.body.style.overflow='hidden';
  }
  function closeLightbox(){lb.hidden=true;document.body.style.overflow='';lbImage.src='';previousFocus?.focus?.()}
  $('#gallery-grid').addEventListener('click',ev=>{const btn=ev.target.closest('[data-photo]');if(btn)openLightbox(btn.dataset.photo)});
  $('#lightbox-close').addEventListener('click',closeLightbox);
  lb.addEventListener('click',ev=>{if(ev.target===lb)closeLightbox()});
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape'){if(!lb.hidden)closeLightbox();closeMenus()}});
  $('#inquiry-form').addEventListener('submit',event=>{
    event.preventDefault();const form=event.currentTarget;
    const email=form.email.value.trim(),phone=form.phone.value.trim(),site=form.website.value.trim(),task=form.task.value.trim(),cat=form.category.value;
    const error=$('#form-error'), success=$('#form-success');error.style.display='none';success.style.display='none';
    let message='';
    if(!email&&!phone) message=tr('errorContact');
    else if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))message=tr('errorEmail');
    else if(phone&&phone.replace(/\D/g,'').length<7)message=tr('errorPhone');
    if(message){error.textContent=message;error.style.display='block';return}
    preparedMessage=[`Category: ${cat?tr(cat==='other'?'other':'cat_'+cat):'—'}`,`Task: ${task||'—'}`,`Email: ${email||'—'}`,`Phone: ${phone||'—'}`,`Website: ${site||'—'}`].join('\n');
    success.textContent=tr('prepared');success.style.display='block';$('#copy-request').style.display='block';
  });
  $('#copy-request').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(preparedMessage);$('#form-success').textContent=tr('copied')}
    catch(_e){const ta=document.createElement('textarea');ta.value=preparedMessage;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();$('#form-success').textContent=tr('copied')}
  });
  // Avoid browser broken-image badges when demonstration URLs are offline.
  const bindImageFallbacks = root => root.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.style.visibility='hidden'}, {once:true}));
  bindImageFallbacks(document);
  translate('RU');route();
})();
