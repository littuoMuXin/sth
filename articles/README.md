# File Structure

*文档结构说明*

所有文章所在路径，均以本目录为根目录。本目录内：先以年份作为文件夹名进行分类，年份目录中需包含其内容的目录；然后再按照文章标题或博客日期创建文件夹，名称仅能含小写英文字母、数字和短横线，该级文件夹具体定义如下。

- 技术博客，均放置于对应的分类中，再以该博客名作为具体子文件夹名，内容放置于其内的 README.md 文件中。
  - `web` Web 前端，包括 JavaScript、Type Script 和 JSX 等语言及其相关技术栈。
  - `net` .NET 相关。
  - `java` Java 相关。
  - `python` Python 相关。
  - `iot` 物联网。
  - 如果该博客内容较大，或为一个系列，或牵扯多项技术，亦可以直接用该博客名为文件夹名称，内容放置于 README.md 文件中，如有子内容，可以另建子文件夹，并将内容放置于其内的 README.md 中。
- 小说，以小说文件名为文件夹名。
  - 短片小说存放于其内的 README.md。
  - 长篇小说则将简介和目录存放于 README.md，其余各章以序号或代号为作为子文件夹。
  - 中篇小说视情况，匹配短篇小说模式或长篇小说模式。
- 普通博客，存放于以日期 `MMDD` 命名的文件夹中，并以博客名命名其内子文件夹名，内容放置于其内的 README.md 文件中。
- 较长杂谈，类似短篇小说模式；超长的，类似长篇小说模式。

## Examples

*举例*

- 2021
  - decade-calendar &nbsp; &nbsp; # 专题文章《十进制历》
    - README.md &nbsp; &nbsp; # 正文
    - type-script &nbsp; &nbsp; # 子内容
      - README.md &nbsp; &nbsp; # 子内容正文
  - hello-world &nbsp; &nbsp; 某一博文
    - README.md &nbsp; &nbsp; # 正文
    - greetings.jpg &nbsp; &nbsp; # 配图
  - another &nbsp; &nbsp; 另一篇博文
    - README.md &nbsp; &nbsp; # 正文

## Template

*文章内容模板*

```md
# Header

Content

## Section

Details

---

AUTHOR

PUBLISH-DATE

Keywords:
A; B; C.

**See also**

- Link A
- Link B

OTHER-NOTICE
```