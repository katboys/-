/**
 page 当前页,count 总数,perpage 每一页, rowNum 当前页数 , url 连接
 */
 module.exports = function (page, count, perpage, url) {
 	var page = (page > 0) ? page : 1;
 	var rowNum = Math.ceil(count / perpage);//Math.ceil向上取整12/5=3
 	var pageFormat = "<ul class=pagination>{$pageList} <li><a>" + count + "条记录" + page + "/" + rowNum + " 页</a></li></ul>";
 	var pageList = '';
 	var surl = (url) ? url : '?p=';//如果url 为true 返回url 否则 返回 ？p=

    if (rowNum < 5) {
    	for (i = 1; i <= rowNum; i++){
    		if (i == page) {
    			pageList +="<li class='active'><a href='" + surl + i +"'>" + i + "</a></li>";

    		} 
    		else{
    			pageList += "<li><a href='"+ surl + i + "'>" + i + "</a></li>";
    		}
    	}
    }
    else {
    	if (page < 5){
    		for (i = 1; i <= 5; i++){
    			if (i == page) {
    			pageList +="<li class='active'><a href='" + surl + i +"'>" + i + "</a></li>";

    		}
    		    else{
    			pageList += "<li><a href='"+ surl + i + "'>" + i + "</a></li>";
    		   }
    		
    	    }
        } 
            else if (page >= (rowNum - 4)) {
            pageList += "<li><a href='" + surl + "1'>1</a><i>...</i></li>";

            for (i = (rowNum - 4); i <= rowNum; i++) {
                if (i == page) {
                    pageList += "<li class='active'><a href='" + surl + i + "'>" + i + "</a></li>";
                } else {
                    pageList += "<li><a href='" + surl + i + "'>" + i + "</a></li>";
                }
            }
        }
        else {
            pageList += "<li><a href='" + surl + "1'>1</a><i>...</i></li>";
            for (i = (parseInt(page) - 2); i <= (parseInt(page) + 2); i++) {
                if (i == page) {
                    pageList += "<li class='active'><a href='" + surl + i + "'>" + i + "</a></li>";
                } else {
                    pageList += "<li><a href='" + surl + i + "'>" + i + "</a></li>";
                }
            }
        }
}

    
    pageFormat = pageFormat.replace('pageList',pageList);

 	return pageFormat;



 }