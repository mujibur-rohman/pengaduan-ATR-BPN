$(function () {
    function toDate(selector) {
        var from = selector.split("/");
        return new Date(from[2], from[1] - 1, from[0]);
    };
    var URL = routeApi + "DataDHE/";


    var DatagridSPEB = new DevExpress.data.CustomStore({
        //key: "id_pel_jenis_dp",
        // loadMode: "raw",
        load: function () {
            return $.ajax({
                url: URL + "GetPEB",
                type: "GET",
                success: function (data) {

                }
            })
        }
    });


    function GetSelectedPEB() {
        var SelectedPEB = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items();
        var y;
        var s = " ";

        for (y = 0; y < SelectedPEB.length; y++) {

            s += SelectedPEB[y]["ID_PEL_PEB"] + " ";
        }

        return s;

    };
    let upData = getLocalStorage("dokupenDataDHE") === "" ? [] : JSON.parse(getLocalStorage("dokupenDataDHE"));

    let lookupJenisDP = {
        store: new DevExpress.data.CustomStore({
            key: "id_pel_jenis_dp",
            loadMode: "raw",
            load: function () {
                return $.getJSON(routeApi + "SaveDataNetting/getDocTypes?group_id=1");
            }
        })
    };

    var mapCaptionToDataField = {
        "No PPE": "NO_PEB",
        "Valuta": "valuta_nilai_disbursement_penerima_dhe",
        "Nilai DHE": "nilai_disbursement",
        "Nama Penerima DHE": "penerima_dhe",
        "NPWP Penerima DHE": "npwp_penerima_dhe",

        "Nomor Invoice": "no_invoice",
        "Tanggal Invoice": "tanggal_invoice2"

    };

    $("#gridUploadDHE").dxDataGrid({
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
                                    return $.getJSON(routeApi + "SaveDataNetting/getDocTypes?group_id=3");
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
                        alignment: "left",
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
                    e.editorOptions.name = "peb_file",
                    e.editorOptions.labelText = "max 25Mb (.pdf .jpg .gif .png .bmp)",
                    e.editorOptions.allowedFileExtensions = [".pdf", ".jpg", ".gif", ".png", ".bmp"],
                    e.editorOptions.invalidFileExtensionMessage = "Jenis/Tipe dokumen tidak diperbolehkan!",
                    e.editorOptions.maxFileSize = 25000000,
                    e.editorOptions.invalidMaxFileSizeMessage = "Ukuran dokumen melebihi batas kapasitas maksimal!",
                    e.editorOptions.uploadedMessage = "Unggah dokumen berhasil ",
                    e.editorOptions.uploadFailedMessage = "Unggah dokumen gagal!";
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
                        DevExpress.ui.notify(msg, "error", 2000);
                        args.component.reset();
                    }
                };
            }
        },


        onRowInserting: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk memassukan data", "warning", 5000);
                e.cancel = true;
            }
            else {
                if (e.data["path_file"]) {
                    var file = e.data["path_file"].split("/").pop();
                    var arname = file.split("."); arname.pop();
                    e.data["nama_file"] = arname.join("");
                }
                var peb = GetSelectedPEB();
                var docType = e.data.id_pel_jenis;
                var filename = e.data.nama_file
            }

        },
        onRowRemoving:
        function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                e.cancel = true;
            } else {
                e.cancel = false;
            }
        },
        onRowInserted: function (e) {
            setLocalStorage("dokupenDataDHE", JSON.stringify(e.component.getDataSource()._items));
        },
        onRowRemoved: function (e) {
            setLocalStorage("dokupenDataDHE", JSON.stringify(e.component.getDataSource()._items));
        }
    });


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
                $("#uploadEkspor").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadEkspor").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadEkspor").dxFileUploader("instance")._$fileInput.click();
            });
        }
    });

    $("#uploadEkspor").dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xlsx",
        maxFileSize: 25000000000,
        uploadUrl: routeApp + "Pelapor/InputDHE",
        allowedFileExtensions: [".xlsx"],
        invalidFileExtensionMessage: "Hanya bisa mengekspor data excel",
        uploadMode: "instantly",

        onUploaded: function (d) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menunggah file", "warning", 5000);
                $("#uploadEkspor").dxFileUploader("instance").reset();
            }
            else {
                var errorNPWP = "";

                var errorNilaiD = "";
                var errorvaluta = "";
                var errorNilaiInv = "";
                var errorNamaDHE = "";
                var errornoinvoice = "";
                var isNPWPValidate = true;
                var isNilaiValidate = true;

                var isNamaDHEValidate = true;
                var isnoinvoiceValidate = true;
                var isread = true;
                var isNilaiInvoiceValidate = true;
                var NerrorNPWP = "";
                var Nerrorvaluta2 = "";

                var NerrorNilaiInv = "";
                var NerrorNamaDHE = "";
                var isValutaValidate = true;
                var Nerrorvaluta = "";

                var NErrorNilai = "";
                var Nerrornoinvoice = "";
                var isNPWPValidate = true;
                var countPEBMatched = 0;
                var countValueMatched = 0;

                var isTanggalValidate = true;
                var errorTanggal = "";
                var NerrorTanggal = "";
                var isValutaValidate2 = true;
                var isNotEmpty = true;
                var nEmpty = "";
                var SelectedPEB = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items();


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
                    var arrayTest = ["NO PPE", "VALUTA", "NILAI DHE", "NAMA PENERIMA DHE", "NPWP PENERIMA DHE", "NOMOR INVOICE", "TANGGAL INVOICE"];
                    for (var key in xlsxJson[0]) {
                        if (xlsxJson[0][key].toUpperCase() !== arrayTest[CountLoop]) {
                            DevExpress.ui.notify("Upload Gagal. Template tidak sesuai.", "warning");
                            $("#uploadEkspor").dxFileUploader("instance").reset()
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
                                    if (keyObj == "npwp_penerima_dhe") {
                                        if (isNaN(valueContent.v) || valueContent.v == '' || (valueContent.v).toString().length != 15) {
                                            isNPWPValidate = false;
                                            isread = false;
                                            errorNPWP = errorNPWP + (count - 1) + ",";
                                        }

                                    }
                                    if (keyObj == "valuta_nilai_disbursement_penerima_dhe") {
                                        if ((valueContent.v).toString().length > 3) {
                                            isValutaValidate = false;
                                            isread = false;
                                            errorvaluta = errorvaluta + (count - 1) + ",";
                                        }
                                    }

                                    if (keyObj == "nilai_disbursement") {
                                        if (isNaN(valueContent.v) || valueContent.v == '' || valueContent.v < 1) {
                                            isNilaiValidate = false;
                                            isread = false;
                                            errorNilaiD = errorNilaiD + (count - 1) + ",";
                                        }

                                    }
                                    if (keyObj == "penerima_dhe") {
                                        if ((valueContent.w).length > 160) {
                                            isNamaDHEValidate = false;
                                            isread = false;
                                            errorNamaDHE = errorNamaDHE + (count - 1) + ",";

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
                                        //var b = date.parse(valueContent.v);
                                        //var cdate = a[1] + "/" + a[0] + "/" + a[2];




                                        //if (isNaN(Date.parse(cdate))) {
                                        //    isTanggalValidate = false;
                                        //    isread = false;
                                        //    errorTanggal = errorTanggal + (count - 1) + ",";
                                        //}
                                        // obj["tanggal_invoice"] = valueContent.v;

                                        obj[keyObj] = valueContent.w;

                                    }
                                    else if (keyObj == "NO_PEB") {

                                        obj[keyObj] = valueContent.w;



                                    }
                                    else {


                                        obj[keyObj] = valueContent.v;

                                    }

                                }

                            })
                            count++;
                            if (obj["NO_PEB"].toString().length > 0 && !obj["NO_PEB"].toString().includes(" ")) {
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

                        //    var checkValuta = [...new Set(result.map(x => x.valuta_nilai_disbursement_penerima_dhe))];
                        //    if (checkValuta.length == 1) {
                        //        if (SelectedPEB[0].VALUTA_FOB != checkValuta) {
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

                        if (!isNilaiValidate) {
                            errorNilaiD = errorNilaiD.substr(0, errorNilaiD.length - 1);
                            NErrorNilai = "Nilai DHE Pada Baris " + errorNilaiD + " Harus angka dan tidak boleh 0.";

                        }
                        if (!isValutaValidate) {
                            errorvaluta = errorvaluta.substr(0, errorvaluta.length - 1);
                            Nerrorvaluta = "Valuta pada baris " + errorvaluta + " maksimal 3 karakter";
                        }

                        //if (!isValutaValidate2) {
                        //    Nerrorvaluta2 = "Valuta yang diupload harus sama dengan valuta PPE yang dipilih.";
                        //}


                        if (!isNPWPValidate) {
                            errorNPWP = errorNPWP.substr(0, errorNPWP.length - 1);
                            NerrorNPWP = "NPWP pada baris " + errorNPWP + " harus angka dan maksimal 15 karakter.";

                        }

                        if (!isNamaDHEValidate) {
                            errorNamaDHE = errorNamaDHE.substr(0, errorNamaDHE.length - 1);
                            NerrorNamaDHE = "Nama DHE pada baris " + NerrorNamaDHE + " tidak bisa lebih dari 160 karakter.";

                        }


                        if (!isnoinvoiceValidate) {
                            errornoinvoice = errornoinvoice.substr(0, errorNilaiInv.length - 1);
                            Nerrornoinvoice = "Nomor Invoice pada baris " + errornoinvoice + " tidak bisa lebih dari 30 karakter.";
                        }

                        if (!isread) {
                            alert(nEmpty + NerrorNPWP + NErrorNilai + NerrorNamaDHE + Nerrornoinvoice + Nerrorvaluta + NerrorTanggal);
                            $("#uploadEkspor").dxFileUploader("instance").reset()

                        }
                        else {
                            var GroupSum = [];
                            result.reduce(function (res, value) {
                                if (!res[value.NO_PEB]) {
                                    res[value.NO_PEB] = { NO_PEB: value.NO_PEB, nilai_disbursement_dhe: 0 };
                                    GroupSum.push(res[value.NO_PEB])
                                }
                                res[value.NO_PEB].nilai_disbursement_dhe = res[value.NO_PEB].nilai_disbursement_dhe + Number.parseFloat(value.nilai_disbursement);
                                return res;
                            }, {});

                            var i;
                            var y;

                            isPEBMatched = false;
                            isValueMatched = false;
                            isSelectedMatched = true;
                            var matchPEB = 0;
                            if (GroupSum.length !== SelectedPEB.length) {
                                isSelectedMatched = false;

                            }
                            else {
                                for (i = 0; i < GroupSum.length; i++) {
                                    for (y = 0; y < SelectedPEB.length; y++) {
                                        if (GroupSum[i]["NO_PEB"] != SelectedPEB[y]["NO_PEB"]) {




                                        }
                                        else {
                                            matchPEB = y;
                                            countPEBMatched++;



                                        }

                                    }
                                    if (GroupSum[i]["nilai_disbursement_dhe"] > SelectedPEB[matchPEB]["total_disbursment_pdkm"]) {

                                    }
                                    else {
                                        countValueMatched++;



                                    }



                                }
                            }
                            if (isNPWPValidate) {
                                if (isSelectedMatched) {
                                    if (countPEBMatched == SelectedPEB.length) {
                                        isPEBMatched = true;
                                        if (countValueMatched != SelectedPEB.length) {
                                            alert("Total DHE yang dimasukkan lebih besar dari nilai DHE pada PPE")
                                            $("#uploadEkspor").dxFileUploader("instance").reset()
                                        }
                                        else {
                                            isValueMatched = true;
                                        }
                                    }
                                    else {
                                        alert("PPE yang dipilih tidak sesuai dengan PPE data yang diupload")
                                        $("#uploadEkspor").dxFileUploader("instance").reset()
                                    }
                                }
                                else {
                                    alert("PPE yang dipilih tidak sesuai dengan PPE data yang  diupload")
                                    $("#uploadEkspor").dxFileUploader("instance").reset()
                                }
                            }
                            else {
                                alert("Upload Gagal. NPWP harus angka")
                                $("#uploadEkspor").dxFileUploader("instance").reset()
                            }


                            if (isValueMatched && isPEBMatched && isSelectedMatched && isNPWPValidate) {

                                var formData = new FormData();
                                formData.append('data', JSON.stringify(result));
                                return $.ajax({
                                    url: URL + "InputDHEExcel",
                                    type: "POST",
                                    // dataType: "json",
                                    contentType: false,
                                    processData: false,
                                    data: formData,
                                    success: function (e) {
                                        alert(e);
                                        $("#gridDHE").dxDataGrid("instance").refresh();
                                        $("#gridSelectedPEB").dxDataGrid("instance").refresh();
                                        $("#gridDHE2").dxDataGrid("instance").refresh();
                                        $("#uploadEkspor").dxFileUploader("instance").reset()

                                    }
                                });


                            }
                        }

                    })

                };
                reader.onerror = function (ex) {
                    DevExpress.ui.notify("Upload failed", "warning", 2000)
                };
                reader.readAsBinaryString(d.file);
            }
        }
    });




    var gridDataSource = new DevExpress.data.CustomStore({

        insert: function (data, value) {

            var formData = new FormData();
            formData.append('data', JSON.stringify(data));
            return $.ajax({
                url: URL + "InputDHE",
                type: "POST",
                contentType: false,
                processData: false,
                data: formData,
                success: function (e) {
                    $("#gridDHE").dxDataGrid("instance").refresh();
                    $("#gridDHE2").dxDataGrid("instance").refresh();
                }
            })
        },
        load: function (load) {
            return $.ajax({
                url: URL + "LoadDHE",//?ParamPEB=" + GetSelectedPEB(),
                type: "GET"

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
                url: URL + 'UpdateDHE',
                method: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (e) {
                    $("#gridDHE").dxDataGrid("instance").refresh();
                    $("#gridDHE2").dxDataGrid("instance").refresh();
                }
            });
        },
        remove: function (key, dd) {

            $.ajax({
                url: URL + 'DeleteDHE?id_pel_input_dhe=' + key.id_pel_input_penerima_dhe,
                method: 'GET',

                success: function (e) {
                    $("#gridDHE").dxDataGrid("instance").refresh();
                    $("#gridSelectedPEB").dxDataGrid("instance").refresh();
                    $("#gridDHE2").dxDataGrid("instance").refresh();
                }
            });


        }
    });

    $("#btnProses").dxButton({
        text: "Mulai Proses Input Penerima DHE",
        height: 35,
        type: "default",
        stylingMode: "outlined",

        onClick: function () {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk memproses ini", "warning", 5000);

            }
            else {
                var DataPEB = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items();
                var CurrentDHE = $("#gridDHE").dxDataGrid("instance").totalCount();
                var TSplit = $("#gridSelectedPEB").dxDataGrid("instance").getTotalSummaryValue("total_split");
                var TDis = $("#gridSelectedPEB").dxDataGrid("instance").getTotalSummaryValue("disbursment_USD");


                var i;
                var y;

                if (TSplit > 100) {
                    DevExpress.ui.notify("Total maksimal DHE 100", "Error");

                }
                else {
                    if (TDis < 1 || TDis == null) {
                        DevExpress.ui.notify("Total nilai disbursment tidak boleh 0", "error");
                    }
                    else {
                        var arr = []
                        for (i = 0; i < DataPEB.length; i++) {
                            if (DataPEB[i].disbursment_USD <= 0 || DataPEB[i].disbursment_USD == null) {
                                alert("nilai FOB di seluruh PEB yang dipilih tidak boleh 0");
                                var cancel = true;
                                break;
                            }
                            if (DataPEB[i].total_split <= 0 || DataPEB[i].total_split == null) {
                                alert("kolom baris PEB tidak boleh 0");
                                var cancel = true;
                                break;
                            }


                            var obj = {};
                            for (y = 0; y < $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items()[i].total_split; y++) {
                                obj["id_pel_peb"] = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items()[i].ID_PEL_PEB;
                                obj["tanggal_invoice"] = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items()[i].TANGGAL_INVOICE;
                                obj["valuta_fob"] = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items()[i].VALUTA_FOB;
                                obj["nilai_disbursement"] = Number(1);
                                obj["nilai_invoice"] = Number(1);
                                arr.push(obj);
                            }
                            obj = {};
                        }
                        if (!cancel) {
                            if (CurrentDHE > arr.length) {
                                var confMes = "total pecahan PEB yang di-set lebih kecil dari sebelumnya. beberapa data akan terhapus. Apakah anda ingin melanjutkan? ";
                                var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                                confRes.done(function (dialogResult) {
                                    if (dialogResult) {
                                        var formData = new FormData();
                                        formData.append('data', JSON.stringify(arr));
                                        return $.ajax({
                                            url: URL + "SetNewDHE",
                                            type: "POST",
                                            // dataType: "json",
                                            contentType: false,
                                            processData: false,
                                            data: formData,
                                            success: function (e) {

                                                $("#gridDHE").dxDataGrid("instance").refresh();
                                                $("#gridDHE2").dxDataGrid("instance").refresh();
                                            }
                                        });
                                    }
                                });
                            } else {
                                var formData = new FormData();
                                formData.append('data', JSON.stringify(arr));
                                return $.ajax({
                                    url: URL + "SetNewDHE",
                                    type: "POST",
                                    // dataType: "json",
                                    contentType: false,
                                    processData: false,
                                    data: formData,
                                    success: function (e) {
                                        $("#gridDHE").dxDataGrid("instance").refresh();
                                        $("#gridDHE2").dxDataGrid("instance").refresh();
                                    }
                                });

                            }

                        }

                    }
                }
            }

        }
    }).dxButton("instance");

    var dataGrid = $("#gridSelectedPEB").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: DatagridSPEB,
        columnAutoWidth: true,
        showBorders: true,
        allowColumnReordering: true,
        showBorders: true,
        //onEditorPrepared: function (e) {
        //    if (e.dataField == "total_disbursment_pdkm") {

        //        var data = e.selectedRowsData[0];



        //    }
        //},
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

        paging: {
            pageSize: 8,
        },




        onRowUpdating: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk mengubah data", "warning", 5000);
                e.cancel = true;
            }
            else {
                var summaryVal = e.oldData.NILAI_FOB;

                if (e.newData.total_disbursment_pdkm == null) {
                    var tDisbursment = Number(e.oldData.total_disbursment_pdkm);
                }
                else {
                    var tDisbursment = Number(e.newData.total_disbursment_pdkm);
                }


                if (e.newData.total_split == null) {
                    var tsplit = Number(e.oldData.total_split);
                }
                else {
                    var tsplit = Number(e.newData.total_split);
                }


                if (tDisbursment < 1) {
                    DevExpress.ui.notify("Total nilai DHE untuk PPE tidak boleh 0", "error")
                    e.cancel = true;
                }
                if (tDisbursment > summaryVal) {
                    DevExpress.ui.notify("Total nilai DHE untuk PPE tidak boleh lebih besar dari FOB", "error")
                    e.cancel = true;
                }
                else {
                    return $.ajax({
                        url: routeApi + "DataDHE/updateDis?tDisbursment=" + tDisbursment + "&NoPEB=" + e.oldData.ID_PEL_PEB + "&total_split=" + tsplit, //+ NPWP,
                        type: "POST",
                        dataType: "json",
                        success: function (data) {
                            // SelectedPEB=
                            e.newData.disbursment_USD = data;
                            e.oldData.disbursment_USD = data;
                            $("#gridSelectedPEB").dxDataGrid("instance").refresh();
                        },
                        timeout: 3000

                    });

                }
            }


        },
        onRowRemoving: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                e.cancel = true;
            }
            else {
                var id_pel_peb = e.data.ID_PEL_PEB;

                return $.ajax({
                    url: URL + "DeleteSelectedPEB?id_pel_peb=" + id_pel_peb, //+ NPWP,
                    type: "POST",
                    dataType: "json",
                    success: function (data) {
                        $("#gridSelectedPEB").dxDataGrid("instance").refresh();
                        $("#gridDHE").dxDataGrid("instance").refresh();
                    },
                    timeout: 3000

                });
            }

        },
        columns: [
            {
                caption: "PPE",
                alignment: "Center",

                columns: [
                    {
                        dataField: "id_pel_input_penerima_dhe",
                        visible: false
                    }, {
                        caption: "Nomor PPE",
                        alignment: "center",
                        dataField: "NO_PEB",
                        allowEditing: false
                    }, {
                        caption: "Tanggal PPE",
                        alignment: "center",
                        dataField: "TANGGAL_PEB",
                        dataType: "date",
                        format: "dd-MM-yyyy",
                        allowEditing: false
                    },
                    {
                        caption: "Nomor KPBC",
                        alignment: "center",
                        dataField: "SANDI_KPBC",
                        allowEditing: false
                    }, {
                        caption: "Valuta",
                        alignment: "Center",
                        dataField: "VALUTA_FOB",
                        allowEditing: false
                    }, {
                        caption: "Nilai FOB",
                        alignment: "center",
                        dataField: "NILAI_FOB",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    }, {
                        caption: "Total Nilai DHE",
                        alignment: "right",
                        dataField: "total_disbursment_pdkm",
                        dataType: "number",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        editorOptions: {
                            min: 1,
                            format: "#,##0.##"
                        },
                        allowEditing: true,
                        validationRules: [{ type: "required" }]
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
                caption: "Tambah baris DHE (1-100)",
                dataType: "number",
                alignment: "center",
                allowEditing: true,
                dataField: "total_split",
                editorOptions: {
                    min: 1,
                    max: 100
                },
                validationRules: [{ type: "required" }]

            }
        ],
        summary: {
            totalItems: [{
                column: "NO_PEB",
                showInColumn: "NO_PEB",
                displayFormat: "TOTAL",

            },
            {
                column: "total_split",
                showInColumn: "total_split",

                alignByColumn: true,
                summaryType: "sum",

                displayFormat: "{0}"

            }, {
                column: "NILAI_FOB",
                showInColumn: "Nilai_FOB",

                alignByColumn: true,
                summaryType: "sum",

                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }
            }, {
                column: "total_disbursment_pdkm",
                showInColumn: "total_disbursment_pdkm",

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

    $("#download").dxButton({
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Download Data",
        type: "success",

        onClick: function (e) {
            if ($("#gridDHE2").dxDataGrid("instance").getSelectedRowKeys().length > 0) {
                $("#gridDHE2").dxDataGrid("instance").exportToExcel(true);
            }
            else {
                $("#gridDHE2").dxDataGrid("instance").exportToExcel();
            }
        }

    });


    $("#gridDHE").dxDataGrid({
        dataSource: gridDataSource,
        showBorders: true,

        onEditorPrepared: function (e) {
            if (e.dataField == "npwp_penerima_dhe") {
                $(e.editorElement).dxTextBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDHE").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var INPWP = args.value;
                    if (NPWP == INPWP.substring(0, 9) || NPWP == INPWP) {
                        toast_notify("NPWP ini sudah terdaftar sebagai salah satu perusahaan anda. Silahkan menggunakan NPWP yang lain ", "warning", 5000);

                        grid.cellValue(index, "flag_npwp_exist", 0);
                        grid.cellValue(index, "penerima_dhe", '');

                    }
                    else {
                        $.ajax({
                            url: routeApi + "DataPDKM/CheckNPWP?NPWP=" + args.value,
                            type: "GET",
                            dataType: "json",
                            success: function (data) {
                                if (data.length < 1) {
                                    grid.cellValue(index, "flag_npwp_exist", 0);
                                    grid.cellValue(index, "penerima_dhe", '');
                                }
                                else {
                                    grid.cellValue(index, "flag_npwp_exist", 1);
                                    grid.cellValue(index, "penerima_dhe", data[0].nama_perusahaan);
                                }




                            },
                            timeout: 3000
                        });
                    }

                   
                });
            }
            if (e.dataField == "nilai_disbursement") {
                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDHE").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var peb = e.row.data.id_pel_peb
                    var valuta = e.row.data.valuta_nilai_disbursement_penerima_dhe;
                    var id_pel_peb = e.row.data.id_pel_peb;
                    grid.cellValue(index, "nilai_invoice", args.value);

                    $.ajax({
                        url: routeApi + "DataDHE/ConvertValuta?nilaiDHE=" + args.value + "&valuta=" + valuta + "&id_pel_peb=" + id_pel_peb,
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
            if (e.dataField == "valuta_nilai_disbursement_penerima_dhe") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDHE").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var nilai = e.row.data.nilai_disbursement;
                    var id_pel_peb = e.row.data.id_pel_peb;


                    $.ajax({
                        url: routeApi + "DataDHE/ConvertValuta?nilaiDHE=" + nilai + "&valuta=" + args.value + "&id_pel_peb=" + id_pel_peb,
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
            // allowAdding: true,
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
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                e.cancel = true;
            } else {
                e.cancel = false;
            }
        },



        export: {
            //enabled: true,
            fileName: "Data DHE"
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
            e.component.option("summary").totalItems[0].column = " ";
            e.component.option("summary").totalItems[1].column = " ";
            e.component.columnOption("flag_npwp_exist", "visible", false);
            e.component.columnOption("nilai_disbursment_usd", "visible", false);
            e.component.option("summary").totalItems[0].displayFormat = " ";

        },
        onExported: function (e) {
            e.component.option("summary").totalItems[0].valueFormat = "TOTAL";
            e.component.option("summary").totalItems[0].column = "id_pel_peb";
            e.component.option("summary").totalItems[1].column = "nilai_disbursment_usd";
            e.component.columnOption("flag_npwp_exist", "visible", true);
            e.component.columnOption("nilai_disbursment_usd", "visible", true);
            e.component.endUpdate();
        },

        onRowUpdating: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk mengubah data", "warning", 5000);
                e.cancel = true;
            }
            else {
                loadData();
                var SelectedPEB = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items();

                var oldValDis = e.oldData.nilai_disbursment_usd;
                var oldPEB = e.oldData.id_pel_peb;



                var newPEB = e.newData.id_pel_peb;
                var newValDis = e.newData.nilai_disbursment_usd;
                var newInvoice = e.newData.nilai_invoice;
                var total;
                var x;
                var y;

                if (newPEB == null) {
                    newPEB = oldPEB;
                };
                if (newValDis <= 0) {
                    e.isValid = false;
                    e.errorText = "Nilai DHE harus lebih lebih dari 0";

                };
                if (newInvoice <= 0) {
                    e.isValid = false;
                    e.errorText = "Nilai Invoice harus lebih dari 0";
                }



                if (arrData.length != 0) {
                    total = 0;
                    for (x = 0; x < arrData.length; x++) {
                        if (arrData[x]["NomorPEB"] == newPEB) {
                            total = arrData[x]["value"] + newValDis - oldValDis;

                            break;
                        }
                    }
                    for (y = 0; y < SelectedPEB.length; y++) {
                        if (SelectedPEB[y]["ID_PEL_PEB"] == newPEB) {
                            if (total > SelectedPEB[y]["disbursment_USD"].toFixed(2)) {

                                e.isValid = false;
                                e.errorText = "Total DHE yang dimasukkan lebih besar dari nilai DHE pada PPE";


                                break;
                            }

                        }
                    }
                }
                else {
                    for (y = 0; y < SelectedPEB.length; y++) {
                        if ((SelectedPEB[y]["ID_PEL_PEB"] === newPEB)) {
                            if (total > SelectedPEB[y]["disbursment_USD"].toFixed(2)) {

                                e.isValid = false;
                                e.errorText = "Total DHE yang dimasukkan lebih besar dari nilai DHE pada PPE";

                                break;
                            }

                        }
                    }
                }

                if (e.isValid == false) {
                    DevExpress.ui.notify(e.errorText, "error");

                    e.cancel = true;


                }
            }
            //  $("#btnSave").attr("hidden", true);



        },
        columns: [

            {
                caption: "No PPE",
                alignment: "center",
                dataField: "id_pel_peb",
                allowEditing: false,
                lookup: {
                    dataSource: DatagridSPEB,
                    displayExpr: "NO_PEB",
                    valueExpr: "ID_PEL_PEB"

                },
                validationRules: [{
                    type: "required"
                }]
            },
            {
                caption: "Valuta",
                alignment: "center",
                dataField: "valuta_nilai_disbursement_penerima_dhe",
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
                caption: "Nilai DHE",
                alignment: "center",
                dataType: "number",
                dataField: "nilai_disbursement",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                validationRules: [{
                    type: "required"
                }]

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
                caption: "Nama Penerima DHE",
                alignment: "center",
                dataField: "penerima_dhe",
                validationRules: [{
                    type: "stringLength",
                    max: 160,
                    message: "Maksimal 160 karakter"
                }, {
                    type: "required",
                    message: "Nama penerima tidak boleh kosong"
                }]
            }, {
                caption: "NPWP Penerima DHE",
                alignment: "center",
                dataField: "npwp_penerima_dhe",
                validationRules: [{
                    type: 'pattern',
                    pattern: '^\\d+$',
                    message: "NPWP penerima harus 15 digit angka",
                }, {
                    type: "required",
                    message: "NPWP penerima tidak boleh kosong"
                }, {
                    type: "stringLength",
                    min: 15,
                    max: 15,
                    message: "NPWP harus 15 digit angka"
                }]
            }, {
                caption: "Status",
                alignment: "center",

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
                alignment: "center",
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
                alignment: "center",
                dataType: "date",
                dataField: "tanggal_invoice",
                format: 'dd/MM/yyyy',
                validationRules: [{ type: "required" }]
            }, {
                caption: "Nilai Invoice",
                alignment: "center",
                dataField: "nilai_invoice",
                dataType: "number",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                validationRules: [{ type: "required" }]
            }],
        summary: {
            recalculateWhileEditing: true,
            totalItems: [{
                column: "id_pel_peb",
                showInColumn: "id_pel_peb",

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


    $("#gridDHE2").hide().dxDataGrid({
        dataSource: gridDataSource,
        showBorders: true,
        onEditorPrepared: function (e) {
            if (e.dataField == "npwp_penerima_dhe") {
                $(e.editorElement).dxTextBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDHE").dxDataGrid("instance");
                    var index = e.row.rowIndex;

                    $.ajax({
                        url: routeApi + "DataPDKM/CheckNPWP?NPWP=" + args.value,
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            var result = data[0].flag_npwp_exist;
                            grid.cellValue(index, "flag_npwp_exist", result);
                        },
                        timeout: 3000
                    });
                });
            }
            if (e.dataField == "nilai_disbursement") {
                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDHE").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var peb = e.row.data.id_pel_peb
                    var valuta = e.row.data.valuta_nilai_disbursement_penerima_dhe;
                    var id_pel_peb = e.row.data.id_pel_peb;

                    $.ajax({
                        url: routeApi + "DataDHE/ConvertValuta?nilaiDHE=" + args.value + "&valuta=" + valuta + "&id_pel_peb=" + id_pel_peb,
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
            if (e.dataField == "valuta_nilai_disbursement_penerima_dhe") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridDHE").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var nilai = e.row.data.nilai_disbursement;
                    var id_pel_peb = e.row.data.id_pel_peb;


                    $.ajax({
                        url: routeApi + "DataDHE/ConvertValuta?nilaiDHE=" + nilai + "&valuta=" + args.value + "&id_pel_peb=" + id_pel_peb,
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
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },


        export: {
            //enabled: true,
            fileName: "Data DHE"
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

        onRowUpdating: function (e) {
            //  $("#btnSave").attr("hidden", true);
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk megubah data", "warning", 5000);
                e.cancel = true;
            }
            else {
                loadData();

                var oldValDis = e.oldData.nilai_disbursment_usd;
                var oldPEB = e.oldData.id_pel_peb;



                var newPEB = e.newData.id_pel_peb;
                var newValDis = e.newData.nilai_disbursment_usd;
                var newInvoice = e.newData.nilai_invoice;
                var total;
                var x;
                var y;

                if (newPEB == null) {
                    newPEB = oldPEB;
                };
                if (newValDis <= 0) {
                    e.isValid = false;
                    e.errorText = "Nilai DHE harus lebih lebih dari 0";

                };
                if (newInvoice <= 0) {
                    e.isValid = false;
                    e.errorText = "Nilai Invoice harus lebih dari 0";
                }



                if (arrData.length != 0) {
                    total = 0;
                    for (x = 0; x < arrData.length; x++) {
                        if (arrData[x]["NomorPEB"] == newPEB) {
                            total = arrData[x]["value"] + newValDis - oldValDis;

                            break;
                        }
                    }
                    for (y = 0; y < SelectedPEB.length; y++) {
                        if (SelectedPEB[y]["ID_PEL_PEB"] == newPEB) {
                            if (total > SelectedPEB[y]["disbursment_USD"]) {

                                e.isValid = false;
                                e.errorText = "Total DHE yang dimasukkan lebih besar dari nilai DHE pada PPE";

                                break;
                            }

                        }
                    }
                }
                else {
                    for (y = 0; y < SelectedPEB.length; y++) {
                        if ((SelectedPEB[y]["ID_PEL_PEB"] === newPEB)) {
                            if (total > SelectedPEB[y]["disbursment_USD"]) {

                                e.isValid = false;
                                e.errorText = "Total DHE yang dimasukkan lebih besar dari nilai DHE pada PPE";

                                break;
                            }

                        }
                    }
                }

                if (e.isValid == false) {
                    DevExpress.ui.notify(e.errorText, "error");

                    e.cancel = true;


                }

            }


        },
        columns: [

            {
                caption: "No PPE",
                alignment: "center",
                dataField: "id_pel_peb",
                lookup: {
                    dataSource: DatagridSPEB,
                    displayExpr: "NO_PEB",
                    valueExpr: "ID_PEL_PEB"

                },
                validationRules: [{
                    type: "required"
                }]
            },
            {
                caption: "Valuta",
                alignment: "center",
                dataField: "valuta_nilai_disbursement_penerima_dhe",
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
                caption: "Nilai DHE",
                alignment: "center",
                dataType: "number",
                dataField: "nilai_disbursement",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                validationRules: [{
                    type: "required"
                }]

            }, {
                caption: "Nama Penerima DHE",
                alignment: "center",
                dataField: "penerima_dhe",
                validationRules: [{
                    type: "stringLength",
                    max: 160,
                    message: "Maksimal 160 karakter"
                }, { type: "required" }]
            }, {
                caption: "NPWP Penerima DHE",
                alignment: "center",
                dataField: "npwp_penerima_dhe",
                validationRules: [{
                    type: 'pattern',
                    pattern: '^\\d+$',
                    message: "Kolom harus angka",
                }, {
                    type: "required"
                }, {
                    type: "stringLength",
                    max: 15,
                    message: "Maksimal 15 karakter"
                }]
            }, {
                caption: "Nomor Invoice",
                alignment: "center",
                dataField: "no_invoice",
                validationRules: [{
                    type: "stringLength",
                    max: 30,
                    message: "Maksimal 30 karakter"
                }, { type: "required" }]
            }, {
                caption: "Tanggal Invoice",
                alignment: "center",
                dataType: "date",
                dataField: "tanggal_invoice",
                format: 'dd/MM/yyyy',
                validationRules: [{ type: "required" }]
            }]
    }).dxDataGrid("instance")



    $("#btnSave").dxButton({

        text: "Simpan & Selesaikan Transaksi",
        height: 34,
        width: 280,
       //width: 250,
        type: "success",
        icon: "save",
        stylingMode: "outlined",


        onClick: function () {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menyimpan transaksi", "warning", 5000);

            }
            else {
                var isNpwpExist = true;
                var isNpwpHasvalue = true;
                var isPEBvalid = true;
                var isPEBvalid2 = true;


                var isEditingDHE = $("#gridDHE").dxDataGrid("instance").getController("editing").isEditing();
                var isEditingDokupen = $("#gridUploadDHE").dxDataGrid("instance").getController("editing").isEditing();
                var isdEditingSelectedPEB = $("#gridSelectedPEB").dxDataGrid("instance").getController("editing").isEditing();


                if (isEditingDHE == true || isEditingDokupen == true || isdEditingSelectedPEB == true) {

                    alert("Tidak bisa menympan transaksi, masih ada data yang masih belum disimpan")
                }
                else {
                    var data = $("#gridDHE").dxDataGrid("instance").getDataSource().items();
                    var checkPEB = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items();
                    var TSplit = $("#gridSelectedPEB").dxDataGrid("instance").getTotalSummaryValue("total_split");


                    for (var z = 0; z < checkPEB.length; z++) {
                        if (checkPEB[z].total_split < 1) {
                            var isPEBvalid = false;
                            break;
                        }
                    }

                    if (data.length > TSplit) {
                        var isPEBvalid2 = false;
                    }


                    if (!isPEBvalid) {
                        alert("Baris DHE tidak boleh ada yang 0")
                    }
                    else {
                        if (!isPEBvalid2) {
                            alert("Total baris DHE tidak sama dengan yang diinput")
                        }
                        else {
                            for (var i = 0; i < data.length; i++) {
                                var name = data[i].flag_npwp_exist;
                                if (name === 0) {
                                    isNpwpExist = false;

                                    break;
                                }
                            }


                            for (var i = 0; i < data.length; i++) {
                                var name = data[i].flag_npwp_exist;
                                var checknpwp = data[i].npwp_penerima_dhe;

                                if (checknpwp == null) {
                                    isNpwpHasvalue = false;

                                }

                                if (name === 0) {
                                    isNpwpExist = false;

                                }
                            }



                            //if ($("#gridDHE").dxDataGrid("instance").getDataSource().items().length == 0 || $("#gridUploadDHE").dxDataGrid("instance").getDataSource().items().length == 0) {
                            //    alert("dokumen pendukung dan DHE tidak boleh kosong")
                            //}
                            //else {
                                if (!isNpwpHasvalue) {
                                    alert("Data tidak boleh ada yang kosong");

                                }
                                else {

                                    var totalSelectedPEB = $("#gridSelectedPEB").dxDataGrid("instance").getTotalSummaryValue("disbursment_USD");
                                    var totalInput = $("#gridDHE").dxDataGrid("instance").getTotalSummaryValue("nilai_disbursment_usd");

                                    if (totalSelectedPEB < totalInput) {
                                        alert("Jumlah Nilai Invoice lebih besar daripada Jumlah DHE");
                                    }
                                    else {
                                        if (!isNpwpExist) {
                                            var confMes = "Terdapat NPWP yang belum terdaftar. Apakah anda ingin melanjutkan? ";
                                            var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                                            confRes.done(function (dialogResult) {
                                                if (dialogResult) {
                                                    UploadDP();
                                                    return $.ajax({
                                                        url: URL + "MoveToPelInputDHE?PEB=" + GetSelectedPEB(),
                                                        type: "POST",
                                                        // dataType: "json",

                                                        success: function (e) {
                                                            removeLocalStorage("dokupenDataDHE");
                                                            alert("sukses simpan DHE");
                                                            window.location = routeApp + 'Pelapor/Penerima_DHE';

                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        else {
                                            UploadDP();
                                            return $.ajax({
                                                url: URL + "MoveToPelInputDHE?PEB=" + GetSelectedPEB(),
                                                type: "POST",
                                                // dataType: "json",

                                                contentType: false,
                                                success: function (e) {
                                                    removeLocalStorage("dokupenDataDHE");
                                                    alert("sukses simpan DHE");
                                                    window.location = routeApp + 'Pelapor/Penerima_DHE';
                                                }
                                            });
                                        }
                                    }

                                }
                            //}

                        }
                    }





                }

            }



        }
    }).dxButton("instance");

    $("#btnBack").dxButton({
        text: "Kembali",
        type: "danger",
        stylingMode: "outlined",

        height: 35,

        onClick: function () {
            window.location = routeApp + 'Pelapor/Penerima_DHE';
        }
    }).dxButton("instance");

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
                // var SelectedPEB = $("#gridDHE").dxDataGrid('instance').getDataSource().items();
                var confMes = "Anda akan membatalkan transaksi. seluruh data yang telah diisi akan dihapus. Apakah anda ingin melanjutkan? ";
                var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                confRes.done(function (dialogResult) {
                    if (dialogResult) {
                        var SelectedPEB = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items();

                        return $.ajax({
                            url: URL + "CancelTransctionDHE?id_pel_peb=" + GetSelectedPEB(), //+ NPWP,
                            type: "POST",
                            dataType: "json",
                            success: function (data) {
                                removeLocalStorage("dokupenDataDHE");
                                alert("Transaksi berhasil dibatalkan");

                                window.location = routeApp + 'Pelapor/Penerima_DHE';

                            },
                            timeout: 3000

                        });
                    }

                });



            }

        }
    }).dxButton("instance");


    function UploadDP() {
        var datas = {};
        var upJSon = "";
        $("#gridUploadDHE").dxDataGrid("instance").option("dataSource").forEach(function (val, ix) {
            upJSon = upJSon + '{"id_pel_jenis":' + val.id_pel_jenis + ',"path_file":"' + val.path_file + '","nama_file":"' + val.nama_file + '"},';
        });
        upJSon = "[" + upJSon.substring(0, upJSon.length - 1) + "]";
        datas["json_up"] = upJSon;
        datas["id_trx"] = 10;
        datas["peb_pib"] = GetSelectedPEB();
        datas["id_pel_status"] = 6;


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
            //    DevExpress.ui.notify("Transaksi berhasil disimpan!", "success", 1000);
            //    window.location.reload();
            //}
            //else {
            //    DevExpress.ui.notify(msg, "error", 2500);
            //}
        });
    }




    function loadData() {
        arrData = [];
        var data = $("#gridDHE").dxDataGrid('instance').getDataSource().items();
        var i;
        var y;
        for (i = 0; i < data.length; i++) {
            if (arrData.length == 0) {
                arrData.push({
                    NomorPEB: data[i]["id_pel_peb"],
                    value: data[i]["nilai_disbursment_usd"]
                });
            }
            else {
                for (y = 0; y < arrData.length; y++) {
                    if (arrData[y]["NomorPEB"] == data[i]["id_pel_peb"]) {
                        arrData[y]["value"] = arrData[y]["value"] + data[i]["nilai_disbursment_usd"];
                        break;
                    }
                    if (arrData[y]["NomorPEB"] != data[i]["id_pel_peb"] && (arrData.length - 1 == y)) {
                        arrData.push({
                            NomorPEB: data[i]["id_pel_peb"],
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


});

