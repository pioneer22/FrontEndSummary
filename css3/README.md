## CSS3

### 属性选择器
\[attr~=val\]: 表示带有以attr命名的属性的元素，并且该属性是一个以空格作为分隔的值列表。

### 子串值属性选择器
\[attr|=val\]: 选择attr属性的值是val或者是以val-开头的元素。<br>
\[attr^=val\]: 选择attr属性的值以val开头（包括val）的元素。<br>
\[attr$=val\]: 选择attr属性的值以val结尾（包括val）的元素。<br>
\[attr*=val\]: 选择attr属性的值中包含字符串val的元素。<br>
 
### 伪类与伪元素选择器
**链接伪类** <br>
:link  表示作为超链接，并指向一个未访问的地址的所有锚<br>
:visited  表示作为超链接，并指向一个已访问的地址的所有锚<br>
:target 代表一个特殊的元素，它的id是URI的片段标志符<br>

**动态伪类** <br>
:hover 表示悬浮到元素上<br>
:active 表示匹配被用户激活的元素（点击按住时）<br>
由于a标签的:link 和:visited可以覆盖了所有a标签的状态，所以<br>
:link和:visited不能放在最后。（lvha）<br>

只有下列的属性才能被应用到已访问的链接：<br>
color<br>
background-color<br>
border-color<br>

nth-of-type 以元素为中心<br>
not , empty<br>

**伪元素** <br>
before,after,selection

**自定义字体&字体图标** <br>
FontLab(软件)<br>
icomoon（网站）<br>

