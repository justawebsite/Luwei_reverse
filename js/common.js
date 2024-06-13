function Swipe(a, b) {
    "use strict";

    function c() {
        d()
    }

    function d(c) {
        u = window.visualViewport && window.visualViewport.width ? window.visualViewport.width : window.innerWidth, q = v.children, t = q.length, x = parseInt(c || 0, 10) || x, q.length < 2 && (b.continuous = !1), p.transitions && b.continuous && q.length < 3 && (v.appendChild(q[0].cloneNode(!0)), v.appendChild(v.children[1].cloneNode(!0)), q = v.children), r = new Array(q.length), s = a.offsetWidth || a.getBoundingClientRect().width, v.style.width = q.length * s + "px";

        for (var d = q.length; d--;) {
            var e = q[d];
            e.style.width = s + "px",
                e.setAttribute("data-index", d),
                p.transitions && (e.style.left = d * -s + "px", i(d, x > d ? -s : d > x ? s : 0, 0))
        }

        b.continuous && p.transitions && (i(g(x - 1), -s, 0), i(g(x + 1), s, 0)),
            p.transitions || (v.style.left = x * -s + "px"),
            a.style.visibility = "visible"
    }

    function e() {
        b.continuous ? h(x - 1) : x && h(x - 1)
    }

    function f() {
        b.continuous ? h(x + 1) : x >= q.length - 1 ? b.endCallback && b.endCallback(q.length - 1, q[q.length - 1], !0) : h(x + 1)
    }

    function g(a) {
        return (q.length + a % q.length) % q.length
    }

    function h(a, c) {
        if (x != a) {
            if (p.transitions) {
                var d = Math.abs(x - a) / (x - a);

                if (b.continuous) {
                    var e = d;
                    d = -r[g(a)] / s,
                        d !== e && (a = -d * q.length + a)
                }

                for (var f = Math.abs(x - a) - 1; f--;) i(g((a > x ? a : x) - f - 1), s * d, 0);
                a = g(a),
                    i(x, s * d, c || y),
                    i(a, 0, c || y),
                    b.continuous && i(g(a - d), -(s * d), 0)
            } else a = g(a),
                k(x * -s, a * -s, c || y);
            x = a,
                o(b.callback && b.callback(x, q[x], d))
        }
    }

    function i(a, b, c) {
        j(a, b, c),
            r[a] = b
    }

    function j(a, b, c) {
        var d = q[a],
            e = d && d.style;
        e && (e.webkitTransitionDuration = e.MozTransitionDuration = e.msTransitionDuration = e.OTransitionDuration = e.transitionDuration = c + "ms", e.webkitTransform = "translate(" + b + "px,0)translateZ(0)", e.msTransform = e.MozTransform = e.OTransform = "translateX(" + b + "px)")
    }

    function k(a, c, d) {
        if (!d) return void(v.style.left = c + "px");

        var e = +new Date,
            f = setInterval(function() {
                    var g = +new Date - e;
                    return g > d ? (v.style.left = c + "px", B && l(), b.transitionEnd && b.transitionEnd.call(event, x, q[x]), void clearInterval(f)) : void(v.style.left = (c - a) * (Math.floor(g / d * 100) / 100) + a + "px")
                }

                , 4)
    }

    function l() {
        z = setTimeout(f, B)
    }

    function m() {
        B = 0,
            clearTimeout(z)
    }

    var n = function() {}

        ,
        o = function(a) {
            setTimeout(a || n, 0)
        }

        ,
        p = {

            addEventListener: !!window.addEventListener,
            touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            transitions: function(a) {
                var b = ["transitionProperty",
                    "WebkitTransition",
                    "MozTransition",
                    "OTransition",
                    "msTransition"
                ];
                for (var c in b)
                    if (void 0 !== a.style[b[c]]) return !0;
                return !1
            }

            (document.createElement("swipe"))
        }

    ;

    if (a) {
        var q,
            r,
            s,
            t,
            u,
            v = a.children[0],
            w = !0;

        b = b || {}

        ;
        var x = parseInt(b.startSlide, 10) || 0,
            y = b.speed || 300;
        b.continuous = void 0 !== b.continuous ? b.continuous : !0;

        var z,
            A,
            B = b.auto || 0,
            C = {}

            ,
            D = {}

            ,
            E = {
                handleEvent: function(a) {
                        switch (a.type) {
                            case "touchstart":
                                this.start(a);
                                break;
                            case "touchmove":
                                this.move(a);
                                break;
                            case "touchend":
                                o(this.end(a));
                                break;
                            case "webkitTransitionEnd":
                            case "msTransitionEnd":
                            case "oTransitionEnd":
                            case "otransitionend":
                            case "transitionend":
                                o(this.transitionEnd(a));
                                break;
                            case "resize":
                                o(c)
                        }

                        b.stopPropagation && a.stopPropagation()
                    }

                    ,
                start: function(a) {
                        var b = a.touches[0],
                            c = b.target.tagName.toLowerCase(),
                            d = "img" == c ? b.target : b.target.querySelector("img");

                        if (C = {
                                x: b.pageX,
                                y: b.pageY,
                                time: +new Date
                            }

                            , A = void 0, D = {}

                            , d && d.hasAttribute("data-scale")) scale = parseFloat(d.getAttribute("data-scale")),
                            w = scale > 0 && scale < 1.2 ? !0 : !1;

                        else {
                            var e = window.visualViewport && window.visualViewport.width ? window.visualViewport.width : window.innerWidth;
                            w = e >= Math.floor(.99 * u) && u >= e ? !0 : !1
                        }

                        v.addEventListener("touchmove", this, !1),
                            v.addEventListener("touchend", this, !1)
                    }

                    ,
                move: function(a) {
                        if (w && !(a.touches.length > 1 || a.scale && 1 !== a.scale)) {
                            b.disableScroll && a.preventDefault();
                            var c = a.touches[0];

                            D = {
                                    x: c.pageX - C.x,
                                    y: c.pageY - C.y
                                }

                                ,
                                "undefined" == typeof A && (A = !!(A || Math.abs(D.x) < Math.abs(D.y))),
                                A || (a.preventDefault(), m(), b.continuous ? (j(g(x - 1), D.x + r[g(x - 1)], 0), j(x, D.x + r[x], 0), j(g(x + 1), D.x + r[g(x + 1)], 0)) : (D.x = D.x / (!x && D.x > 0 || x == q.length - 1 && D.x < 0 ? Math.abs(D.x) / s + 1 : 1), j(x - 1, D.x + r[x - 1], 0), j(x, D.x + r[x], 0), j(x + 1, D.x + r[x + 1], 0)))
                        }
                    }

                    ,
                end: function(a) {
                        if (w) {
                            var c = +new Date - C.time,
                                d = Number(c) < 250 && Math.abs(D.x) > 20 || Math.abs(D.x) > s / 2,
                                e = !x && D.x > 0 || x == q.length - 1 && D.x < 0,
                                f = x == q.length - 1 && D.x < 0;
                            b.continuous && (e = !1);
                            var h = D.x < 0;
                            A || (d && !e ? (h ? (b.continuous ? (i(g(x - 1), -s, 0), i(g(x + 2), s, 0)) : i(x - 1, -s, 0), i(x, r[x] - s, y), i(g(x + 1), r[g(x + 1)] - s, y), x = g(x + 1)) : (b.continuous ? (i(g(x + 1), s, 0), i(g(x - 2), -s, 0)) : i(x + 1, s, 0), i(x, r[x] + s, y), i(g(x - 1), r[g(x - 1)] + s, y), x = g(x - 1)), b.callback && b.callback(x, q[x], h)) : (b.continuous ? (i(g(x - 1), -s, y), i(x, 0, y), i(g(x + 1), s, y)) : (i(x - 1, -s, y), i(x, 0, y), i(x + 1, s, y)), f && b.endCallback && b.endCallback(x, q[x], h))),
                                v.removeEventListener("touchmove", E, !1),
                                v.removeEventListener("touchend", E, !1)
                        }
                    }

                    ,
                transitionEnd: function(a) {
                    parseInt(a.target.getAttribute("data-index"), 10) == x && (B && l(), b.transitionEnd && b.transitionEnd.call(a, x, q[x]))
                }
            }

        ;

        return d(),
            B && l(),
            p.addEventListener ? (p.touch && v.addEventListener("touchstart", E, !1), p.transitions && (v.addEventListener("webkitTransitionEnd", E, !1), v.addEventListener("msTransitionEnd", E, !1), v.addEventListener("oTransitionEnd", E, !1), v.addEventListener("otransitionend", E, !1), v.addEventListener("transitionend", E, !1)), window.addEventListener("resize", E, !1)) : window.onresize = function() {
                c()
            }

            , {

                slides: q,
                setup: function(a) {
                        d(a)
                    }

                    ,
                slide: function(a, b) {
                        m(),
                            h(a, b)
                    }

                    ,
                prev: function() {
                        m(),
                            e()
                    }

                    ,
                next: function() {
                        m(),
                            f()
                    }

                    ,
                stop: function() {
                        m()
                    }

                    ,
                getPos: function() {
                        return x
                    }

                    ,
                getNumSlides: function() {
                        return t
                    }

                    ,
                kill: function() {
                    m(),
                        v.style.width = "",
                        v.style.left = "";

                    for (var a = q.length; a--;) {
                        var b = q[a];
                        b.style.width = "",
                            b.style.left = "",
                            p.transitions && j(a, 0, 0)
                    }

                    p.addEventListener ? (v.removeEventListener("touchstart", E, !1), v.removeEventListener("webkitTransitionEnd", E, !1), v.removeEventListener("msTransitionEnd", E, !1), v.removeEventListener("oTransitionEnd", E, !1), v.removeEventListener("otransitionend", E, !1), v.removeEventListener("transitionend", E, !1), window.removeEventListener("resize", E, !1)) : window.onresize = null
                }
            }
    }
}

