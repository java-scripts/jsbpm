(function(){
	var ajax=function(options){			
		var settings=$.extend({
			method: 'POST',dataType:'JSON',data:filterData(options),
			success:function(d){console.log({ajax:d});},
			error:function(d){console.log({ajax:d});}			
		},options);		
		$.ajax(settings);	
	}	
	//excludes functions from object
	var filterData=function(options){	
		var data={};
		$.each(options,function(key,val){
			if(!$.isFunction(val))data[key]=val;
		});			
		return data;
	}
	
	var getIncrId=function(data){		
		var lastRecord = data[data.length-1];		
		return lastRecord?lastRecord.id*1+1:0;
	}
	
	RecordUtil={		
		getAll:function(recordName,fn){
			var that = this;
			ajax({
				url:'/getAll'+recordName+'s',
				success:function(data){
				that[recordName+'_autoId']=getIncrId(data);
					fn(data);
				}
			});						
		},
		addRecord:function(recordName,options){				
			ajax($.extend({url:'/add'+recordName,id:this[recordName+'_autoId']},options));
		},
		deleteRecord:function(recordName,options){			
			ajax($.extend({url:'/remove'+recordName},options));
		}
	};
	
}());



test={};
test.RecordUtil={
	getAll:function(recordName){
		RecordUtil.getAll(recordName,function(data){
			console.log(data);
		});
	},
	addRecord:function(recordName,name,fields){
		RecordUtil.addRecord(recordName,{			
			name:name||'testForm',
			fields:fields||'1,2,3',	
			success:function(msg){
				console.log({tesmsg:msg})
			}
		});
	},
	deleteRecord:function(recordName){
		RecordUtil.deleteRecord(recordName,{
			id:1,
			success:function(msg){
				console.log({testmsg:msg})
			}
		});
	}
}