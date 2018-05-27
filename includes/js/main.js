//function to generate random classes to show the word cloud
    var domainurl = "http://localhost/guestbook/server/";

    function randomClass(){
        var classes = ["tag-1", "tag-2", "tag-3", "tag-4", "tag-5", "tag-6", "tag-7", "tag-8"];
        // generate random classes
        var item = classes[Math.floor(Math.random()*classes.length)];
        return item;
    }
    // function responsible for showing the cloud
    function generateWordCloud(){
        // Ajax hit to pick all the messages and put them in the cloud
        $.ajax({  
                url: domainurl+"getmessage.php",  
                method:"POST",    
                dataType:"json",  
                beforeSend: function(){
                   $("#loadingimg").show();
                 },
                 complete: function(){
                   $("#loadingimg").hide();
                 },
                success:function(data){  
                         $("#wordcloud").html("");

                         if(data!="0"){
                         for (var x = 0; x < data.length; x++) 
                            {
                              // generating different classes for messages
                              var newclass = randomClass();
                              // concatenating id and message so that we can get data of these from data-whatever attribute
                              var message_data_id = data[x].id + "||::|" + data[x].message;
                              content = '<a href="#" class="p-2 '+newclass+'" data-toggle="modal" data-target="#tagModal" data-placement="bottom" title="'+data[x].message+'" data-whatever="'+ message_data_id +'">'+data[x].submessage+'</a>';
                              $("#wordcloud").append(content);
                              $("#message-text").val("");
                            }
                          }
                          else{
                              $("#wordcloud").html("There is no message in the cloud. <a href='#' data-toggle='modal' data-target='#sendGreetingMessage' data-whatever='Send Message'>Click Here</a> or button 'Send Greeeting Message' to Send First Message!!");              
                          }
                  }  
              });  
    }
    // This would be executed, once user submits the form of id insert_form
    $('#insert_form').on("submit", function(event){  
           event.preventDefault();  
           if($.trim($('#message-text').val()) == "")  
           {  
                $("#error-message").addClass("alert alert-danger");
                $("#error-message").html("Please enter your message.");
           }  
           else  
           {  
                // Ajax call for sending message
                $.ajax({  
                     url: domainurl+"sendmessage.php",  
                     method:"POST",  
                     data:$('#insert_form').serialize(),  
                     beforeSend:function(){  
                          //$('#insert').val("Inserting");  
                     },  
                     success:function(data){  
                        // Once form is submitted, again need to refresh word cloud          
                        generateWordCloud();
                        getMyMessagesRefreshed();
                        // Hiding the sendgreetingMessage Modal
                        $('#sendGreetingMessage').modal('hide');
                        $("#error-message").removeClass("alert alert-danger");
                        $("#error-message").html("");
                     },
                     error: function(error) {
                        $('#sendGreetingMessage').modal('hide');
                        console.log(error);
                     }  
                });  
           }  
      });  
    // This would be called once user put response on some message
    $('#submit_response').on("submit", function(event){  
           event.preventDefault();
          // alert($.trim($('#message-response').val()));
             
           if($.trim($('#message-response').val()) == "")  
           {  
                $("#error-message1").addClass("alert alert-danger");
                $("#error-message1").html("Please enter your message.");
           }  
           else  
           {  
                // Ajax function call for sending response.
                $.ajax({  
                     url: domainurl+"sendmessage.php",  
                     method:"POST",  
                     data:$('#submit_response').serialize(),  
                     beforeSend:function(){ 
                     },  
                     success:function(data){
                        // Once form is submitted, again need to refresh word cloud
                        generateWordCloud();
                        // To hide modal
                        $('#sendGreetingMessage').modal('hide');
                        $("#error-message").removeClass("alert alert-danger");
                        $("#error-message").html("");
                        $('#sendMessageModal').modal('hide');
                        $('#tagModal').modal('hide');
                     },
                     error: function(error) {
                        $('#sendGreetingMessage').modal('hide');
                        console.log(error);
                     }  
                });  
           }  
      });
    function getMyMessagesRefreshed(){
      var mymessageList = "";
        // Ajax function to call all the messages
        $.ajax({  
           url: domainurl+"getmymessages.php",  
           method:"POST",  
           dataType:"json",  
           success:function(data){  
               $("#mymessages").html("");
               if(data==0)
               {
                  mymessageList = "<li>You haven't posted any message yet.</li>";
               }
               else
               {
                 for (var x = 0; x < data.length; x++) {
                    var newclass = randomClass();
                    var message_data_id = data[x].id + "||::|" + data[x].message;
                    mymessageList += '<li><a href="#" class="p-2" data-toggle="modal" data-target="#tagModal" data-whatever="'+ message_data_id +'">'+data[x].message+'</a></li>';
                 }
              }
              $("#mymessages").html(mymessageList);
        }
        });
    }  
    $(document).ready(function(){
        $('#sendGreetingMessage').on('show.bs.modal', function (event) {
          $("#error-message").removeClass("alert alert-danger");
          $("#error-message").html("");
        });
        // On document ready, cloud is generated
        generateWordCloud();
        var mymessageList = "";
        // Ajax function to call all the messages
        $.ajax({  
           url: domainurl+"getmymessages.php",  
           method:"POST",  
           dataType:"json",  
           success:function(data){  
               $("#mymessages").html("");
               if(data==0)
               {
                  mymessageList = "<li>You haven't posted any message yet.</li>";
               }
               else
               {
                 for (var x = 0; x < data.length; x++) {
                    var newclass = randomClass();
                    var message_data_id = data[x].id + "||::|" + data[x].message;
                    mymessageList += '<li><a href="#" class="p-2" data-toggle="modal" data-target="#tagModal" data-whatever="'+ message_data_id +'">'+data[x].message+'</a></li>';
                 }
              }
              $("#mymessages").html(mymessageList);
        }
        });
        
        $('#button').on('click', 'button[data-async="true"]', function (e) {
            e.preventDefault();
            $('#tagModal').modal('hide'); 
            event.preventDefault();
            generateWordCloud();
            return false;
        });
        
        /*To send data to Tag Modal*/
        $('#tagModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget); // Button that triggered the modal
          var recipient = button.data('whatever'); // Extract info from data-* attributes
          // Splitting string here by ||::| because we are sending id and message by using concatination ||::| 
          var result = recipient.split('||::|');
          message =  result[1] ;  // this would be the message
          message_id =  result[0] ; // this would be the message_id
          var modal = $(this);
          var showmessage = '<a href="#" data-toggle="modal" data-target="#sendMessageModal" data-whatever="'+message_id+'||::|'+message+'">'+message+'</a>';  
          modal.find('.modal-title').html(showmessage);
          $.ajax({  
             url: domainurl+"getthreadmessages.php",  
             method:"POST",    
             data:{"message_id":message_id},
             beforeSend:function(){    
             },  
             success:function(data){            
                $("#showmessages").html(data);
             },
             error: function(error) {
                $('#sendGreetingMessage').modal('hide');
                console.log(error);
             }  
          }); 
        });
        /* End Tag Modal */

        /* sendMessageModal Modal*/
        $('#sendMessageModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget); // Button that triggered the modal
          var recipient = button.data('whatever'); // Extract info from data-* attributes
          var modal = $(this);
          var result = recipient.split('||::|');
          message =  result[1] ;  // Message extracted
          message_id =  result[0] ; // Message Id extracted
          modal.find('.modal-title').text("Send Response");
          $("#message_to_disabled").val(message);
          $("#message-response").val("");
          $("#message_id_send_response").val(message_id);
          $('#tagModal').modal('hide');
        });
        /**/
    });