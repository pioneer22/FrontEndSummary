<template>
  <transition name="slide-left">
    <div style="width: 100%;">
      <pre>
         1. 文本选择颜色
            <span class="selection">鼠标选择文本, 可自定义文本颜色选择。
            使用选择伪元素：</span>
            ::selection{
                background-color: #xxxxxx;
                color: #xxxxxx;
            }
         2. 首字下沉
         使用first-letter伪元素来装饰第一个字母
      </pre>
      <span class="dropcap">
        Web Development Reauirements consectetur adoposcing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua Egestas purus viverra accumulator</span>
      <pre>
         3. 平滑滚动
         访问一些网站并尝试转到不同的部分
         将css scroll-behavior属性与html一起用作选择器, 以启用整个html页面的平滑滚动。
         html{
             scroll-behavior: smooth !important;
         }
         4. 输入插入符号颜色
         更改输入字段插入符号的颜色, 只需要为这个效果使用caret-color属性。
         input{
             caret-color: #d32f2f;
         }
         <input type="text" />
         5. 投影
         img{
             object-fit: cover;
             filter: drop-shadow(30px 10px 4px #757575);
         }
         <img :src="imgUrl" alt="" class="img-wrapper" />
         6. 文本居中显示
         设置display: grid; 使用place-items属性;
         div{
             display: grid;
             place-items: center center;
         }
      </pre>
      <div class="main-center">centralize with place-items</div>
      <pre>
         7. 禁用用户选择
         不想让用户选择复制网页上某些内容, 禁用用户选择复制内容的功能
         .select{
             user-select: none;
         }
         <div class="select-content">
             user selection
         </div>
         8. 竖排文字
         .column-content{
             writing-mode: tb-rl;
             transform: rotate(-180deg);
         }
    </pre>
      <h3 class="column-content">vertical text</h3>

      <h3>9. 毛玻璃效果</h3>
      <div class="mbl-box">
        <div class="glass glass-by-filter"></div>
        <div class="glass glass-by-filter1"></div>
      </div>

      <h3>10. @supports</h3>
      <pre>
      可以用来检测当前浏览器是否支持某个css特性
      判断是否加animation属性, 支持则增加动画效果
      @supports(animation: none) {
         .xxx{
           animation: xxxxx;
         }
      }

      使用position: sticky; 实现滚动粘滞效果, 传统浏览器使用js支持
      // js 判断是否支持position: sticky 属性, CSS.supports('position', 'sticky')
      if(!window.CSS || !CSS.supports ||!CSS.supports('position', 'sticky')){

      }
    </pre>

      <h3>11. fit-content</h3>
      <div class="box11">
        width: fit-content; 文本少时, 水平居中, 多行文本, 文本左对齐
      </div>



    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        imgUrl: require("@/assets/logo.png"),
      };
    },
  };
</script>

<style lang="scss" scoped>
  .selection::selection {
    background-color: salmon;
    color: white;
  }

  .dropcap {
    display: inline-block;
    width: 500px;
  }

  .dropcap:first-of-type::first-letter {
    color: #616161;
    float: left;
    font-family: Georgia;
    font-size: 24px;
    line-height: 38px;
    padding-right: 8px;
  }

  input {
    caret-color: darkorange;
  }

  .img-wrapper {
    width: 200px;
    height: 200px;
    object-fit: cover;
    filter: drop-shadow(20px 10px 4px #757575);
  }

  .main-center {
    background-color: darkorchid;
    color: white;
    width: 100px;
    height: 100px;
    display: grid;
    place-items: center center;
  }

  .select-content {
    user-select: none;
  }

  h3.column-content {
    writing-mode: tb-rl;
    transform: rotate(-180deg);
  }

  .mbl-box {
    background: url(~@/assets/images/index/index.jpg);
    background-size: 100% 100%;
  }

  .glass {
    height: 200px;
    width: 200px;
    border: 1px groove #efefef;
    border-radius: 12px;
    background: rgba(242, 242, 242, 0.5);
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126), 0 0.9px 1.7px rgba(0, 0, 0, 0.179),
      0 1.8px 3.5px rgba(0, 0, 0, 0.224), 0 3.7px 7.3px rgba(0, 0, 0, 0.277),
      0 10px 20px rgba(0, 0, 0, 0.4);
  }

  .glass-by-filter {
    z-index: 1;
    box-sizing: border-box;
    position: relative;
  }

  .glass-by-filter::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: inherit;
    filter: blur(10px);
  }

  .glass-by-filter1 {
    margin-top: 40px;
    backdrop-filter: blur(4px);
  }

  .box11 {
    width: fit-content;
    margin: auto;
  }
</style>