function change_color(id="")
{
	if(document.getElementById(id).className  == "red")
	{
		document.getElementById(id).className  = "blue"; 
	}
	else
	{
		document.getElementById(id).className  = "red"; 
	}
	
	
}

$("div").each(function(){
	if($(this).attr('id'))
	{
		if($('#'+$(this).attr('id')).attr('class')=="blue rectangle")
		{
			var id = $(this).attr('id');
			$("#"+id).draggable();
			$('#'+id).click(function(){
				if($('#'+id).attr('class')=="blue rectangle")
				{
					$('#'+id).attr('class','red rectangle');
						  
				}
				else{
					$('#'+id).attr('class','blue rectangle');
				}
			});
		}
	}

});

$('#mer_div').click(function(){
		console.log(123213213);
});


function add_new_div(){
	
	var id = $('#form_add #table_no').val();
	$('#new_table').append('<div id="t'+id+'" class="blue rectangle">'+id+'</div>');
	$("#t"+id).draggable();
    $('#t'+id).click(function() {
            if($("#t"+id).attr('class')=="blue rectangle")
			{
				
			    $("#t"+id).attr('class','red rectangle');
					  
			}
			else{
				$("#t"+id).attr('class','blue rectangle');
			}	
			
	});
	
	
}

function delete_div(){
	
	var id = $('#form_del #table_no').val();
	$('#t'+id).remove();
}


function merge_div(){
	
	var arr = $('#tables_no').val().split(',');
	
	$('#tables_no').val('');
	
	var width = 0;
	
	var div="";
	
	for(i=0;i<arr.length;i++)
	{
		
	    
		
            div +="<div id='t"+arr[i]+"_merge' class='blue rectangle_merge'>"+arr[i]+"</div>";
			$("#t"+arr[i]).remove();
		
		
	}
	
	$('#table_merge').append('<div class="merge">'+div+'</div>');
	
	for(i=0;i<arr.length;i++)
	{
		
	    
		
     		$('#t'+arr[i]+'_merge').click(function() {
			  for(k=0;k<arr.length;k++)
				{
					if($('#t'+arr[k]+'_merge').attr('class')=='blue rectangle_merge')
					{
						$('#t'+arr[k]+'_merge').attr('class','red rectangle_merge');
					}	
					else{
						$('#t'+arr[k]+'_merge').attr('class','blue rectangle_merge');
					}
				}
					
			});
		
		
	}
	$('.merge').draggable();

	


	
}

function div_click(id){
	if($("#t"+id).attr('class')=="blue rectangle")
	{
				
	   $("#t"+id).attr('class','red rectangle');
					  
	}
	else{
	   $("#t"+id).attr('class','blue rectangle');
	}	
	
}
$('#tabs').draggable();