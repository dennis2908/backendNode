    $('img,div').each(function () {

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
			
	})