! function(a, b, c) {

    b[a] = b[a] || c(),
        "undefined" != typeof module && module.exports ? module.exports = b[a] : "function" == typeof define && define.amd && define(function() {
            return b[a]
        })
}

("Promise", "undefined" != typeof global ? global : this, function() {
    "use strict";

    function a(a, b) {
        m.add(a, b), l || (l = o(m.drain))
    }

    function b(a) {
        var b, c = typeof a;
        return null == a || "object" != c && "function" != c || (b = a.then), "function" == typeof b ? b : !1
    }

    function c() {
        for (var a = 0; a < this.chain.length; a++) d(this, 1 === this.state ? this.chain[a].success : this.chain[a].failure, this.chain[a]);
        this.chain.length = 0
    }

    function d(a, c, d) {
        var e, f;
        try {
            c === !1 ? d.reject(a.msg) : (e = c === !0 ? a.msg : c.call(void 0, a.msg), e === d.promise ? d.reject(TypeError("Promise-chain cycle")) : (f = b(e)) ? f.call(e, d.resolve, d.reject) : d.resolve(e))
        } catch (g) {
            d.reject(g)
        }
    }

    function e(d) {
        var g, i = this;
        if (!i.triggered) {
            i.triggered = !0, i.def && (i = i.def);
            try {
                (g = b(d)) ? a(function() {
                    var a = new h(i);
                    try {
                        g.call(d, function() {
                                e.apply(a, arguments)
                            }

                            ,
                            function() {
                                f.apply(a, arguments)
                            })
                    } catch (b) {
                        f.call(a, b)
                    }
                }): (i.msg = d, i.state = 1, i.chain.length > 0 && a(c, i))
            } catch (j) {
                f.call(new h(i), j)
            }
        }
    }

    function f(b) {
        var d = this;
        d.triggered || (d.triggered = !0, d.def && (d = d.def), d.msg = b, d.state = 2, d.chain.length > 0 && a(c, d))
    }

    function g(a, b, c, d) {
        for (var e = 0; e < b.length; e++) ! function(e) {
            a.resolve(b[e]).then(function(a) {
                    c(e, a)
                }

                , d)
        }

        (e)
    }

    function h(a) {
        this.def = a, this.triggered = !1
    }

    function i(a) {
        this.promise = a, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
    }

    function j(b) {
        if ("function" != typeof b) throw TypeError("Not a function");
        if (0 !== this.__NPO__) throw TypeError("Not a promise");
        this.__NPO__ = 1;
        var d = new i(this);
        this.then = function(b, e) {
                var f = {
                    success: "function" == typeof b ? b : !0,
                    failure: "function" == typeof e ? e : !1
                }

                ;
                return f.promise = new this.constructor(function(a, b) {
                    if ("function" != typeof a || "function" != typeof b) throw TypeError("Not a function");
                    f.resolve = a, f.reject = b
                }), d.chain.push(f), 0 !== d.state && a(c, d), f.promise
            }

            , this["catch"] = function(a) {
                return this.then(void 0, a)
            }

        ;
        try {
            b.call(void 0, function(a) {
                    e.call(d, a)
                }

                ,
                function(a) {
                    f.call(d, a)
                })
        } catch (g) {
            f.call(d, g)
        }
    }

    var k, l, m, n = Object.prototype.toString,
        o = "undefined" != typeof setImmediate ? function(a) {
            return setImmediate(a)
        }

        :
        setTimeout;
    try {
        Object.defineProperty({}

            , "x", {}), k = function(a, b, c, d) {
            return Object.defineProperty(a, b, {
                value: c,
                writable: !0,
                configurable: d !== !1
            })
        }
    } catch (p) {
        k = function(a, b, c) {
            return a[b] = c, a
        }
    }

    m = function() {
        function a(a, b) {
            this.fn = a, this.self = b, this.next = void 0
        }

        var b, c, d;
        return {
            add: function(e, f) {
                    d = new a(e, f), c ? c.next = d : b = d, c = d, d = void 0
                }

                ,
            drain: function() {
                var a = b;
                for (b = c = l = void 0; a;) a.fn.call(a.self), a = a.next
            }
        }
    }

    ();
    var q = k({}

        , "constructor", j, !1);
    return j.prototype = q, k(q, "__NPO__", 0, !1), k(j, "resolve", function(a) {
        var b = this;
        return a && "object" == typeof a && 1 === a.__NPO__ ? a : new b(function(b, c) {
            if ("function" != typeof b || "function" != typeof c) throw TypeError("Not a function");
            b(a)
        })

    }), k(j, "reject", function(a) {
        return new this(function(b, c) {
            if ("function" != typeof b || "function" != typeof c) throw TypeError("Not a function");
            c(a)
        })

    }), k(j, "all", function(a) {
        var b = this;
        return "[object Array]" != n.call(a) ? b.reject(TypeError("Not an array")) : 0 === a.length ? b.resolve([]) : new b(function(c, d) {
            if ("function" != typeof c || "function" != typeof d) throw TypeError("Not a function");
            var e = a.length,
                f = Array(e),
                h = 0;
            g(b, a, function(a, b) {
                    f[a] = b, ++h === e && c(f)
                }

                , d)
        })

    }), k(j, "race", function(a) {
        var b = this;
        return "[object Array]" != n.call(a) ? b.reject(TypeError("Not an array")) : new b(function(c, d) {
            if ("function" != typeof c || "function" != typeof d) throw TypeError("Not a function");
            g(b, a, function(a, b) {
                    c(b)
                }

                , d)
        })
    }), j

}),
H.Xhr = function(win) {

    var doc = document,
        before,
        defaultXdrResponseType = "json",
        limit = null,
        requests = 0,
        request_stack = [],
        getXHR = function() {
            return win.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")
        }

        ,
        xhr2 = "" === getXHR().responseType,
        qwest = function(method, url, data, options, before) {

            method = method.toUpperCase(),
                data = data || null,
                options = options || {}

                ,
                options.withCredentials = !0;

            var nativeResponseParsing = !1,
                crossOrigin,
                xhr,
                xdr = !1,
                timeoutInterval,
                aborted = !1,
                retries = 0,
                headers = {}

                ,
                mimeTypes = {
                    text: "*/*",
                    xml: "text/xml",
                    json: "application/json",
                    arraybuffer: null,
                    formdata: null,
                    document: null,
                    file: null,
                    blob: null,
                    image: "image/jpeg"
                }

                ,
                contentType = "Content-Type",
                vars = "",
                i,
                j,
                serialized,
                then_stack = [],
                catch_stack = [],
                complete_stack = [],
                response,
                success,
                error,
                func,
                promises = {
                    then: function(a) {
                            return options.async ? then_stack.push(a) : success && a.call(xhr, response), promises
                        }

                        ,
                    "catch": function(a) {
                            return options.async ? catch_stack.push(a) : error && a.call(xhr, response), promises
                        }

                        ,
                    complete: function(a) {
                            return options.async ? complete_stack.push(a) : a.call(xhr), promises
                        }

                        ,
                    cancel: function() {
                        clearTimeout(timeoutInterval),
                            aborted = !0,
                            xhr.abort()
                    }
                }

                ,
                promises_limit = {
                    then: function(a) {
                            return request_stack[request_stack.length - 1].then.push(a),
                                promises_limit
                        }

                        ,
                    "catch": function(a) {
                            return request_stack[request_stack.length - 1]["catch"].push(a),
                                promises_limit
                        }

                        ,
                    complete: function(a) {
                        return request_stack[request_stack.length - 1].complete.push(a),
                            promises_limit
                    }
                }

                ,
                handleResponse = function() {
                    if (clearTimeout(timeoutInterval), !aborted) {
                        var i,
                            req,
                            p,
                            responseType;

                        if (--requests, request_stack.length) {
                            for (req = request_stack.shift(), p = qwest(req.method, req.url, req.data, req.options, req.before), i = 0; func = req.then[i]; ++i) p.then(func);
                            for (i = 0; func = req["catch"][i]; ++i) p["catch"](func);
                            for (i = 0; func = req.complete[i]; ++i) p.complete(func)
                        }

                        try {
                            var status = xhr.status,
                                protocol = /^([\w-]+:)\/\//.test(url) ? RegExp.$1 : window.location.protocol;
                            if (!(status >= 200 && 300 > status || 304 == status || 0 == status && "file:" == protocol)) throw status;
                            var responseText = "responseText",
                                responseXML = "responseXML",
                                parseError = "parseError";
                            if (nativeResponseParsing && "response" in xhr && null !== xhr.response) response = xhr.response;

                            else if ("document" == options.responseType) {
                                var div = doc.createElement("div");
                                div.innerHTML = xhr.response,
                                    response = div,
                                    div = null
                            } else {
                                if (responseType = options.responseType, "auto" == responseType)
                                    if (xdr) responseType = defaultXdrResponseType;

                                    else switch (xhr.getResponseHeader(contentType)) {
                                        case mimeTypes.json:
                                            responseType = "json";
                                            break;
                                        case mimeTypes.xml:
                                            responseType = "xml";
                                            break;
                                        default:
                                            responseType = "text"
                                    }

                                switch (responseType) {
                                    case "json":
                                        try {
                                            response = "JSON" in win ? JSON.parse(xhr[responseText]) : eval("(" + xhr[responseText] + ")")
                                        } catch (e) {
                                            throw "解析内容失败"
                                        }

                                        break;

                                    case "xml":
                                        try {
                                            win.DOMParser ? response = (new DOMParser).parseFromString(xhr[responseText], "text/xml") : (response = new ActiveXObject("Microsoft.XMLDOM"), response.async = "false", response.loadXML(xhr[responseText]))
                                        } catch (e) {
                                            response = void 0
                                        }

                                        if (!response || !response.documentElement || response.getElementsByTagName("parsererror").length) throw "Invalid XML";
                                        break;
                                    default:
                                        response = xhr[responseText]
                                }
                            }

                            if (success = !0, p = response, options.async)
                                for (i = 0; func = then_stack[i]; ++i) p = func.call(xhr, p)
                        } catch (e) {
                            if (error = !0, options.async)
                                for (i = 0; func = catch_stack[i]; ++i) func.call(xhr, e)
                        }

                        if (options.async)
                            for (i = 0; func = complete_stack[i]; ++i) func.call(xhr)
                    }
                }

                ,
                buildData = function(a, b) {
                    var c,
                        d = [],
                        e = encodeURIComponent;

                    if ("object" == typeof a && null != a) {
                        for (c in a)
                            if (a.hasOwnProperty(c)) {
                                var f = buildData(a[c], b ? b + "[" + c + "]" : c);
                                "" !== f && (d = d.concat(f))
                            }
                    } else null != a && null != b && d.push(e(b) + "=" + e(a));
                    return d.join("&")
                }

            ;

            switch (++requests, options.async = "async" in options ? !!options.async : !0, options.cache = "cache" in options ? !!options.cache : "GET" != method, options.dataType = "dataType" in options ? options.dataType.toLowerCase() : "post", options.responseType = "responseType" in options ? options.responseType.toLowerCase() : "auto", options.user = options.user || "", options.password = options.password || "", options.withCredentials = !!options.withCredentials, options.timeout = options.timeout ? parseInt(options.timeout, 10) : 3e4, options.retries = options.retries ? parseInt(options.retries, 10) : 1, i = url.match(/\/\/(.+?)\//), crossOrigin = i && i[1] ? i[1] != location.host : !1, "ArrayBuffer" in win && data instanceof ArrayBuffer ? options.dataType = "arraybuffer" : "Blob" in win && data instanceof Blob ? options.dataType = "blob" : "Document" in win && data instanceof Document ? options.dataType = "document" : "FormData" in win && data instanceof FormData && (options.dataType = "formdata"), options.dataType) {
                case "json":
                    data = JSON.stringify(data);
                    break;
                case "post":
                    data = buildData(data)
            }

            if (H.Util && "ios" === H.Util.device && (headers = {
                    "User-Agent": navigator.userAgent

                }), options.headers) {
                var format = function(a, b, c) {
                    return b + c.toUpperCase()
                }

                ;
                for (i in options.headers) headers[i.replace(/(^|-)([^-])/g, format)] = options.headers[i]
            }

            if (headers[contentType] || "GET" == method || (options.dataType in mimeTypes ? mimeTypes[options.dataType] && (headers[contentType] = mimeTypes[options.dataType]) : headers[contentType] = "application/x-www-form-urlencoded"), headers.Accept || (headers.Accept = options.responseType in mimeTypes ? mimeTypes[options.responseType] : "*/*"), crossOrigin || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest"), "GET" == method && (vars += data), options.cache || (vars && (vars += "&"), vars += "__t=" + +new Date), vars && (url += (/\?/.test(url) ? "&" : "?") + vars), limit && requests == limit) return request_stack.push({
                    method: method,
                    url: url,
                    data: data,
                    options: options,
                    before: before,
                    then: [],
                    "catch": [],
                    complete: []
                }),
                promises_limit;

            var send = function() {
                    if (xhr = getXHR(), crossOrigin && ("withCredentials" in xhr || !win.XDomainRequest || (xhr = new XDomainRequest, xdr = !0, "GET" != method && "POST" != method && (method = "POST"))), xdr ? xhr.open(method, url) : (xhr.open(method, url, options.async, options.user, options.password), xhr2 && options.async && (xhr.withCredentials = options.withCredentials)), !xdr)
                        for (var a in headers) xhr.setRequestHeader(a, headers[a]);

                    if (xhr2 && "document" != options.responseType) try {
                        xhr.responseType = options.responseType,
                            nativeResponseParsing = xhr.responseType == options.responseType
                    }

                    catch (b) {}

                    xhr2 || xdr ? xhr.onload = handleResponse : xhr.onreadystatechange = function() {
                            4 == xhr.readyState && handleResponse()
                        }

                        ,
                        "auto" !== options.responseType && "overrideMimeType" in xhr && xhr.overrideMimeType(mimeTypes[options.responseType]),
                        before && before.call(xhr),
                        xdr ? setTimeout(function() {
                                xhr.send()
                            }

                            , 0) : xhr.send("GET" != method ? data : null)
                }

                ,
                timeout = function() {
                    timeoutInterval = setTimeout(function() {
                            if (aborted = !0, xhr.abort(), options.retries && ++retries == options.retries) {
                                if (aborted = !1, error = !0, response = "超时", options.async)
                                    for (i = 0; func = catch_stack[i]; ++i) func.call(xhr, response)
                            } else aborted = !1, timeout(), send()
                        }

                        , options.timeout)
                }

            ;
            return timeout(),
                send(),
                promises
        }

        ,
        create = function(a) {
            return function(b, c, d) {
                var e = before;
                return before = null,
                    qwest(a, b, c, d, e)
            }
        }

        ,
        obj = {
            before: function(a) {
                    return before = a,
                        obj
                }

                ,
            get: create("GET"),
            post: create("POST"),
            put: create("PUT"),
            "delete": create("DELETE"),
            xhr2: xhr2,
            limit: function(a) {
                    limit = a
                }

                ,
            setDefaultXdrResponseType: function(a) {
                defaultXdrResponseType = a.toLowerCase()
            }
        }

    ;
    return obj
}

