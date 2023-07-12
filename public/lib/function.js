         var vm = new Vue({
            el: '#Table_01',
            data: {
            },
            methods : {
               change_image : function(loc,arr=[]) {
                  for (i = 0; i < arr.length; i++) {
					if(document.getElementById(arr[i]).className  == "blue")
						{
							document.getElementById(arr[i]).src = "/"+loc+"/images/"+arr[i]+"_red.jpg"; 
							document.getElementById(arr[i]).className  = "red";
						}
						else
						{
							document.getElementById(arr[i]).src = "/"+loc+"/images/"+arr[i]+"_blue.jpg"; 
							document.getElementById(arr[i]).className  = "blue";
						}
				  } 
               }
            }
         });
		 