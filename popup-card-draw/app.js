const mechanisms = [
  { id: 1, name: "平行折（盒型折）", en: "Box / Parallel Fold", category: "90° 切折类", difficulty: "★", principle: "跨折线剪两条平行切口，中间纸条反向折出，形成与两页平行的台阶面。", key: "顶面进深要等于正面高度，切口必须与中折线垂直，合页前先做白模测试。", usage: "建筑立面、文字块、舞台布景、知识卡片。", visual: "parallel" },
  { id: 2, name: "阶梯折", en: "Steps / Staircase", category: "90° 切折类", difficulty: "★★", principle: "在同一宽度内重复平行折，让多个台阶沿折线逐级弹起。", key: "每一级的高度和进深要配平，先画侧视剖面，再转成展开图。", usage: "楼梯、山体、看台、层叠景深。", visual: "stairs" },
  { id: 3, name: "嘴型折（鸟喙折）", en: "Mouth / Beak Fold", category: "90° 切折类", difficulty: "★", principle: "跨书脊剪一刀，从切口两端向书脊折出斜线，开合时形成张嘴动作。", key: "斜线角度越小张口越大，上下不对称可以做出更生动的嘴型。", usage: "会说话的角色、花蕾、眼皮、动物嘴。", visual: "beak" },
  { id: 4, name: "叠代折（再生折）", en: "Generations Fold", category: "90° 切折类", difficulty: "★★★", principle: "在已弹起的盒型新谷折上再做一次平行折，一代继续生出下一代。", key: "只能在谷折上继续叠代，每代尺寸要小于上一代进深，避免闭合出界。", usage: "城市天际线、分形结构、纸建筑。", visual: "nestedSteps" },
  { id: 5, name: "V形折", en: "V-Fold", category: "180° 贴片类", difficulty: "★", principle: "一张对折纸片呈 V 形粘在书脊两侧，开页时被两页拉开而直立。", key: "两条粘贴线必须交于书脊同一点，夹角接近 90° 时更直立。", usage: "人物、树木、山门、主视觉结构。", visual: "vfold" },
  { id: 6, name: "帐篷折", en: "Tent / A-Frame", category: "180° 贴片类", difficulty: "★", principle: "纸条横跨书脊，两脚分别粘在左右页，打开后隆起成屋脊。", key: "两脚到书脊距离之和要小于纸条总长，等距对称，不等距偏斜。", usage: "屋顶、山丘、拱起物、低矮地形。", visual: "tent" },
  { id: 7, name: "平行浮台", en: "Floating Platform", category: "180° 贴片类", difficulty: "★★", principle: "两侧立脚加书脊处中立脚，共同托起一块平行于页面的平台。", key: "所有立脚等高且与书脊平行，平台中线需要预压折痕。", usage: "桌面、水面、楼板、二层结构地基。", visual: "platform" },
  { id: 8, name: "立方体", en: "Box / Cube", category: "180° 贴片类", difficulty: "★★", principle: "四面围墙跨书脊成菱形收合，顶盖沿书脊方向对折藏入盒内。", key: "盒体对角线落在书脊上或侧壁与书脊平行，顶盖折线要同向。", usage: "房屋、礼盒、车身、积木。", visual: "cube" },
  { id: 9, name: "圆柱", en: "Cylinder", category: "180° 贴片类", difficulty: "★★★", principle: "纸筒两侧用粘贴翼固定，开页时由扁平状态撑成圆筒。", key: "筒周长按粘点间距放量，顶盖可加十字撑片辅助成圆。", usage: "塔楼、树干、火箭、灯笼。", visual: "cylinder" },
  { id: 10, name: "金字塔", en: "Pyramid", category: "180° 贴片类", difficulty: "★★", principle: "四个三角面围成锥体，底边两点固定在左右页，尖顶对准书脊。", key: "相邻面留粘贴翼，对着书脊的面需要加中折线才能合平。", usage: "尖顶、山峰、帐幕、纪念碑。", visual: "pyramid" },
  { id: 11, name: "拱桥带", en: "Arch / Strap", category: "180° 贴片类", difficulty: "★", principle: "弧形纸带两端分贴左右页，开页时被拉起成拱。", key: "纸带纹路垂直书脊，带长决定拱高，过长闭合时会鼓出书口。", usage: "彩虹、桥、动物弓背、连接件。", visual: "arch" },
  { id: 12, name: "螺旋", en: "Spiral", category: "180° 贴片类", difficulty: "★", principle: "圆片剪成螺旋线，中心贴一页、外端贴另一页，打开时被拉成弹簧。", key: "圈距均匀且不要过窄，两粘点以书脊对称，避免歪斜。", usage: "龙卷风、蛇、藤蔓、旋转楼梯。", visual: "spiral" },
  { id: 13, name: "格插片", en: "Sliceform", category: "180° 贴片类", difficulty: "★★★★", principle: "两组带槽纸片十字互插成网格，可压扁成平行四边形并复原。", key: "槽宽等于纸厚，槽深约为片高一半，仅固定对角外侧片。", usage: "球体、地形、建筑体量、抽象雕塑。", visual: "sliceform" },
  { id: 14, name: "蜂窝纸", en: "Honeycomb", category: "180° 贴片类", difficulty: "★★", principle: "多层薄纸按间隔粘接，展开时形成蜂窝状体积。", key: "胶线间距要一致，纸张宜薄，闭合方向要预先测试。", usage: "云朵、树冠、裙摆、蛋糕装饰。", visual: "honeycomb" },
  { id: 15, name: "拉花臂（剪刀臂）", en: "Scissor Lattice", category: "180° 贴片类", difficulty: "★★★", principle: "交叉纸臂通过铆点连接，拉开时像剪刀架一样伸展。", key: "铆点位置要统一，纸臂宽度不能太细，防止扭曲断裂。", usage: "伸缩桥、机械臂、节庆拉花、可伸展结构。", visual: "scissor" },
  { id: 16, name: "多重V折（层景）", en: "Nested V-Folds", category: "180° 贴片类", difficulty: "★★", principle: "多个 V 折按前后层次嵌套，开页时形成连续景深。", key: "前后 V 脚不要互相碰撞，高度逐层控制，先测合页路径。", usage: "森林、山谷、人群、舞台层景。", visual: "nestedV" },
  { id: 17, name: "摆臂", en: "Moving Arm", category: "180° 贴片类", difficulty: "★★★", principle: "纸臂通过铆点或拉片与页面连接，开合时产生摆动。", key: "转轴要留活动间隙，摆臂末端不可越过页面边界。", usage: "挥手、钟摆、翅膀、指示牌。", visual: "arm" },
  { id: 18, name: "翻翻页", en: "Lift-the-Flap", category: "平面互动类", difficulty: "★", principle: "在页面上加一个可翻开的盖片，用折线作为铰链。", key: "铰链只压痕不切断，隐藏内容避开折线，必要时加手指缺口。", usage: "秘密文字、问答、彩蛋、情绪树洞。", visual: "flap" },
  { id: 19, name: "拉拉杆", en: "Pull-Tab", category: "平面互动类", difficulty: "★★", principle: "通过拉动纸条带动隐藏图层或角色沿固定方向移动。", key: "拉条至少 18-20 mm 宽，滑槽要有余量，并加止挡防拉脱。", usage: "角色移动、揭示答案、太阳升起、情绪变化。", visual: "pulltab" },
  { id: 20, name: "转盘", en: "Wheel / Volvelle", category: "平面互动类", difficulty: "★", principle: "圆盘围绕中心铆钉旋转，通过窗口切换画面或信息。", key: "圆心必须精准，窗口避开邻近内容，铆钉孔要略大于铆钉。", usage: "月相、四季、表情切换、知识问答。", visual: "wheel" },
  { id: 21, name: "杠杆摆动", en: "Pivot / Lever", category: "平面互动类", difficulty: "★★★", principle: "用杠杆绕支点转动，将小位移放大成摆动效果。", key: "支点要牢固，长臂不要过细，活动层与底页保持间隙。", usage: "摆尾、点头、指针、机械演示。", visual: "lever" },
  { id: 22, name: "百叶变画", en: "Dissolving Slats", category: "平面互动类", difficulty: "★★★★", principle: "两组窄条交错排列，移动时从一幅图渐变到另一幅图。", key: "条宽和间距必须一致，对位稍偏就会露底或卡顿。", usage: "昼夜切换、情绪变换、前后对照。", visual: "slats" },
  { id: 23, name: "拉动翻板", en: "Flip Flap", category: "平面互动类", difficulty: "★★★", principle: "拉条带动一组小翻板依次翻转，露出另一面内容。", key: "翻板轴线要平行，拉条孔位一致，先用白模调阻力。", usage: "步骤演示、变脸、知识翻牌、序列动画。", visual: "flip" },
  { id: 24, name: "光栅动画", en: "Scanimation", category: "平面互动类", difficulty: "★★★", principle: "条纹遮罩在分帧图上滑动，使不同帧依次出现。", key: "遮罩线距和画面帧距必须匹配，打印精度要求高。", usage: "奔跑、闪烁、眨眼、简单循环动画。", visual: "scan" },
  { id: 25, name: "瀑布翻", en: "Waterfall", category: "平面互动类", difficulty: "★★", principle: "拉动底条时，一叠卡片按固定间距依次翻开。", key: "每张卡铰链间距相等，拉条不宜太窄，锚定带要贴牢。", usage: "连续知识卡、生日祝福、步骤故事、记忆卡。", visual: "waterfall" },
  { id: 26, name: "滑槽滑块", en: "Slot Slider", category: "平面互动类", difficulty: "★★", principle: "滑块沿切开的槽移动，带动画面做直线或曲线运动。", key: "槽宽比滑块连接点略大，端点加止挡，避免拉出。", usage: "小车、星球轨道、角色走动、天气变化。", visual: "slider" },
  { id: 27, name: "隧道书", en: "Tunnel Book", category: "整书结构类", difficulty: "★★", principle: "多层开窗画框按间距排列，侧边用风琴折连接形成纵深。", key: "每层窗口要留足边距，前景不要堵住主视线。", usage: "森林小径、山谷、剧场、知识长廊。", visual: "tunnel" },
  { id: 28, name: "旋转木马书", en: "Carousel Book", category: "整书结构类", difficulty: "★★★", principle: "多页围成环状空间，打开后形成可站立的 360° 场景。", key: "每个跨页角度一致，封面需要系带或磁扣固定。", usage: "房间、城堡、游乐园、环形剧场。", visual: "carousel" },
  { id: 29, name: "风琴折（经折装）", en: "Accordion / Concertina", category: "整书结构类", difficulty: "★", principle: "长纸条连续山谷折，形成可展开的连续页面。", key: "折距统一，纸纹方向要顺，长幅作品需控制纸张厚度。", usage: "长卷、时间线、旅程故事、展陈小书。", visual: "accordion" },
  { id: 30, name: "皮筋弹跳体", en: "Rubber-Band Jumper", category: "整书结构类", difficulty: "★★", principle: "折叠体由皮筋蓄力，释放后自动弹开成形。", key: "皮筋张力不能过大，儿童作品要避免惊吓式弹跳。", usage: "惊喜卡、弹跳角色、礼物盒、互动玩具。", visual: "jumper" },
  { id: 31, name: "斜角折（不对称平行折）", en: "Asymmetric Parallel Fold", category: "90° 切折类", difficulty: "★★", principle: "改变平行折高度与进深比例，让弹起面形成不对称体量。", key: "剖面必须是平行四边形，对边相等，闭合路径要先验算。", usage: "高塔矮台对比、桌椅、错落台阶。", visual: "asym" },
  { id: 32, name: "弧线切折", en: "Curved-Cut Fold", category: "90° 切折类", difficulty: "★★", principle: "将平行折直切口改为曲线，折线仍保持与中折线平行。", key: "只改切线不改折线，曲线转弯处留足纸桥防撕裂。", usage: "太阳、拱门、云朵、人物剪影。", visual: "curve" },
  { id: 33, name: "开窗镂空折", en: "Window Cut-out Fold", category: "90° 切折类", difficulty: "★★", principle: "在弹起面或背页挖局部窗口，让视线穿过层与层。", key: "镂空边距离折线至少 4 mm，可背衬彩纸或透明片。", usage: "门窗、栏杆、灯笼、建筑立面。", visual: "window" },
  { id: 34, name: "0°折（贴合式）", en: "0° Origamic Architecture", category: "90° 切折类", difficulty: "★★★", principle: "沿轮廓切开后整片翻折贴回纸面，图形与镂空互为镜像。", key: "翻折轴即对称轴，正反颜色不同的纸效果更明显。", usage: "标志、文字、对称纹样、封面装饰。", visual: "zero" },
  { id: 35, name: "360°纸建筑", en: "360° Origamic Architecture", category: "90° 切折类", difficulty: "★★★★★", principle: "多片切折页共用书脊，整本向后翻转首尾相扣成完整立体。", key: "结构需要旋转对称，常用 4-8 片，封面要加固定方式。", usage: "球体、塔、花、星形摆件。", visual: "architecture360" },
  { id: 36, name: "M形折（双V折）", en: "M-Fold / Double V", category: "180° 贴片类", difficulty: "★★★", principle: "两组 V 折并排共用中间折峰，俯视呈 M 形。", key: "中间折峰落在书脊正上方，外侧两脚以书脊对称。", usage: "城墙、屏风、山脉、展开的书。", visual: "mfold" },
  { id: 37, name: "倒V折", en: "Reverse V-Fold", category: "180° 贴片类", difficulty: "★★", principle: "V 尖朝向读者、开口朝后，把凸出棱线迎面推出。", key: "粘贴线仍交于书脊一点，凸棱近读者，要检查合页越界。", usage: "船头、鸟喙、建筑转角、鼻子。", visual: "reverseV" },
  { id: 38, name: "菱形折（钻石折）", en: "Diamond Fold", category: "180° 贴片类", difficulty: "★★★", principle: "一正一反两个 V 折合围成菱形筒，闭合时沿对角压扁。", key: "菱形一条对角线落在书脊上，顶口可加盖或再立结构。", usage: "塔身、水晶、灯罩、烟囱。", visual: "diamond" },
  { id: 39, name: "平行四边形立片", en: "Parallelogram Upright", category: "180° 贴片类", difficulty: "★★", principle: "立片由跨书脊拉片牵住，四段构成可压平的四边形。", key: "满足立片脚距加立片高等于拉片脚距加拉片长。", usage: "侧向招牌、墙面、人物立牌。", visual: "parallelogram" },
  { id: 40, name: "斜面浮台", en: "Sloped Platform", category: "180° 贴片类", difficulty: "★★★", principle: "两侧立脚不等高，托起一块倾斜平台。", key: "两脚与台面仍按对边之和相等配平，跨书脊处压折痕。", usage: "滑梯、屋坡、山坡、倾斜甲板。", visual: "slope" },
  { id: 41, name: "多层浮台", en: "Stacked Platforms", category: "180° 贴片类", difficulty: "★★★★", principle: "在浮台之上再立更小浮台，层层架高。", key: "上层中折线与下层中折线对齐，逐层缩小，总高不要过大。", usage: "宝塔、蛋糕、楼阁、看台。", visual: "stacked" },
  { id: 42, name: "球体（插片球）", en: "Interlocking Sphere", category: "180° 贴片类", difficulty: "★★★★", principle: "多个圆片沿直径开槽互插成球，随开页由扁平撑开。", key: "槽宽等于纸厚，槽深为半径，只固定最外侧两片。", usage: "星球、气球、果实、头部。", visual: "sphere" },
  { id: 43, name: "圆锥", en: "Cone", category: "180° 贴片类", difficulty: "★★★", principle: "扇形卷成锥面，底边两处粘贴翼分贴两页。", key: "扇形圆心角越大锥越矮，闭合时需沿母线预压。", usage: "塔尖、帽子、火山、冰淇淋。", visual: "cone" },
  { id: 44, name: "扭转升起", en: "Twister", category: "180° 贴片类", difficulty: "★★★★★", principle: "斜臂把中央平台连到页面，开页时平台边升起边旋转。", key: "各臂等长且旋向一致，必须先做白模调角度。", usage: "风车、旋转舞台、绽放的花。", visual: "twister" },
  { id: 45, name: "X形撑", en: "X-Brace", category: "180° 贴片类", difficulty: "★★★", principle: "两片中部开槽互相穿插，开页时交叉撑起。", key: "槽开在两片中点，各切一半，交点位于书脊正上方。", usage: "剪刀、交叉的剑、支架、桥墩。", visual: "xbrace" },
  { id: 46, name: "开页自动拉条", en: "Page-Driven Strip", category: "180° 贴片类", difficulty: "★★★★", principle: "借开页动作直接拉动纸条，让隐藏部件同步移动。", key: "拉条路径要顺畅，避免跨越折线处卡住。", usage: "太阳升起、角色走出、自动揭示。", visual: "pageStrip" },
  { id: 47, name: "旋转溶景", en: "Rotary Dissolve", category: "平面互动类", difficulty: "★★★★★", principle: "转盘带动扇形图层错位，使两幅图旋转交替显现。", key: "扇区分割要精准，圆心偏一点都会影响变画。", usage: "四季循环、昼夜转换、表情变化。", visual: "rotary" },
  { id: 48, name: "滑动溶景", en: "Slide Dissolve", category: "平面互动类", difficulty: "★★★★", principle: "两组条纹图层通过横向滑动完成图像切换。", key: "条纹间距一致，滑动行程和窗口宽度要匹配。", usage: "前后对比、知识答案、场景变化。", visual: "slideDissolve" },
  { id: 49, name: "连杆联动", en: "Linkage", category: "平面互动类", difficulty: "★★★★", principle: "多个纸杆通过转轴连接，一个动作带动多个部件运动。", key: "转轴要有间隙，杆长比例决定运动轨迹。", usage: "机械教学、翅膀、人物动作。", visual: "linkage" },
  { id: 50, name: "拉线牵引", en: "String Pull", category: "平面互动类", difficulty: "★★★", principle: "细线连接活动部件，拉动后改变方向或远距离牵引。", key: "线孔要光滑，线长要预留，回弹需要另设结构。", usage: "远距离开门、升降旗帜、动物尾巴。", visual: "string" },
  { id: 51, name: "推拉伸缩", en: "Telescoping Slide", category: "平面互动类", difficulty: "★★★", principle: "多段滑片套叠，推拉时逐段伸出或收回。", key: "每段加止挡，纸条宽度递减，避免摩擦过大。", usage: "伸缩望远镜、长颈、道路延伸。", visual: "telescope" },
  { id: 52, name: "齿轮传动", en: "Gears", category: "平面互动类", difficulty: "★★★★", principle: "纸齿轮相互咬合，一个转动带动另一个反向转动。", key: "齿距要一致，中心固定但不可压死，纸厚会影响咬合。", usage: "机器、钟表、知识模型。", visual: "gears" },
  { id: 53, name: "莫尔条纹", en: "Moiré", category: "平面互动类", difficulty: "★★★", principle: "两层密集线纹相对移动，产生波纹或运动错觉。", key: "线距越细越依赖打印精度，儿童手作应放大线距。", usage: "水波、震动、幻觉纹理、科学演示。", visual: "moire" },
  { id: 54, name: "透光页", en: "Shine-Through Page", category: "平面互动类", difficulty: "★★", principle: "利用半透明纸或镂空，透光后显示隐藏图案。", key: "暗层与亮层要精准对位，文字避免太细。", usage: "灯笼、星空、秘密信息、节日卡。", visual: "shine" },
  { id: 55, name: "发声锯齿", en: "Sound Strip", category: "平面互动类", difficulty: "★★★", principle: "纸片滑过锯齿边缘时产生连续摩擦声。", key: "锯齿深浅均匀，滑片不宜太软。", usage: "动物叫声、机器声、节奏互动。", visual: "sound" },
  { id: 56, name: "旋风装（龙鳞装）", en: "Dragon-Scale Binding", category: "整书结构类", difficulty: "★★★★", principle: "多片页面按阶梯状粘接，翻动时像鳞片依次展开。", key: "每片错位距离一致，粘接线要窄而直。", usage: "长卷、诗词、时间线、传统书籍结构。", visual: "dragon" },
  { id: 57, name: "翻花书", en: "Flexagon", category: "整书结构类", difficulty: "★★★", principle: "纸带折成可翻转的多面结构，反复翻开露出不同面。", key: "折线角度要精准，装饰内容按面编号规划。", usage: "循环故事、数学玩具、情绪卡。", visual: "flexagon" },
  { id: 58, name: "雅各布天梯", en: "Jacob's Ladder", category: "整书结构类", difficulty: "★★★", principle: "卡片与带子交替穿粘，翻动时卡片像阶梯一样连续翻落。", key: "带子松紧要适中，卡片间距一致。", usage: "连续翻牌、记忆卡、魔术效果。", visual: "ladder" },
  { id: 59, name: "剧场书（层景盒）", en: "Theatre Book", category: "整书结构类", difficulty: "★★★", principle: "多层舞台框架按前中后景排列，形成盒式观看空间。", key: "侧边连接要等距，前景开窗不能挡住核心画面。", usage: "舞台、房间、博物馆、知识场景。", visual: "theatre" },
  { id: 60, name: "混搭翻翻书", en: "Mix-and-Match", category: "整书结构类", difficulty: "★", principle: "页面被分割为多条独立翻页，组合出不同图像或句子。", key: "分割线要统一，图像连接处预留对齐标记。", usage: "角色换装、句子组合、儿童认知卡。", visual: "mix" }
];