(window),
H.Util.device = function() {

    var a = navigator.userAgent,
        b = a.match(/Hox/),
        c = a.match(/(Edge\/|rv:).*?([\d]+)/),
        d = a.match(/(Android).*?[\s\/]+(\d+)\.(\d+)/),
        e = a.match(/(iPhone|iPad|iPod).*?(\d+)_(\d+)/i),
        f = "MacIntel" === navigator.platform,
        g = {
            platform: null,
            version: null
        }

        ,
        h = screen.width,
        i = screen.height,
        j = !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch);
    return !e && f && j && (e = [0, 0, g.version || 13]),
        b ? g.platform = "desktop" : c ? (g.platform = "uwp", g.version = parseInt(c[2] || g.version, 10)) : d ? (g.platform = "android", g.version = d[2] + d[3] || 40, g.version = parseInt(g.version && g.version.replace(/\./, ""), 10)) : e && (g.platform = "ios", g.version = parseInt(e[2] || g.version, 10), g.iPhoneX = 375 === h && 812 === i || 414 === h && 896 === i || 360 === h && 780 === i || 390 === h && 844 === i || 428 === h && 926 === i),
        g
}

(),
H.Util.getForumName = function(a) {
        var b = "";
        if (!a) return b;
        var c = JSON.parse(JSON.stringify(H.ForumList));

        c.push({
                id: -1,
                name: "时间线"
            }

            , {
                id: "t1",
                name: "综合线"
            }

            , {
                id: "t2",
                name: "岛风线"
            }

            , {
                id: "t3",
                name: "游戏线"
            }

            , {
                id: "t4",
                name: "亚文化线"
            });

        for (var d = 0, e = c.length; e > d; d++)
            if (c[d].id == a) {
                b = c[d].name;
                break
            }

        return b
    }

    ,
    H.Util.getForumId = function(a) {
        var b = "";
        if (!a) return b;
        var c = JSON.parse(JSON.stringify(H.ForumList));

        c.push({
            id: -1,
            name: "时间线"
        });

        for (var d = 0, e = c.length; e > d; d++)
            if (c[d].name == a) {
                b = c[d].id;
                break
            }

        return b
    }

    ,
    H.Util.formatFloat = function(a, b) {
        return b = b || 1,
            Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
    }

    ,
    H.Util.moveCaretToEnd = function(a) {
        if ("number" == typeof a.selectionStart) a.selectionStart = a.selectionEnd = a.value.length;

        else if ("undefined" != typeof a.createTextRange) {
            a.focus();
            var b = a.createTextRange();
            b.collapse(!1),
                b.select()
        }
    }

    ,
    H.Util.enterFullScreen = function() {
        window.StatusBar && window.StatusBar.enterFullScreen && "ios" != H.Util.device.platform ? window.StatusBar.enterFullScreen() : !document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement
    }

    ,
    H.Util.exitFullScreen = function() {
        window.StatusBar && window.StatusBar.exitFullScreen && "ios" != H.Util.device.platform ? window.StatusBar.exitFullScreen() : document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
    }

    ,
    H.Util.backwardCompatible = function(a) {
        if (!a.threads) return a;

        var b = function(a) {
                var b = {}

                ;

                if (b.id = a.id, b.userid = a.uid, b.name = a.name, b.title = a.title, b.email = a.email, b.content = a.content, b.fileName = a.fileName, b.replyCount = a.replyCount, b.now = a.createdAt, "sage" in a && (b.sage = a.sage && "0" != a.sage ? "1" : "0"), a.image) {
                    var c = a.image,
                        d = c.lastIndexOf(".");
                    b.img = c.slice(0, d),
                        b.ext = c.slice(d)
                }

                return b
            }

            ,
            c = {}

        ;

        return c = b(a.threads),
            c.replys = [],
            a.replys.forEach(function(a) {
                c.replys.push(b(a))
            }),
            c
    }

    ,
    H.Util.addEventListener = function(a, b, c) {

        b = b.trim().split(/\s+/g),
            b.forEach(function(b) {
                a.addEventListener(b, c, window.isPassiveListenerSupported ? {
                        passive: !1
                    }

                    :
                    !1)
            })
    }

    ,
    H.Util.removeEventListener = function(a, b, c) {

        b = b.trim().split(/\s+/g),
            b.forEach(function(b) {
                a.removeEventListener(b, c, window.isPassiveListenerSupported ? {
                        passive: !1
                    }

                    :
                    !1)
            })
    }

    ,
    H.Util.getDate = function(a) {
        if (!a) return "";
        a = isNaN(a) ? a.replace(/\((.*?)\)/, " ").replace(/-/g, "/") : a;
        var b = new Date(a);
        return b.getFullYear() + "/" + (b.getMonth() + 1) + "/" + b.getDate()
    }

    ,
    H.Util.getTime = function(a) {
        var b = new Date,
            c = b.getMonth() + 1,
            d = b.getSeconds(),
            e = b.getFullYear() + "-" + (10 > c ? "0" : "") + c + "-" + (b.getDate() < 10 ? "0" : "") + b.getDate() + " " + (b.getHours() < 10 ? "0" : "") + b.getHours() + ":" + (b.getMinutes() < 10 ? "0" : "") + b.getMinutes() + ":" + (10 > d ? "0" : "") + d;
        return a && (e = e.replace(/-/g, "").replace(/:/g, "").replace(/ /g, "")),
            e
    }

    ,
    H.Util.getMimeType = function(a) {
        var b = /^image\//;
        return b.test(a) ? (a = a.replace(b, ""), a || (a = "jpg")) : a = "jpg", a
    }

    ,
    H.Util.throttle = function(a, b) {
        var c = null;

        return function() {
            var d = this,
                e = arguments;

            clearTimeout(c),
                c = setTimeout(function() {
                        a.apply(d, e)
                    }

                    , b)
        }
    }

    ,
    H.Util.findParent = function(a, b, c) {
        for (var d = b.charAt(0), e = "#" === d ? "id" : "." === d ? "class" : "[" === d ? "attribute" : "tag", c = c || "body", f = window.Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector), g = a.parentElement; g;) {
            if (f && (g.matches ? g.matches(c) : g.webkitMatchesSelector(c)) || "body" == g.nodeName.toLowerCase()) return null;

            if ("id" == e) {
                if (g.id == b.slice(1)) break
            } else if ("class" == e) {
                var h = g.classList;
                if (h && h.contains(b.slice(1))) break
            } else if ("tag" == e) {
                if (g.nodeName.toLowerCase() == b) break
            } else if ("attribute" == e && (b = b.replace(/(\[)|(\])/g, ""), null !== g.getAttribute(b))) break;
            g = g.parentElement
        }

        return g
    }

    ,
    H.Util.generateUUID = function() {

        var a = (new Date).getTime(),
            b = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(b) {
                var c = (a + 16 * Math.random()) % 16 | 0;
                return a = Math.floor(a / 16), ("x" == b ? c : 7 & c | 8).toString(16)
            });
        return b
    }

    ,
    H.Util.scrollToTop = function(a) {
        var b = a.scrollTop;
        b > 0 && (a.scrollTop = .7 * b, setTimeout(this.scrollToTop.bind(this, a), 20))
    }

    ,
    H.Util.scrollToBottom = function(a) {
        var b = a.scrollHeight || body.scrollHeight,
            c = a.scrollTop || body.scrollTop,
            d = a.clientHeight || doc.documentElement.clientHeight || body.clientHeight;
        c = 0 == c ? 1 : c, console.log(c), b - 50 > c + d && (a.scrollTop = 2 * c, setTimeout(this.scrollToBottom.bind(this, a), 20))
    }

    ,
    H.Util.handleEmoji = function(a, b) {
        a = a || "",
            b = b || '<span class="emoji" data-emoji="$&"></span>';
        var c = ["�[�-�]",
            "�[�-�]",
            "�[�-�]"
        ];

        return a.replace(new RegExp(c.join("|"), "g"), function(a) {
            return emojione.toShort(a)
        })
    }

    ,
    H.Util.typeValidates = function(a) {
        var b = document.createElement("input");
        return b.setAttribute("type", a),
            b.value = "",
            b.type == a && (/search|tel/.test(a) || "" != b.value || !b.checkValidity())
    }

    ,
    H.Util.clearArray = function(a) {
        for (; a.length > 0;) a.pop()
    }

    ,
    H.Util.uniqueArray = function(a) {
        for (var b = [], c = 0; c < a.length; c++) - 1 === b.indexOf(a[c]) && b.push(a[c]);
        return b
    }

    ,
    H.Util.showImage = function(a, b) {
        var c = document.createElement("img");
        if ("base64" == b) c.setAttribute("src", a);

        else {
            var d = window.URL || window.webkitURL,
                e = d.createObjectURL(a);

            c.setAttribute("src", e),
                c.onload = function(a) {
                    d.revokeObjectURL(this.src),
                        this.onload = null
                }
        }

        return c
    }

    ,
    H.Util.showLocalImage = function(a, b) {
        for (var c = a || [], d = 0, e = c.length; e > d; d++) {
            var f = c[d],
                g = b + f.getAttribute("local-src");

            f.className = "local-image",
                f.setAttribute("src", g),
                f.onerror = function() {
                    this.onerror = null,
                        H.Util.reloadImage(this)
                }
        }
    }

    ,
    H.Util.reloadImage = function(a, b) {
        var c = a.getAttribute("thumb-src") || a.getAttribute("src");

        c && (b && (c += "?r=" + (new Date).valueOf()), a.onload = null, a.onerror = null, a.setAttribute("src", c), a.setAttribute("full-size-src", a.getAttribute("full-size-src")), a.classList.remove("image-error"), a.classList.remove("image-click-to-load"), a.classList.add("image-placeholder"), a.classList.add("image-loading"), a.onload = function() {
                this.onload = null, this.onerror = null, this.classList.remove("image-placeholder"), this.classList.remove("image-click-to-load"), this.classList.remove("image-loading"), this.classList.remove("image-error")
            }

            , a.onerror = function() {
                var b = parseInt(a.getAttribute("data-retry"), 10) || 0;
                if (b < H.Current.api.cdn.length - 1) {
                    var d = H.Current.api.cdn,
                        e = d.filter(function(a) {
                            return c.indexOf(a) > -1
                        });
                    e = e.length > 0 && e[0], c = e ? c.replace(e, d[++b]) : c, a.setAttribute("data-retry", e ? b : H.Current.api.cdn.length), a.setAttribute("src", c)
                } else this.onerror = null, this.classList.remove("image-placeholder"), this.classList.remove("image-click-to-load"), this.classList.remove("image-loading"), this.classList.add("image-error")
            })
    }

    ,
    H.Util.generateThumbnail = function(a, b, c, d) {
        b = b || 150,
            c = c || .8;
        var e = a.naturalWidth,
            f = a.naturalHeight,
            g = e,
            h = f,
            i = e / f;
        (e > b || f > b) && (e > f ? (g = e > b ? b : e, h = g / i) : (h = f > b ? b : f, g = h * i));
        var j = document.createElement("canvas");
        j.width = g,
            j.height = h;
        var k = j.getContext("2d");
        k.fillStyle = "#fff",
            k.fillRect(0, 0, g, h),
            k.drawImage(a, 0, 0, g, h);
        var l = j.toDataURL("image/jpeg", c);
        return d || (l = dataURLtoBlob(l)),
            l
    }

    ,
    H.Util.freeImageMemory = function(a) {
        [].slice.call(a).forEach(function(a) {
            a.setAttribute("src", H.BlankURL || "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=")
        })
    }

    ,
    H.Util.createDirectory = function(a, b) {
        return new Promise(function(c, d) {
            "/" == a.charAt(a.length - 1) && (a = a.slice(0, a.length - 1));
            var e = b,
                f = a.split("/").reverse(),
                g = function(a) {
                    e = a, f.length > 0 ? i(f.pop()) : c()
                }

                ,
                h = function(a) {
                    console.error(a), d(a)
                }

                ,
                i = function(a) {
                    e.getDirectory(a, {
                            create: !0,
                            exclusive: !1
                        }

                        , g, h)
                }

            ;
            e ? i(f.pop()) : window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(a) {
                e = a.root, i(f.pop())
            })
        })
    }

    ,
    H.Util.saveToStorage1 = function(a, b, c) {

        return b = b.replace("%3A", ""),
            new Promise(function(d, e) {
                var f, g = function(a) {
                        this.onerror = null, console.error(a)
                    }

                    ,
                    h = function() {
                        f.getFile(b, {
                                create: !0
                            }

                            ,
                            function(b) {
                                a ? b.createWriter(function(b) {
                                        if (b.onwrite = function() {
                                                d()
                                            }

                                            , b.onerror = g, c) try {
                                            b.seek(b.length)
                                        }

                                        catch (e) {
                                            console.error("file doesn't exist!")
                                        }

                                        b.write(a)
                                    }

                                    , g) : d("empty file created")
                            }

                            , g)
                    }

                ;
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(a) {
                    f = a.root;
                    var c = b.slice(0, b.lastIndexOf("/"));
                    f.getDirectory(c, {
                            create: !1
                        }

                        ,
                        function(a) {
                            h()
                        }

                        ,
                        function(a) {
                            H.Util.createDirectory(c, f).then(h, g)
                        })
                })
            })
    }

    ,
    H.Util.saveToStorage = function(a, b, c, d) {

        return b = b.replace("%3A", ""),
            new Promise(function(e, f) {
                var g, h = function(a) {
                        this.onerror = null, console.error(a)
                    }

                    ,
                    i = function() {
                        g.getFile(b, {
                                create: !0
                            }

                            ,
                            function(b) {
                                a ? b.createWriter(function(b) {
                                        if (b.onwrite = function() {
                                                e()
                                            }

                                            , b.onerror = h, d) try {
                                            b.seek(b.length)
                                        }

                                        catch (c) {
                                            console.error("file doesn't exist!")
                                        }

                                        b.write(a)
                                    }

                                    , h) : e("empty file created")
                            }

                            , h)
                    }

                    ,
                    j = "android" === H.Util.device.platform ? H.DownloadDirectory : H.StorageFolderRootPathIOS || cordova.file.documentsDirectory + "/NoCloud";
                "android" === H.Util.device.platform && c && (j = H.PicturesDirectory), window.resolveLocalFileSystemURL(j, function(a) {
                        g = a;
                        var c = b.slice(0, b.lastIndexOf("/"));
                        g.getDirectory(c, {
                                create: !1
                            }

                            ,
                            function(a) {
                                i()
                            }

                            ,
                            function(a) {
                                H.Util.createDirectory(c, g).then(i, h)
                            })
                    }

                    ,
                    function(a) {
                        console.error(a)
                    })
            })
    }

    ,
    H.Util.readFile = function(a, b) {
        return new Promise(function(c, d) {
            b = b || "text";
            var e = function(a) {
                    console.error(a), d(a)
                }

                ,
                f = function(d) {
                    d.file(function(d) {
                            var e = new FileReader;
                            if (e.onload = function() {
                                    c(this.result)
                                }

                                , "text" == b) e.readAsText(d);
                            else if ("base64" == b) e.readAsDataURL(d);
                            else if ("arraybuffer" == b) e.readAsArrayBuffer(d);
                            else if ("blob" == b) {
                                var f = new FileReader;
                                f.readAsArrayBuffer(d), f.onload = function() {
                                    var b = this.result,
                                        d = null,
                                        e = "image/" + a.slice(a.lastIndexOf(".") + 1);
                                    e.indexOf("?") > -1 && (e = e.slice(0, e.indexOf("?")));
                                    try {
                                        d = new Blob([b], {
                                            type: e
                                        })
                                    } catch (f) {
                                        var g = new(window.WebKitBlobBuilder || window.BlobBuilder);
                                        g.append(b), d = g.getBlob(e)
                                    }

                                    c(d)
                                }
                            }
                        }

                        , e)
                }

            ;
            a.indexOf("file:") > -1 || a.indexOf("content:") > -1 || a.indexOf("cdvfile:") > -1 ? window.resolveLocalFileSystemURL(a, f, e) : window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(b) {
                b.root.getFile(a, {
                        create: !1
                    }

                    , f, e)
            })
        })
    }

    ,
    H.Util.queryCachedThread = function(a, b) {
        H.ThreadCache = H.ThreadCache || {}

        ;
        var c = "",
            d = H.ThreadCache[a];
        if (!d) return c;
        b = b || a;

        for (var e in d) {
            var f = d[e];

            if (f) {
                var g = f.id || "";

                if (g && g == b) {
                    c = f;
                    break
                }

                for (var h = f.replys || [], i = 0, j = h.length; j > i; i++) {
                    var k = h[i];

                    if (k.id == b) {
                        c = k;
                        break
                    }
                }

                if (c) break
            }
        }

        return c
    }

    ,
    H.Util.queryCachedThreads = function(a, b) {
        H.ThreadCache = H.ThreadCache || {}

        ;
        var c = "",
            d = H.ThreadCache[a];
        if (!d) return c;
        b = b || [a];

        var e = {}

        ;

        for (var f in d) {
            var g = d[f];

            if (g) {
                var h = JSON.parse(JSON.stringify(g)),
                    i = h.userid;
                delete h.replys,
                    e[g.id] = h;

                for (var j = g.replys || [], k = 0, l = j.length; l > k; k++) {
                    var m = j[k];
                    i == m.userid && (m.isPo = !0),
                        e[m.adid || m.id] = m
                }
            }
        }

        return b.map(function(a) {
            return e[a]
        })
    }

    ,
    H.Util.parseTime = function(a, b) {
        if (!a) return "";
        a = isNaN(a) ? a.replace(/\((.*?)\)/, " ").replace(/-/g, "/") : a;
        var c,
            d = new Date,
            e = new Date(a),
            f = e.getFullYear(),
            g = e.getMonth(),
            h = e.getHours(),
            i = e.getMinutes(),
            j = e.getSeconds(),
            k = e.getDate(),
            l = g + 1 + "/" + k,
            m = (1 > h ? "0" : "") + h + ":" + (10 > i ? "0" : "") + i,
            n = (10 > j ? "0" : "") + j,
            o = d.getFullYear();
        return c = f != o || b ? (f + "").slice(2, 4) + "/" + l + " " + m : d.getMonth() == g && d.getDate() == k ? m + ":" + n : l + " " + m + ":" + n, d - e > 15552e6 && !b && (c = "<span class='long-long-ago'>" + c + "</span>"), c
    }

    ,
    H.Util.parseUrlQuery = function(a) {
        a = a || location.href;

        var b = {}

            ,
            c = a.split("?");
        c = c.length > 1 ? c[1] : "";
        var d = c.split("&");

        for (var e in d) {
            var f = d[e].split("=");
            f[0] && (b[decodeURIComponent(f[0])] = decodeURIComponent(f[1]))
        }

        return b
    }

    ,
    H.Util.getErrorMsg = function(a) {

        var b = "",
            c = {}

            ,
            d = 0;
        if (a && a.response && a.response.code) c = a.response;

        else try {
            c = JSON.parse(a && a.responseText)
        }

        catch (e) {}

        return d = c.code || a && a.status || d,
            b = c.msg ? c.msg : 404 == d ? "404 Not Found" : 502 == d ? "服务器好像大姨妈了" : 403 == d ? "没有权限访问，可能是饼干无效或不存在" : "", {
                code: d,
                msg: b
            }
    }

    ,
    H.Util.dispatch = function(a, b, c) {
        var d = document.createEvent("CustomEvent");
        return d && d.initCustomEvent ? d.initCustomEvent(b, !0, !0, c) : (d = document.createEvent("Event"), d.initEvent(b, !0, !0), d.detail = c), a.dispatchEvent(d)
    }

    ,
    H.Util.getPing = function(a) {

        return a = Array.isArray(a) ? a : [a || "nmbxd.com"],
            new Promise(function(b, c) {
                var d = new Ping,
                    e = a.map(function(a) {
                        return {
                            query: a,
                            timeout: 6,
                            retry: 3,
                            version: "v4"
                        }

                    });
                d.ping(e, function(a) {
                        b(a || [])
                    }

                    ,
                    function(a) {
                        console.error(a), c(a)
                    })
            })
    }

    ,
    H.Util.getIP = function(a) {

        return a = a || "http://myip.ipip.net/",
            new Promise(function(b, c) {
                H.Xhr.get(a, {}

                    , {
                        responseType: "document"

                    }).then(function(a) {
                    b(a.textContent)

                })["catch"](function(a) {
                    b("获取IP失败")
                })
            })
    }

    ,
    H.Util.Dialog = function() {
        function a(a) {
            var b = function(a) {
                var b = document.createElement("menu");

                return a.forEach(function(a) {
                        var c = document.createElement("button");
                        c.setAttribute("type", "button");
                        for (var d in a) "id" === d ? c.setAttribute("id", a[d]) : "className" === d ? c.className = a[d] : "label" === d ? c.textContent = a[d] || "" : c.setAttribute("data-" + d, a[d]);
                        b.appendChild(c)
                    }),
                    b
            }

            ;
            f.innerHTML = "",
                f.style.cssText = "";
            var c = [];

            a.title && c.push("title"),
                a.content && c.push("content"),
                a.footer && c.push("footer"),
                c.forEach(function(c) {
                    var d = document.createElement("div");
                    if (d.className = "dialog-" + c, "string" == typeof a[c]) {
                        var e = document.createElement("div");
                        e.className = "content", e.innerHTML = a[c], d.appendChild(e)
                    } else if (Array.isArray(a[c])) d.appendChild(b(a[c]));
                    else try {
                        d.appendChild(a[c])
                    }

                    catch (g) {}

                    f.appendChild(d)
                })
        }

        function b() {

            f.setAttribute("data-state", "closed"),
                f.onclick = null,
                e = setTimeout(function() {
                        f.className = "dialog", f.innerHTML = ""
                    }

                    , 400),
                H.Util.dispatch(f, "hide")
        }

        function c(c, d, h, i) {
            clearTimeout(e),
                i = void 0 == i ? !0 : i;

            var j = {
                title: c,
                footer: h,
                content: d || ""
            }

            ;
            a(j),
                f.setAttribute("data-state", "open"),
                f.className = "dialog",
                f.onclick = b,
                i ? g.ontouchmove = g.onclick = b : g.ontouchmove = g.onclick = null,
                H.Util.dispatch(f, "show")
        }

        function d(a, b, d, e, g) {
            var h = h || {
                right: "-50%",
                top: "-50%"
            }

            ;
            c("", b, d),
                f.className = "dialog menu";
            var i = f.clientWidth,
                j = f.clientHeight,
                k = a.pageX,
                l = a.pageY,
                m = window.innerWidth,
                n = window.innerHeight;

            if (e) {
                var o = a.getBoundingClientRect();

                switch (e) {
                    case "top":
                        k = o.left, l = o.top - j;
                        break;
                    case "bottom":
                        k = o.left, l = o.bottom;
                        break;
                    case "left":
                        k = o.left - f.clientWidth, l = o.top;
                        break;
                    case "right":
                        k = o.right, l = o.top
                }

                switch (g) {
                    case "top":
                        l = o.top;
                        break;
                    case "bottom":
                        l = o.bottom - j;
                        break;
                    case "left":
                        k = o.left;
                        break;
                    case "right":
                        k = o.right - i;
                        break;

                    case "center":
                        if ("left" == e || "right" == e) {
                            var p = o.height / 2 - j / 2;
                            l += p
                        } else if ("top" == e || "bottom" == e) {
                            var p = o.width / 2 - i / 2;
                            k += p
                        }
                }
            }

            var q = 0 > k - i ? k : k - i,
                r = k + i > m ? k - i : k,
                s = 0 > l - j ? l : l - j,
                t = l + j > n ? l - j : l;
            if (0 > q && r > m || 0 > s && t > n) return void(f.className = "dialog");
            h.left = q + "px",
                h.right = "auto",
                h.top = t + "px",
                h.bottom = "auto";
            var u = "";
            for (var v in h) u += v + ":" + h[v] + ";";
            f.style.cssText = u
        }

        var e,
            f = document.createElement("section");
        f.id = "dialog",
            f.className = "dialog",
            f.setAttribute("data-state", "closed"),
            document.body.appendChild(f);
        var g = document.createElement("div");

        return g.id = "dialog-backdrop",
            g.className = "backdrop",
            g.ontouchmove = g.onclick = b,
            document.body.appendChild(g), {
                show: c,
                showMenu: d,
                hide: b
            }
    }

