chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    $("#postUrl").val(url);
});
$("#getUrl").on('click', function () {
    const postUrl = $("#postUrl").val();

    fetchUrl(postUrl).done(data => {
        if (data[0] && (data[0].data.children[0].data.media || data[0].data.children[0].data.url)) {
            const children = data[0].data.children[0].data;
            const media = children.media;
            const videoUrl = media ? (media.reddit_video ? media.reddit_video.fallback_url : children.url) : '';
            console.log(data);
            $("#videoUrl").html(videoUrl || 'No video found.').attr('href', videoUrl || children.url);
        } else {
            console.log(data);
            $("#videoUrl").html('No video found.');
        }
    }).fail(error => {
        console.error(error);
        const errorMessage = error.responseJSON.quarantine_message || error.statusText;
        $("#videoUrl").html("Quarantine: " + errorMessage);
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