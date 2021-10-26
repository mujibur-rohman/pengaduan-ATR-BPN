function insertGrid(URL, msg, data) {
    return $.ajax({
        url: URL,
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (e) {
            DevExpress.ui.notify("Sukses Tambah/Update Data " + msg, "success", 2000);
        },
        error: function (e) {
            DevExpress.ui.notify("Gagal Tambah/Update Data " + msg, "danger", 2000);
        }
    });
}

function getGrid(URL) {
    return $.ajax({
        url: URL,
        type: "GET"
    });
}

function deleteGrid(URL, msg) {

    return $.ajax({
        url: URL,
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        success: function (e) {
            DevExpress.ui.notify("Sukses Hapus Data " + msg, "warning", 2000);
        },
        error: function (e) {
            DevExpress.ui.notify("Gagal Hapus Data " + msg, "danger", 2000);
        }
    });
}



function GETT(param) {
    if (param !== null) {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars[param];
    }
    else {
        return null;
    }
}



