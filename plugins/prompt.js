$.prompt = function (options) {

    const formsContent = `
          <form class="form" id="prompt-form">
                <div>
                <input type="${options.type || 'text'}" id="input">
                </div>
         </form>
    `;

    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closeable: false,
            content: formsContent,
            onClose() {
                modal.destroy();
            },
            footerButtons: [{
                text: "OK",
                type: 'primary',
                handler() {
                    modal.close();
                    resolve();
                }
            }, ]
        });

        setTimeout(modal.open, 200);
    }).then(() => {
        const input = document.getElementById('input');
        return input.value;
    });

}