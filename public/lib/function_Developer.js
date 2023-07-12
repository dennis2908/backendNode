function save_body(zone_id){
	$.post("/crud/save",
	{
		body: $('#table_1').html(),
		id: zone_id,
	},function(data, status){
		alert("Zone " + zone_id + " saved");
	});
}

function load_body(zone_id){
	  
	$.ajax({
	method: "GET",	
    url:"/crud/get_by_id", 
    data: { id: zone_id},
    success:function(data) {
		if(data)
			$('#table_1').html(data);
	  }
	}).done(function( data ) {
		      $('img,div').each(function () {

				var arrx = ['green','blue','red'];
				var arry = ['border_red rectangle','border_green rectangle','border_blue rectangle'];
				var arrz = ['merge'];
				var i = $(this).attr('class');
				
			
				if(i.includes('ui-draggable'))
				{
					$(this).attr('class',$(this).attr('class').replace(' ui-draggable',''));
				}
				
				var i = $(this).attr('class');
				
				if(arrx.includes(i))
				{
					$(this).draggable();
					$( this ).css('z-index','1');
				
					$(this).mouseover(function(){
						$( this ).css('z-index','11');
						console.log($( this ).css('z-index'));
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
}

load_body(zone);

//localStorage[zone] = "";

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
							var container = document.querySelector("#"+arr[i]);
				  } 
        
}

function reset_index(){					
		 $("img").css('z-index','1');
		 $("div").css('z-index','1');
		 alert('Z index Reset');
}

$('img').on('change', function() {
  save_body(zone);
});