const els = {
  cardCount: document.getElementById("cardCount"),
  categoryFilter: document.getElementById("categoryFilter"),
  drawButton: document.getElementById("drawButton"),
  resetButton: document.getElementById("resetButton"),
  cardBack: document.getElementById("cardBack"),
  card: document.getElementById("mechanismCard"),
  visual: document.getElementById("mechanismVisual"),
  holdLayer: document.getElementById("holdLayer"),
  countdown: document.getElementById("countdown"),
  cardNumber: document.getElementById("cardNumber"),
  cardCategory: document.getElementById("cardCategory"),
  cardDifficulty: document.getElementById("cardDifficulty"),
  emptyState: document.getElementById("emptyState"),
  detailGrid: document.getElementById("detailGrid"),
  englishName: document.getElementById("englishName"),
  mechanismName: document.getElementById("mechanismName"),
  principle: document.getElementById("principle"),
  keyPoint: document.getElementById("keyPoint"),
  usage: document.getElementById("usage")
};

let currentId = null;
let timer = null;

els.cardCount.textContent = mechanisms.length;

function filteredDeck() {
  const value = els.categoryFilter.value;
  return value === "all" ? mechanisms : mechanisms.filter((item) => item.category === value);
}

function pickCard() {
  const deck = filteredDeck();
  if (deck.length === 1) return deck[0];
  let chosen = deck[Math.floor(Math.random() * deck.length)];
  while (chosen.id === currentId) {
    chosen = deck[Math.floor(Math.random() * deck.length)];
  }
  return chosen;
}