[自定义字体图标](https://www.fontsquirrel.com/tools/webfont-generator)

**新增UI样式** <br>
模糊字体：text-shadow<br>
模糊背景：filter: blur(?px)<br>

html上无法出现滚动条，想让body上出现滚动条，html和 body必须同时设置overflow,<br>
否则滚动条会出现再窗口之上，即html的上一层。<br>

**边框** <br>
border-image-source: url(); <br>
border-image-slice:  ;  // 切割 <br>
border-image-repeat: ; <br>
border-image-width: ; <br>
border-image-outset: ; <br>

**渐变** <br>
background-image:linear-gradient() <br>
// 重复渐变 <br>
background-image:repeating-linear-gradient() <br>

**过渡** <br>
transition-property: ; // 过渡属性（并不是所有属性都可以动画）<br>
transition-duration: ; // 过渡时间（0也要带单位）<br>
transition-timing-function: ; // 过渡动画的形式（贝塞尔）<br>
transition-delay: ; // 延迟时间<br>

过渡只关心初始状态和结束状态，没有方法可以获取元素在过渡中每一帧的状态。<br>
元素在初次渲染还没有结束的时候是没办法触发过渡的。<br>
在绝大部分变换样式的切换时，变换组合的个数或位置不一样时，是没有办法触发过渡的。<br>

**2d变形（transform）** <br>
rotate(旋转)<br>
translate(平移)<br>
skew(斜切)<br>
scale(缩放)<br>
变换组合，从右往左，变换的底层就是矩阵的运算<br>
基点的变换<br>
transform-origin<br>

**3d变换** <br>
景深：perspective<br>
让3D场景有近大远小的效果<br>
是一个不可继承属性，可以作用于后代（不作用于本身）<br>

景深越大 灭点越远 元素变形更小<br>
景深越小 灭点越近 元素变形更大<br>

景深基点<br>
视角的位置<br>
perspective （控制Z轴）<br>
perspective-origin (控制X轴和Y轴)（默认值：50% 50%）<br>

景深叠加<br>
尽量避免景深叠加<br>

transform-style:  preserve-3d<br>
营造有层级的舞台，构造3d舞台，使3d舞台更有层次感。<br>
是一个不可继承属性，他作用于子元素<br>

backface-visibility<br>
隐藏元素背面<br>
一个元素分两面，但并不意味着元素有厚度。在一个状态下，元素只能展现自己的一面。<br>

**动画** <br>
animation-name: 代表关键帧的名字<br>
关键帧<br>
@keyframes animationName{<br>
	
}<br>
animation-duration: 一个动画周期的时长<br>
animation-timing-function: 作用于一个关键帧周期而非整个动画周期<br>
animation-delay: 代表动画的延迟（这是一个动画外的属性）<br>
animation-iteration-count: 循环关键帧的次数（只会管理动画内的属性，动画的延迟不会被循环） infinite(无限循环)<br>
animation-direction: 改变关键帧的执行方向，还会影响animation-timing-function的形式<br>
animation-fill-mode: 管理所有动画外的状态<br>
from之前<br>
    animation-delay<br>
to之后<br>
值：<br>
none:  动画外的状态保持在动画之前的位置<br>
backwards：from之前的 状态与from的状态保持一致<br>
forwards：to之后的状态与to的状态保持一致<br>
both：动画外的状态与from和to的状态保持一致<br>

animation-play-state: 管理动画的运行和停止<br>

**flex** <br>
flex分为新旧两个版本<br>
-webkit-box<br>
-webkit-flex/-flex<br>

老版本：<br>
容器：<br>
容器的布局方向<br>
      -webkit-box-orient: horizontal/vertical<br>
      控制主轴是哪一根<br>
	horizontal: x轴 <br>
	vertical: y轴 <br>
容器的排列方向<br>
      -webkit-box-direction: normal/reverse<br>
      控制主轴的方向<br>
	normal: 从左往右(正方向) <br>
	reverse: 从右往左（反方向）<br>
富裕空间的管理<br>
      只决定富裕空间的位置，不会给项目区分配空间<br>
      主轴<br>
	-webkit-box-pack <br>
	        主轴是X轴 <br>
		start: 在右边 <br>
		end：在左边 <br>
		center: 在两边 <br>
		justify: 在项目之间 <br>
	        主轴是Y轴 <br>
		start：在下边 <br>
		end：在上边 <br>
		center: 在两边 <br>
		justify: 在项目之间 <br>
      侧轴 <br>
	-webkit-box-align <br>
	        侧轴是X轴 <br>
		start：在右边 <br>
		end：在左边 <br>
		center: 在两边 <br>
	        侧轴是Y轴 <br>
		start：在上边 <br>
		end： 在下边 <br>
		center: 在两边 <br>
项目： <br>
      弹性空间管理<br>
	-webkit-box-flex: 弹性因子(默认值为0) <br>

新版本：<br>
容器： <br>
容器的布局方向<br>
      -webkit-box-orient: horizontal/vertical<br>
      控制主轴是哪一根 <br>
	horizontal: x轴 <br>
	vertical: y轴 <br>
容器的排列方向 <br>
      flex-direction <br>
      控制主轴是哪一根，控制主轴的方向 <br>
	row: 从左往右的x轴 <br>
	row-reverse: 从右往左的x轴 <br>
	column: 从上往下的y轴 <br>
	column-reverse: 从下往上的y轴 <br>
富裕空间的管理 <br>
      只决定富裕空间的位置，不会给项目区分配空间 <br>
      主轴 <br>
	justify-content <br>
		flex-start: 在主轴正方向 <br>
		flex-end：在主轴反方向 <br>
		center: 在两边 <br>
		space-between: 在项目之间 <br>
		space-around: 在项目两边 <br>
      侧轴 <br>
	align-items <br> 
		flex-start：在侧轴正方向 <br>
		flex-end： 在侧轴反方向 <br> 
		center: 在两边 <br>
		baseline: 基线对齐 <br>
		stretch: 等高布局（项目没有高度） <br>
项目： <br>
      弹性空间管理 <br>
	flex-grow: 弹性因子(默认值为0) <br>

order: 控制项目的排列顺序 <br>
align-self: 项目自身富裕空间的管理 <br>

flex-basis： 伸缩规则计算的基准值（默认拿width或height的值）（默认值为auto） <br>
flex-grow: <br>
      可用空间 = （容器大小 - 所有相邻项目flex-basis的总和） <br>
      可扩展空间 = （可用空间/所有相邻项目flex-grow的总和） <br>
      每项伸缩大小 = （伸缩基准值flex-basis + (可扩展空间 x flex-grow值)） <br>
flex-shrink: 收缩因子（默认值为1） <br>
      计算收缩因子与基准值乘的总和 <br>
	每一项flex-shrink*flex-basis之和 <br>
      计算收缩因数
	收缩因数 = （项目的收缩因子 x 项目基准值）/ 第一步计算总和 <br>
      移除空间的计算 <br>
	移除空间 = 项目收缩因数 x 负溢出的空间 <br>
flex-wrap: 控制的是侧轴的方向 <br>
	nowrap <br>
	wrap     侧轴方向从上而下 （flex-shrink失效） <br>
	wrap-reverse   侧轴方向由下而上 （flex-shrink失效） <br>
align-content: 多行或多列时侧轴富裕空间的管理（把多行或列看成一个整体） <br>
flex-flow: flex-direction和flex-wrap的简写 <br>

单行单列 <br>
      align-items <br>
      align-self(优先级高) <br>
多行多列 <br>
      align-content <br>

**css3媒体查询** <br>
css3媒体查询是响应式方案的核心 <br>
 
**媒体类型** <br>
all     所有媒体（默认值） <br>
screen    彩色屏幕 <br>
print   打印预览 <br>

**媒体属性** <br>
width  (可加max, min前缀) <br>
height  （可加max, min前缀） <br>
device-width  (可加max, min前缀) <br>
device-pixel-ratio  (可加max min前缀，需要加webkit前缀) <br>
orientation  portrait竖屏 /  landscape横屏 <br>

@media only screen and () {<br>
	
}<br>
