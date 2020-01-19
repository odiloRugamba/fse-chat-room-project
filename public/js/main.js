$(function(){
    const url = 'http://localhost:3000';
    const socket = io(url);
    
    $('.send-message').on('click', e => {
        e.preventDefault();
        var message = $('.message-data').val();
        if(message !== ''){


            $.ajax({
                type: "POST",
                url: "/send-message",
                data: {message: message},
                success: result => {
                    console.log(result);
                }
              });
            $('.message-data').val('');
        }
        
        return false;
    });
    socket.on('new-message', message => {
        updateChat(message);
    });
    
    const updateChat = (message) => {
        
        let m = '<div class="message">';
                    m += '<div class="message-title">';
                    m += '<span class="name"><b>'+ message.sender + '</b></span>';
                    m += '<span class="pull-right timestamp"><small>'+ message.time + '</small></span>';  
                    m += '</div>';
                    m += '<div class="message-text">' + message.message + ' </div>';
                    m += ' </div>';
                  
        $('.chat-messages').append(m);
    }

});