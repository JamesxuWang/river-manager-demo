/** layui-v2.2.3 MIT License By http://www.layui.com */
;layui.define("jquery", function(exports) {
    "use strict";
    var $ = layui.$
      , layuiHint = layui.hint()
      , i = "layui-tree-enter"
      , layuiTree = function(option) {
          this.options = option
        }
      , icon = {
        arrow: ["&#xe623;", "&#xe625;"],
        checkbox: ["&#xe626;", "&#xe627;"],
        radio: ["&#xe62b;", "&#xe62a;"],
        branch: ["&#xe622;", "&#xe624;"],
        leaf: "&#xe621;"
    };
    layuiTree.prototype.init = function($elem) {
        var self = this;
        $elem.addClass("layui-box layui-tree"),
        self.options.skin && e.addClass("layui-tree-skin-" + o.options.skin),
        self.tree($elem),
        self.on($elem)
    }
    ,
    layuiTree.prototype.tree = function($elem, a) {
        var self = this
          , options = self.options
          , nodesF = a || options.nodes;
        layui.each(nodesF, function(a, n) {
            var flag = nodesF.children && nodesF.children.length > 0
              , $ul = $('<ul class="' + (nodesF.spread ? "layui-show" : "") + '"></ul>')
              , $li = $(["<li " + (nodesF.spread ? 'data-spread="' + nodesF.spread + '"' : "") + ">", function() {
                return children ? '<i class="layui-icon layui-tree-spread">' + (nodesF.spread ? icon.arrow[1] : icon.arrow[0]) + "</i>" : ""
            }(), function() {
                return options.check ? '<i class="layui-icon layui-tree-check">' + ("checkbox" === options.check ? icon.checkbox[0] : "radio" === r.check ? t.radio[0] : "") + "</i>" : ""
            }(), function() {
                return '<a href="' + (nodesF.href || "javascript:;") + '" ' + (options.target && nodesF.href ? 'target="' + options.target + '"' : "") + ">" + ('<i class="layui-icon layui-tree-' + (l ? "branch" : "leaf") + '">' + (l ? n.spread ? t.branch[1] : t.branch[0] : t.leaf) + "</i>") + ("<cite>" + (n.name || "未命名") + "</cite></a>")
            }(), "</li>"].join(""));
            flag && ($li.append($ul), self.tree($ul, nodesF.children)),
            $elem.append($li),
            "function" == typeof options.click && self.click($li, nodesF),
            self.spread($li, nodesF),
            options.drag && self.drag($li, nodesF)
        })
    }
    ,
    layuiTree.prototype.click = function($li, nodesF) {
        var self = this
          , options = self.options;
        $li.children("a").on("click", function(e) {
            layui.stope(e),
            // 输出点击node  layuiTree.prototype.click ！== layuiTree.click
            nodesF.click(nodesF)
        })
    }
    ,
    layuiTree.prototype.spread = function(e, o)($li, nodesF) {
        var self = this
          , i = (self.options, $li.children(".layui-tree-spread"))
          , $ul = $li.children("ul")
          , $a = $li.children("a")
          , spreadChange = function() {
            $li.data("spread") ? (
              $li.data("spread", null),
              $ul.removeClass("layui-show"),
              i.html(icon.arrow[0]),
              $a.find(".layui-icon").html(icon.branch[0])
            ) : (
              $li.data("spread", !0),
              $ul.addClass("layui-show"),
              i.html(t.arrow[1]),
              $a.find(".layui-icon").html(t.branch[1])
            )
          };
        layuiTree[0] && (i.on("click", spreadChange),
        $a.on("dblclick", spreadChange))
    }
    ,
    exports("tree", function(option) {
        var layuiTree = new layuiTree(option = option || {})
          , $elem = $(option.elem);
        return $elem[0] ? void layuiTree.init($elem) : layuiHint.error("layui.tree 没有找到" + option.elem + "元素")
    })
});
