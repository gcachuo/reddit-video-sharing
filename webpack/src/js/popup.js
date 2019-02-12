chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    $("#postUrl").val(url);
});
$("#getUrl").on('click', function () {
    const postUrl = $("#postUrl").val();

    fetchUrl(postUrl).done(data => {
        console.log(data);
        if (data[0]) {
            const videoUrl = (data[0].data.children[0].data.media.reddit_video.fallback_url);
            $("#videoUrl").html(videoUrl).attr('href', videoUrl);
        } else {
            $("#videoUrl").html('No video found.');
        }
    }).fail(error => {
        console.error(error);
        $("#videoUrl").html(error.statusText);
    });
});

function fetchUrl(url) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url + ".json",
        "method": "GET"
    };

    return $.ajax(settings);
}