(),
H.Util.toast = function() {
    function a(a, d) {
        var e = "bottom",
            f = 3e3;

        if (d = d || {}

            , f = d.duration ? parseFloat(d.duration) : f, e = d.position ? d.position.toLowerCase() : e, "string" != typeof a) return !1;
        c && clearTimeout(c);
        var g = document.body,
            h = document.getElementById("toast_container");
        h && g.removeChild(h);
        var i = "toast_container toast_fadein";
        "top" === this.position && (i = "toast_container toast_fadein toast_top");
        var j = document.createElement("div");
        j.id = "toast_container",
            j.className = i,
            j.innerHTML = a,
            g.appendChild(j),
            c = setTimeout(b, f)
    }

    function b() {
        function a() {
            var b = document.getElementById("toast_container");
            return b ? (b.removeEventListener("webkitAnimationEnd", a),
                b.removeEventListener("msAnimationEnd", a), b.removeEventListener("mozAnimationEnd", a), b.removeEventListener("animationend", a), void b.parentNode.removeChild(b)) : !1
        }

        var b = document.getElementById("toast_container");
        return b ? (c && clearTimeout(c), b.className += " toast_fadeout", b.addEventListener("webkitAnimationEnd", a), b.addEventListener("msAnimationEnd", a), b.addEventListener("mozAnimationEnd", a), void b.addEventListener("animationend", a)) : !1
    }

    var c = null;

    return {
        show: a,
        hide: b
    }
}

