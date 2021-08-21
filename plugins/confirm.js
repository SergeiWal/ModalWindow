$.confirm = function(options){
    return new Promise((resolve, reject)=>{
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closeable: false,
            content: options.content,
            onClose(){
                modal.destroy();
            },
            footerButtons: [
                {
                    text:"YES", 
                    type:'danger',
                     handler(){
                        modal.close();
                        resolve();
                    }
                },
                {
                    text:"NO",
                    type:'primary',
                    handler(){
                        modal.close();
                        reject();
                    }
                }
            ]
        });
        setTimeout(modal.open, 200);
    });
} 