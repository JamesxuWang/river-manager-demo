/** layui-v2.2.3 MIT License By http://www.layui.com */
;layui.define("jquery", function(exports) {
    // "use strict";
    var $ = layui.$
    ,layuiHint = layui.hint()
    ,i = "layui-tree-enter"
    ,icon = {
      arrow: ["&#xe623;", "&#xe625;"],
      checkbox: ["&#xe626;", "&#xe627;"],
      radio: ["&#xe62b;", "&#xe62a;"],
      branch: ["&#xe622;", "&#xe624;"],
      leaf: "&#xe621;"
    },layuiTree = function(option) {
        this.options = option;
    };
    layuiTree.prototype.init = function($elem) {
        var self = this;
        $elem.addClass("layui-box layui-tree"),
        self.options.skin && $elem.addClass("layui-tree-skin-" + self.options.skin)
        ,self.tree($elem)
        ,self.on($elem)
    };
    layuiTree.prototype.tree = function($elem, a) {
        var self = this
          , options = self.options
          , nodes = a || options.nodes;
        layui.each(nodes, function(a, nodesF) {
            var flag = nodesF.children && nodesF.children.length > 0
              , $ul = $('<ul class="' + (nodesF.spread ? "layui-show" : "") + '"></ul>')
              , $li = $(["<li " + (nodesF.spread ? 'data-spread="' + nodesF.spread + '"' : "") + " " + (nodesF.type ? 'data-type="' + nodesF.type + '"' : "") + ">", function() {
                return flag ? '<i class="layui-icon layui-tree-spread">' + (nodesF.spread ? icon.arrow[1] : icon.arrow[0]) + "</i>" : ""
            }(), function() {
                return options.check ? '<i class="layui-icon layui-tree-check">' + ("checkbox" === options.check ? icon.checkbox[0] : "radio" === r.check ? t.radio[0] : "") + "</i>" : ""
            }(), function() {
                return '<a href="' + (nodesF.href || "javascript:;") + '" ' + (options.target && nodesF.href ? 'target="' + options.target + '"' : "") + ">" + ('<i class="layui-icon layui-tree-' + (flag ? "branch" : "leaf") + '">' + (flag ? nodesF.spread ? icon.branch[1] : icon.branch[0] : icon.leaf) + "</i>") + ("<cite>" + (nodesF.name || "未命名") + "</cite></a>")
            }(), "</li>"].join(""));
            flag && ($li.append($ul), self.tree($ul, nodesF.children)),
            $elem.append($li),
            "function" == typeof options.click && self.click($li, nodesF),
            self.spread($li, nodesF)
            ,options.drag && self.drag($li, nodesF)
        })
    }
    ,
    layuiTree.prototype.click = function($li, nodesF) {
        var self = this
          , options = self.options;
        $li.children("a").on("click", function(e) {
            layui.stope(e),
            // 输出点击node  layuiTree.prototype.click ！== layuiTree.click
            options.click(nodesF)
        })
    }
    ,
    layuiTree.prototype.spread = function($li, nodesF) {
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
        $ul[0] && (i.on("click", spreadChange),
        $a.on("dblclick", spreadChange))
    }
    ,
    layuiTree.prototype.on = function($elem) {
        var self = this
          , options = self.options
          , t = "layui-tree-drag";
        $elem.find("i").on("selectstart", function(e) {
            return !1
        }),
        options.drag && $(document).on("mousemove", function(e) {
            var i = self.move;
            if (i.from) {
                var r = (i.to,
                $('<div class="layui-box ' + t + '"></div>'));
                e.preventDefault(),
                $("." + t)[0] || $("body").append(r);
                var n = $("." + t)[0] ? $("." + t) : r;
                n.addClass("layui-show").html(i.from.elem.children("a").html()),
                n.css({
                    left: e.pageX + 10,
                    top: e.pageY + 10
                })
            }
        }).on("mouseup", function() {
            var e = self.move;
            e.from && (e.from.elem.children("a").removeClass(i),
            e.to && e.to.elem.children("a").removeClass(i),
            self.move = {},
            $("." + t).remove())
        })
    }
    ,
    layuiTree.prototype.move = {},

    exports("layTree", function(option) {
        var layTree = new layuiTree(option = option || {})
          , $elem = $(option.elem);
        return $elem[0] ? void layTree.init($elem) : layuiHint.error("layui.tree 没有找到" + option.elem + "元素")
    })
});
