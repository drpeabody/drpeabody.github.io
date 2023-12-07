
document.addEventListener("DOMContentLoaded", function(event) {
    const text = document.body.innerHTML;

    // Use ShowDown Engine to convert HTML Body Text from MD into HTML
    // Reference: http://demo.showdownjs.com/
    var converter = new showdown.Converter();

    /** Allows you to set Options for ShowDown MarkDown Engine
     * 
     * In order to make use of this, simply include a small script tag at the beginning 
     * of the html page in the <head> tag as follows:
     *  <html>
     *      <head>
     *          <script src="../assets/js/static-md-2-html.js" crossorigin="anonymous"></script> 
     *          ... other scripts
     *          <script> markDownOptions = { "tables" : true } </script>
     *      </head>
     *  </html>
     * 
     * This will load the option "tables" and set its value to true for the ShowDown Engine          
    */ 
    if(typeof maybeObject != "undefined" && markDownOptions) {
        for(option in markDownOptions) {
            converter.setOption(option, markDownOptions[option]);
        }
    }

    let mdText = converter.makeHtml(text);
    document.body.innerHTML = mdText;
});