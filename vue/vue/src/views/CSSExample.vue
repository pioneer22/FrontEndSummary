<template>
  <div>
    <pre>
      <h3>1. 文本超出部分省略号</h3>
      单行
      .xxx{
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }
      多行
      .xxx{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
      }

      <h3>2. 中英文自动换行</h3>
      word-break: break-all;
      只对英文起作用, 以字母作为换行依据 word-wrap: break-word;
      只对英文起作用, 以单词作为换行依据 white-sapce: pre-wrap;
      只对中文起作用, 强制换行 white-space: nowrap;
      强制不换行, 都起作用

      .xx{
          word-wrap: break-word;
          white-space: normal;
          word-break: break-all;
      }

      // 不换行
      .wrap{
          white-space: nowrap;
      }
      // 自动换行
      .wrap{
          word-wrap: break-word;
          word-break: normal;
      }
      // 强制换行
      .wrap{
          word-break: break-all;
      }

      <h3 class="shadow">3. 文字阴影</h3>
      text-shadow

      <h3>4. 设置placeholder的字体样式</h3>
      input::-webkit-input-placeholder,
      input::-moz-placeholder,
      input:-ms-input-placeholder,
      input:-moz-placeholder{
          color: red;
      }

      <h3>4. 解决IOS页面滑动卡顿</h3>
      body, html{
          -webkit-overflow-scrolling: touch;
      }

      <h3>5. 设置滚动条样式</h3>
      .xx::-webkit-scrollbar{
          // 滚动条整体样式
          width: 10px;
          height: 1px;
      }

      .xx::-webkit-scrollbar-thumb{
          // 滚动条里面的小方块
          border-radius: 10px;
          background-color: skyblue;
          background-image: -webkit-linear-gradient(
              45deg,
              rgba(255,255,255,0.2) 25%,
              transparent 25%,
              transparent 50%,
              rgba(255,255,255,0.2) 50%,
              rgba(255,255,255,0.2) 75%,
              transparent 75%,
              transparent

          );
      }

      .xx::-webkit-scrollbar-track{
          // 滚动条里面轨道
          box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #ededed;
          border-radius: 10px;
      }

      <h3>6. 实现隐藏滚动条同时又可以滚动</h3>
      .xx::-webkit-scrollbar{
         display: none; // 隐藏滚动条同时可以滚动, Chrome Safari
      }

      .xx{
          scroll-width: none; // firefox
          -ms-overflow-style: none; // IE 10+
          overflow-x: hidden;
          overflow-y: auto;
      }

      <h3>7. table 表格边框合并</h3>
      table,tr,td{
          border: 1px solid #666;
      }

      table{
          border-collapse: collapse;
      }
      <table>
          <tr><td>A</td><td>B</td><td>C</td></tr>
          <tr><td>D</td><td>E</td><td>F</td></tr>
      </table>

      nth-child(-n+3): 这个表示选择列表中的标签从0到3, 即小于3的标签。
      <h3>8. 移动端软键盘变为搜索方式</h3>
      要使软键盘上该键位的前往或确认文字变为搜索文字, 需要在input上加上type声明
      &lt;form action="#"&gt;
        &lt;input type="search" placeholder="请输入..." name="search" /&gt;
      &lt;/form&gt;

      需要一个form标签套起来, 并且设置action属性, 这样写完之后输入法的右下角就会自动变成搜索,
      使用了search类型后, 搜索框上会默认自带删除按钮。

      <h3>9. onerror处理图片异常</h3>
      使用onerror异常处理时, 若onerror的图片也出现问题, 则图片显示会陷入死循环, 所以要在赋值异常图片之后, 将地址置空
      &lt;img onerror="this.src='url;this.onerror=null'" /&gt;

      <div class="bg-img"></div>

      <h3 class="justify">10. CSS实现文本两端对齐</h3>
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        -moz-text-align-last: justify;
        -webkit-text-align-last: justify;

      <h3 class="vertical">11. 实现文字竖向排版</h3>
        pointer-events: none;
        cursor: default;

      <h3>12. 使元素鼠标事件失效</h3>
      <button class="btn" onclick="console.log('click btn')">BTN</button>

      <h3>13. 禁止用户选择</h3>
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      <h3>14. 页面动画出现闪烁问题</h3>
      Chrome 和 Safari, 使用CSS transform / animations 时可能会有页面闪烁的效果, 代码修复：
      .cube{
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;

          -webkit-perspective: 1000;
          perspective: 1000;
      }

      webkit内核浏览器另一个方法：
      .cube{
          -webkit-transform: translate3d(0,0,0);
          transform: translate3d(0,0,0);
      }

      消除 transition 闪屏
      .xx{
          -webkit-transform-style: preserve-3d;
          -webkit-backface-visibility: hidden;
          -webkit-perspective: 1000;
      }

      <h3>15. 字母大小写转换</h3>
      text-transform: uppercase; // 将所有字母变成大写
      text-transform: lowercase; // 将所有字母变成小写
      text-transform: capitalize; // 首字母大写
      font-variant: small-caps; // 将字体变成小型的大写字母

      <h3>16. 将一个容器设为透明</h3>
      .xx{
          filter: alpha(opacity=50);
          -moz-opacity: 0.5;
          -khtml-opacity: 0.5;
          opacity: 0.5;
      }

      <h3>16. 识别字符串里的'\n'并换行</h3>
      body{
          white-space: pre-line;
      }

      <h3>17. 移除a标签被点链接的边框</h3>
      a{
          outline: none; // 或者outline: 0;
          text-decoration: none;
      }

      <h3>18. CSS显示链接之后的URL</h3>
      <a href="//hupu.com" class="hupu">虎扑</a>

      <h3>19. select内容居中显示, 下拉内容右对齐</h3>
      <select name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
      </select>

        select{
            text-align: center;
            text-align-last: center;
        }

        select option{
            direction: rtl;
        }

        <h3>20. 实现宽高等比例自适应矩形</h3>
        <div class="scale">
            <div class="item">
                子元素容器
            </div>
        </div>

        <h3>21. transform的rotate属性在span标签下失效</h3>
        span{
            display: inline-block;
        }

        <h3 class="text_signature">22. 文字渐变效果实现</h3>

        <div class="text_shadow">好看的边框阴影</div>

        <div class="text_gradient">好看的背景渐变</div>

        <h3>22. 全屏背景图片的实现</h3>

        background-image: url(xx);
        width: 100%;
        height: 100vh;
        zoom: 1;
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
        background-position: center 0;

        <h3 class="text_solid">22. 实现立体字的效果</h3>

        <h3 class="stroke">23. 实现文字描边</h3>
        <div class="stroke1">实现文字描边</div>

        <h3>24. 元素透明度的实现</h3>
         opacity: 0.4;
         filter: alpha(opacity=40); // IE8及其更早的版本

         <h3>25. 解决1px边框变粗问题</h3>
         2倍屏, 1px的像素实际对应两个物理像素。

         height： 1px;
         transform: scaleY(0.5);

         <h3 class="vague_text">26. CSS实现文字模糊效果</h3>
         color: transparent;
         text-shadow: #111 0 0 5px;

         <h3>27. 通过滤镜让图标变灰</h3>
         <a href="" class="icon"><img src="../assets/logo.png" alt=""></a>

         <h3>28. 图片自适应</h3>
         图片比例不固定时, 想让图片自适应,
         背景图片一般使用background-size: cover,
         css3中可使用object-fit属性来解决图片被拉伸或者缩放问题。
         使用的前提条件: 图片的父级容器要有宽高。

         width: 100%;
         height: 100%;
         objece-fit: cover;
         <div class="fit-box"><img src="../assets/images/index/index.jpg" alt=""></div>
         <div class="fit-box fit-box2"><img src="../assets/images/index/index.jpg" alt=""></div>

         <h3>29. 解决vertical-align属性不生效</h3>
         生效需要满足条件:
         父元素设置line-height与height一致。或者将display属性设置为table-cell, 将块元素转化为单元格。
         作用对象: 子元素中的inline-block和inline元素。
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-weight: bold;
}

