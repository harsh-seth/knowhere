const setHeaderStyle = () => {
    // resize header if document has been scrolled 50px
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.querySelector('.masthead').style.padding = "1rem 0 0";
        document.querySelector('.site-avatar>img').style.width = "2.5rem";
        document.querySelector('.site-avatar>img').style.height = "2.5rem"
        document.querySelector('.site-name').style.fontSize = "1.5rem";
        document.querySelector('.site-name').style.fontFamily = '-system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
        document.querySelector('.site-description').style.display = "none";
    } else  {
        document.querySelector('.masthead').style.padding = "1rem 0";
        document.querySelector('.site-avatar>img').style.width = "70px";
        document.querySelector('.site-avatar>img').style.height = "70px";
        document.querySelector('.site-name').style.fontSize = "28px";
        document.querySelector('.site-name').style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
        document.querySelector('.site-description').style.display = "block";
    }
}

const handleScroll = () => {
    setHeaderStyle();
};

window.onscroll = () => handleScroll();
