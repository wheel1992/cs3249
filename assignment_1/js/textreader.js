var resourceFileAboutUsUrl = 'resource/about_us.txt';
var resourceFileTrendingNowUrl = 'resource/trending_now.txt';

$(document).ready(function() {
    $.get(resourceFileAboutUsUrl, function(data) {
        $('#content-about-us').html(data);
    });
    
    $.get(resourceFileTrendingNowUrl, function(data) {
        $('#content-trending-now').html(data);
    });
    
});