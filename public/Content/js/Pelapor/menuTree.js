function setActive_Tree(urlStr) {
    varStat = false;
    if (window.location.href.indexOf(urlStr) > 0) {
        varStat = true;
    }
    return varStat;
}


var my_menu;



$(function () {
    var drawer = $("#drawer").dxDrawer({
        opened: true,
        template: function () {
            $.ajax({
                url: routeApp + "DataMenu/GetMenu",
                datatype: "json",
                type: "GET",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (d) {
                    my_menu = d;
                }
            });
            var menuTree = $("<div>").addClass("treeview");
            return menuTree.dxTreeView({
                items: my_menu,
                searchEnabled: true,
                scrollDirection: "vertical",
                onItemClick: function (e) {
                    var item = e.itemData;

                    if (item.url != "/Simodis") {

                        var firstCurrentPath = $(location).attr('pathname').split("/")[2];
                        var firstToPath = item.url.split("/")[2];
                        //console.log(firstToPath);
                        //console.log(firstCurrentPath);
                        if (firstCurrentPath !== firstToPath) {
                            //window.RouteArea = item.url;
                            window.location.href = item.url;

                        }
                        else {
                            ChangeUrl("SiMoDIS - " + item.text, item.url);
                            $.get(item.url,
                                function (data) {
                                    $("#dalemin").removeClass("hidden");
                                    $("#dalemin").html(data);
                                })
                                .done(function () {
                                    ProcessPageInfo();
                                })
                                .fail(function () {
                                    var pageContent = document.getElementById("#dalemin");
                                    pageContent.innerHTML = item.url + " error getting content";
                                });
                        }
                    } else {
                        //var pageContent = document.getElementById("#dalemin");
                        //pageContent.innerHTML = " empty menu";
                    }
                }
            });
        }
    }).dxDrawer("instance");


    $("#menuButton").dxButton({
        icon: "menu",
        onClick: function () {
            drawer.toggle();
        }
    });
});

