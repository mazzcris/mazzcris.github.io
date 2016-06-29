var cycle_started = false;
var stop_cycle = false;
var nextAutoIndex = 0;
var cycleTimeout;

function turn() {
	alert("turn");
}

function center_all(){   
        
		var viewport_height = jQuery(window).height();
		card_height = jQuery('#container').height();
		new_top = ((viewport_height/2) - (card_height/2))+"px";
		jQuery("#container").css("top",new_top);	
    
    $('#text').css('margin-left', $('#first_img').position().left +2);
}


function atTransition(newText){
	jQuery("#at_field").html(newText);
}

function autoCycle(){
    var hoverables = $('.at_hover');
    
    if( !stop_cycle){
        console.log('S');
        cycle_started = true;
        
        var cycleTimeout = setTimeout( function(){ 
            
            $('.at_hover img').css('margin-top','0px');
            var obj = $(hoverables)[nextAutoIndex];
            $(obj).find('img').css('margin-top','-12px');
            doHover($(obj));
            nextAutoIndex = (nextAutoIndex == hoverables.length-1) ? 0 : nextAutoIndex+1;
            autoCycle();
            
        }, 1500);
        
    }else{
        cycle_started = false;
        $('.at_hover img').css('margin-top','0px');
    }
        
}

function doHover(obj){
            var at_text = jQuery(obj).attr("data-at");
				
            if(at_text.indexOf("by") > -1){
                atTransition(" "+at_text);
            }else{
                atTransition(" @ "+at_text);
            }
                      
            var bg_color = $(obj).data('bcolor');
            
            var bg_r = parseInt( bg_color.substr(0,2), 16 );
            var bg_g = parseInt( bg_color.substr(2,2), 16 );
            var bg_b = parseInt( bg_color.substr(4,2), 16 );
            
            $('body').css('background-color', 'rgba('+bg_r+','+bg_g+','+bg_b+',0.25)' );
            
}

jQuery(document).ready(function($){
    
    
		center_all();
		$(".at_hover").mouseover(function(){
            stop_cycle = true;
            clearTimeout(cycleTimeout);
            cycle_started = false;
            doHover($(this));
            
		});
		
        var interval;
    
        $(window).resize(function(){
            center_all();
            $('#text').width($('.row_two').first().width());
            
            
            if( $(window).width() < 1200 && !cycle_started){
                 stop_cycle = false;
                 autoCycle();
            }else if($(window).width() > 1200){
                stop_cycle = true;
            }
        
        });
    
        $(window).resize();
    
    
    
        
        
        
        
    
});