function drawCard() {
  const card = pickCard();
  currentId = card.id;
  clearInterval(timer);

  els.drawButton.disabled = true;
  els.emptyState.hidden = false;
  els.detailGrid.hidden = true;
  els.cardBack.hidden = true;
  els.card.hidden = false;
  els.card.classList.remove("drawn");
  els.card.classList.add("holding");
  void els.card.offsetWidth;
  els.card.classList.add("drawn");
  els.holdLayer.classList.remove("done");
  els.countdown.textContent = "5";

  els.cardNumber.textContent = String(card.id).padStart(2, "0");
  els.cardCategory.textContent = card.category;
  els.cardDifficulty.textContent = card.difficulty;
  els.visual.innerHTML = renderVisual(card);

  let seconds = 5;
  timer = setInterval(() => {
    seconds -= 1;
    els.countdown.textContent = String(seconds);
    if (seconds <= 0) {
      clearInterval(timer);
      revealDetails(card);
    }
  }, 1000);
}

function revealDetails(card) {
  els.holdLayer.classList.add("done");
  els.card.classList.remove("holding");
  els.emptyState.hidden = true;
  els.detailGrid.hidden = false;
  els.englishName.textContent = card.en;
  els.mechanismName.textContent = card.name;
  els.principle.textContent = card.principle;
  els.keyPoint.textContent = card.key;
  els.usage.textContent = card.usage;
  els.drawButton.disabled = false;
}

