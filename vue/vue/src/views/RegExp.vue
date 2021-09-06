<template>
  <div class="regexp">
    <pre>
       1. 匹配字符
          匹配字符A, /A/.test("JAVA") => {{ /A/.test("JAVA") }}, /A/.test("JBVB") => {{ /A/.test("JBVB") }}
          匹配以A开头, /^A/.test("ABC") => {{ /^A/.test("ABC") }}, /^A/.test("CBA") => {{ /^A/.test("CBA") }}
          匹配以A结尾, /A$/.test("ABC") => {{ /A$/.test("ABC") }}, /A$/.test("CBA") => {{ /A$/.test("CBA") }}
          匹配A或B, 把对应字符放入中括号里, /[AB]/.test("BYTE") => {{ /[AB]/.test("BYTE") }}
          匹配字符串ABC或XYZ, /ABC|XYZ/.test("AABBXYZ") => {{/ABC|XYZ/.test("AABBXYZ")}}

          匹配(前瞻), exp1(?=exp2): 匹配exp2前面的exp1, 匹配结果不包含exp2
              /java(?=script)/.test("javascript") => {{ /java(?=script)/.test("javascript") }}
              /java(?=script)/.test("javasscript") => {{ /java(?=script)/.test("javasscript") }}
              /java(?=script)/.exec("javascript") => {{ /java(?=script)/.exec("javascript") }}
          匹配(后顾), (?&lt;=exp2)exp1: 匹配exp2后面的exp1, 匹配结果不包含exp2
              /(?&lt;=java)ee/.test("javaee") => {{ /(?<=java)ee/.test("javaee") }}
              /(?&lt;=java)ee/.exec("javaee") => {{ /(?<=java)ee/.exec("javaee") }}

      2. 匹配不是
         取反, 只要不是这些就能匹配, 在中括号里面加上元字符^, 只要字符满足有不是这个集合里的字符, 都能被匹配上
         /[^a]/.test("aaa") => {{ /[^a]/.test("aaa") }}
         /[^a]/.test("abc") => {{ /[^a]/.test("abc") }}
         匹配不是以a开头的:
         /^[^a]/.test("javascript") => {{ /^[^a]/.test("javascript") }}
         /^[^a]/.test("abc") => {{ /^[^a]/.test("abc") }}
         匹配不以a结尾的:
         /[^a]$/.test("javascript") => {{ /[^a]$/.test("javascript") }}
         /[^a]$/.test("cba") => {{ /[^a]$/.test("cba") }}
         不匹配字符a,b,c, 可以把对应的字符都放入括号里:
         /[^abc]/.test("abccba") => {{ /[^abc]/.test("abccba") }}
         /[^abc]/.test("abccbad") => {{ /[^abc]/.test("abccbad") }}

         匹配后面不是(负前瞻)
         exp1(?!exp2): 匹配后面不是exp2的exp1, 匹配结果不包含exp2
         匹配后面不是script的java
         /java(?!script)/.test('javaee') => {{ /java(?!script)/.test('javaee') }}
         /java(?!script)/.exec('javaee') => {{ /java(?!script)/.exec('javaee') }}
         匹配前面不是(负后顾)
         (?&lt;!exp2)exp1: 匹配前面不是exp2的exp1, 匹配结果不包含exp2
         匹配前面不是java的script
         /(?&lt;!java)script/.test('javascript') => {{ /(?<!java)script/.test('javascript') }}
         /(?&lt;!java)script/.exec('javasscript') => {{ /(?<!java)script/.exec('javasscript') }}

         不匹配包含abc的字符串
         A. 位置后面不能为abc, 使用负前瞻匹配位置: /(?!abc)/
         B. 开始到结束每个位置都要覆盖到, 开始结束标记: /^(?!abc)$/
         C. 这个位置后面可以是其他字符, /^(?!abc)\w$/
         D. 满足上面情况的位置: 可以出现多次, 用 + 来表示数量

         /^((?!abc)\w)+$/.test("cbacbac") => {{ /^((?!abc)\w)+$/.test("cbacbac") }}
         /^((?!abc)\w)+$/.test("cbacbabc") => {{ /^((?!abc)\w)+$/.test("cbacbabc") }}

      3. 匹配多少次?
        *      0次或多次
        +      1次或多次
        ?      0次或1次
        {m}    匹配m次
        {m,n}  最低匹配m次, 最多匹配n次, m&lt;n
        {m,}   最低匹配m次

        .  匹配除换行任意字符
        \d 匹配任意数字
        \D 匹配任意非数字
        \s 匹配任意空白字符
        \S 匹配任意非空白字符
        \n 匹配换行
        \w 匹配字母数字下划线, [A-Za-z0-9_]

        i 忽略大小写;
        m 多行匹配;
        g 全局匹配;

        匹配特殊字符要加反斜杆 \
        JS中特殊字符有 ^ $ \ . * + ? () [] {} |

        正则默认贪婪匹配, 符合条件会一直匹配, 想阻止贪婪匹配, 可以在长度规则后面加一个 ?
        /\d{2,}/.exec("123456789") => {{ /\d{2,}/.exec("123456789") }}
        /\d{2,}?/.exec("123456789") => {{ /\d{2,}?/.exec("123456789") }}

        使用分组
        /(\d)\1(\d)\2/.exec("1234445556789") => {{ /(\d)\1(\d)\2/.exec("12344556789") }}

        默认分组可以被捕获, \1, \2是正则表达式内部捕获的分组, 想去外部捕获分组匹配的数据可以
        使用RegExp.$1-$9来获取。只要正则匹配了就会有。可以使用test、exec或者str的replace方
        法来获取$1-$9。
        使用test:
        /([a-z]{2})(\d{2})/.test("xyz123") => {{ /([a-z]{2})(\d{2})/.test("xyz123") }}

        使用replace:
        "xyz123".replace( /([a-z]{2})(\d{2})/, "$2$1") => {{ "xyz123".replace( /([a-z]{2})(\d{2})/, "$2$1") }}

        分组不捕获
        不想捕获分组, 只需要在分组内加上?:就行
        /([a-z]{2})(?:\d{2})/.test("xyz123") => {{ /([a-z]{2})(?:\d{2})/.test("xyz123") }}
        RegExp.$1 返回第一个分组表达式匹配到的内容 yz
        RegExp.$2 分组未被捕获, 返回空字符串
     </pre>
  </div>
</template>

<script>
export default {
  name: "RegExp",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.regexp{

}
</style>
