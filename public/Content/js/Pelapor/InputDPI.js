$(function () {
    function GetSelectedPIB() {
        var SelectedPIB = $("#gridSelectedPIB").dxDataGrid("instance").getDataSource().items();
        var y;
        var s = " ";

        for (y = 0; y < SelectedPIB.length; y++) {

            s += SelectedPIB[y]["ID_PEL_PIB"] + " ";
        }

        return s;

    };


    var DatagridSPIB = new DevExpress.data.CustomStore({
        //key: "id_pel_jenis_dp",
        // loadMode: "raw",
        load: function () {
            return $.ajax({
                url: URL + "GetPIB",
                type: "GET",
                success: function (data) {

                }
            })
        }
    });


    let upData = getLocalStorage("dokupenDataDPI") === "" ? [] : JSON.parse(getLocalStorage("dokupenDataDPI"));
    var URL = routeApi + "DataDPI/";

    function toDate(selector) {
        var from = selector.split("/");
        return new Date(from[2], from[1] - 1, from[0]);
    };

    var mapCaptionToDataField = {
        "No PPI": "NO_PIB",

        "Valuta": "valuta_nilai_pembayaran_dpi",
        "Nilai DPI": "nilai_pembayaran_dpi",
        "Nama Pembayar DPI": "pembayar_dpi",
        "NPWP Pembayar DPI": "npwp_pembayar_dpi",
        "Nomor Invoice": "no_invoice",
        "Tanggal Invoice": "tanggal_invoice2"
    };

    $('#btnUpExcel').dxButton({
        icon: "upload",
        stylingMode: "outlined",
        text: "Upload Data",
        type: "success",
        elementAttr: {
            class: "btnMarginRight"
        },
        disabled: false,
        onClick: function (e) {
            $.when(
                $("#uploadImpor").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadImpor").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadImpor").dxFileUploader("instance")._$fileInput.click();
            });
        }
    });

    $("#uploadImpor").dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xlsx",
        maxFileSize: 25000000000,
        allowedFileExtensions: [".xlsx"],
        uploadUrl: routeApp + "Pelapor/InputDPI",
        invalidFileExtensionMessage: "Hanya bisa mengekspor data excel",
        uploadMode: "instantly",
        onInitialized: function (e) {
            if (viewOnly == 1) {
                e.component.option("visible", false);
            }
        },
        onUploaded: function (d) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menunggah file", "warning", 5000);
                $("#uploadImpor").dxFileUploader("instance").reset();
            }
            else {
                var errorNPWP = "";
                var errorNilaiPemDPI = "";
                // var errorNilaiInv = "";
                var errorNamaDPI = "";
                var errornoinvoice = "";
                var errorNamaDPI = "";
                var errorvaluta = "";
                var isNPWPValidate = true;
                var isNilaiPemDPIValidate = true;
                var isNamaDPIValidate = true;
                var isnoinvoiceValidate = true;
                var isread = true;
                //var isNilaiInvoiceValidate = true;
                var NerrorNPWP = "";
                // var NerrorNilaiInv = "";
                var NerrorNamaDPI = "";
                var NerrorNilaiPemDPI = "";
                var Nerrornoinvoice = "";
                var isNPWPValidate = true;
                var countPIBMatched = 0;
                var countValueMatched = 0;
                var isValutaValidate = true;
                var Nerrorvaluta = "";


                var isTanggalValidate = true;
                var errorTanggal = "";
                var NerrorTanggal = "";
                var isValutaValidate2 = true;
                var Nerrorvaluta2 = "";
                var isNotEmpty = true;
                var nEmpty = "";
                var SelectedPIB = $("#gridSelectedPIB").dxDataGrid("instance").getDataSource().items();


                var reader = new FileReader();
                tempIndexFailed = {}
                reader.onloadend = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    var result = [];

                    var sheetName = workbook.SheetNames[0];
                    var worksheet = workbook.Sheets[sheetName];
                    var xlsxJson = XLSX.utils.sheet_to_json(worksheet, { header: "A", raw: false });



                    var countxls = xlsxJson.length - 1;
                    var CountLoop = 0;
                    var arrayTest = ["NO PPI", "VALUTA", "NILAI DPI", "NAMA PEMBAYAR DPI", "NPWP PEMBAYAR DPI", "NOMOR INVOICE", "TANGGAL INVOICE"];
                    for (var key in xlsxJson[0]) {
                        if (xlsxJson[0][key].toUpperCase() !== arrayTest[CountLoop]) {
                            toast_notify("Upload Gagal. Template tidak sesuai.", "warning");
                            $("#uploadImpor").dxFileUploader("instance").reset()
                            return;
                        }
                        CountLoop += 1;
                    }



                    //   var row = (workbook.Sheets.Sheet1['!ref']).substring(4);
                    var count = 2;// parseInt(row);
                    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
                    workbook.SheetNames.forEach(function (sheetName) {
                        var arrayContent = workbook.Sheets[sheetName]
                        var obj = {}
                        // key hrus ada di kolom A di excel
                        while (arrayContent["A" + count]) {


                            alphabet.forEach(function (v) {
                                var keyMap = arrayContent[v + "1"].w
                                var keyObj = mapCaptionToDataField[keyMap]
                                var valueContent = arrayContent[v + count]
                                if (valueContent == undefined) {


                                }
                                else {
                                    if (keyObj == "npwp_pembayar_dpi") {
                                        if (isNaN(valueContent.v) || valueContent.v == '' || (valueContent.v).toString().length != 15) {
                                            isNPWPValidate = false;
                                            isread = false;
                                            errorNPWP = errorNPWP + (count - 1) + ",";
                                        }
                                    }

                                    if (keyObj == "nilai_pembayaran_dpi") {
                                        if (isNaN(valueContent.v) || valueContent.v == '' || valueContent.v < 1) {
                                            isNilaiPemDPIValidate = false;
                                            isread = false;
                                            errorNilaiPemDPI = errorNilaiPemDPI + (count - 1) + ",";
                                        }

                                    }

                                    if (keyObj == "valuta_nilai_pembayaran_dpi") {
                                        if ((valueContent.v).toString().length > 3) {
                                            isValutaValidate = false;
                                            isread = false;
                                            errorvaluta = errorvaluta + (count - 1) + ",";
                                        }
                                    }


                                    if (keyObj == "pembayar_dpi") {
                                        if ((valueContent.w).length > 160) {
                                            isNamaDPIValidate = false;
                                            isread = false;
                                            errorNamaDPI = errorNamaDPI + (count - 1) + ",";

                                        }

                                    }



                                    if (keyObj == "no_invoice") {
                                        if ((valueContent.w).length > 30) {
                                            isnoinvoiceValidate = false;
                                            isread = false;
                                            errornoinvoice = errornoinvoice + (count - 1) + ",";

                                        }

                                    }

                                    if (keyObj == "tanggal_invoice2") {

                                        //var a = valueContent.w.split('/');
                                        //var cdate = a[1] + "/" + a[0] + "/" + a[2];
                                        //if (isNaN(Date.parse(cdate))) {
                                        //    isTanggalValidate = false;
                                        //    isread = false;
                                        //    errorTanggal = errorTanggal + (count - 1) + ",";
                                        //}

                                        obj[keyObj] = valueContent.w;


                                    }
                                    else if (keyObj == "NO_PIB") {

                                        obj[keyObj] = valueContent.w;



                                    }
                                    else {


                                        obj[keyObj] = valueContent.v;

                                    }

                                }

                            })
                            count++;
                            if (obj["NO_PIB"].toString().length > 0 && !obj["NO_PIB"].toString().includes(" ")) {
                                result.push(obj);

                            }
                            obj = {};
                        }


                        result.reverse();


                        if (result.length < 1) {
                            isNotEmpty = false;
                            iseread = false;
                        }
                        //else {

                        //    var checkValuta = [...new Set(result.map(x => x.valuta_nilai_pembayaran_dpi))];
                        //    if (checkValuta.length == 1) {
                        //        if (SelectedPIB[0].VALUTA_CIF != checkValuta) {
                        //            isValutaValidate2 = false;
                        //            isread = false;
                        //        }

                        //    }
                        //    else {
                        //        isValutaValidate2 = false;
                        //        isread = false;
                        //    }
                        //}






                        for (i = 0; i < result.length; i++) {
                            if (Object.keys(result[i]).length !== 7 || result.length < countxls) {
                                isNotEmpty = false;
                                break;
                            }
                        }



                        if (!isTanggalValidate) {
                            errorTanggal = errorTanggal.substr(0, errorTanggal.length - 1);
                            NerrorTanggal = "Tanggal pada baris " + errorTanggal + " tidak sesuai format";
                        }

                        if (!isNotEmpty) {
                            nEmpty = "Data yang dimasukkan tidak boleh ada yang kosong. ";
                            isread = false;
                        };

                        if (!isValutaValidate) {
                            errorvaluta = errorvaluta.substr(0, errorvaluta.length - 1);
                            Nerrorvaluta = "Valuta pada baris " + errorvaluta + " maksimal 3 karakter.";
                        }

                        if (!isNilaiPemDPIValidate) {
                            errorNilaiPemDPI = errorNilaiPemDPI.substr(0, errorNilaiPemDPI.length - 1);
                            NerrorNilaiPemDPI = "Nilai DPI Pada Baris " + errorNilaiPemDPI + " Harus angka dan tidak boleh 0.";

                        }

                        //if (!isValutaValidate2) {
                        //    Nerrorvaluta2 = "Valuta yang diupload harus sama dengan valuta PPI yang dipilih.";
                        //}
                        if (!isNPWPValidate) {
                            errorNPWP = errorNPWP.substr(0, errorNPWP.length - 1);
                            NerrorNPWP = "NPWP pada baris " + errorNPWP + " harus angka dengan 15 karakter.";

                        }

                        if (!isNamaDPIValidate) {
                            errorNamaDPI = errorNamaDPI.substr(0, errorNamaDHE.length - 1);
                            NerrorNamaDPI = "Nama DPI pada baris " + NerrorNamaDPI + " tidak bisa lebih dari 160 karakter.";

                        }


                        if (!isnoinvoiceValidate) {
                            errornoinvoice = errornoinvoice.substr(0, errornoinvoice.length - 1);
                            Nerrornoinvoice = "Nomor Invoice pada baris " + errornoinvoice + " tidak bisa lebih dari 30 karakter.";
                        }

                        if (!isread) {
                            alert(nEmpty + NerrorNPWP + NerrorNilaiPemDPI + NerrorNamaDPI + Nerrornoinvoice + Nerrorvaluta + NerrorTanggal);// + Nerrorvaluta2);
                            $("#uploadImpor").dxFileUploader("instance").reset()

                        }
                        else {

                            var GroupSum = [];
                            result.reduce(function (res, value) {
                                if (!res[value.NO_PIB]) {
                                    res[value.NO_PIB] = { NO_PIB: value.NO_PIB, NILAI_PEMBAYARAN_DPI: 0 };
                                    GroupSum.push(res[value.NO_PIB])
                                }
                                res[value.NO_PIB].NILAI_PEMBAYARAN_DPI = res[value.NO_PIB].NILAI_PEMBAYARAN_DPI + Number.parseFloat(value.nilai_pembayaran_dpi);
                                return res;
                            }, {});

                            var i;
                            var y;
                            var matchPIB = 0
                            isPIBMatched = false;
                            isValueMatched = false;
                            isSelectedMatched = true;

                            if (GroupSum.length != SelectedPIB.length) {
                                isSelectedMatched = false;

                            }
                            else {
                                for (i = 0; i < GroupSum.length; i++) {
                                    for (y = 0; y < SelectedPIB.length; y++) {
                                        if (GroupSum[i]["NO_PIB"] != SelectedPIB[y]["NO_PIB"]) {


                                        }
                                        else {
                                            matchPIB = y
                                            countPIBMatched++;
                                            // break;
                                        }
                                    }
                                    if (GroupSum[i]["NILAI_PEMBAYARAN_DPI"] > SelectedPIB[matchPIB]["NILAI_DISBURSMENT"]) {

                                    }
                                    else {
                                        countValueMatched++;
                                        // break;


                                    }

                                }
                            }
                            if (isNPWPValidate) {
                                if (isSelectedMatched) {
                                    if (countPIBMatched == SelectedPIB.length) {
                                        isPEBMatched = true;
                                        if (countValueMatched != SelectedPIB.length) {
                                            alert("Total nilai DPI yang dimasukkan lebih besar dari nilai DPI pada PPI");
                                            $("#uploadImpor").dxFileUploader("instance").reset()
                                        }
                                        else {
                                            isValueMatched = true;
                                        }
                                    }
                                    else {
                                        alert("PPI yang dipilih tidak sesuai dengan PPI data yang diupload");
                                        $("#uploadImpor").dxFileUploader("instance").reset()
                                    }
                                }
                                else {
                                    alert("PPI yang dipilih tidak sesuai dengan PPI data yang  diupload")
                                    $("#uploadImpor").dxFileUploader("instance").reset()
                                }

                            }
                            else {
                                alert("Upload Gagal. NPWP harus angka")
                                $("#uploadImpor").dxFileUploader("instance").reset()
                            }


                            if (isValueMatched && isPEBMatched && isSelectedMatched && isNPWPValidate) {

                                var formData = new FormData();
                                formData.append('data', JSON.stringify(result));
                                return $.ajax({
                                    url: URL + "InputDPIExcel",
                                    type: "POST",
                                    // dataType: "json",
                                    contentType: false,
                                    processData: false,
                                    data: formData,
                                    success: function (e) {
                                        alert(e);
                                        $("#uploadImpor").dxFileUploader("instance").reset();
                                        $("#gridDPI").dxDataGrid("instance").refresh();
                                        $("#gridSelectedPIB").dxDataGrid("instance").refresh();
                                        $("#gridDPI2").dxDataGrid("instance").refresh();

                                    }
                                });
                            }
                        }
                    })

                };
                reader.onerror = function (ex) {
                    toast_notify("Upload failed", "warning", 2000)
                };
                reader.readAsBinaryString(d.file);

            }

        }
    });

    $("#btnCancel").dxButton({
        text: "Batalkan Transaksi",
        type: "danger",
        icon: "clearformat",
        stylingMode: "outlined",

        height: 35,
        onClick: function () {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk membatalkan transaksi", "warning", 5000);

            }
            else {
                var confMes = "Anda akan membatalkan transaksi. seluruh data yang telah diisi akan dihapus. Apakah anda ingin melanjutkan? ";
                var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                confRes.done(function (dialogResult) {
                    if (dialogResult) {
                        if (viewOnly) {
                            toast_notify("Anda tidak memiliki wewenang untuk membatalkan transaksi ini", "warning", 5000);
                            return;
                        } else {
                            return $.ajax({
                                url: URL + "CancelTransctionDPI?id_pel_pib=" + GetSelectedPIB(), //+ NPWP,
                                type: "POST",
                                dataType: "json",
                                success: function (data) {
                                    removeLocalStorage("dokupenDataDPI");
                                    alert("Transaksi berhasil dibatalkan");

                                    window.location = routeApp + 'Pelapor/Pengirim_DPI';

                                },
                                timeout: 3000
                            });
                        }
                    }
                });
            }

        }
    }).dxButton("instance");


    var gridDataSource = new DevExpress.data.CustomStore({

        insert: function (data, value) {

            var formData = new FormData();
            formData.append('data', JSON.stringify(data));
            return $.ajax({
                url: URL + "InputDPI",
                type: "POST",
                dataType: "json",
                contentType: false,
                processData: false,
                data: formData,
                success: function (e) {
                    $("#gridDPI").dxDataGrid("instance").refresh();
                    $("#gridDPI2").dxDataGrid("instance").refresh();
                }
            })
        },
        load: function (load) {
            return $.ajax({
                url: URL + "LoadDPI",//?ParamPIB=" + GetSelectedPIB(),
                type: "GET",

            })
        },
        update: function (data, val) {
            Object.keys(val).map(function (key, index) {
                if (typeof data[key] !== 'undefined') {
                    data[key] = val[key];
                }
            });

            var formData = new FormData();
            formData.append('data', JSON.stringify(data));
            $.ajax({
                url: URL + 'UpdateDPI',
                method: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (e) {
                    $("#gridDPI").dxDataGrid("instance").refresh();
                    $("#gridDPI2").dxDataGrid("instance").refresh();
                }
            });
        },
        remove: function (key, dd) {

            $.ajax({
                url: URL + 'DeleteDPI?id_pel_input_dpi=' + key.id_pel_input_pembayar_dpi,
                method: 'GET',

                success: function (e) {
                    // $("#gridDPI").dxDataGrid("instance").refresh();
                    $("#gridDPI2").dxDataGrid("instance").refresh();
                    $("#gridSelectedPIB").dxDataGrid("instance").refresh();
                }
            });


        }
    });
    $("#download").dxButton({
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Download Data",
        type: "success",
        onClick: function (e) {
            if ($("#gridDPI2").dxDataGrid("instance").getSelectedRowKeys().length > 0) {
                $("#gridDPI2").dxDataGrid("instance").exportToExcel(true);
            }
            else {
                $("#gridDPI2").dxDataGrid("instance").exportToExcel();
            }
        }

    });


    let lookupJenisDP = {
        store: new DevExpress.data.CustomStore({
            key: "id_pel_jenis_dp",
            loadMode: "raw",
            load: function () {
                return $.getJSON(routeApi + "SaveDataNetting/getDocTypes?group_id=1");
            }
        })
    };


    var dataGrid = $("#gridSelectedPIB").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: DatagridSPIB,
        columnAutoWidth: true,
        showBorders: true,
        allowColumnReordering: true,
        showBorders: true,

        scrolling: {
            columnRenderingMode: "virtual"
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true

        },
        //onInitialized: function (e) {
        //    if (viewOnly == 1) {
        //        e.component.option("editing", {
        //            allowUpdating: false,
        //            allowDeleting: false
        //        })
        //    }
        //    dataGrid = e.component;
        //},
        paging: {
            pageSize: 8,
        },

        editing: {
            allowDeleting: true,
            allowUpdating: true,
            mode: "row",
            startEditAction: "click",
            texts: {
                addRow: "Menambah Data",
                cancelRowChanges: "",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveRowChanges: "",
                undeleteRow: "",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-trash">');

                var $edit = e.cellElement.find(".dx-link-edit");
                $edit.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');

                var $save = e.cellElement.find(".dx-link-save");
                $save.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');

                var $cancel = e.cellElement.find(".dx-link-cancel");
                $cancel.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        onRowRemoving: function (e) {
            var id_pel_pib = e.data.ID_PEL_PIB;
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data ini", "warning", 5000);
                e.cancel = true;
            } else {
                return $.ajax({
                    url: URL + "DeleteSelectedPIB?id_pel_pib=" + id_pel_pib, //+ NPWP,
                    type: "POST",
                    dataType: "json",
                    success: function (data) {
                        $("#gridSelectedPIB").dxDataGrid("instance").refresh();
                        $("#gridDPI").dxDataGrid("instance").refresh();
                    },
                    timeout: 3000
                });
            }
        },
        onRowUpdating: function (e) {
            var summaryVal = e.oldData.NILAI_CIF;

            if (e.newData.NILAI_DISBURSMENT == null) {
                var tDisbursment = Number(e.oldData.NILAI_DISBURSMENT);
            }
            else {
                var tDisbursment = Number(e.newData.NILAI_DISBURSMENT);
            }

            if (e.newData.total_split == null) {
                var tsplit = Number(e.oldData.total_split);
            }
            else {
                var tsplit = Number(e.newData.total_split);
            }



            if (tDisbursment < 1) {
                toast_notify("Total nilai DPI untuk PPI tidak boleh 0", "error")
                e.cancel = true;
            }
            if (tDisbursment > summaryVal) {
                toast_notify("Total nilai DPI untuk PPI tidak boleh lebih besar dari CIF", "error")
                e.cancel = true;
            }
            else {
                if (viewOnly) {
                    toast_notify("Anda tidak memiliki wewenang untuk merubah data ini", "warning", 5000);
                    e.cancel = true;
                } else {
                    return $.ajax({
                        url: routeApi + "DataDPI/updateDis?tDisbursment=" + tDisbursment + "&NoPIB=" + e.oldData.ID_PEL_PIB + "&total_split=" + tsplit, //+ NPWP,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            e.newData.disbursment_USD = data;
                            e.oldData.disbursment_USD = data;

                            $("#gridSelectedPIB").dxDataGrid("instance").refresh();
                        },
                        timeout: 3000

                    });
                }
            }

        },


        columns: [
            {
                caption: "PPI",
                alignment: "Center",

                columns: [
                    {
                        dataField: "id_pel_input_penerima_dpi",
                        visible: false
                    }, {
                        caption: "Nomor",
                        alignment: "left",
                        dataField: "NO_PIB",
                        allowEditing: false
                    }, {
                        caption: "Valuta",
                        alignment: "Center",
                        dataField: "VALUTA_CIF",
                        allowEditing: false
                    }, {
                        caption: "Nilai CIF",
                        alignment: "right",
                        dataField: "NILAI_CIF",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    },
                    {
                        caption: "total Nilai DPI",
                        alignment: "right",
                        dataField: "NILAI_DISBURSMENT",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            format: "#,##0.##"
                        },
                        allowEditing: true
                    }, {
                        caption: "Total Nilai konversi USD",
                        alignment: "right",
                        dataField: "disbursment_USD",
                        dataType: "number",
                        allowEditing: false,
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            min: 1,
                            format: "#,##0.##"
                        },

                    }

                ]
            }, {
                caption: "Tambah baris DPI",
                dataType: "number",
                aligment: "right",
                allowEditing: true,
                dataField: "total_split",
                editorOptions: {
                    min: 1,
                    max: 100
                }

            }
        ],
        summary: {
            totalItems: [{
                column: "NO_PIB",
                showInColumn: "NO_PIB",
                displayFormat: "TOTAL",

            }, {
                column: "NILAI_DISBURSMENT",
                showInColumn: "NILAI_DISBURSMENT",

                alignByColumn: true,
                summaryType: "sum",

                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }
            },
            {
                column: "NILAI_CIF",
                showInColumn: "Nilai_CIF",

                alignByColumn: true,
                summaryType: "sum",

                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }
            }, {
                column: "disbursment_USD",
                showInColumn: "disbursment_USD",

                alignByColumn: true,
                summaryType: "sum",

                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }
            }
            ]
        }
    }).dxDataGrid("instance");

    $("#btnProses").dxButton({
        text: "Mulai Proses Input Pembayar DPI",
        height: 35,
        type: "default",
        stylingMode: "outlined",
        onClick: function () {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk melakukan proses ini", "warning", 5000);
                e.cancel = true;
            } else {

                var DataPIB = $("#gridSelectedPIB").dxDataGrid("instance").getDataSource().items();
                var CurrentDPI = $("#gridDPI").dxDataGrid("instance").totalCount();
                var TSplit = $("#gridSelectedPIB").dxDataGrid("instance").getTotalSummaryValue("total_split");
                var TDis = $("#gridSelectedPIB").dxDataGrid("instance").getTotalSummaryValue("disbursment_USD");
                var cancel = false;

                var i;
                var y;

                if (TSplit > 100) {
                    toast_notify("Total maksimal PDKM 100", "Error");

                }
                else {
                    if (TDis < 1 || TDis == null) {
                        toast_notify("Total nilai disbursment tidak boleh 0", "error");
                    }
                    else {
                        var arr = [];
                        for (i = 0; i < DataPIB.length; i++) {
                            if (DataPIB[i].disbursment_USD <= 0 || DataPIB[i].disbursment_USD == null) {
                                alert("nilai CIF di seluruh PIB yang dipilih tidak boleh 0");
                                var cancel = true;
                                break;
                            }
                            if (DataPIB[i].total_split <= 0 || DataPIB[i].total_split == null) {
                                alert("kolom baris PIB tidak boleh 0");
                                var cancel = true;
                                break;
                            }


                            for (i = 0; i < DataPIB.length; i++) {
                                var obj = {};
                                for (y = 0; y < $("#gridSelectedPIB").dxDataGrid("instance").getDataSource().items()[i].total_split; y++) {
                                    obj["id_pel_pib"] = $("#gridSelectedPIB").dxDataGrid("instance").getDataSource().items()[i].ID_PEL_PIB;
                                    obj["tanggal_invoice"] = $("#gridSelectedPIB").dxDataGrid("instance").getDataSource().items()[i].TANGGAL_INVOICE;
                                    obj["valuta_cif"] = $("#gridSelectedPIB").dxDataGrid("instance").getDataSource().items()[i].VALUTA_CIF;
                                    obj["nilai_pembayaran_dpi"] = Number(1);
                                    obj["nilai_invoice"] = Number(1);
                                    arr.push(obj);
                                }
                                obj = {};
                            }
                        }
                        if (!cancel) {
                            if (CurrentDPI > arr.length) {
                                var confMes = "total pecahan PEB yang di-set lebih kecil dari sebelumnya. beberapa data akan terhapus. Apakah anda ingin melanjutkan? ";
                                var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                                confRes.done(function (dialogResult) {
                                    if (dialogResult) {
                                        var formData = new FormData();
                                        formData.append('data', JSON.stringify(arr));
                                        return $.ajax({
                                            url: URL + "SetNewDPI",
                                            type: "POST",
                                            // dataType: "json",
                                            contentType: false,
                                            processData: false,
                                            data: formData,
                                            success: function (e) {

                                                $("#gridDPI").dxDataGrid("instance").refresh();

                                                $("#gridDPI2").dxDataGrid("instance").refresh();
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                var formData = new FormData();
                                formData.append('data', JSON.stringify(arr));
                                return $.ajax({
                                    url: URL + "SetNewDPI",
                                    type: "POST",
                                    // dataType: "json",
                                    contentType: false,
                                    processData: false,
                                    data: formData,
                                    success: function (e) {

                                        $("#gridDPI").dxDataGrid("instance").refresh();

                                        $("#gridDPI2").dxDataGrid("instance").refresh();
                                    }
                                });
                            }

                        }

                    }
                }
            }
        }
    }).dxButton("instance");

    $("#btnBack").dxButton({
        text: "Kembali",
        type: "dangerd",
        stylingMode: "outlined",
        height: 35,
        onClick: function () {
            window.location = routeApp + 'Pelapor/Pengirim_DPI';
        }
    }).dxButton("instance");



    $("#gridDPI").dxDataGrid({
        dataSource: gridDataSource,
        showBorders: true,
        onEditorPrepared: function (e) {
            // var NPWP = e.row.data.npwp_pdkm
            if (e.dataField == "npwp_pembayar_dpi") {
                $(e.editorElement).dxTextBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDPI").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    if (NPWP == INPWP.substring(0, 9) || NPWP == INPWP) {
                        toast_notify("NPWP ini sudah terdaftar sebagai salah satu perusahaan anda. Silahkan menggunakan NPWP yang lain ", "warning", 5000);

                        grid.cellValue(index, "flag_npwp_exist", 0);
                        grid.cellValue(index, "pembayar_dpi", '');

                    }
                    else {
                        $.ajax({
                            url: routeApi + "DataPDKM/CheckNPWP?NPWP=" + args.value, //+ NPWP,
                            type: "GET",
                            dataType: "json",
                            success: function (data) {
                                if (data.length < 1) {
                                    grid.cellValue(index, "flag_npwp_exist", 0);
                                    grid.cellValue(index, "pembayar_dpi", '');
                                }
                                else {
                                    grid.cellValue(index, "flag_npwp_exist", 1);
                                    grid.cellValue(index, "pembayar_dpi", data[0].nama_perusahaan);
                                }
                            },
                            timeout: 3000

                        });
                    }


                    //var result = "new description " + args.value;

                });
            }
            if (e.dataField == "nilai_pembayaran_dpi") {
                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDPI").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var pib = e.row.data.id_pel_pib
                    var valuta = e.row.data.valuta_nilai_pembayaran_dpi;
                    grid.cellValue(index, "nilai_invoice", args.value);

                    $.ajax({
                        url: routeApi + "DataDPI/ConvertValuta?nilaiDPI=" + args.value + "&valuta=" + valuta + "&id_pel_pib=" + pib,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            var result = data;
                            grid.cellValue(index, "nilai_disbursment_usd", result);
                        },
                        timeout: 3000
                    });
                });
            }
            if (e.dataField == "valuta_nilai_pembayaran_dpi") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDPI").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var nilai = e.row.data.nilai_pembayaran_dpi;
                    var id_pel_pib = e.row.data.id_pel_pib;


                    $.ajax({
                        url: routeApi + "DataDPI/ConvertValuta?nilaiDPI=" + nilai + "&valuta=" + args.value + "&id_pel_pib=" + id_pel_pib,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            var result = data;
                            grid.cellValue(index, "nilai_disbursment_usd", result);
                        },
                        timeout: 3000
                    });
                });
            }
        },
        editing: {
            allowDeleting: true,
            allowUpdating: true,
            mode: "row",
            startEditAction: "click",
            texts: {
                addRow: "Menambah Data",
                cancelRowChanges: "",
                confirmDeleteMessage: "",
                confirmDeleteTitle: "",
                deleteRow: "",
                editRow: "",
                saveRowChanges: "",
                undeleteRow: "",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        onCellPrepared: function (e) {
            if (e.column.type === "buttons" && e.rowType === "data") {
                var $del = e.cellElement.find(".dx-link-delete");
                $del.attr("title", "Hapus Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-trash">');

                var $edit = e.cellElement.find(".dx-link-edit");
                $edit.attr("title", "Ubah Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-edit">');

                var $save = e.cellElement.find(".dx-link-save");
                $save.attr("title", "Simpan Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-save">');

                var $cancel = e.cellElement.find(".dx-link-cancel");
                $cancel.attr("title", "Batal Data").attr("style", "padding: 5px 7px; display: in-line; border:none;").append('<i class="dx-icon dx-icon-revert">');
            }
        },
        "export": {
            //enabled: true,
            fileName: "Data DPI"
            //allowExportSelectedData: true
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 8
        },
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.option("summary").totalItems[0].column = "";
            e.component.option("summary").totalItems[1].column = "";
            e.component.option("summary").totalItems[0].displayFormat = " ";
            e.component.columnOption("nilai_disbursment_usd", "visible", false);
            e.component.columnOption("flag_npwp_exist", "visible", false);

        },
        onExported: function (e) {
            e.component.option("summary").totalItems[0].valueFormat = "TOTAL";
            e.component.option("summary").totalItems[0].column = "id_pel_pib";
            e.component.option("summary").totalItems[1].column = "nilai_disbursment_usd";
            e.component.columnOption("flag_npwp_exist", "visible", true);
            e.component.columnOption("nilai_disbursment_usd", "visible", true);
            e.component.endUpdate();
        },
        //onRowInserting: function (e) {

        //    loadData();
        //    var InPIB = e.data.id_pel_pib;
        //    var InInv = e.data.nilai_disbursment_usd;
        //    var total;
        //    var x;
        //    var y;
        //    var nInvoice = e.data.nilai_invoice;
        //    var errorInvoice = "";
        //    var errorInv = "";

        //    var isInvoiceValid = true;
        //    var total;


        //    if (nInvoice == null) {
        //        nInvoice = 0;
        //    }
        //    if (InInv == null) {
        //        InInv = 0;
        //    }
        //    if (nInvoice <= 0) {
        //        errorInvoice = "Nilai Invoice harus lebih dari 0";
        //        isInvoiceValid = false;
        //    }

        //    if (InInv <= 0) {
        //        errorInv = "Nilai DPI harus lebih dari 0";
        //        e.isValid = false;
        //    }

        //    if (e.isValid == false) {
        //        toast_notify(errorInv, "error");
        //        e.cancel = true;


        //    }
        //    if (!isInvoiceValid) {
        //        toast_notify(errorInvoice, "error");
        //        e.cancel = true;
        //    }


        //    if (arrData.length != 0) {
        //        total = 0;
        //        for (x = 0; x < arrData.length; x++) {
        //            if (arrData[x]["NomorPIB"] == InPIB) {
        //                total = arrData[x]["value"] + InInv;

        //                break;
        //            }
        //            else {
        //                total = InInv;

        //            }
        //        }
        //        for (y = 0; y < SelectedPIB.length; y++) {
        //            if (SelectedPIB[y]["ID_PEL_PIB"] == InPIB) {



        //                if (total > SelectedPIB[y]["disbursment_USD"].toFixed(2)) {

        //                    e.isValid = false;
        //                    e.errorText = "Total Nilai DPI yang dimasukkan lebih besar dari nilai DPI pada PPI";

        //                    break;
        //                }

        //            }
        //        }
        //    }
        //    else {
        //        for (y = 0; y < SelectedPIB.length; y++) {
        //            if ((SelectedPIB[y]["ID_PEL_PIB"] == InPIB)) {
        //                if (InInv > SelectedPIB[y]["disbursment_USD"].toFixed(2)) {

        //                    e.isValid = false;
        //                    e.errorText = "Total Nilai DPI yang dimasukkan lebih besar dari nilai DPI pada PPI";

        //                    break;
        //                }

        //            }
        //        }
        //    }

        //    if (e.errorText != null) {
        //        toast_notify(e.errorText, "error");
        //        e.cancel = true;



        //    }


        //},
        onRowUpdating: function (e) {

            var SelectedPIB = $("#gridSelectedPIB").dxDataGrid("instance").getDataSource().items();
            loadData();

            var oldValDis = e.oldData.nilai_disbursment_usd;
            var oldPIB = e.oldData.id_pel_pib;
            var newInvoice = e.newData.nilai_invoice;


            var newPIB = e.newData.id_pel_pib;
            var newValDis = e.newData.nilai_disbursment_usd;
            var total;
            var x;
            var y;

            if (newPIB == null) {
                newPIB = oldPIB;
            };
            if (newValDis <= 0) {
                e.isValid = false;
                e.errorText = "Nilai DPI harus lebih lebih dari 0";

            };
            if (newInvoice <= 0) {
                e.isValid = false;
                e.errorText = "Nilai Invoice harus lebih dari 0";
            }


            if (arrData.length != 0) {
                total = 0;
                for (x = 0; x < arrData.length; x++) {
                    if (arrData[x]["NomorPIB"] == newPIB) {
                        total = arrData[x]["value"] + newValDis - oldValDis;

                        break;
                    }
                }
                for (y = 0; y < SelectedPIB.length; y++) {
                    if (SelectedPIB[y]["ID_PEL_PIB"] == newPIB) {
                        if (total == 0) {
                            total = newValDis;
                        }


                        if (total > SelectedPIB[y]["disbursment_USD"].toFixed(2)) {

                            e.isValid = false;
                            e.errorText = "Total Nilai DPI yang dimasukkan lebih besar dari nilai DPI pada PPI";

                            break;
                        }

                    }
                }
            }
            else {
                for (y = 0; y < SelectedPIB.length; y++) {
                    if ((SelectedPIB[y]["ID_PEL_PIB"] === newPIB)) {
                        if (total > SelectedPIB[y]["disbursment_USD"].toFixed(2)) {

                            e.isValid = false;
                            e.errorText = "Total Nilai DPI yang dimasukkan lebih besar dari nilai DPI pada PPI";

                            break;
                        }

                    }
                }
            }

            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk merubah data ini", "warning", 5000);
                e.cancel = true;
            } else {
                if (e.isValid === false) {
                    toast_notify(e.errorText, "error");
                    e.cancel = true;
                }
            }
        },
        onRowRemoving: rem => {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data ini", "warning", 5000);
                rem.cancel = true;
            }
        },
        columns: [
            {
                caption: "No PPI",
                alignment: "left",
                dataField: "id_pel_pib",
                allowEditing: false,
                lookup: {
                    dataSource: DatagridSPIB,
                    displayExpr: "NO_PIB",
                    valueExpr: "ID_PEL_PIB"

                }
            }, {

                caption: "Valuta",
                alignment: "center",
                dataField: "valuta_nilai_pembayaran_dpi",
                validationRules: [{
                    type: "stringLength",
                    max: 3,
                    min: 3,
                    message: "Harus 3 karakter"
                }, {
                    type: "required"
                }],
                lookup: {
                    dataSource: new DevExpress.data.CustomStore({
                        key: "KD_VAL",
                        loadMode: "raw",
                        load: function () {
                            return $.getJSON(routeApi + "refValuta/GetRefValuta");
                        }

                    }),

                    displayExpr: "KD_VAL",
                    valueExpr: "KD_VAL",
                    searchExpr: "KD_VAL"
                }
            }, {
                caption: "Nilai DPI",
                alignment: "right",
                dataField: "nilai_pembayaran_dpi",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##",
                },
                validationRules: [{ type: "required" }]

            }, {
                caption: "Nilai konversi USD",
                alignment: "center",
                dataType: "number",
                dataField: "nilai_disbursment_usd",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                }

            }, {
                caption: "Nama Pembayar DPI",
                alignment: "left",
                dataField: "pembayar_dpi",
                validationRules: [{
                    type: "stringLength",
                    max: 160,
                    message: "Maksimal 160 karakter"
                }, {
                    type: "required",
                    message: "Nama pembayar tidak boleh kosong"
                }]
            }, {
                caption: "NPWP Pembayar DPI",
                alignment: "left",
                dataField: "npwp_pembayar_dpi",
                validationRules: [{
                    type: 'pattern',
                    pattern: '^\\d+$',
                    message: "Kolom harus angka"
                },
                {
                    type: "required",
                    message: "NPWP pembayar tidak boleh kosong"
                }, {
                    type: "stringLength",
                    max: 15,
                    min: 15,
                    message: "Maksimal 15 karakter"
                }]
            }, {
                caption: "Status",
                alignment: "left",

                dataField: "flag_npwp_exist",
                allowEditing: false,
                lookup: {
                    dataSource: [
                        { id: 0, text: "NPWP Belum Terdaftar" },
                        { id: 1, text: "NPWP Sudah Terdaftar" }
                    ],
                    displayExpr: "text",
                    valueExpr: "id"
                }

            }, {
                caption: "Nomor Invoice",
                alignment: "left",
                dataField: "no_invoice",
                validationRules: [{
                    type: "stringLength",
                    max: 30,
                    message: "Maksimal 30 karakter"
                }, {
                    type: "required",
                    message: "Nomor invoice tidak boleh kosong"
                }]
            }, {
                caption: "Tanggal Invoice",
                alignment: "right",
                dataType: "date",
                dataField: "tanggal_invoice",
                format: 'dd/MM/yyyy',
                validationRules: [{ type: "required" }]
            }, {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "nilai_invoice",
                dataType: "number",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##", min: 0
                },
                validationRules: [{ type: "required" }]
            }
        ],
        summary: {
            recalculateWhileEditing: true,
            totalItems: [{
                column: "id_pel_pib",
                showInColumn: "id_pel_pib",

                displayFormat: "TOTAL"
            }, {
                column: "nilai_disbursment_usd",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }
            }]
        }
    }).dxDataGrid("instance");

    $("#gridDPI2").hide().dxDataGrid({
        dataSource: gridDataSource,
        showBorders: true,

        onEditorPrepared: function (e) {
            // var NPWP = e.row.data.npwp_pdkm
            if (e.dataField == "npwp_pembayar_dpi") {
                $(e.editorElement).dxTextBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDPI").dxDataGrid("instance");
                    var index = e.row.rowIndex;

                    $.ajax({
                        url: routeApi + "DataPDKM/CheckNPWP?NPWP=" + args.value, //+ NPWP,
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            // alert(data[0].flag_npwp_exist);
                            //e.row.key.flag_npwp_exist = data[0].flag_npwp_exist;
                            var result = data[0].flag_npwp_exist;
                            grid.cellValue(index, "flag_npwp_exist", result);
                            //$("#gridPDKM").dxDataGrid("instance").refresh();
                        },
                        timeout: 3000

                    });
                    //var result = "new description " + args.value;

                });
            }
            if (e.dataField == "nilai_pembayaran_dpi") {
                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDPI").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var pib = e.row.data.id_pel_pib
                    var valuta = e.row.data.valuta_nilai_pembayaran_dpi;

                    $.ajax({
                        url: routeApi + "DataDPI/ConvertValuta?nilaiDPI=" + args.value + "&valuta=" + valuta + "&id_pel_pib=" + pib,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            var result = data;
                            grid.cellValue(index, "nilai_disbursment_usd", result);
                        },
                        timeout: 3000
                    });
                });
            }
            if (e.dataField == "valuta_nilai_pembayaran_dpi") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDPI").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var nilai = e.row.data.nilai_pembayaran_dpi;
                    var id_pel_pib = e.row.data.id_pel_pib;


                    $.ajax({
                        url: routeApi + "DataDPI/ConvertValuta?nilaiDPI=" + nilai + "&valuta=" + args.value + "&id_pel_pib=" + id_pel_pib,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            var result = data;
                            grid.cellValue(index, "nilai_disbursment_usd", result);
                        },
                        timeout: 3000
                    });
                });
            }
        },


        "export": {
            //enabled: true,
            fileName: "Data DPI"
            //allowExportSelectedData: true
        },

        columns: [
            {
                caption: "No PPI",
                alignment: "left",
                dataField: "id_pel_pib",
                lookup: {
                    dataSource: DatagridSPIB,
                    displayExpr: "NO_PIB",
                    valueExpr: "ID_PEL_PIB"

                }
            }, {

                caption: "Valuta",
                alignment: "center",
                dataField: "valuta_nilai_pembayaran_dpi",
                validationRules: [{
                    type: "stringLength",
                    max: 3,
                    min: 3,
                    message: "Harus 3 karakter"
                }, {
                    type: "required"
                }],
                lookup: {
                    dataSource: new DevExpress.data.CustomStore({
                        key: "KD_VAL",
                        loadMode: "raw",
                        load: function () {
                            return $.getJSON(routeApi + "refValuta/GetRefValuta");
                        }

                    }),

                    displayExpr: "KD_VAL",
                    valueExpr: "KD_VAL",
                    searchExpr: "KD_VAL"
                }
            }, {
                caption: "Nilai DPI",
                alignment: "right",
                dataField: "nilai_pembayaran_dpi",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##",
                },
                validationRules: [{ type: "required" }]

            }, {
                caption: "Nama Pembayar DPI",
                alignment: "left",
                dataField: "pembayar_dpi",
                validationRules: [{
                    type: "stringLength",
                    max: 160,
                    message: "Maksimal 160 karakter"
                }, { type: "required" }]
            }, {
                caption: "NPWP Pembayar DPI",
                alignment: "left",
                dataField: "npwp_pembayar_dpi",
                validationRules: [{
                    type: 'pattern',
                    pattern: '^\\d+$',
                    message: "Kolom harus angka"
                }, {
                    type: "stringLength",
                    max: 15,
                    message: "Maksimal 15 karakter"
                },
                { type: "required" }]
            }, {
                caption: "Nomor Invoice",
                alignment: "left",
                dataField: "no_invoice",
                validationRules: [{
                    type: "stringLength",
                    max: 30,
                    message: "Maksimal 30 karakter"
                }, { type: "required" }]
            }, {
                caption: "Tanggal Invoice",
                alignment: "right",
                dataType: "date",
                dataField: "tanggal_invoice",
                format: 'dd/MM/yyyy',
                validationRules: [{ type: "required" }]
            }
        ]
    }).dxDataGrid("instance");

    function UploadDP() {
        var datas = {};
        var upJSon = "";
        $("#gridUploadDPI").dxDataGrid("instance").option("dataSource").forEach(function (val, ix) {
            upJSon = upJSon + '{"id_pel_jenis":' + val.id_pel_jenis + ',"path_file":"' + val.path_file + '","nama_file":"' + val.nama_file + '"},';
        });
        upJSon = "[" + upJSon.substring(0, upJSon.length - 1) + "]";
        datas["json_up"] = upJSon;
        datas["id_trx"] = 20;
        datas["peb_pib"] = GetSelectedPIB();
        datas["id_pel_status"] = 7;


        var formData = new FormData();
        formData.append('data', JSON.stringify(datas));
        var url = routeApi + "SaveDataPDKM/SaveDP"


        $.ajax(url, {
            method: "POST",
            contentType: false,
            processData: false,
            data: formData,
            cache: false
        }).done(function (result) {
            //var msg = result[0]["msg_net"];
            //if (msg === "OK") {
            //    clearMyStorage();
            //    toast_notify("Transaksi berhasil disimpan!", "success", 1000);
            //    window.location.reload();
            //}
            //else {
            //    toast_notify(msg, "error", 2500);
            //}
        });
    }




    function loadData() {
        arrData = [];
        var data = $("#gridDPI").dxDataGrid('instance').getDataSource().items();
        var i;
        var y;
        for (i = 0; i < data.length; i++) {
            if (arrData.length === 0) {
                arrData.push({
                    NomorPIB: data[i]["id_pel_pib"],
                    value: data[i]["nilai_disbursment_usd"]
                });
            }
            else {
                for (y = 0; y < arrData.length; y++) {
                    if (arrData[y]["NomorPIB"] == data[i]["id_pel_pib"]) {
                        arrData[y]["value"] = arrData[y]["value"] + data[i]["nilai_disbursment_usd"];
                        break;
                    }
                    if (arrData[y]["NomorPIB"] != data[i]["id_pel_pib"] && (arrData.length - 1 == y)) {
                        arrData.push({
                            NomorPIB: data[i]["id_pel_pib"],
                            value: data[i]["nilai_disbursment_usd"]
                        });
                        break;
                    }
                    else {

                    }
                }
            }
        }
    }




    $("#gridUploadDPI").dxDataGrid({
        dataSource: upData,
        columnAutoWidth: false,
        scrolling: { columnRenderingMode: "virtual1" },
        paging: { pageSize: 10 },
        columns: [
            {
                caption: "DOKUMEN PENDUKUNG",
                alignment: "Center",
                columns: [
                    {
                        caption: "Nama File",
                        alignment: "left",
                        dataField: "nama_file"
                    },
                    {
                        caption: "Jenis Dokumen",
                        alignment: "left",
                        dataField: "id_pel_jenis",
                        lookup: {
                            dataSource: new DevExpress.data.CustomStore({
                                key: "id_pel_jenis_dp",
                                loadMode: "raw",
                                load: function () {
                                    return $.getJSON(routeApi + "SaveDataNetting/getDocTypes?group_id=1");
                                }
                            }),
                            displayExpr: "jenis_dp",
                            valueExpr: "id_pel_jenis_dp"
                        },
                        validationRules: [
                            {
                                type: "required",
                                message: "Jenis Dokumen Wajib Diisi"
                            }
                        ]
                    },
                    {
                        caption: "Lampiran Dokumen",
                        dataField: "path_file",
                        validationRules: [
                            {
                                type: "required",
                                message: "Wajib Mengunggah Dokumen"
                            }
                        ],
                        cellTemplate: function (container, opt) {
                            var ext = opt.value.split(".").pop();
                            var uri = opt.value.substr(1, opt.value.length);
                            var link = '<a href="' + routeApp + uri + '" target="_blank">' +
                                (ext === "pdf" || ext === "PDF" ? "Unduh Dokumen" : "Lihat Dokumen") + '</a>';
                            container.append(link);
                        }
                    }
                ]
            }
        ],
        editing: {
            allowAdding: true,
            allowUpdating: false,
            allowDeleting: true,
            mode: "form",
            form: { items: ["id_pel_jenis", "path_file"], labelLocation: "top" },
            texts: {
                addRow: "Menambah Data",
                cancelAllChanges: "Batalkan Semua Perubahan",
                cancelRowChanges: "Batalkan",
                confirmDeleteMessage: "Apakah anda ingin menghapus dokumen ini?",
                confirmDeleteTitle: "Hapus Dokumen Pendukung",
                deleteRow: "Hapus",
                editRow: "Sunting",
                saveAllChanges: "Simpan Perubahan",
                saveRowChanges: "Simpan",
                undeleteRow: "Batalkan",
                validationCancelChanges: "Batalkan Perubahan"
            }
        },
        onCellPrepared: function (e) {
            if (e.rowType === "detail") {
                $("#btnClearTrx").attr("disabled", true);
                $("#btnPostNetting").attr("disabled", true);
                var $save = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[0]);
                $save.dxButton({
                    icon: "save",
                    text: "Simpan",
                    stylingMode: "outlined",
                    type: "default"
                });

                var $cancel = e.cellElement.find(e.cellElement.find(".dx-datagrid-form-buttons-container").children()[1]);
                $cancel.dxButton({
                    icon: "close",
                    text: "Batalkan",
                    stylingMode: "outlined",
                    type: "danger"
                });

                $cancel.on("click",
                    function () {
                        $("#btnClearTrx").attr("disabled", false);
                        $("#btnPostNetting").attr("disabled", false);
                    });
            }
        },
        onEditorPreparing: function (e) {
            if (e.parentType === "dataRow" && e.dataField === "path_file") {
                e.editorName = "dxFileUploader";
                e.editorOptions.allowCanceling = false,
                    e.editorOptions.selectButtonText = "Pilih Dokumen",
                    e.editorOptions.name = "pib_file",
                    e.editorOptions.labelText = "max 25Mb (.pdf .jpg .gif .png .bmp)",
                    e.editorOptions.allowedFileExtensions = [".pdf", ".jpg", ".gif", ".png", ".bmp"],
                    e.editorOptions.invalidFileExtensionMessage = "Jenis/Tipe dokumen tidak diperbolehkan!",
                    e.editorOptions.maxFileSize = 25000000000,
                    e.editorOptions.invalidMaxFileSizeMessage = "Ukuran dokumen melebihi batas kapasitas maksimal!",
                    e.editorOptions.uploadedMessage = "Unggah dokumen berhasil ",
                    e.editorOptions.uploadFailedMessage = "Unggah dokumen gagal!",
                    e.editorOptions.readyToUploadMessage = "Dokumen siap untuk diunggah",
                    e.editorOptions.uploadMode = viewOnly ? "useForm" : "instantly";
                e.editorOptions.onValueChanged = function (args) {
                    if (args.component._files[0].isValid()) {
                        args.component.option('uploadUrl', '/Simodis/api/DokumenPendukung/UploadDokupen');
                        e.setValue(args.value[0].name);
                    } else {
                        e.setValue(null);
                    }
                };
                e.editorOptions.onUploaded = function (args) {
                    var respon = JSON.parse(args.request.response)[0];
                    //args.element.find(".dx-fileuploader-file-name").text(respon.Name);
                    e.setValue(respon.Path);
                };
                e.editorOptions.onUploadError = function (args) {
                    var xhttp = args.request;
                    if (xhttp.readyState === 4 && xhttp.status === 0) {
                        var msg = "Terjadi gangguan koneksi. Silahkan diulang kembali.";
                        toast_notify(msg, "error", 2000);
                        args.component.reset();
                    }
                };
            }
        },
        onRowInserting: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menambah DP", "warning", 5000);
                e.cancel = true;
            } else {
                if (e.data["path_file"]) {
                    var file = e.data["path_file"].split("/").pop();
                    var arname = file.split("."); arname.pop();
                    e.data["nama_file"] = arname.join("");
                }
            }



        },
        onRowInserted: function (e) {
            //$("#btnClearTrx").attr("disabled", false);
            //$("#btnPostNetting").attr("disabled", false);
            setLocalStorage("dokupenDataDPI", JSON.stringify(e.component.getDataSource()._items));
        },
        onRowRemoving: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                e.cancel = true;
            }
        },
        onRowRemoved: function (e) {
            setLocalStorage("dokupenDataDPI", JSON.stringify(e.component.getDataSource()._items));
        }
    });



    $("#btnSave").dxButton({
        text: "Simpan & Selesaikan Transaksi",
        height: 34,
        width: 280,
        type: "success",
        icon: "save",
        stylingMode: "outlined",

        onClick: function () {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menyimpan transaksi ini", "warning", 5000);
                return;
            } else {
                var isEditingDPI = $("#gridDPI").dxDataGrid("instance").getController("editing").isEditing();
                var isEditingDokupen = $("#gridUploadDPI").dxDataGrid("instance").getController("editing").isEditing();
                var isdEditingSelectedPIB = $("#gridSelectedPIB").dxDataGrid("instance").getController("editing").isEditing();
                var isNpwpHasvalue = true;
                var isNpwpExist = true;

                if (isEditingDPI == true || isEditingDokupen == true || isdEditingSelectedPIB == true) {

                    alert("Tidak bisa menyimpan transaksi, masih ada data yang masih belum disimpan")
                }
                else {
                    var data = $("#gridDPI").dxDataGrid("instance").getDataSource().items();
                    for (var i = 0; i < data.length; i++) {
                        var name = data[i].flag_npwp_exist;
                        if (name === 0) {
                            isNpwpExist = false;

                            break;
                        }
                    }

                    for (var i = 0; i < data.length; i++) {
                        var name = data[i].flag_npwp_exist;
                        var checknpwp = data[i].npwp_pembayar_dpi;

                        if (checknpwp == null) {
                            isNpwpHasvalue = false;

                        }

                        if (name === 0) {
                            isNpwpExist = false;

                        }
                    }





                    //if ($("#gridDPI").dxDataGrid("instance").getDataSource().items().length == 0 || $("#gridUploadDPI").dxDataGrid("instance").getDataSource().items().length == 0) {
                    //    alert("dokumen pendukung dan Pembayar DPI tidak boleh kosong")
                    //}
                    //else {


                        if (!isNpwpHasvalue) {
                            alert("Data tidak boleh ada yang kosong");

                        }
                        else {
                            var totalSelectedPEB = $("#gridSelectedPIB").dxDataGrid("instance").getTotalSummaryValue(1);
                            var totalInput = $("#gridDPI").dxDataGrid("instance").getTotalSummaryValue(1);

                            if (totalSelectedPEB < totalInput) {
                                alert("Jumlah Nilai Invoice lebih besar daripada Jumlah Disbursment");
                            }
                            else {
                                if (!isNpwpExist) {
                                    var confMes = "Terdapat NPWP yang belum terdaftar. Apakah anda ingin melanjutkan? ";
                                    var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                                    confRes.done(function (dialogResult) {
                                        if (dialogResult) {
                                            UploadDP();
                                            return $.ajax({
                                                url: URL + "MoveToPelInputDPI?PIB=" + GetSelectedPIB(),
                                                type: "POST",
                                                // dataType: "json",

                                                success: function (e) {
                                                    alert("sukses simpan DPI");
                                                    window.location = routeApp + 'Pelapor/Pengirim_DPI';
                                                }
                                            });
                                        }
                                    });

                                } else {
                                    var confMes = "DPI yang diisi akan disimpan dan akan diproses. selama proses approval PDKM tidak dapat diubah. apakah anda yakin?";
                                    var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                                    confRes.done(function (dialogResult) {
                                        if (dialogResult) {
                                            UploadDP();
                                            return $.ajax({
                                                url: URL + "MoveToPelInputDPI?PIB=" + GetSelectedPIB(),
                                                type: "POST",
                                                // dataType: "json",

                                                success: function (e) {
                                                    alert("sukses simpan DPI");
                                                    window.location = routeApp + 'Pelapor/Pengirim_DPI';
                                                }
                                            });
                                        }

                                    });

                                }

                            }
                        }

                    //}
                }
            }
        }
    }).dxButton("instance");
})