function resetView() {
  clearInterval(timer);
  els.drawButton.disabled = false;
  els.card.classList.remove("holding");
  els.cardBack.hidden = false;
  els.card.hidden = true;
  els.emptyState.hidden = false;
  els.detailGrid.hidden = true;
}

els.drawButton.addEventListener("click", drawCard);
els.resetButton.addEventListener("click", resetView);
els.categoryFilter.addEventListener("change", () => {
  currentId = null;
});

function renderVisual(card) {
  const imagePath = `./images/${String(card.id).padStart(2, "0")}.png`;
  return `<img class="mechanism-image" src="${imagePath}" alt="${card.name}机关原图" onerror="this.outerHTML = renderFallbackVisual(${card.id})">`;
}

function renderFallbackVisual(cardId) {
  const card = mechanisms.find((item) => item.id === cardId) || mechanisms[0];
  const palette = colorFor(card.category);
  const type = card.visual;
  const base = `
    <svg viewBox="0 0 520 520" role="img" aria-label="${card.name}结构示意">
      <rect x="0" y="0" width="520" height="520" fill="#fbfaf7"/>
      <path d="M80 380 L260 315 L440 380" fill="none" stroke="${palette.line}" stroke-width="3"/>
      <path d="M260 120 L260 420" fill="none" stroke="#c8ccd4" stroke-width="3" stroke-dasharray="8 8"/>
      <text x="58" y="62" fill="${palette.main}" font-size="26" font-weight="700">${String(card.id).padStart(2, "0")} ${card.name}</text>
      <text x="58" y="96" fill="#697586" font-size="16">${card.en}</text>
      ${shapeFor(type, palette)}
    </svg>`;
  return base;
}