();

try {
    window.localStorage.setItem("privateMode", "test")
} catch (e) {
    var noop = function() {}

    ;

    window.localStorage = {
        setItem: noop,
        getItem: noop,
        removeItem: noop,
        clear: noop
    }
}

window.isPassiveListenerSupported = !1;

try {
    var options = Object.defineProperty({}

        , "passive", {
            get: function() {
                window.isPassiveListenerSupported = !0
            }
        });
    window.addEventListener("test", null, options)
} catch (err) {}

if (window.Uint8ClampedArray && (Uint8ClampedArray.from || (Uint8ClampedArray.from = function(a) {
        return new Uint8ClampedArray(a)

    }), !Uint8ClampedArray.prototype.forEach)) {
    var APForEach = Array.prototype.forEach;

    Uint8ClampedArray.prototype.forEach = function(a, b) {
        return APForEach.call(this, a, b)
    }
}

! function(a) {
    "use strict";

    var b = a.HTMLCanvasElement && a.HTMLCanvasElement.prototype,
        c = a.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (a) {
                return !1
            }
        }

    (),
    d = c && a.Uint8Array && function() {
        try {
            return 100 === new Blob([new Uint8Array(100)]).size
        } catch (a) {
            return !1
        }
    }

    (),
    e = a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder || a.MSBlobBuilder,
        f = (c || e) && a.atob && a.ArrayBuffer && a.Uint8Array && function(a) {
            var b,
                f,
                g,
                h,
                i,
                j;
            for (b = a.split(",")[0].indexOf("base64") >= 0 ? atob(a.split(",")[1]) : decodeURIComponent(a.split(",")[1]), f = new ArrayBuffer(b.length), g = new Uint8Array(f), h = 0; h < b.length; h += 1) g[h] = b.charCodeAt(h);

            return i = a.split(",")[0].split(":")[1].split(";")[0],
                c ? new Blob([d ? g : f], {
                    type: i
                }) : (j = new e, j.append(f), j.getBlob(i))
        }

    ;

    a.HTMLCanvasElement && !b.toBlob && (b.mozGetAsFile ? b.toBlob = function(a, c, d) {
                a(d && b.toDataURL && f ? f(this.toDataURL(c, d)) : this.mozGetAsFile("blob", c))
            }

            :
            b.toDataURL && f && (b.toBlob = function(a, b, c) {
                a(f(this.toDataURL(b, c)))

            })),
        "function" == typeof define && define.amd ? define(function() {
            return f
        }) : a.dataURLtoBlob = f
}

