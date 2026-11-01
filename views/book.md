---
layout: page
---

```vue {"component":true,"name":"MediaLog"}
<script setup lang="ts">
import { computed, ref } from 'vue'

interface IMediaRecord {
  title: string
  date: string
  remark?: string
  noteUrl?: string
}

type TMediaType = 'book' | 'movie'

const books: IMediaRecord[] = [
  { title: '毫无意义的工作', date: '2024-08-07', remark: '在<a href="https://www.bilibili.com/video/BV1b1421k7CJ/">B站</a>看到一位挂壁老哥的日常，评论区有人推荐了这本书' },
  { title: '3000万词汇：父母语言的力量', date: '2024-05-20', remark: 'Tune in、Talk more、Take turns' },
  { title: '程序员的数学', date: '2024-03-17', noteUrl: './article/读书笔记/《程序员的数学》读书笔记' },
  { title: '哲学家们都干了些什么？', date: '2024-01-03', remark: '按时间顺序介绍了历史上有名的哲学家和他们的思想，文风与《上帝掷骰吗》比较相似' },
  { title: '这就是ChatGPT', date: '2023-11-29', noteUrl: './article/读书笔记/《这就是ChatGPT》读书笔记' },
  { title: '深入理解SVG', date: '2023-07-29', noteUrl: './article/读书笔记/《深入理解SVG》读书笔记' },
  { title: '游戏开发中的物理和数学', date: '2021-10-24' },
  { title: '游戏人工智能编程案例精粹', date: '2021-08-09' },
  { title: '动物农场', date: '2021-02-18', remark: '有点意思' },
  { title: '面向对象是怎样工作的（第2版）', date: '2021-02-18', noteUrl: './article/读书笔记/《面向对象是怎样工作的》读书笔记' },
  { title: '编程的原则：改善代码质量的101个方法', date: '2020-12-15' },
  { title: '代码之外的功夫：程序员精进之路', date: '2020-11-30' },
  { title: '人人都懂设计模式：从生活中领悟设计模式（Python实现）', date: '2020-11-20' },
  { title: '上帝掷骰吗？量子物理史话', date: '2020-10-28', remark: '哪怕对量子物理一窍不通，也能在这本书中感受到它的乐趣' },
  { title: '精通Spring：Java Web开发与Spring Boot高级功能', date: '2020-09-12' },
  { title: '剑指Offer', date: '2020-05-30' },
  { title: '如何阅读一本书', date: '2020-04-07' },
  { title: '自控力', date: '2019-12-28' },
  { title: '成功动机与目标', date: '2019-12-27' },
  { title: '了不起的我', date: '2019-12-26' },
  { title: '你的降落伞是什么颜色', date: '2019-10-17' },
  { title: '人类简史：从动物到上帝', date: '2019-10-05' },
  { title: '漫画算法：小灰的算法之旅', date: '2019-06-18' },
  { title: '游戏剧本怎么写', date: '2018-12-20' },
  { title: 'React设计模式与最佳实践', date: '2018-11-09', noteUrl: './article/读书笔记/《React设计模式与最佳实践》读书笔记' },
  { title: 'Web安全开发指南', date: '2018-10-11' },
  { title: '算法图解', date: '2018-09-20' },
  { title: '代码之外的功夫：程序员精进之路', date: '2018-08-11' },
  { title: 'JavaScript测试驱动开发', date: '2018-06-05', noteUrl: './article/读书笔记/《JavaScript测试驱动开发》读书笔记（上）' },
  { title: '牧羊少年奇幻之旅', date: '2018-05-19', remark: '如果你想要做什么事情，那就开始吧，即使最后回到了起点，你也会收获额外的东西' },
  { title: '松本行宏的程序世界', date: '2018-01-20' },
  { title: 'Git团队协作', date: '2018-01-06' },
  { title: '网络是怎样连接的', date: '2017-12-23' },
  { title: 'SEO教程：搜索引擎优化入门与进阶', date: '2017-12-01' },
  { title: '深入浅出 Node.js', date: '2017-11-20' },
  { title: '同构JavaScript应用开发', date: '2017-11-11', noteUrl: './article/读书笔记/《同构JavaScript应用开发》读书笔记' },
  { title: '计算机是怎样跑起来的', date: '2017-10-23' },
  { title: '前端架构设计', date: '2017-10-07' },
  { title: 'web前端黑客技术揭秘', date: '2017-09-20', noteUrl: './article/读书笔记/《web前端黑客技术揭秘》读书笔记' },
  { title: 'SEO的艺术', date: '2017-09-10' },
  { title: '人月神话', date: '2017-08-21' },
  { title: '现代操作系统', date: '2017-08-13', noteUrl: './article/读书笔记/《现代操作系统》读书笔记' },
  { title: '编写可维护的JavaScript代码', date: '2017-08-11' },
  { title: 'Head Frist设计模式', date: '2017-07-28' },
  { title: 'Android编程权威指南', date: '2017-07-13' },
  { title: '第一行代码 Android', date: '2017-06-22' },
  { title: 'Head Frist Java第二版', date: '2017-05-30' },
  { title: 'HTML5秘籍', date: '2017-05-18' },
  { title: 'Chrome扩展及应用开发', date: '2017-04-30' },
  { title: '程序员的数学思维修炼', date: '2017-04-15' },
  { title: '你不知道的JavaScript（中卷）', date: '2017-03-29', remark: '前端开发者必读系列' },
  { title: '你不知道的JavaScript（上卷）', date: '2017-03-13', remark: '前端开发者必读系列' },
  { title: '图解HTTP', date: '2017-03-12' },
  { title: 'JavaScript设计模式与开发实践', date: '2017-03-08' },
  { title: 'ES6标准入门', date: '2017-03-03' },
  { title: 'HTTP权威指南', date: '2017-02-25' },
  { title: '编码', date: '2017-02-08' },
  { title: '计算机是怎样跑起来的', date: '2017-02-01' },
  { title: '正则表达式必知必会', date: '2017-01-24' },
  { title: 'Modern PHP', date: '2017-01-06' },
  { title: '深入PHP面向对象、模式与实践', date: '2017-01-02' },
  { title: '正则指引', date: '2016-12-06', noteUrl: './article/读书笔记/《正则指引》读书笔记' },
  { title: '计算机网络 自顶向下方法', date: '2016-11-30', noteUrl: './article/读书笔记/《计算机网络-自顶向下的方法》读书笔记' },
  { title: 'JavaScript语言精粹', date: '2016-11-22' },
  { title: '像程序员一样思考', date: '2016-11-17' },
  { title: 'Sass与Compass实战', date: '2016-09-14', noteUrl: './article/读书笔记/《Sass与Compass实战》读书笔记' },
  { title: 'MySQL必知必会', date: '2016-09-12', noteUrl: './article/读书笔记/《MySQL必知必会》读书笔记' },
  { title: '计算机科学导论', date: '2016-09-03', noteUrl: './article/读书笔记/《计算机科学导论》读书笔记' },
  { title: 'CSS权威指南', date: '2016-08-23', remark: '一本关于CSS技术细节的好书', noteUrl: './article/读书笔记/《CSS权威指南》读书笔记' },
  { title: '数据结构与算法 JavaScript描述', date: '2016-08-17' },
  { title: 'JavaScript权威指南', date: '2016-06-23', noteUrl: './article/读书笔记/《JavaScript权威指南》读书笔记' },
  { title: 'JavaScript高级程序设计', date: '2016-06-03' },
  { title: 'JavaScript DOM编程艺术', date: '2016-05-27' },
  { title: 'Head First HTML与CSS、XHTML', date: '2016-05-12' },
  { title: 'HTML+CSS 网页设计布局 从入门到精通', date: '2016-05-09' },
  { title: '高质量程序设计指南 C++/C语言', date: '2016-04-30' },
  { title: '啊哈！算法', date: '2016-04-19' },
  { title: '数据结构与算法分析 C语言描述', date: '2016-04-09' },
  { title: 'Lua程序设计', date: '2016-04-04' },
  { title: 'C++ Primer', date: '2016-03-19' },
  { title: '计算机组成原理', date: '2016-03-04' },
  { title: 'C++ Primer Plus', date: '2016-02-27' },
  { title: 'C Primer Plus', date: '2016-02-14' },
]

const movies: IMediaRecord[] = [
  { title: '八仙', date: '2026-08', remark: '中规中矩吧，动漫特效越来越好了，但是剧情感觉一般，二郎神居然是反派' },
  { title: '给阿嬷的情书', date: '2026-05', remark: '很久没有看过这种好哭的电影了~' },
  { title: '飞驰人生3', date: '2026', remark: '还可以吧' },
  { title: '镖人：风起大漠', date: '2026', remark: '还可以' },
  { title: '哪吒之魔童闹海', date: '2025-01', remark: '这个也是上映就去看了，过年图个热闹，没想到这个最后票房也太吓人' },
  { title: '唐探1900', date: '2025', remark: '还行吧' },
  { title: '浪浪山小妖怪', date: '2025', remark: '还可以吧，本来想去看的，一通营销争论比较大，后面就忘记去了' },
  { title: '长安的荔枝', date: '2025', remark: '长安打工人，还行吧' },
  { title: '疯狂动物城2', date: '2025', remark: '赠送的电影票，去看了下，中规中矩也还行吧' },
  { title: '热辣滚烫', date: '2024-02', remark: '第一次在电影院看的要睡着了，剧情硬伤太多，加上微博上营销比较严重，没啥好印象' },
  { title: '飞驰人生2', date: '2024', remark: '还行' },
  { title: '抓娃娃', date: '2024', remark: '还行吧，但是感觉开心麻花的笑点也就这些了' },
  { title: '第二十条', date: '2024', remark: '还可以' },
  { title: '志愿军：存亡之战', date: '2024', remark: '还行' },
  { title: '哥斯拉大战金刚2：帝国崛起', date: '2024', remark: '还可以' },
  { title: '异形：夺命舰', date: '2024' },
  { title: '沙丘2', date: '2024', remark: '看了一部分，现在都还没看完，喜欢不起来啊' },
  { title: '流浪地球2', date: '2023-01', remark: '好看，神！' },
  { title: '满江红', date: '2023-01', remark: '后面再电脑上看的，大型剧本杀，还行吧，就是这个阵容跟这个场景搭配有点奇怪' },
  { title: '孤注一掷', date: '2023', remark: '晚上去电影院看的，跟主角相同职业，有代入感' },
  { title: '消失的她', date: '2023', remark: '还挺好看的' },
  { title: '八角笼中', date: '2023', remark: '还可以' },
  { title: '长安三万里', date: '2023', remark: '可惜没去电脑上看，这个还挺好的，用一个独特的视角来展示了李白的一生' },
  { title: '坚如磐石', date: '2023', remark: '也还可以' },
  { title: '年会不能停！', date: '2023', remark: '挺好看，欠一张电影票' },
  { title: '志愿军：雄兵出击', date: '2023', remark: '还行' },
  { title: '巨齿鲨2', date: '2023', remark: '还行' },
  { title: '三大队', date: '2023', remark: '还行' },
  { title: '速度与激情10', date: '2023', remark: '还行' },
  { title: '奥本海默', date: '2023', remark: '挺好看的' },
  { title: '独行月球', date: '2022-07', remark: '团建的时候看的，作为喜剧我感觉一般' },
  { title: '这个杀手不太冷静', date: '2022-02', remark: '还可以吧，魏翔居然当主剪' },
  { title: '长津湖之水门桥', date: '2022', remark: '还可以' },
  { title: '人生大事', date: '2022', remark: '这个还挺好看的' },
  { title: '万里归途', date: '2022', remark: '还可以' },
  { title: '明日战记', date: '2022', remark: '科幻片，还可以' },
  { title: '狙击手', date: '2022', remark: '这个也还行' },
  { title: '新神榜：杨戬', date: '2022', remark: '都是因为哪吒去的，但是感觉不太行啊，这些动漫的剧情都很奇怪' },
  { title: '阿凡达：水之道', date: '2022', remark: '只能说除了画面，其他的都拉完了' },
  { title: '侏罗纪世界3', date: '2022', remark: '还行' },
  { title: '长津湖', date: '2021', remark: '感觉还挺好看的' },
  { title: '你好，李焕英', date: '2021', remark: '拍的不错，挺好的' },
  { title: '唐人街探案3', date: '2021', remark: '还可以' },
  { title: '我和我的父辈', date: '2021', remark: '《如愿》是神曲啊' },
  { title: '误杀2', date: '2021', remark: '感觉跟第一步除了名字一样，好像差别不大' },
  { title: '刺杀小说家', date: '2021', remark: '电视上看的，之前感觉剧情有点怪，还行吧' },
  { title: '扬名立万', date: '2021', remark: '万合天宜几个人演的还挺好的' },
  { title: '速度与激情9', date: '2021', remark: '还行' },
  { title: '哥斯拉大战金刚', date: '2021', remark: '还行' },
  { title: '007：无暇赴死', date: '2021', remark: '还行' },
  { title: '沙丘', date: '2021', remark: '没看原著，我以为是硬科幻，结果是太空宫廷剧' },
  { title: '八佰', date: '2020', remark: '电脑上看的，还可以' },
  { title: '我和我的家乡', date: '2020', remark: '还可以' },
  { title: '姜子牙', date: '2020', remark: '罗哥来成都，一起去电影院看的，特效可以，感觉剧情不太行' },
  { title: '金刚川', date: '2020', remark: '这个拍摄手法感觉有点怪' },
  { title: '哪吒之魔童降世', date: '2019-07', remark: '上映第二天去看的，没想到票房这么火' },
  { title: '流浪地球', date: '2019-02', remark: '期待了很久，过完年回来，踩单车去环宇坊看的，很震撼，非常好看' },
  { title: '我和我的祖国', date: '2019', remark: '好' },
  { title: '中国机长', date: '2019', remark: '真实新闻更厉害，电影还可以' },
  { title: '疯狂的外星人', date: '2019', remark: '还挺搞笑的' },
  { title: '飞驰人生', date: '2019', remark: '还行吧，赛车电影我不太能 get 到燃点' },
  { title: '误杀', date: '2019', remark: '有点意思，后面又去看了原版的，感觉更有意思' },
  { title: '攀登者', date: '2019', remark: '去电影院看的，还可以把' },
  { title: '复仇者联盟4：终局之战', date: '2019', remark: '还可以，不过我不是漫威的分析，只是后面没啥好的漫威电影看了貌似' },
  { title: '速度与激情：特别行动', date: '2019', remark: '还行吧' },
  { title: '蜘蛛侠：英雄远征', date: '2019', remark: '不错' },
  { title: '哥斯拉2：怪兽之王', date: '2019', remark: '还可以' },
  { title: '阿丽塔：战斗天使', date: '2019', remark: '画面还行，感觉剧情有点弱' },
  { title: '冰雪奇缘2', date: '2019', remark: '一如既往的水准' },
  { title: '红海行动', date: '2018', remark: '电脑上看的，这个感觉可以去电影院看' },
  { title: '唐人街探案2', date: '2018', remark: '电脑上看的，还行吧' },
  { title: '我不是药神', date: '2018', remark: '在银泰城看的，印象比较深刻' },
  { title: '西虹市首富', date: '2018', remark: '没有去电影院看，有点可惜，主题曲还挺洗脑' },
  { title: '一出好戏', date: '2018', remark: '感觉还是有点奇怪，黄渤当导演' },
  { title: '无双', date: '2018', remark: '这个挺好看的' },
  { title: '无名之辈', date: '2018', remark: '方言版无压力，挺有意思的' },
  { title: '复仇者联盟3：无限战争', date: '2018', remark: '现在忘记剧情讲啥了，还可以' },
  { title: '毒液：致命守护者', date: '2018', remark: '都是看看热闹，DC和漫威我现在还分不清' },
  { title: '海王', date: '2018', remark: '以为哥哥有鱼塘，没想哥哥是海王～' },
  { title: '侏罗纪世界2', date: '2018', remark: '第一次约会时去看的' },
  { title: '头号玩家', date: '2018', remark: '在四月份离开深圳前，跟小巫一起去看的，彩蛋爆炸，幸好我认识很多～' },
  { title: '碟中谍6：全面瓦解', date: '2018', remark: '在太古里旁边哪个影院看的，去吃了蛙然后去看了电影' },
]

const activeType = ref<TMediaType>('book')
const records = computed(() => activeType.value === 'book' ? books : movies)
const titleLabel = computed(() => activeType.value === 'book' ? '书名' : '电影名')
const dateLabel = computed(() => activeType.value === 'book' ? '阅读时间' : '观看时间')
</script>

<template>
  <section class="media-log">
    <div class="media-tabs" role="tablist" aria-label="记录类型">
      <button
        v-for="tab in [{ type: 'book', label: '书籍' }, { type: 'movie', label: '电影' }]"
        :key="tab.type"
        type="button"
        role="tab"
        :aria-selected="activeType === tab.type"
        :class="{ active: activeType === tab.type }"
        @click="activeType = tab.type as TMediaType"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="records.length" class="table-wrapper" role="tabpanel">
      <table>
        <thead>
          <tr>
            <th>{{ titleLabel }}</th>
            <th class="date-column">{{ dateLabel }}</th>
            <th>备注</th>
            <th class="note-column">笔记</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in records" :key="`${item.title}-${item.date}`">
            <td>{{ item.title }}</td>
            <td>{{ item.date }}</td>
            <td v-html="item.remark"></td>
            <td><a v-if="item.noteUrl" :href="item.noteUrl">读书笔记</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="empty" role="tabpanel">电影记录待补充。</p>
  </section>
</template>

<style scoped>
.media-tabs {
  display: flex;
  gap: 8px;
  margin: 24px 0 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.media-tabs button {
  position: relative;
  padding: 8px 16px;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 0;
  cursor: pointer;
}

.media-tabs button.active {
  color: var(--vp-c-brand-1);
}

.media-tabs button.active::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 2px;
  content: '';
  background: var(--vp-c-brand-1);
}

.table-wrapper {
  overflow-x: auto;
}

.table-wrapper table {
  display: table;
  width: 100%;
}

.date-column {
  width: 117px;
}

.note-column {
  width: 90px;
}

.empty {
  padding: 32px 0;
  color: var(--vp-c-text-2);
  text-align: center;
}
</style>
```
