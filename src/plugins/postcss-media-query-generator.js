const postcss = require('postcss');

function shouldExcludeRule(exclude, rule) {
    if (!exclude) {
        return true;
    }

    if (Array.isArray(exclude)) {
        return exclude.some((pattern) => pattern.test(rule.source.input.file));
    }

    if (exclude instanceof RegExp) {
        return exclude.test(rule.source.input.file);
    }
    return true;
}

function getMediaQueryParams(breakpoints) {
    const mediaQueries = [];
    const breakpointKeys = Object.keys(breakpoints);

    for (let i = 0; i < breakpointKeys.length-1; i++) {
        // if (i === 0) {
        //     // 第一个断点
        //     mediaQueries.push(`(max-width: ${breakpoints[breakpointKeys[i]]})`);
        // } else {
            const prevBreakpoint = breakpoints[breakpointKeys[i]];
            mediaQueries.push(`(min-width: ${prevBreakpoint}) and (max-width: ${breakpoints[breakpointKeys[i+1]]})`);
        // }
    }

    // 添加最后一个断点（>= 最后一个断点值）
    mediaQueries.push(`(min-width: ${breakpoints[breakpointKeys[breakpointKeys.length - 1]]})`);

    return mediaQueries;
}

module.exports = postcss.plugin('add-media-query', (options) => {
    const { exclude } = options;
    // 默认断点值
    const defaultBreakpoints = {
        xs: '768px',
        sm: '992px',
        md: '1200px',
        l: '1680px',
        xl: '1920px', // 也可以根据需求设置更高分辨率
    };

    return (root) => {
        const mediaQueries = {}; // 存储媒体查询条件及其规则

        root.walkRules((rule) => {
            // 检查是否应该排除当前规则
            if (shouldExcludeRule(exclude, rule)) {
                return
            }

            // 检查规则中是否已包含@media媒体查询
            let hasMediaQuery = false;
            rule.walkAtRules('media', () => {
                hasMediaQuery = true;
            });

            if (!hasMediaQuery) {
                // 获取要添加的媒体查询的参数
                let mediaParams = getMediaQueryParams(defaultBreakpoints);

                // 在每个规则后添加一个媒体查询
                mediaParams.forEach((params) => {
                    if (!mediaQueries[params]) {
                        // 如果媒体查询不存在，创建一个新的
                        mediaQueries[params] = postcss.atRule({
                            name: 'media',
                            params: params,
                        });
                    }

                    // 创建规则的副本并添加到媒体查询中
                    const mediaQueryRule = rule.clone();
                    mediaQueries[params].append(mediaQueryRule);
                });
            }
        });
        // 插入合并后的媒体查询规则
        Object.values(mediaQueries).forEach((mediaQuery) => {
            root.append(mediaQuery);
        });
    };
});

