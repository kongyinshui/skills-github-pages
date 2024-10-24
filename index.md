# 欢迎来到我的博客
 
这是我的第一篇博客，我将在这里分享我的学习经验和教程。
## 计算机图形学作业
<!-- HTML 部分 -->
<h3 id="menuTitle1">2024-09-10作业1</h3>

<div id="popupMenu1" class="menu">
    <ul>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/1.html">2024-09-10作业1任务1</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/2.html">2024-09-10作业1任务2</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/3.html">2024-09-10作业1任务3</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/4.html">2024-09-10作业1任务4</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-09-10-Computer Graphics task 1/demos/5.html">2024-09-10作业1任务5</a></li>
    </ul>
</div>

<h3 id="menuTitle2">2024-09-24作业2</h3>
<div id="popupMenu2" class="menu">
    <ul>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-09-24-Computer Graphics task 2/demos/a.html">2024-09-24作业2任务a</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-09-24-Computer Graphics task 2/demos/b.html">2024-09-24作业2任务b</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-09-24-Computer Graphics task 2/demos/c,d,e.html">2024-09-24作业2任务cde</a></li>
    </ul>
</div>

<h3 id="menuTitle3">2024-10-08作业3</h3>
<div id="popupMenu3" class="menu">
    <ul>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-08-Computer Graphics task 3/demos/a.html">2024-10-08作业3任务a</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-08-Computer Graphics task 3/demos/b.html">2024-10-08作业3任务b</a></li>
    </ul>
</div>

<h3 id="menuTitle4">2024-10-15作业4</h3>

<div id="popupMenu4" class="menu">
    <ul>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-15-Computer Graphics task 4/demos/a.html">2024-10-15作业4任务a</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-15-Computer Graphics task 4/demos/b.html">2024-10-15作业4任务b</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-15-Computer Graphics task 4/demos/c.html">2024-10-15作业4任务c</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-15-Computer Graphics task 4/demos/d.html">2024-10-15作业4任务d</a></li>
    </ul>
</div>

<h3 id="menuTitle5">2024-10-22作业5</h3>

<div id="popupMenu5" class="menu">
    <ul>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-22-Computer Graphics task 5/demos/a.html">2024-10-22作业5任务a</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-22-Computer Graphics task 5/demos/b.html">2024-10-22作业5任务b</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-22-Computer Graphics task 5/demos/c.html">2024-10-22作业5任务c</a></li>
        <li><a href="https://kongyinshui.github.io/skills-github-pages/2024-10-22-Computer Graphics task 5/demos/d.html">2024-10-22作业5任务d</a></li>
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
document.getElementById('menuTitle1').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu1');
    menu.classList.toggle('show');
});
 document.getElementById('menuTitle2').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu2');
    menu.classList.toggle('show');
});
 document.getElementById('menuTitle3').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu3');
    menu.classList.toggle('show');
});
 document.getElementById('menuTitle4').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu4');
    menu.classList.toggle('show');
});
  document.getElementById('menuTitle5').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu5');
    menu.classList.toggle('show');
});
</script>
 

