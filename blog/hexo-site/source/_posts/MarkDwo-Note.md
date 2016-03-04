title: Markdown Grammar
date: 2016-03-01 15:32:55
categories:
- codes
- markdown
---

>Markdown 是一种轻量级的「标记语言」，它的优点很多，目前也被越来越多的写作爱好者，撰稿者广泛使用。看到这里请不要被「标记」、「语言」所迷惑，Markdown 的语法十分简单。常用的标记符号也不超过十个，这种相对于更为复杂的HTML 标记语言来说，Markdown 可谓是十分轻量的，学习成本也不需要太多，且一旦熟悉这种语法规则，会有一劳永逸的效果。
<!-- more -->

## Contents | 目录
1. <a href="#Overview"><span>1</span> <span>Overview</span></a>
    1. <a href="#"><span>1.1</span> <span>Inline HTML | 兼容 HTML</span></a>
    2. <a href="#"><span>1.2</span> <span>Automatic Escaping for Special Characters | 特殊字符自动转换</span></a>
2. <a href="#Block-Elements"><span>2</span> <span>Block Elements</span></a>
    1. <a href="#"><span>2.1</span> <span>Paragraphs and Line Breaks | 段落和换行</span></a>
    2. <a href="#"><span>2.2</span> <span>Headers | 标题</span></a>
    3. <a href="#"><span>2.3</span> <span>Blockquotes | 区块引用</span></a>
    4. <a href="#"><span>2.4</span> <span>Lists | 列表</span></a>
    5. <a href="#"><span>2.5</span> <span>Code blocks | 代码区块</span></a>
    6. <a href="#"><span>2.6</span> <span>Horizontal Rules | 分隔线</span></a>
3. <a href="#Span-Elements"><span>3</span> <span>Span Elements</span></a>
    1. <a href="#"><span>3.1</span> <span>Links | 链接</span></a>
    2. <a href="#"><span>3.2</span> <span>Emphasis | 强调</span></a>
    3. <a href="#"><span>3.3</span> <span>Code | 代码</span></a>
    4. <a href="#"><span>3.4</span> <span>Images | 图片</span></a>


>Tip:所有Markdown符号都要记得在后面跟一个空格符

## Overview
### 兼容 HTML

## Block Elements

### Headers | 标题
支持两种标题语法，类<span class="light">Setext</span>和类<span class="light">Atx</span> 形式

Atx 规则用 1-6 个<span class="light">#</span> 分别代表HTML中 H1-H6 标题

    Codes:
    # This is H1
    ## This is H2
    ### This is H3
    #### This is H4
    ##### This is H5
    ###### This is H6


输出:
# This is H1
## This is H2
### This is H3
#### This is H4
##### This is H5
###### This is H6

Setext 规则用 <span>=</span> 和 <span>-</span> 来表示 H1 和 H2. 

    Codes:
    大标题
    ＝
    小标题
    -

输出:
大标题
===
小标题
--

### Blockquotes | 区块引用
用<span>></span>符号来表示引用

    Codes:
    > 内容会在html<blockquote>标签里

输出：
> 来引用一段话,容会在html标签blockquote里

如果要多级嵌套引用可以，可以用缩紧符号

    Codes:
    > 一级引用
    >> 二级引用
    >>> 三级引用
    >>>> 以此类推

输出：
> 一级引用
>> 二级引用
>>> 三级引用
>>>> 以此类推

### Lists | 列表
分为有序列表和无序列表两种

有序列表

    Codes:
    1. 目录一
    2. 目录二
    3. 目录三

输出：
1. 目录一
2. 目录二
3. 目录三

无序列表,用<span>-</span>,<span>+</span>,<span>*</span>

    Codes:
    - 语法
        - Javascript
        - NodeJS
        - Php
    + 语法
        + Javascript
        + NodeJS
        + Php
    * 语法
        * Javascript
        * NodeJS
        * Php

[-]输出：
- Javascript
- NodeJS
- Php

[+]输出：
+ Javascript
+ NodeJS
+ Php

[*]输出：
* Javascript
* NodeJS
* Php


## Span Elements

- sdf
- sdfdsf
- sdfsdf
- sdf
### 标题
### 列表
### 引用
### 代码框
### 分割线
### 转义
### 粗体与斜体
### 图片与连接
### 其他

