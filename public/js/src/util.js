function formateDT(date) {
    return formateDate(date) + " " + formateTime(date);
}

function formateDate(date) {
    return (date.getMonth() + 1) + '.' + date.getDate();
}
function formateTime(date) {
    return prefix(date.getHours()) + ':' + prefix(date.getMinutes());
}

function prefix(num) {
    return num < 10 ? '0' + num : num;
}

var week = ["日", "一", "二", "三", "四", "五", "六"]

module.exports = {
    $: window.Zepto,
    fetchMyFeeds: function (host, uid, resolve, reject, finish) {
        this.$.ajax({
            type: 'GET',
            url: host + 'mobile/feedback/api/myproblems',
            data: {
                uid: uid
            },
            dataType: 'json',
            timeout: 2000,
            success: function (feeds) {
                resolve(feeds);
            },
            error: function (xhr, errorType, error) {
                reject(error);
            },
            complete: function () {
                finish();
            }
        });
    },
    format: function (dateLocalStr) {
        var date = new Date(dateLocalStr);
        var now = new Date();
        if (date.getFullYear() === now.getFullYear()) {
            if (date.getMonth() === now.getMonth()) {
                if (date.getDate() === now.getDate()) {
                    return formateTime(date);
                } else {
                    if (now.getDate() - date.getDate() === 1) {
                        return '昨天 ' + formateTime(date);
                    } else {
                        if (now.getDate() - date.getDate() < 7) {
                            return week[now.getDay()] + ' ' + formateTime(date);
                        } else {
                            return formateDT(date);
                        }
                    }
                }
            } else {
                return formateDT(date);
            }
        } else {
            return date.toLocaleDateString();
        }
    },
    trim: function (str) {
        return str.replace(/^\s+|\s+$/g, '');
    }
};