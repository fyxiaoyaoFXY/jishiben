var $menubar = function() {
    var o, c = $('<div class="menubar"></div>'), d = [], r = -1;
    function e() {
        !function() {
            for (var t = $('<ul class="menu-title"></ul>'), e = 0; e < o.length; e++) {
                var n = $('<li class="title"></li>');
                n.html(o[e].title),
                n.attr("data-id", e),
                t.append(n),
                n.click(function(t) {
                    var e = Number(this.dataset.id);
                    r = -1 === r ? (d[e].css({
                        display: "inline-block"
                    }),
                    e) : r !== e ? (d[r].css({
                        display: "none"
                    }),
                    d[e].css({
                        display: "inline-block"
                    }),
                    e) : (d[r].css({
                        display: "none"
                    }),
                    -1),
                    t.stopPropagation()
                }),
                n.hover(function() {
                    if (-1 !== r) {
                        var t = Number(this.dataset.id);
                        d[r].css({
                            display: "none"
                        }),
                        d[t].css({
                            display: "inline-block"
                        }),
                        r = t
                    }
                })
            }
            c.append(t)
        }(),
        function() {
            for (var t = 0; t < o.length; t++) {
                for (var e = $('<ul class="menus"></ul>'), n = o[t].menuItems, l = 0; l < n.length; l++)
                    if ("hr" !== n[l].title) {
                        var a = $('<li class="menu-item"></li>');
                        if (a.html(n[l].title),
                        a.attr("data-x", t),
                        a.attr("data-y", l),
                        "" !== n[l].shortcut) {
                            var i = $('<span class="shortcut"></span>');
                            i.html(n[l].shortcut),
                            a.append(i)
                        }
                        n[l].enabled || a.addClass("disabled"),
                        e.append(a),
                        a.click(function(t) {
                            if (t.stopPropagation(),
                            !$(this).hasClass("disabled")) {
                                var e = this.dataset.x
                                  , n = this.dataset.y;
                                d[e].css({
                                    display: "none"
                                }),
                                r = -1,
                                o[e].menuItems[n].handler()
                            }
                        })
                    } else {
                        var s = $('<li class="menu-hr"></li>');
                        e.append(s)
                    }
                e.css({
                    width: o[t].width,
                    left: o[t].left,
                    display: "none"
                }),
                c.append(e),
                d.push(e)
            }
        }(),
        $("body").append(c)
    }
    return {
        show: function(t) {
            o = t,
            e()
        },
        checked: function(t, e, n) {
            var l = d[t].find(".menu-item")[e];
            n ? $(l).prepend($('<span class="checked">✓</span>')[0]) : $(l).find(".checked").remove()
        },
        enabled: function(t, e, n) {
            var l = d[t].find(".menu-item")[e];
            n ? $(l).removeClass("disabled") : $(l).addClass("disabled")
        },
        hideMenu: function() {
            -1 !== r && (d[r].css({
                display: "none"
            }),
            r = -1)
        }
    }
}()
  , $editor = function() {
    var e = $('<div class="box1"><textarea spellcheck="false" auto-size="none"></textarea></div>')
      , i = e.find("textarea")
      , s = {
        posHandler: null,
        contentHandler: null,
        wrap: !1
    }
      , t = !1;
    function o() {
        var t = i.val().substr(0, i[0].selectionStart).split("\n");
        return t[t.length - 1].length + 1
    }
    function c() {
        return i.val().substr(0, i[0].selectionStart).split("\n").length
    }
    function n(t) {
        t ? (i.attr("wrap", "soft"),
        i.css({
            "overflow-x": "hidden"
        })) : (i.attr("wrap", "off"),
        i.css({
            "overflow-x": "scroll"
        }))
    }
    return i.keyup(function() {
        s.posHandler(c(), o()),
        s.contentHandler("" !== i.val())
    }),
    i.keypress(function() {
        s.posHandler(c(), o())
    }),
    i.mousedown(function() {
        t = !0
    }),
    i.mouseup(function() {
        t = !1
    }),
    i.mousemove(function() {
        t && s.posHandler(c(), o())
    }),
    i.click(function() {
        s.posHandler(c(), o())
    }),
    {
        show: function(t) {
            $.extend(s, t),
            $("body").append(e),
            i.trigger("focus"),
            n(s.wrap)
        },
        resize: function(t) {
            t ? e.css({
                bottom: "21px"
            }) : e.css({
                bottom: "0"
            })
        },
        focus: function() {
            i.focus()
        },
        getTotalLn: function() {
            return i.val().split("\n").length
        },
        getRow: c,
        getCol: o,
        setWrap: n,
        selectAll: function() {
            var t = i.val().length;
            i[0].selectionStart = 0,
            i[0].selectionEnd = t,
            i.select()
        },
        insertDataTime: function() {
            var t = i.val()
              , e = t.substring(0, i[0].selectionStart)
              , n = t.substring(i[0].selectionEnd, t.length);
            t = e + (new Date).toLocaleString() + n,
            i.val(t),
            i.focus(),
            s.posHandler(c(), o())
        },
        gotoLn: function(t) {
            for (var e = 0, n = i.val().split("\n"), l = 0; l < t - 1; l++)
                e += n[l].length + 1;
            i[0].selectionStart = e,
            i[0].selectionEnd = e,
            i.focus(),
            s.posHandler(c(), o())
        },
        bingSearch: function() {
            var t = i[0].selectionStart
              , e = i[0].selectionEnd;
            if (t === e)
                window.open("https://cn.bing.com/", "_blank");
            else {
                var n = i.val().substring(t, e);
                window.open("https://cn.bing.com/search?q=" + n, "_blank")
            }
        },
        search: function(t) {
            var e = i.val()
              , n = t.content;
            t.capitalSense || (e = e.toLowerCase(),
            n = n.toLowerCase());
            var l, a = i[0].selectionEnd;
            l = "down" === t.direction ? e.indexOf(n, a) : e.substr(0, i[0].selectionStart).lastIndexOf(n),
            -1 !== l ? (i[0].selectionStart = l,
            i[0].selectionEnd = l + n.length,
            s.posHandler(c(), o())) : alert('找不到 "' + t.content + '"')
        },
        setFont: function(t) {
            i.css({
                "font-family": t.family,
                "font-size": t.size + "pt"
            }),
            "斜体" !== t.style ? "粗体" !== t.style ? "粗偏斜体" !== t.style || i.css({
                "font-weight": "bold",
                "font-style": "italic"
            }) : i.css({
                "font-weight": "bold"
            }) : i.css({
                "font-style": "italic"
            })
        }
    }
}()
  , $statusBar = function() {
    var e = $('<div class="box2"><div class="left-panel"></div><div class="right-panel"><p class="row-col"></p></div></div>')
      , n = e.find(".row-col")
      , l = "第&nbsp;x&nbsp;行，第&nbsp;y&nbsp;列"
      , a = {
        row: 1,
        col: 1
    };
    function i(t, e) {
        n.html(l.replace("x", t).replace("y", e))
    }
    return {
        init: function(t) {
            $.extend(a, t),
            i(a.row, a.col),
            $("body").append(e)
        },
        setRowCol: i,
        display: function(t) {
            t ? e.css("display", "block") : e.css("display", "none")
        }
    }
}()
  , $dlgAbout = function() {
    var t = $('<div class="container about"><div class="dialogbox container-box"><div class="titlebar"><p class="title">关于“记事本”</p><span class="close-btn" title="关闭">✖</span></div><div class="main main"><h1 class="slogan">JSNotepad</h1><hr><img class="app-logo" src="../../images/notepad-icon-32.png" alt="JSNotepad"><div class="info"><p>作者：王顶</p><p>QQ：408542507</p><p>仓库地址：<a href="https://github.com/wangding/jsnotepad/" target="_blank">https://github.com/wangding/jsnotepad/</a></p></div><input class="btn-ok btn" type="button" value="确定" autofocus></div></div></div>')
      , e = t.find(".btn-ok")
      , n = t.find(".close-btn")
      , l = t.find(".titlebar");
    function a() {
        t.remove()
    }
    return {
        show: function() {
            $("body").append(t),
            t.find(".dialogbox").draggable({
                handle: l
            }),
            e.focus(),
            e.click(a),
            n.click(a),
            t.click(function(t) {
                e.focus(),
                t.stopPropagation()
            })
        }
    }
}();
function comList() {
    var a, n = $('<div class="notepad-com-list"><input class="editor" type="text"><br><ul class="list"></ul></div>'), l = n.find(".editor"), i = n.find(".list"), s = {
        container: "",
        list: [],
        select: 0,
        width: "200px",
        isFont: !1,
        isFontStyle: !1,
        selectHandler: null
    };
    function e() {
        var t, e = $(s.container).find(".notepad-com-list");
        0 !== e.length && e.remove(),
        $(s.container).append(n),
        n.css({
            width: s.width
        }),
        function() {
            var t, e, n, l = 0;
            if (s.isFont)
                for (l = 0; l < s.list.length; l++)
                    (t = $('<li class="item"></li>')).css({
                        "font-family": s.list[l]
                    }),
                    i.append(t.html(s.list[l]));
            else if (s.isFontStyle)
                for (l = 0; l < s.list.length; l++)
                    t = $('<li class="item"></li>'),
                    e = t,
                    "斜体" !== (n = s.list[l]) ? "粗体" !== n ? "粗偏斜体" !== n || e.css({
                        "font-weight": "bold",
                        "font-style": "italic"
                    }) : e.css({
                        "font-weight": "bold"
                    }) : e.css({
                        "font-style": "italic"
                    }),
                    i.append(t.html(s.list[l]));
            else
                for (l = 0; l < s.list.length; l++)
                    t = $('<li class="item"></li>'),
                    i.append(t.html(s.list[l]));
            a = i.find(".item")
        }(),
        t = s.select,
        $(a[t]).addClass("selected"),
        l.val(s.list[t]),
        l.select()
    }
    this.show = function(t) {
        $.extend(s, t),
        e(),
        i.click(function(t) {
            $(a[s.select]).removeClass("selected"),
            s.select = s.list.indexOf($(t.target).html()),
            $(a[s.select]).addClass("selected"),
            l.val(s.list[s.select]),
            l.select(),
            s.selectHandler(s.select)
        }),
        l.keyup(function() {
            var t = 0;
            for (t = 0; t < s.list.length && 0 !== s.list[t].indexOf(l.val()); t++)
                ;
            t !== s.list.length && (a[t].scrollIntoView({
                behavior: "smooth",
                block: "start"
            }),
            $(a[s.select]).removeClass("selected"),
            $(a[t]).addClass("selected"),
            s.select = t)
        })
    }
}
var $dlgFont = function() {
    var e = $('<div class="container font"><div class="dialogbox container-box"><div class="titlebar"><p class="title">字体</p><span class="close-btn" title="关闭">✖</span></div><div class="main main"><div class="font-family"><p>字体(F):</p></div><div class="font-style"><p>字形(Y):</p></div><div class="font-size"><p>大小(S):</p></div><fieldset class="sample"><legend>示例</legend><p class="sample-txt">AaBbYyZz</p></fieldset><div class="script"><label>脚本(R):<br><select><option value="西欧语言">西欧语言</option><option value="中文 GB2312">中文 GB2312</option></select></label></div><input class="btn-ok btn" type="button" value="确定"><input class="btn-cancel btn" type="button" value="取消"></div></div></div>')
      , n = e.find(".btn-ok")
      , l = e.find(".close-btn")
      , a = e.find(".btn-cancel")
      , t = e.find(".sample-txt")
      , i = e.find(".titlebar")
      , s = ["Agency FB", "Algerian", "Arial", "Arial Rounded MT", "Axure Handwriting", "Bahnschrift", "Baskerville Old Face", "Bauhaus 93", "Bell MT", "Berlin Sans FB", "Bernard MT", "BlackAdder ITC"]
      , o = ["常规", "斜体", "粗体", "粗偏斜体"]
      , c = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72"]
      , d = {
        family: "Arial",
        style: "常规",
        size: "16",
        okHandler: null
    };
    function r() {
        t.css({
            "font-family": d.family,
            "font-size": d.size + "pt"
        }),
        "斜体" !== d.style ? "粗体" !== d.style ? "粗偏斜体" !== d.style || t.css({
            "font-weight": "bold",
            "font-style": "italic"
        }) : t.css({
            "font-weight": "bold"
        }) : t.css({
            "font-style": "italic"
        })
    }
    function u() {
        e.remove()
    }
    return {
        show: function(t) {
            $.extend(d, t),
            $("body").append(e),
            (new comList).show({
                container: ".font .font-family",
                width: "176px",
                list: s,
                select: s.indexOf(d.family),
                isFont: !0,
                selectHandler: function(t) {
                    d.family = s[t],
                    r()
                }
            }),
            (new comList).show({
                container: ".font .font-style",
                width: "132px",
                list: o,
                select: o.indexOf(d.style),
                isFontStyle: !0,
                selectHandler: function(t) {
                    d.style = o[t],
                    r()
                }
            }),
            (new comList).show({
                container: ".font .font-size",
                width: "64px",
                list: c,
                select: c.indexOf(d.size),
                selectHandler: function(t) {
                    d.size = c[t],
                    r()
                }
            }),
            r(),
            e.find(".dialogbox").draggable({
                handle: i
            }),
            l.click(u),
            a.click(u),
            n.click(function() {
                d.okHandler({
                    family: d.family,
                    style: d.style,
                    size: d.size
                }),
                u()
            }),
            e.click(function(t) {
                t.stopPropagation()
            })
        }
    }
}()
  , $dlgGoto = function() {
    var e = $('<div class="container two"><div class="dialogbox container-box"><div class="titlebar"><p class="title">转到指定行</p><span class="close-btn" title="关闭">✖</span></div><div class="main main"><label for="">行号(L):</label><br><input class="txt-line-num" type="text" autofocus><br><input class="btn-goto btn" type="button" value="转到"><input class="btn-cancel btn" type="button" value="取消"></div></div></div>')
      , n = e.find(".close-btn")
      , l = e.find(".btn-cancel")
      , a = e.find(".btn-goto")
      , i = e.find(".txt-line-num")
      , s = e.find(".titlebar")
      , o = $('<div class="err-msg"></div>')
      , c = {
        lineNum: 1,
        totalLine: 1,
        gotoHandler: null
    };
    function d() {
        e.remove()
    }
    function r() {
        (function() {
            if ("" === i.val())
                return p("行号不能为空！"),
                !1;
            var t = Number(i.val());
            if (isNaN(t))
                return p("行号不是数字！"),
                !1;
            if (0 === t)
                return p("行号不能小于 1！"),
                i.select(),
                !1;
            if (t > c.totalLine)
                return p("行号超过了总行数！"),
                !1;
            return !0
        }
        )() && (c.gotoHandler(i.val()),
        d())
    }
    function u(t) {
        /[0-9]/.test(t.key) || (t.preventDefault(),
        p("你只能在此输入数字!"))
    }
    function p(t) {
        o.html(t),
        $(a.parent()).append(o),
        setTimeout(function() {
            o.remove(),
            i.select()
        }, 3e3)
    }
    return {
        show: function(t) {
            $.extend(c, t),
            i.focus(),
            i.select(),
            $("body").append(e),
            e.find(".dialogbox").draggable({
                handle: s
            }),
            n.click(d),
            l.click(d),
            a.click(r),
            i.keypress(u),
            e.click(function(t) {
                i.focus(),
                i.select(),
                t.stopPropagation()
            }),
            i.val(c.lineNum),
            i.select()
        }
    }
}()
  , $dlgReplace = function() {
    var e = $('<div class="change"><div class="dialogbox container-box"><div class="titlebar"><p class="title">替换</p><span class="close-btn" title="关闭">✖</span></div><div class="main main"><label>查找内容(N):<input class="txt-search" type="text" autofocus><br></label><label>替换为(P):<input class="txt-replace" type="text"><br></label><label><input type="checkbox" value="capital-sense">区分大小写(C)</label><input class="btn-search btn" type="button" value="查找下一个(F)"><input class="btn-replace btn" type="button" value="替换(R)"><input class="btn-replace-all btn" type="button" value="全部替换(A)"><input class="btn-cancel btn" type="button" value="取消"></div></div></div>')
      , n = {
        searchHandler: null,
        replaceHandler: null,
        replaceAllHandler: null
    }
      , l = e.find(".close-btn")
      , a = e.find(".btn-cancel")
      , i = e.find(".btn-search")
      , s = e.find(".btn-replace")
      , o = e.find(".btn-replace-all")
      , c = e.find(".txt-search")
      , d = e.find(".txt-replace")
      , r = e.find(".titlebar");
    function u() {
        e.remove()
    }
    function p() {
        "" !== c.val() ? f(!0) : f(!1)
    }
    function f(t) {
        t ? (i.removeAttr("disabled"),
        s.removeAttr("disabled"),
        o.removeAttr("disabled")) : (i.attr("disabled", "disabled"),
        s.attr("disabled", "disabled"),
        o.attr("disabled", "disabled"))
    }
    function t() {
        return {
            search: c.val(),
            replace: d.val(),
            capitalSense: "capital-sense" === e.find('input[type="checkbox"]:checked').val()
        }
    }
    function b() {
        n.searchHandler(t())
    }
    function h() {
        n.replaceHandler(t())
    }
    function v() {
        n.replaceAllHandler(t())
    }
    return {
        show: function(t) {
            $.extend(n, t),
            $("body").append(e),
            e.find(".dialogbox").draggable({
                handle: r
            }),
            c.val(""),
            d.val(""),
            c.focus(),
            f(e.find('input[value="capital-sense"]')[0].checked = !1),
            l.click(u),
            a.click(u),
            c.keyup(p),
            i.click(b),
            s.click(h),
            o.click(v),
            e.click(function(t) {
                c.focus(),
                t.stopPropagation()
            })
        }
    }
}()
  , $dlgSearch = function() {
    var e = $('<div class="search"><div class="dialogbox container-box"><div class="titlebar"><p class="title">查找</p><span class="close-btn" title="关闭">✖</span></div><div class="main main"><label>查找内容(N): <input class="txt-content" type="text" autofocus></label><br><label><input type="checkbox" value="capital-sense">区分大小写(C)</label><fieldset class="search-direction"><legend>方向</legend><label><input type="radio" name="direction" value="up">向上(U)</label><label><input type="radio" name="direction" value="down" checked>向下(D)</label></fieldset><input class="btn-search btn" type="button" value="查找下一个(F)" disabled><input class="btn-cancel btn" type="button" value="取消"></div></div></div>')
      , n = e.find(".close-btn")
      , l = e.find(".btn-cancel")
      , a = e.find(".btn-search")
      , i = e.find(".txt-content")
      , s = e.find(".titlebar");
    function o() {
        e.remove()
    }
    function c() {
        "" !== i.val() ? a.removeAttr("disabled") : a.attr("disabled", "disabled")
    }
    return {
        show: function(t) {
            $("body").append(e),
            e.find(".dialogbox").draggable({
                handle: s
            }),
            e.find('input[value="up"]').removeAttr("checked"),
            e.find('input[value="down"]')[0].checked = !0,
            e.find('input[type="checkbox"]').removeAttr("checked"),
            a.attr("disabled", "disabled"),
            i.val(""),
            i.focus(),
            n.click(o),
            l.click(o),
            i.keyup(c),
            a.click(function() {
                t({
                    content: i.val(),
                    capitalSense: "capital-sense" === e.find('input[type="checkbox"]:checked').val(),
                    direction: e.find('input[name="direction"]:checked').val()
                })
            }),
            i.click(function(t) {
                t.stopPropagation()
            })
        }
    }
}()
  , np = {
    config: {
        appContainer: ".box"
    },
    bShowStatusBar: !1,
    bWrap: !1,
    fontFamily: "Arial",
    fontStype: "常规",
    fontSize: "16",
    fontHandler: function(t) {
        np.fontFamily = t.family,
        np.fontStype = t.style,
        np.fontSize = t.size,
        $editor.setFont(t)
    }
};
$(function() {
    $menubar.show(np.menuData),
    $editor.show({
        posHandler: function(t, e) {
            $statusBar.setRowCol(t, e)
        },
        contentHandler: function(t) {
            $menubar.enabled(1, 6, t)
        }
    }),
    $editor.setFont({
        family: np.fontFamily,
        style: np.fontStype,
        size: np.fontSize
    }),
    $statusBar.init(),
    $statusBar.display(!1),
    $("body").click(function() {
        $menubar.hideMenu(),
        $editor.focus()
    })
}),
np.menuData = [{
    title: "文件(F)",
    menuItems: [{
        title: "新建(N)",
        shortcut: "Ctrl+N",
        enabled: !0,
        handler: function() {
            console.log("新建(N) menu clicked!")
        }
    }, {
        title: "打开(O)...",
        shortcut: "Ctrl+O",
        enabled: !0,
        handler: function() {
            console.log("打开(O) menu clicked!")
        }
    }, {
        title: "保存(S)",
        shortcut: "Ctrl+S",
        enabled: !0,
        handler: function() {
            console.log("保存(S) menu clicked!")
        }
    }, {
        title: "另存为(A)...",
        shortcut: "",
        enabled: !0,
        handler: function() {
            console.log("另存为(A) menu clicked!")
        }
    }, {
        title: "hr",
        shortcut: "",
        enabled: !0,
        handler: null
    }, {
        title: "页面设置(U)...",
        shortcut: "",
        enabled: !0,
        handler: function() {
            console.log("页面设置(U) menu clicked!")
        }
    }, {
        title: "打印(P)...",
        shortcut: "Ctrl+P",
        enabled: !0,
        handler: function() {
            console.log("打印(P) menu clicked!")
        }
    }, {
        title: "hr",
        shortcut: "",
        enabled: !0,
        handler: null
    }, {
        title: "退出(X)",
        shortcut: "",
        enabled: !0,
        handler: function() {
            console.log("退出(X) menu clicked!")
        }
    }],
    width: "202px",
    left: "0px"
}, {
    title: "编辑(E)",
    menuItems: [{
        title: "撤销(U)",
        shortcut: "Ctrl+Z",
        enabled: !1,
        handler: function() {
            console.log("撤销(U) menu clicked!")
        }
    }, {
        title: "hr",
        shortcut: "",
        enabled: !0,
        handler: null
    }, {
        title: "剪切(T)",
        shortcut: "Ctrl+X",
        enabled: !0,
        handler: function() {
            console.log("剪切(X) menu clicked!")
        }
    }, {
        title: "复制(C)",
        shortcut: "Ctrl+C",
        enabled: !1,
        handler: function() {
            console.log("复制(C) menu clicked!")
        }
    }, {
        title: "粘贴(P)",
        shortcut: "Ctrl+V",
        enabled: !1,
        handler: function() {
            console.log("粘贴(P) menu clicked!")
        }
    }, {
        title: "删除(L)",
        shortcut: "Del",
        enabled: !1,
        handler: function() {
            console.log("删除(L) menu clicked!")
        }
    }, {
        title: "hr",
        shortcut: "",
        enabled: !0,
        handler: null
    }, {
        title: "使用 Bing 搜索...",
        shortcut: "Ctrl+E",
        enabled: !0,
        handler: function() {
            $editor.bingSearch()
        }
    }, {
        title: "查找(F)...",
        shortcut: "Ctrl+F",
        enabled: !1,
        handler: function() {
            $dlgSearch.show(function(t) {
                $editor.search(t)
            })
        }
    }, {
        title: "查找下一个(N)",
        shortcut: "F3",
        enabled: !1,
        handler: function() {
            console.log("查找下一个(N) menu clicked!")
        }
    }, {
        title: "替换(R)...",
        shortcut: "Ctrl+H",
        enabled: !0,
        handler: function() {
            $dlgReplace.show({
                searchHandler: function(t) {
                    $editor.search(t)
                },
                replaceHandler: function(t) {
                    $editor.replace(t)
                },
                replaceAllHandler: function(t) {
                    $editor.replaceAll(t)
                }
            })
        }
    }, {
        title: "转到(G)...",
        shortcut: "Ctrl+G",
        enabled: !0,
        handler: function() {
            $dlgGoto.show({
                lineNum: $editor.getRow(),
                totalLine: $editor.getTotalLn(),
                gotoHandler: function(t) {
                    $editor.gotoLn(t)
                }
            })
        }
    }, {
        title: "hr",
        shortcut: "",
        enabled: !0,
        handler: null
    }, {
        title: "全选(A)",
        shortcut: "Ctrl+A",
        enabled: !0,
        handler: function() {
            $editor.selectAll()
        }
    }, {
        title: "时间/日期(D)",
        shortcut: "F5",
        enabled: !0,
        handler: function() {
            $editor.insertDataTime()
        }
    }],
    width: "218px",
    left: "52px"
}, {
    title: "格式(O)",
    menuItems: [{
        title: "自动换行(W)",
        shortcut: "",
        enabled: !0,
        handler: function() {
            np.bWrap = !np.bWrap,
            np.bWrap ? ($statusBar.display(!1),
            $editor.resize(!1),
            $menubar.enabled(3, 0, !1),
            $menubar.enabled(1, 9, !1)) : ($statusBar.display(np.bShowStatusBar),
            $editor.resize(np.bShowStatusBar),
            $menubar.enabled(3, 0, !0),
            $menubar.enabled(1, 9, !0),
            $menubar.checked(3, 0, np.bShowStatusBar)),
            $menubar.checked(2, 0, np.bWrap),
            $editor.setWrap(np.bWrap)
        }
    }, {
        title: "字体(F)...",
        shortcut: "",
        enabled: !0,
        handler: function() {
            $dlgFont.show({
                family: np.fontFamily,
                style: np.fontStyle,
                size: np.fontSize,
                okHandler: np.fontHandler
            })
        }
    }],
    width: "156px",
    left: "106px"
}, {
    title: "查看(V)",
    menuItems: [{
        title: "状态栏(S)",
        shortcut: "",
        enabled: !0,
        handler: function() {
            np.bShowStatusBar = !np.bShowStatusBar,
            $statusBar.display(np.bShowStatusBar),
            $menubar.checked(3, 0, np.bShowStatusBar),
            $editor.resize(np.bShowStatusBar)
        }
    }],
    width: "138px",
    left: "162px"
}, {
    title: "帮助(H)",
    menuItems: [{
        title: "查看帮助(H)",
        shortcut: "",
        enabled: !0,
        handler: function() {
            window.open("https://cn.bing.com/search?q=获取有关+windows+10+中的记事本的帮助", "_blank")
        }
    }, {
        title: "关于记事本(A)",
        shortcut: "",
        enabled: !0,
        handler: function() {
            $dlgAbout.show()
        }
    }],
    width: "166px",
    left: "216px"
}];
