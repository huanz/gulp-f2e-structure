var plus = window.plus = {
    debug: true
};

plus.host = plus.debug ? 'http://newmail.21cn.com/apollo/' : 'http://w.21cn.com/apollo/';
plus.version = plus.debug ? (Date.now || function(){return new Date().getTime();})() : '20150519';

// seajs config
seajs.config({
    base: '../js/sea-modules/',
    alias: {
        "$": "jquery/jquery",
        '_': 'underscore/1.8.3/underscore',
        'backbone': 'backbone/1.1.2/backbone'
    },
    // 发布新版后更改时间戳
    'map': [
        [/^(.*\.(?:css|js))(.*)$/i, '$1?v=' + plus.version]
    ],
    // 调试模式
    debug: plus.debug
});