(window),
function() {
    "use strict";

    function a(b, d) {
        function e(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }

        var f;

        if (d = d || {}

            , this.fastClickScrollParentSelector = d.fastClickScrollParentSelector || ".scrollable", this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = d.touchBoundary || 10, this.layer = b, this.tapDelay = d.tapDelay || 200, this.tapTimeout = d.tapTimeout || 700, !a.notNeeded(b)) {
            for (var g = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], h = this, i = 0, j = g.length; j > i; i++) h[g[i]] = e(h[g[i]], h);

            c && (b.addEventListener("mouseover", this.onMouse, !0), b.addEventListener("mousedown", this.onMouse, !0), b.addEventListener("mouseup", this.onMouse, !0)),
                b.addEventListener("click", this.onClick, !0),
                b.addEventListener("touchstart", this.onTouchStart, !1),
                b.addEventListener("touchmove", this.onTouchMove, !1),
                b.addEventListener("touchend", this.onTouchEnd, !1),
                b.addEventListener("touchcancel", this.onTouchCancel, !1),
                Event.prototype.stopImmediatePropagation || (b.removeEventListener = function(a, c, d) {
                        var e = Node.prototype.removeEventListener;
                        "click" === a ? e.call(b, a, c.hijacked || c, d) : e.call(b, a, c, d)
                    }

                    , b.addEventListener = function(a, c, d) {
                        var e = Node.prototype.addEventListener;
                        "click" === a ? e.call(b, a, c.hijacked || (c.hijacked = function(a) {
                            a.propagationStopped || c(a)
                        }), d) : e.call(b, a, c, d)

                    }),
                "function" == typeof b.onclick && (f = b.onclick, b.addEventListener("click", function(a) {
                        f(a)
                    }

                    , !1), b.onclick = null)
        }
    }

    var b = navigator.userAgent.indexOf("Windows Phone") >= 0,
        c = navigator.userAgent.indexOf("Android") > 0 && !b,
        d = /iP(ad|hone|od)/.test(navigator.userAgent) && !b,
        e = d && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        f = d && /OS [6-7]_\d/.test(navigator.userAgent),
        g = navigator.userAgent.indexOf("BB10") > 0;

    a.prototype.needsClick = function(a) {
            switch (a.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (a.disabled) return !0;
                    break;
                case "input":
                    if (d && "file" === a.type || a.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
            }

            return /\bneedsclick\b/.test(a.className)
        }

        ,
        a.prototype.needsFocus = function(a) {
            switch (a.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !c;

                case "input":
                    switch (a.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return !1
                    }

                    return !a.disabled && !a.readOnly;
                default:
                    return /\bneedsfocus\b/.test(a.className)
            }
        }

        ,
        a.prototype.sendClick = function(a, b) {
            var c,
                d;
            document.activeElement && document.activeElement !== a && document.activeElement.blur(),
                d = b.changedTouches[0],
                c = document.createEvent("MouseEvents"),
                c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null),
                c.forwardedTouchEvent = !0,
                a.dispatchEvent(c)
        }

        ,
        a.prototype.determineEventType = function(a) {
            return c && "select" === a.tagName.toLowerCase() ? "mousedown" : "click"
        }

        ,
        a.prototype.focus = function(a) {
            var b;
            d && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type && "month" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
        }

        ,
        a.prototype.findScrollParent = function(a, b) {
            for (var c = b.charAt(0), d = "#" === c ? "id" : "." === c ? "class" : "[" === c ? "attribute" : "tag", e = a.parentElement; e;) {
                if ("body" == e.nodeName.toLowerCase()) return null;

                if ("id" == d) {
                    if (e.id == b.slice(1)) break
                } else if ("class" == d) {
                    var f = e.classList;
                    if (f && f.contains(b.slice(1))) break
                } else if ("tag" == d) {
                    if (e.nodeName.toLowerCase() == b) break
                } else if ("attribute" == d && (b = b.replace(/(\[)|(\])/g, ""), null !== e.getAttribute(b))) break;
                e = e.parentElement
            }

            return e
        }

        ,
        a.prototype.updateScrollParent = function(a) {
            var b,
                c;

            if (this.fastClickScrollParent = this.findScrollParent(a, this.fastClickScrollParentSelector), b = this.fastClickScrollParent || a.fastClickScrollParent, !b || !b.contains(a)) {
                c = a;

                do {
                    if (c.scrollHeight > c.offsetHeight) {
                        b = c,
                            a.fastClickScrollParent = c;
                        break
                    }

                    c = c.parentElement
                }

                while (c)
            }

            b && (b.fastClickLastScrollTop = b.scrollTop)
        }

        ,
        a.prototype.getTargetElementFromEventTarget = function(a) {
            return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
        }

        ,
        a.prototype.onTouchStart = function(a) {
            var b,
                c,
                f;
            if (a.targetTouches.length > 1) return !0;
            b = this.getTargetElementFromEventTarget(a.target),
                c = a.targetTouches[0];
            var g = (new Date).getTime();

            if (d) {
                if (f = window.getSelection(), f.rangeCount && !f.isCollapsed) return !0;

                if (!e) {
                    if (c.identifier && c.identifier === this.lastTouchIdentifier) return a.preventDefault(),
                        !1;
                    this.lastTouchIdentifier = c.identifier,
                        this.updateScrollParent(b)
                }
            }

            return this.trackingClick = !0,
                this.trackingClickStart = g,
                this.targetElement = b,
                this.touchStartX = c.pageX,
                this.touchStartY = c.pageY,
                g - this.lastClickTime < this.tapDelay && a.preventDefault(),
                !0
        }

        ,
        a.prototype.touchHasMoved = function(a) {
            var b = a.changedTouches[0],
                c = this.touchBoundary;
            return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1
        }

        ,
        a.prototype.onTouchMove = function(a) {
            return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
        }

        ,
        a.prototype.findControl = function(a) {
            return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }

        ,
        a.prototype.onTouchEnd = function(a) {
            var b,
                g,
                h,
                i,
                j,
                k = this.targetElement,
                l = (new Date).getTime();
            if (!this.trackingClick) return !0;
            if (l - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0,
                !0;
            if (l - this.trackingClickStart > this.tapTimeout) return !0;

            if (this.cancelNextClick = !1, this.lastClickTime = l, g = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, f && (j = a.changedTouches[0], k = document.elementFromPoint(j.pageX - window.pageXOffset, j.pageY - window.pageYOffset) || k, k.fastClickScrollParent = this.targetElement.fastClickScrollParent), h = k.tagName.toLowerCase(), "label" === h) {
                if (b = this.findControl(k)) {
                    if (this.focus(k), c) return !1;
                    k = b
                }
            } else if (this.needsFocus(k)) return l - g > 100 || d && window.top !== window && "input" === h ? (this.targetElement = null, !1) : (this.focus(k), this.sendClick(k, a), d && "select" === h || (this.targetElement = null, a.preventDefault()), !1);
            return d && !e && (i = this.fastClickScrollParent || k.fastClickScrollParent, i && i.fastClickLastScrollTop !== i.scrollTop) ? !0 : (this.needsClick(k) || (a.preventDefault(), this.sendClick(k, a)), !1)
        }

        ,
        a.prototype.onTouchCancel = function() {
            this.trackingClick = !1,
                this.targetElement = null
        }

        ,
        a.prototype.onMouse = function(a) {
            return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0
        }

        ,
        a.prototype.onClick = function(a) {
            var b;
            return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), b || (this.targetElement = null), b)
        }

        ,
        a.prototype.destroy = function() {
            var a = this.layer;
            c && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)),
                a.removeEventListener("click", this.onClick, !0),
                a.removeEventListener("touchstart", this.onTouchStart, !1),
                a.removeEventListener("touchmove", this.onTouchMove, !1),
                a.removeEventListener("touchend", this.onTouchEnd, !1),
                a.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }

        ,
        a.notNeeded = function(a) {
            var b,
                d,
                e,
                f;
            if ("undefined" == typeof window.ontouchstart) return !0;

            if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!c) return !0;

                if (b = document.querySelector("meta[name=viewport]")) {
                    if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
                    if (d > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
                }
            }

            if (g && (e = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), e[1] >= 10 && e[2] >= 3 && (b = document.querySelector("meta[name=viewport]")))) {
                if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
                if (document.documentElement.scrollWidth <= window.outerWidth) return !0
            }

            return "none" === a.style.msTouchAction || "manipulation" === a.style.touchAction ? !0 : (f = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], f >= 27 && (b = document.querySelector("meta[name=viewport]"), b && (-1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === a.style.touchAction || "manipulation" === a.style.touchAction ? !0 : !1)
        }

        ,
        a.attach = function(b, c) {
            return new a(b, c)
        }

        ,
        "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
            return a
        }) : "undefined" != typeof module && module.exports ? (module.exports = a.attach, module.exports.FastClick = a) : window.FastClick = a
}

();