function colorFor(category) {
  if (category.includes("90")) return { main: "#2f7dd1", fill: "#d8eafe", line: "#2f7dd1", accent: "#df6b57" };
  if (category.includes("180")) return { main: "#167c80", fill: "#d9f1ef", line: "#167c80", accent: "#d8982b" };
  if (category.includes("互动")) return { main: "#6957a8", fill: "#ebe5fb", line: "#6957a8", accent: "#df6b57" };
  return { main: "#7a5b22", fill: "#f4e2bd", line: "#7a5b22", accent: "#167c80" };
}

function shapeFor(type, p) {
  const common = {
    page: `<path d="M90 390 L260 330 L430 390 L260 448 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="4"/>`,
    tabs: `<path d="M205 350 L230 335 L230 392 L205 405 Z" fill="${p.accent}" opacity=".7"/><path d="M290 335 L315 350 L315 405 L290 392 Z" fill="${p.accent}" opacity=".7"/>`
  };

  const map = {
    parallel: `${common.page}<path d="M182 250 L338 250 L338 340 L182 340 Z" fill="#fff" stroke="${p.line}" stroke-width="5"/><path d="M182 250 L222 220 L378 220 L338 250 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`,
    stairs: `${common.page}<path d="M160 335 L210 335 L210 295 L260 295 L260 255 L310 255 L310 215 L360 215" fill="none" stroke="${p.line}" stroke-width="12" stroke-linejoin="round"/>`,
    beak: `${common.page}<path d="M260 260 L165 210 L230 315 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 260 L355 210 L290 315 Z" fill="#fff" stroke="${p.line}" stroke-width="5"/>`,
    nestedSteps: `${common.page}<path d="M160 340 H360 V300 H315 V265 H280 V235 H245 V265 H205 V300 H160 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`,
    vfold: `${common.page}<path d="M260 170 L165 365 L260 315 L355 365 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 170 L260 315" stroke="${p.accent}" stroke-width="4" stroke-dasharray="8 8"/>`,
    tent: `${common.page}<path d="M145 370 L260 190 L375 370 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 190 V370" stroke="${p.accent}" stroke-width="4"/>`,
    platform: `${common.page}<path d="M155 300 L365 300 L330 235 L190 235 Z" fill="#fff" stroke="${p.line}" stroke-width="5"/><path d="M190 235 V350 M330 235 V350 M260 235 V335" stroke="${p.accent}" stroke-width="5"/>`,
    cube: `${common.page}<path d="M190 220 H330 V360 H190 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M190 220 L235 175 H375 L330 220 Z" fill="#fff" stroke="${p.line}" stroke-width="5"/><path d="M330 220 L375 175 V315 L330 360 Z" fill="#edf6f6" stroke="${p.line}" stroke-width="5"/>`,
    cylinder: `${common.page}<ellipse cx="260" cy="205" rx="78" ry="28" fill="#fff" stroke="${p.line}" stroke-width="5"/><path d="M182 205 V340 C182 378 338 378 338 340 V205" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><ellipse cx="260" cy="340" rx="78" ry="28" fill="none" stroke="${p.line}" stroke-width="5"/>`,
    pyramid: `${common.page}<path d="M260 170 L155 360 H365 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 170 L260 360" stroke="${p.accent}" stroke-width="4"/><path d="M260 170 L365 360" stroke="${p.line}" stroke-width="3"/>`,
    arch: `${common.page}<path d="M150 360 C175 185 345 185 370 360" fill="none" stroke="${p.line}" stroke-width="18" stroke-linecap="round"/>`,
    spiral: `${common.page}<path d="M260 285 C330 285 330 190 260 190 C175 190 165 340 260 350 C380 362 405 150 260 135" fill="none" stroke="${p.line}" stroke-width="7" stroke-linecap="round"/>`,
    sliceform: `${common.page}<path d="M160 350 C180 175 340 175 360 350" fill="none" stroke="${p.line}" stroke-width="5"/><path d="M190 350 C205 210 315 210 330 350 M225 350 C235 250 285 250 295 350 M150 285 H370 M170 235 H350" stroke="${p.accent}" stroke-width="4"/>`,
    honeycomb: `${common.page}<g fill="none" stroke="${p.line}" stroke-width="4">${Array.from({ length: 6 }, (_, i) => `<path d="M${170 + i * 30} 230 C${145 + i * 30} 290 ${145 + i * 30} 340 ${170 + i * 30} 375"/>`).join("")}</g>`,
    scissor: `${common.page}<path d="M145 350 L220 235 L295 350 L370 235 M145 235 L220 350 L295 235 L370 350" stroke="${p.line}" stroke-width="6" fill="none"/><circle cx="220" cy="292" r="8" fill="${p.accent}"/><circle cx="295" cy="292" r="8" fill="${p.accent}"/>`,
    nestedV: `${common.page}<path d="M170 360 L220 210 L260 330 L300 210 L350 360" fill="none" stroke="${p.line}" stroke-width="6"/><path d="M205 360 L245 250 L285 360" fill="none" stroke="${p.accent}" stroke-width="5"/>`,
    arm: `${common.page}<circle cx="245" cy="315" r="12" fill="${p.accent}"/><path d="M245 315 L360 230" stroke="${p.line}" stroke-width="12" stroke-linecap="round"/><circle cx="360" cy="230" r="18" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`,
    flap: `${common.page}<path d="M180 220 H340 V350 H180 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M180 220 L240 175 H400 V305 L340 350 V220 Z" fill="#fff" stroke="${p.accent}" stroke-width="5"/>`,
    pulltab: `${common.page}<path d="M155 250 H360 V335 H155 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M230 292 H420" stroke="${p.accent}" stroke-width="18" stroke-linecap="round"/><path d="M395 270 L430 292 L395 314" fill="${p.accent}"/>`,
    wheel: `${common.page}<circle cx="260" cy="285" r="105" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><circle cx="260" cy="285" r="12" fill="${p.accent}"/><path d="M260 285 L345 225 A105 105 0 0 1 360 345 Z" fill="#fff" stroke="${p.line}" stroke-width="4"/>`,
    lever: `${common.page}<circle cx="260" cy="310" r="13" fill="${p.accent}"/><path d="M165 350 L260 310 L365 220" stroke="${p.line}" stroke-width="10" stroke-linecap="round"/>`,
    slats: `${common.page}<g>${Array.from({ length: 8 }, (_, i) => `<rect x="${170 + i * 22}" y="210" width="11" height="150" fill="${i % 2 ? p.fill : "#fff"}" stroke="${p.line}" stroke-width="2"/>`).join("")}</g>`,
    flip: `${common.page}<g>${Array.from({ length: 5 }, (_, i) => `<path d="M170 ${205 + i * 28} H350 L330 ${230 + i * 28} H150 Z" fill="${i % 2 ? p.fill : "#fff"}" stroke="${p.line}" stroke-width="3"/>`).join("")}</g>`,
    scan: `${common.page}<rect x="165" y="210" width="190" height="150" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><g stroke="#fff" stroke-width="7">${Array.from({ length: 10 }, (_, i) => `<line x1="${170 + i * 18}" y1="215" x2="${170 + i * 18}" y2="355"/>`).join("")}</g>`,
    waterfall: `${common.page}<g>${Array.from({ length: 5 }, (_, i) => `<rect x="${165 + i * 18}" y="${205 + i * 22}" width="150" height="62" fill="${i % 2 ? p.fill : "#fff"}" stroke="${p.line}" stroke-width="4"/>`).join("")}</g><path d="M260 335 V410" stroke="${p.accent}" stroke-width="14"/>`,
    slider: `${common.page}<path d="M150 285 H370" stroke="${p.line}" stroke-width="20" stroke-linecap="round"/><circle cx="245" cy="285" r="35" fill="${p.fill}" stroke="${p.accent}" stroke-width="5"/>`,
    tunnel: `<path d="M85 400 H435 V170 H85 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M130 370 H390 V205 H130 Z M175 340 H345 V240 H175 Z M220 315 H300 V265 H220 Z" fill="none" stroke="${p.accent}" stroke-width="5"/>`,
    carousel: `${common.page}<path d="M150 230 L260 175 L370 230 V355 L260 405 L150 355 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 175 V405 M150 230 L260 285 L370 230" stroke="${p.accent}" stroke-width="4"/>`,
    accordion: `<path d="M90 360 L140 250 L190 360 L240 250 L290 360 L340 250 L390 360" fill="none" stroke="${p.line}" stroke-width="7" stroke-linejoin="round"/>`,
    jumper: `${common.page}<path d="M185 355 L260 205 L335 355 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M205 335 C250 375 300 375 335 330" stroke="${p.accent}" stroke-width="5" fill="none"/>`,
    asym: `${common.page}<path d="M175 340 L320 305 L350 220 L205 255 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`,
    curve: `${common.page}<path d="M160 350 C180 230 340 230 360 350" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`,
    window: `${common.page}<path d="M170 220 H350 V360 H170 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M215 260 H305 V330 H215 Z" fill="#fff" stroke="${p.accent}" stroke-width="5"/>`,
    zero: `<path d="M160 330 C200 210 320 210 360 330 C300 300 220 300 160 330 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 210 V365" stroke="${p.accent}" stroke-width="4" stroke-dasharray="8 8"/>`,
    architecture360: `<path d="M260 155 L370 245 L330 380 H190 L150 245 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 155 V395 M150 245 H370 M190 380 L330 245 M330 380 L190 245" stroke="${p.accent}" stroke-width="4"/>`,
    mfold: `${common.page}<path d="M150 360 L205 210 L260 340 L315 210 L370 360" fill="none" stroke="${p.line}" stroke-width="8" stroke-linejoin="round"/>`,
    reverseV: `${common.page}<path d="M160 230 L260 370 L360 230" fill="none" stroke="${p.line}" stroke-width="8" stroke-linejoin="round"/>`,
    diamond: `${common.page}<path d="M260 170 L360 270 L260 385 L160 270 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M160 270 H360 M260 170 V385" stroke="${p.accent}" stroke-width="4"/>`,
    parallelogram: `${common.page}<path d="M190 350 L230 220 H345 L305 350 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`,
    slope: `${common.page}<path d="M160 335 L365 285 L335 225 L190 250 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M190 250 V360 M335 225 V335" stroke="${p.accent}" stroke-width="5"/>`,
    stacked: `${common.page}<rect x="170" y="310" width="180" height="55" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><rect x="205" y="250" width="110" height="50" fill="#fff" stroke="${p.line}" stroke-width="5"/><rect x="232" y="205" width="56" height="38" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`,
    sphere: `${common.page}<circle cx="260" cy="285" r="100" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M160 285 H360 M260 185 V385 M190 215 C250 270 250 300 190 355 M330 215 C270 270 270 300 330 355" stroke="${p.accent}" stroke-width="4" fill="none"/>`,
    cone: `${common.page}<path d="M260 175 L165 365 H355 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><ellipse cx="260" cy="365" rx="95" ry="24" fill="none" stroke="${p.accent}" stroke-width="5"/>`,
    twister: `${common.page}<path d="M205 215 L345 255 L315 365 L175 325 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M205 215 L160 350 M345 255 L370 360 M315 365 L260 410 M175 325 L145 245" stroke="${p.accent}" stroke-width="5"/>`,
    xbrace: `${common.page}<path d="M170 220 L350 370 M350 220 L170 370" stroke="${p.line}" stroke-width="12" stroke-linecap="round"/><circle cx="260" cy="295" r="13" fill="${p.accent}"/>`,
    pageStrip: `${common.page}<path d="M150 330 H370" stroke="${p.accent}" stroke-width="16"/><path d="M260 330 L320 230" stroke="${p.line}" stroke-width="8"/><circle cx="320" cy="230" r="28" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`,
    rotary: `${common.page}<circle cx="260" cy="285" r="95" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 285 L260 190 A95 95 0 0 1 342 332 Z" fill="#fff" stroke="${p.accent}" stroke-width="5"/>`,
    slideDissolve: `${common.page}<rect x="160" y="230" width="200" height="115" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><g stroke="#fff" stroke-width="12">${Array.from({ length: 7 }, (_, i) => `<line x1="${170 + i * 30}" y1="230" x2="${170 + i * 30}" y2="345"/>`).join("")}</g><path d="M190 365 H370" stroke="${p.accent}" stroke-width="8"/>`,
    linkage: `${common.page}<path d="M165 340 L235 250 L320 320 L375 225" stroke="${p.line}" stroke-width="8" fill="none"/><g fill="${p.accent}"><circle cx="165" cy="340" r="10"/><circle cx="235" cy="250" r="10"/><circle cx="320" cy="320" r="10"/><circle cx="375" cy="225" r="10"/></g>`,
    string: `${common.page}<path d="M170 350 C230 180 300 420 370 215" stroke="${p.line}" stroke-width="4" fill="none" stroke-dasharray="8 8"/><circle cx="370" cy="215" r="28" fill="${p.fill}" stroke="${p.accent}" stroke-width="5"/>`,
    telescope: `${common.page}<rect x="155" y="280" width="110" height="48" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><rect x="250" y="270" width="95" height="48" fill="#fff" stroke="${p.line}" stroke-width="5"/><rect x="330" y="260" width="58" height="48" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`,
    gears: `${common.page}<circle cx="220" cy="285" r="60" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><circle cx="315" cy="285" r="48" fill="#fff" stroke="${p.line}" stroke-width="5"/><path d="M220 225 V345 M160 285 H280 M315 237 V333 M267 285 H363" stroke="${p.accent}" stroke-width="5"/>`,
    moire: `${common.page}<rect x="165" y="220" width="190" height="135" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><g stroke="#fff" stroke-width="3">${Array.from({ length: 13 }, (_, i) => `<path d="M${170 + i * 15} 225 C${205 + i * 5} 265 ${185 + i * 5} 315 ${170 + i * 15} 350"/>`).join("")}</g>`,
    shine: `${common.page}<path d="M260 185 L290 255 L365 265 L310 315 L325 385 L260 345 L195 385 L210 315 L155 265 L230 255 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 220 V350 M190 285 H330" stroke="${p.accent}" stroke-width="4"/>`,
    sound: `${common.page}<path d="M150 330 H370" stroke="${p.line}" stroke-width="12"/><path d="M170 285 L185 315 L200 285 L215 315 L230 285 L245 315 L260 285 L275 315 L290 285 L305 315 L320 285" fill="none" stroke="${p.accent}" stroke-width="5"/>`,
    dragon: `${common.page}<g>${Array.from({ length: 7 }, (_, i) => `<path d="M${150 + i * 25} ${220 + i * 14} H${305 + i * 12} V${255 + i * 14} H${150 + i * 25} Z" fill="${i % 2 ? "#fff" : p.fill}" stroke="${p.line}" stroke-width="3"/>`).join("")}</g>`,
    flexagon: `${common.page}<path d="M260 185 L345 235 V335 L260 385 L175 335 V235 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M260 185 V385 M175 235 L345 335 M345 235 L175 335" stroke="${p.accent}" stroke-width="4"/>`,
    ladder: `${common.page}<g>${Array.from({ length: 5 }, (_, i) => `<rect x="${190 + i * 18}" y="${205 + i * 30}" width="140" height="28" fill="${i % 2 ? "#fff" : p.fill}" stroke="${p.line}" stroke-width="3" transform="rotate(${i % 2 ? 5 : -5} ${260} ${220 + i * 30})"/>`).join("")}</g>`,
    theatre: `<path d="M100 395 H420 V155 H100 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/><path d="M140 360 H380 V195 H140 Z M180 325 H340 V235 H180 Z M220 300 H300 V260 H220 Z" fill="#fff" stroke="${p.accent}" stroke-width="5"/>`,
    mix: `${common.page}<g>${Array.from({ length: 3 }, (_, i) => `<rect x="155" y="${205 + i * 55}" width="210" height="45" fill="${i % 2 ? "#fff" : p.fill}" stroke="${p.line}" stroke-width="4"/><path d="M225 ${205 + i * 55} V${250 + i * 55} M295 ${205 + i * 55} V${250 + i * 55}" stroke="${p.accent}" stroke-width="3"/>`).join("")}</g>`
  };

  return map[type] || `${common.page}<circle cx="260" cy="280" r="92" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>`;
}
