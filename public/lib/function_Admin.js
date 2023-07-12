function load_body(zone_id){
	  
	$.ajax({
	method: "GET",	
    url:"/crud/get_by_id_Admin", 
    data: { id: zone_id,author: "admin"},
    success:function(data) {
		if(data)
		{
			$('#table_1').html(data);
		}
			
	  }
	}).done(function( data ) {
		      $('img,div').each(function () {

				var arrx = ['green','blue','red','green-dragging','red-dragging','blue-dragging','green ui-draggable-dragging','red ui-draggable-dragging'
				,'red ui-draggable-dragging'];
				var arry = ['border_red rectangle','border_green rectangle','border_blue rectangle'];
				var arrz = ['merge'];
				var i = $(this).attr('class');
				
			    if(i)
				{
 				  if(i.includes('ui-draggable'))
				  {
					$(this).attr('class',$(this).attr('class').replace(' ui-draggable',''));
				  }
				}
				if(i)
				{
				  if(i.includes('-dragging'))
				  {
					$(this).attr('class',$(this).attr('class').replace('-dragging',''));
				  }
				}
				
				var i = $(this).attr('class');
				
				if(arrx.includes(i))
				{
					$(this).draggable();
					$( this ).css('z-index','1');
				
					$(this).mouseover(function(){
						$( this ).css('z-index','11');
					});
				}
				
				if(arrz.includes(i))
				{
					$(this).draggable();
				}
				
				if(arry.includes(i))
				{
					$(this).click(function() {
						if($(this).attr('class')=="border_blue rectangle ui-draggable")
						{
									
						   $(this).attr('class','border_red rectangle ui-draggable');
										  
						}
						else if($(this).attr('class')=="border_green rectangle ui-draggable")
						{
									
						   $(this).attr('class','border_blue rectangle ui-draggable');
										  
						}
						else{
						  
						   $(this).attr('class','border_green rectangle ui-draggable');
						}		
						
						
					});
					$(this).draggable();
				}
			
			});

	});
}.catch(function(err) {
    // handle error here
});

function save_body(zone_id,zone_to){
	
if(!zone_id)
{
	zone_id=zone;
}	
	$.ajax({
        url: "/crud/save_by_admin",
        type: "post",
        data: {	
			body: $('#table_1').html(),
			id: zone_id
		} ,
        success: function (response) {
			if(!zone_to)
			{
				zone_to = "zone"+zone_id;
			}

		    var loc = window.location;
				 
		    window.location.href = "/"+zone_to;
			
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
.catch(function(err) {
    // handle error here
});

load_body(zone);
		 
function change_image(zone,arr=[]){				   
                  for (i = 0; i < arr.length; i++) {
					if(document.getElementById(arr[i]).className  == "blue")
					{
							document.getElementById(arr[i]).src = "/"+zone+"/images/"+arr[i]+"_red.jpg"; 
							document.getElementById(arr[i]).className  = "red";
					}
					else if(document.getElementById(arr[i]).className  == "green")
					{
							document.getElementById(arr[i]).src = "/"+zone+"/images/"+arr[i]+"_blue.jpg"; 
							document.getElementById(arr[i]).className  = "blue";
					}
					else
					{
							document.getElementById(arr[i]).src = "/"+zone+"/images/"+arr[i]+"_green.jpg"; 
							document.getElementById(arr[i]).className  = "green";
					}

				  }    

}.catch(function(err) {
    // handle error here
});

function redirect_to(zoneto){
	  save_body(zone,zoneto);
} 			