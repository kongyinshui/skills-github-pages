# 欢迎来到我的博客
 
这是我的第一篇博客，我将在这里分享我的学习经验和教程。
<!-- HTML 部分 -->
<h3 id="menuTitle">2024-09-10作业1</h3>

<div id="popupMenu" class="menu">
    <ul>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/1.html">2024-09-10作业1任务1</a></li>
        <li><a href="#about">关于</a></li>
        <li><a href="#contact">联系</a></li>
    </ul>
</div>

<!-- CSS 部分 -->
<style>
body {
    font-family: Arial, sans-serif;
}

h3 {
    cursor: pointer;
    background-color: #f8f9fa;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 200px;
    text-align: center;
}

h3:hover {
    background-color: #e2e6ea;
}

/* 菜单初始隐藏状态 */
.menu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 200px;
    margin-top: 5px;
}

.menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.menu ul li {
    padding: 10px;
}

.menu ul li a {
    text-decoration: none;
    color: #333;
}

.menu ul li a:hover {
    color: #007bff;
}

/* 展开时菜单的最大高度 */
.menu.show {
    max-height: 300px; /* 根据内容调整 */
}
</style>

<!-- JavaScript 部分 -->
<script>
document.getElementById('menuTitle').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu');
    menu.classList.toggle('show');
});
</script>
 
[2024-09-10作业1任务1](https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/1.html)

[2024-09-10作业1任务2](https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/2.html)

[2024-09-10作业1任务3](https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/3.html)

[2024-09-10作业1任务4](https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/4.html)

[2024-09-10作业1任务5](https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/5.html)
 