.shadow {
  text-shadow: 3px 3px 2px #010101;
}

tr > td {
  width: 200px;
}

table {
  table-layout: fixed;
}

/* table边框合并 start */
table,
tr,
td {
  border: 1px solid #666;
}

table {
  border-collapse: collapse;
}
/* end */
.bg-img {
  background: url("~@/assets/logo.png");
  background-size: 27px auto !important;

  height: 50px;
  background-repeat: no-repeat;
}

.justify {
  text-align: justify;
  text-justify: distribute-all-lines;
  text-align-last: justify;
  -moz-text-align-last: justify;
  -webkit-text-align-last: justify;
}

.vertical {
  height: 210px;
  line-height: 30px;
  text-align: justify;
  writing-mode: vertical-lr;
  writing-mode: tb-lr;

  word-wrap: break-word; // 英文时需要加上, 自动换行
}

.btn {
  pointer-events: none;
  cursor: default;
}

.hupu::after {
  content: "(" attr(href) ")";
}

select {
  text-align: center;
  text-align-last: center;
}

select option {
  direction: rtl;
}

.scale {
  width: 100%;
  padding-bottom: 30%;
  height: 0;
  position: relative;
}

.scale .item {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #499e56;
}

.text_signature {
  // -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, #ec2239, #40a4e2, #ea96f5);
  width: 320px;
}

.text_shadow {
  width: 300px;
  height: 200px;
  box-shadow: 0px 0px 13px 1px rgba(51, 51, 51, 0.1);
}

.text_gradient {
  width: 500px;
  height: 100px;
  background: linear-gradient(
      25deg,
      rgb(79, 107, 208),
      rgb(98, 141, 185),
      rgb(102, 175, 161),
      rgb(92, 210, 133)
    )
    rgb(182, 228, 253);
}

.text_solid {
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  line-height: 100px;
  text-transform: uppercase;
  position: relative;
  background-color: #333;
  color: #fff;
  text-shadow: 0px 1px 0px #c0c0c0, 0px 2px 0px #b0b0b0, 0px 3px 0px #a0a0a0,
    0px 4px 0px #909090, 0px 5px 10px rgba(0, 0, 0, 0.6);
}

.stroke {
  -webkit-text-stroke: 1px blueviolet;
  // text-stroke: 1px blueviolet;
}

.stroke1 {
  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  -webkit-text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  -moz-text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  // *filter: Glow(color=#000, strength=1);
}

.vague_text {
  color: transparent;
  text-shadow: #111 0 0 5px;
}

.icon {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}

.icon:hover {
  filter: none;
  -webkit-filter: grayscale(0%);
}

.fit-box {
  width: 150px;
  height: 150px;
}

.fit-box > img {
  width: 100%;
  height: 100%;
}

.fit-box > img {
  object-fit: contain;
}

.fit-box2 > img {
  object-fit: cover;
}

</style>
