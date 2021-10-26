

$(function () {
    var URL = routeApi + "DataPJT/";


    var gridDataSource = new DevExpress.data.CustomStore({

        update: function (data, val) {
            Object.keys(val).map(function (key, index) {
                if (typeof data[key] !== 'undefined') {
                    data[key] = val[key];
                }
            });
            var formData = new FormData();
            formData.append('data', JSON.stringify(data));
            $.ajax({
                url: URL + 'UpdatePJT?trx=20',
                method: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (e) {
                    $("#gridPDKM").dxDataGrid("instance").refresh();
                    $("#gridPDKM2").dxDataGrid("instance").refresh();
                }
            });
        },
        remove: function (key, dd) {

            $.ajax({
                url: URL + 'DeletePJT?trx=20&id_pel_input_pjt=' + key.id_pel_input_pjt,
                method: 'GET',
                contentType: 'application/json; charset=utf-8',

                success: function (e) {
                    $("#gridPDKM").dxDataGrid("instance").refresh();
                    $("#gridPDKM2").dxDataGrid("instance").refresh();
                    $("#gridSelectedPEB").dxDataGrid("instance").refresh();
                }
            });


        },

        load: function (load) {

            return $.ajax({
                url: URL + "LoadPJT?trx=20",//?ParamPEB=" + GetSelectedPIB(),
                type: "GET",
                success: function (data) {

                }
            })
        }
        //update: function (data, val) {
        //    Object.keys(val).map(function (key, index) {
        //        if (typeof data[key] !== 'undefined') {
        //            data[key] = val[key];
        //        }
        //    });
        //    var formData = new FormData();
        //    formData.append('data', JSON.stringify(data));
        //    $.ajax({
        //        url: URL + 'UpdatePJT',
        //        method: 'POST',
        //        contentType: false,
        //        processData: false,
        //        data: formData,
        //        success: function (e) {
        //            $("#gridPDKM").dxDataGrid("instance").refresh();
        //            $("#gridPDKM2").dxDataGrid("instance").refresh();
        //        }
        //    });
        //},
    });

    var DatagridSPEB = new DevExpress.data.CustomStore({
        //key: "id_pel_jenis_dp",
        // loadMode: "raw",
        load: function () {
            return $.ajax({
                url: URL + "loadPIBPJT",
                type: "GET",
                success: function (data) {

                }
            })
        },
        update: function (data, val) {

        }
    });


    function GetSelectedPIB() {
        var SPEB = $("#gridSelectedPEB").dxDataGrid('instance').getDataSource().items();
        var y;
        var s = " ";

        for (y = 0; y < SPEB.length; y++) {

            s += SPEB[y]["ID_PEL_PIB"] + " ";
        }

        return s;

    }
    let upData = getLocalStorage("dokupenDataPJT!") === "" ? [] : JSON.parse(getLocalStorage("dokupenDataPJT!"));



    let lookupJenisDP = {
        store: new DevExpress.data.CustomStore({
            key: "id_pel_jenis_dp",
            loadMode: "raw",
            load: function () {
                return $.getJSON(routeApi + "SaveDataNetting/getDocTypes?group_id=1");
            }
        })
    };
    var arrData = "";




    var mapCaptionToDataField = {
        "No PPI": "no_peb_pib",
        "NPWP PJT": "npwp_pjt",
        "Nama Pemilik Barang": "pjt",
        //"Blok": "blok",
        //"Nomor DHE Migas": "sandi_dhe_migas",
        // "Valuta": "valuta_nilai_disbursement_pdkm",
        "Nilai": "nilai_disbursement_pjt",
        "Nomor Invoice": "no_invoice",
        "Tanggal Invoice": "tanggal_invoice2",
        //"Nilai Invoice": "nilai_invoice",
    }









    function toDate(selector) {
        var from = selector.split("/");
        return new Date(from[2], from[1] - 1, from[0]);
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
                $("#uploadEkspor").dxFileUploader("instance").reset()
            ).done(function () {
                $("#uploadEkspor").dxFileUploader("instance")._isCustomClickEvent = true;
                $("#uploadEkspor").dxFileUploader("instance")._$fileInput.click();
            });
        }
    });



    $("#uploadEkspor").show().dxFileUploader({
        visible: false,
        multiple: false,
        accept: ".xlsx",
        allowedFileExtensions: [".xlsx"],
        invalidMaxFileSizeMessage: "Dokumen melebihi batas maksimum",
        maxFileSize: 25000000000,
        uploadUrl: routeApp + "Pelapor/InputPJTI",
        uploadMode: "instantly",
        onUploading: function (e) {
            if (ViewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk upload excel", "warning", 5000);
                e.cancel = true;
            }
        },
        onUploaded: function (d) {

            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk mengunggah file", "warning", 5000);
                $("#uploadEkspor").dxFileUploader("instance").reset();
            }
            else {
                var selPEB = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource()._items;

                var errorNPWP = "";
                var errorblok = "";
                var errorNilaiD = "";
                var errorDHE = "";
                var errorNilaiInv = "";
                var errorPDKM = "";
                var errornoinvoice = "";
                var errorvaluta = "";
                var isNPWPValidate = true;
                var isNilaiValidate = true;
                var isDHEValidate = true;
                var isblokValidate = true;
                var isPDKMValidate = true;
                var isnoinvoiceValidate = true;
                var isread = true;
                var isNilaiInvoiceValidate = true;
                var isValutaValidate = true;
                var NerrorNPWP = "";
                var NErrorDHE = "";
                var NerrorNilaiInv = "";
                var NerrorPDKM = "";
                var Nerrorblok = "";
                var NErrorNilai = "";
                var Nerrornoinvoice = "";
                var Nerrorvaluta = "";
                var countPEBMatched = 0;
                var countValueMatched = 0;

                var isTanggalValidate = true;
                var errorTanggal = "";
                var NerrorTanggal = "";
                var isValutaValidate2 = true;
                var Nerrorvaluta2 = "";

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
                    var result = []

                    var sheetName = workbook.SheetNames[0];
                    var worksheet = workbook.Sheets[sheetName];
                    var xlsxJson = XLSX.utils.sheet_to_json(worksheet, { header: "A", raw: false });
                    var countxls = xlsxJson.length - 1;

                    var CountLoop = 0;
                    var arrayTest = ["NO PPI", "NPWP PJT", "NAMA PEMILIK BARANG", "NILAI", "NOMOR INVOICE", "TANGGAL INVOICE"];
                    for (var key in xlsxJson[0]) {
                        if (xlsxJson[0][key].toUpperCase() !== arrayTest[CountLoop]) {
                            toast_notify("Upload Gagal. Template tidak sesuai.", "error", 5000);
                            $("#uploadEkspor").dxFileUploader("instance").reset()
                            return;
                        }
                        CountLoop += 1;
                    }

                    //   var row = (workbook.Sheets.Sheet1['!ref']).substring(4);
                    var count = 2;// parseInt(row);
                    var alphabet = ["A", "B", "C", "D", "E", "F"];
                    workbook.SheetNames.forEach(function (sheetName) {
                        var arrayContent = workbook.Sheets[sheetName]
                        var obj = {}
                        // key hrus ada di kolom A di excel
                        while (arrayContent["A" + count]) {
                            var status = "";
                            var nomorPebPib = "";
                            alphabet.forEach(function (v) {
                                var keyMap = arrayContent[v + "1"].w
                                var keyObj = mapCaptionToDataField[keyMap]
                                var valueContent = arrayContent[v + count]
                                if (valueContent == undefined) {

                                }
                                else {

                                    if (keyObj == "npwp_pjt") {
                                        if (isNaN(valueContent.v) || valueContent.v == '' || (valueContent.v).toString().length != 15) {
                                            isNPWPValidate = false;
                                            isread = false;
                                            errorNPWP = errorNPWP + (count - 1) + ",";
                                        }

                                    }

                                    //if (keyObj == "valuta_nilai_disbursement_pdkm") {
                                    //    if ((valueContent.v).toString().length > 3) {
                                    //        isValutaValidate = false;
                                    //        isread = false;
                                    //        errorvaluta = errorvaluta + (count - 1) + ",";
                                    //    }
                                    //}

                                    if (keyObj == "nilai_disbursement_pjt") {
                                        if (isNaN(valueContent.v) || valueContent.v == '' || valueContent.v < 1) {
                                            isNilaiValidate = false;
                                            isread = false;
                                            errorNilaiD = errorNilaiD + (count - 1) + ",";
                                        }

                                    }
                                    //if (keyObj == "nilai_invoice") {
                                    //    if (isNaN(valueContent.v) || valueContent.v == '' || valueContent.v < 1) {
                                    //        isNilaiInvoiceValidate = false;
                                    //        isread = false;
                                    //        errorNilaiInv = errorNilaiInv + (count - 1) + ",";
                                    //    }

                                    //}



                                    //if (keyObj == "sandi_dhe_migas") {
                                    //    if (isNaN(valueContent.v) || (valueContent.w).length > 3) {
                                    //        isDHEValidate = false;
                                    //        isread = false;
                                    //        errorDHE = errorDHE + (count - 1) + ",";

                                    //    }

                                    //}
                                    if (keyObj == "pjt") {
                                        if ((valueContent.w).length > 160) {
                                            isPDKMValidate = false;
                                            isread = false;
                                            errorPDKM = errorPDKM + (count - 1) + ",";

                                        }

                                    }
                                    //if (keyObj == "blok") {
                                    //    if ((valueContent.w).length > 10) {
                                    //        isblokValidate = false;
                                    //        isread = false;
                                    //        errorblok = errorblok + (count - 1) + ",";

                                    //    }

                                    //}

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
                                    else if (keyObj == "no_peb_pib") {

                                        obj[keyObj] = valueContent.w;



                                    }
                                    else {


                                        obj[keyObj] = valueContent.v;

                                    }

                                }

                            })

                            count++;
                            if (obj["no_peb_pib"].toString().length > 0 && !obj["no_peb_pib"].toString().includes(" ")) {
                                result.push(obj);

                            }


                            obj = {};



                        }
                        result.reverse();

                        //if (result.length == 0) {
                        //    isNotEmpty = true;
                        //    iseread = false;
                        //}
                        //else {
                        //    var checkValuta = [...new Set(result.map(x => x.valuta_nilai_disbursement_pdkm))];
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
                            if (Object.keys(result[i]).length !== 6 || result.length < countxls) {
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
                        }

                        //if (!isValutaValidate2) {
                        //    Nerrorvaluta2 = "Valuta yang diupload harus sama dengan valuta PEB yang dipilih.";
                        //}

                        //if (!isValutaValidate) {
                        //    errorvaluta = errorvaluta.substr(0, errorvaluta.length - 1);
                        //    Nerrorvaluta = "Valuta pada baris " + errorvaluta + " maksimal 3 karakter.";
                        //}


                        if (!isNilaiValidate) {
                            errorNilaiD = errorNilaiD.substr(0, errorNilaiD.length - 1);
                            NErrorNilai = "Nilai Disbursment pada baris " + errorNilaiD + " Harus angka dan lebih dari 0. ";

                        }
                        if (!isNPWPValidate) {
                            errorNPWP = errorNPWP.substr(0, errorNPWP.length - 1);
                            NerrorNPWP = "NPWP pada baris " + errorNPWP + " harus 15 digit angka. ";

                        }
                        //if (!isDHEValidate) {
                        //    errorDHE = errorDHE.substr(0, errorDHE.length - 1);
                        //    NErrorDHE = "Nomor DHE Migas pada baris " + errorDHE + " tidak bisa lebih dari 3 digit dan hanya angka. ";

                        //}
                        if (!isPDKMValidate) {
                            errorPDKM = errorPDKM.substr(0, errorPDKM.length - 1);
                            NerrorPDKM = "Nama PJT pada baris " + NerrorPDKM + " tidak bisa lebih dari 160 karakter. ";

                        }
                        //if (!isblokValidate) {
                        //    errorblok = errorblok.substr(0, errorblok.length - 1);
                        //    Nerrorblok = "Blok pada baris " + Nerrorblok + " tidak bisa lebih dari 10 karakter. ";

                        //}
                        //if (!isNilaiInvoiceValidate) {
                        //    errorNilaiInv = errorNilaiInv.substr(0, errorNilaiInv.length - 1);
                        //    NerrorNilaiInv = "Nilai Invoice pada baris " + errorNilaiInv + " harus angka dan lebih dari 0. ";
                        //}
                        if (!isnoinvoiceValidate) {
                            errornoinvoice = errornoinvoice.substr(0, errorNilaiInv.length - 1);
                            Nerrornoinvoice = "Nomor Invoice pada baris " + errornoinvoice + " tidak bisa lebih dari 30 karakter. ";
                        }

                        if (!isread) {
                            toast_notify(nEmpty + NerrorNPWP + NErrorNilai + NerrorPDKM + Nerrornoinvoice + NerrorTanggal + Nerrorvaluta2, "error", 5000);
                            $("#uploadEkspor").dxFileUploader("instance").reset()

                        }
                        else {
                            var GroupSum = [];
                            result.reduce(function (res, value) {
                                if (!res[value.no_peb_pib]) {
                                    res[value.no_peb_pib] = { no_peb_pib: value.no_peb_pib, nilai_disbursement_pjt: 0 };
                                    GroupSum.push(res[value.no_peb_pib])
                                }
                                res[value.no_peb_pib].nilai_disbursement_pjt = res[value.no_peb_pib].nilai_disbursement_pjt + Number.parseFloat(value.nilai_disbursement_pjt);
                                if (res[value.no_peb_pib] == '') {

                                }
                                else {
                                    return res;
                                }


                            }, {});

                            var i;
                            var y;
                            var matchPEB = 0;

                            isPEBMatched = false;
                            isValueMatched = false;
                            isSelectedMatched = true;
                            if (GroupSum.length !== selPEB.length) {
                                isSelectedMatched = false;

                            }
                            else {
                                for (i = 0; i < GroupSum.length; i++) {
                                    for (y = 0; y < selPEB.length; y++) {
                                        if (GroupSum[i]["no_peb_pib"] != selPEB[y]["NO_PIB"]) {



                                        }
                                        else {
                                            matchPEB = y;
                                            countPEBMatched++;
                                            //break;
                                        }
                                    }

                                    if (GroupSum[i]["nilai_disbursement_pjt"] > selPEB[matchPEB]["total_disbursment"]) {


                                    }
                                    else {
                                        countValueMatched++;
                                        //break;

                                    }

                                }
                            }
                            if (isNPWPValidate) {
                                if (isSelectedMatched) {
                                    if (countPEBMatched == SelectedPEB.length) {
                                        isPEBMatched = true;
                                        if (countValueMatched != SelectedPEB.length) {
                                            toast_notify("Total nilai yang diinput tidak boleh lebih besar dari total nilai PJT", "error", 5000);
                                            $("#uploadEkspor").dxFileUploader("instance").reset();
                                        }
                                        else {
                                            isValueMatched = true;
                                        }
                                    }
                                    else {
                                        toast_notify("Data PPI yang diupload tidak sesuai dengan PPI yang dipilih", "error", 5000);
                                        $("#uploadEkspor").dxFileUploader("instance").reset();
                                    }
                                }
                                else {
                                    toast_notify("PPI yang dipilih tidak sesuai dengan PPI data yang  diupload", "error", 5000)
                                    $("#uploadEkspor").dxFileUploader("instance").reset()
                                }
                            }
                            else {
                                toast_notify("Upload Gagal. NPWP harus angka", "error", 5000)
                                $("#uploadEkspor").dxFileUploader("instance").reset()
                            }


                            if (isValueMatched && isPEBMatched && isSelectedMatched && isNPWPValidate) {

                                var formData = new FormData();
                                formData.append('data', JSON.stringify(result));
                                $.ajax({
                                    url: URL + "InputPJTEExcel?trx=20",
                                    type: "POST",
                                    // dataType: "json",
                                    contentType: false,
                                    processData: false,
                                    data: formData,
                                    success: function (e) {
                                        toast_notify(e, "success", 5000);
                                        $("#gridPDKM").dxDataGrid("instance").refresh();
                                        $("#gridSelectedPEB").dxDataGrid("instance").refresh();
                                        $("#gridPDKM2").dxDataGrid("instance").refresh();
                                        $("#gridUploadPDKM").show();
                                        $("#uploadEkspor").dxFileUploader("instance").reset()
                                    }
                                });


                            }
                        }



                    })

                };
                reader.onerror = function (ex) {
                    toast_notify("Upload failed", "error", 2000)
                };
                reader.readAsBinaryString(d.file);
            }

        }
    });



    $("#download").dxButton({
        // text: "Download Template",
        icon: "exportxlsx",
        stylingMode: "outlined",
        text: "Download Data",
        type: "success",



        onClick: function (e) {
            if ($("#gridPDKM2").dxDataGrid("instance").getSelectedRowKeys().length > 0) {
                $("#gridPDKM2").dxDataGrid("instance").exportToExcel(true);
            }
            else {
                $("#gridPDKM2").dxDataGrid("instance").exportToExcel();
            }
        }

    });


    $("#gridUploadPDKM").dxDataGrid({
        dataSource: upData,
        columnAutoWidth: false,
        scrolling: { useNative: true, columnRenderingMode: "virtual1" },
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
                                    return $.getJSON(routeApi + "DokumenPendukung/JenisDP?group_id=1");
                                }
                            }),
                            displayExpr: "jenis_dp",
                            valueExpr: "id_pel_jenis_dp"
                        },
                        validationRules: [
                            {
                                type: "required",
                                message: "Jenis Dokumen Wajib Diisi",
                                align: "right"
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
                            var ar = opt.value.split("/");
                            var arname = ar[ar.length - 1].split(".");
                            var ext = arname[arname.length - 1];

                            var link;
                            var uri = opt.value.substr(1, opt.value.length);
                            link = '<a href="' + routeApp + uri + '" target="_blank">View File</a>';

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
                $("#rowbtnSaveClear").css("display", "none");
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
                    type: "danger",
                    onClick: function (e) {
                        //alert($(".dx-fileuploader-file-name").html());
                    }
                });

                $cancel.on("click",
                    function () {
                        $("#rowbtnSaveClear").css("display", "block");
                    });
            }
        },
        onEditorPreparing: function (e) {
            if (e.parentType === "dataRow" && e.dataField === "path_file") {
                e.editorName = "dxFileUploader";
                e.editorOptions.allowCanceling = false,
                    e.editorOptions.selectButtonText = "Pilih Dokumen",
                    e.editorOptions.name = "ppe_file",
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
                        //alert('asu bukan di sini..');
                        $(".dx-fileuploader-button").hide(); //Edit Budi
                        args.component.option('uploadUrl', routeApi + 'DokumenPendukung/UploadDokupen');
                        e.setValue(args.value[0].name);
                    } else {
                        e.setValue(null);
                    }
                };
                e.editorOptions.onUploaded = function (args) {
                    var respon = JSON.parse(args.request.response)[0];
                    e.setValue(respon.Path);
                };
                e.editorOptions.onUploadError = function (args) {
                    var xhttp = args.request;
                    if (xhttp.readyState === 4 && xhttp.status === 0) {
                        var msg = "Terjadi gangguan koneksi. Silahkan diulang kembali.";
                        toast_notify(msg, "error", 5000);
                        args.component.reset();
                    }
                };
            }
        },
        onRowInserting: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menambah DP", "warning", 5000);
                e.cancel = true;
            }
            else {
                if (e.data["path_file"]) {
                    var file = e.data["path_file"].split("/").pop();
                    var arname = file.split("."); arname.pop();
                    e.data["nama_file"] = arname.join("");
                }
            }
        },
        onRowInserted: function (e) {
            $("#rowbtnSaveClear").css("display", "block");
            setLocalStorage("dokupenDataPDKM", JSON.stringify(e.component.getDataSource()._items));
        },
        onRowRemoved: function (e) {
            setLocalStorage("dokupenDataPDKM", JSON.stringify(e.component.getDataSource()._items));
        }
    });





    var dataGrid = $("#gridSelectedPEB").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: DatagridSPEB,
        columnAutoWidth: true,
        showBorders: true,
        allowColumnReordering: true,
        showBorders: true,
        sorting: {
            mode: "none"
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

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData;
            BtnInput.option("disabled", !selectedItems.selectedRowsData.length);
            buttondownload.option("disabled", !selectedItems.selectedRowsData.length);


            if (data.length > 0) {

                NoPEB = jQuery.map(data, function (value) {
                    return value.NO_PEB;
                }).join(",");
            }
            //   toast_notify(NoPEB);
            //   toast_notify(NoPEB);
            //   toast_notify(NoPEB);
        },


        columns: [
            {
                caption: "PPI",
                alignment: "Center",

                columns: [
                    {
                        caption: "ID PEL PEB",
                        alignment: "center",
                        dataField: "ID_PEL_PIB",
                        visible: false
                    }, {
                        caption: "Nomor",
                        alignment: "left",
                        dataField: "NO_PIB",
                        allowEditing: false
                    }, {
                        caption: "KPPBC",
                        alignment: "Center",
                        dataField: "SANDI_KPBC",
                        allowEditing: false
                    }, {
                        caption: "Tanggal",
                        dataType: "date",
                        alignment: "right",
                        dataField: "TANGGAL_PIB",
                        format: 'dd/MM/yyyy',
                        allowEditing: false,
                        validationRules: [{ type: "required" }]
                    }, {
                        caption: "Valuta",
                        alignment: "Center",
                        dataField: "VALUTA_CIF",
                        allowEditing: false
                    }, {
                        caption: "Nilai FOB",
                        alignment: "right",
                        dataField: "NILAI_CIF",
                        format: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        allowEditing: false
                    }, {
                        caption: "Total Nilai Barang",
                        alignment: "right",
                        dataField: "NILAI_DISBURSMENT",
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
                        //visible: false,
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
                caption: "Tambah baris PJT (1-100)",
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
                column: "NO_PIB",
                showInColumn: "NO_PIB",
                displayFormat: "TOTAL",

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
            },
            {
                column: "total_split",
                showInColumn: "total_split",

                alignByColumn: true,
                summaryType: "sum",

                displayFormat: "{0}"

            },
            {
                column: "NILAI_DISBURSMENT",
                showInColumn: "NILAI_DISBURSMENT",

                alignByColumn: true,
                summaryType: "sum",

                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }
            }
            ]
        },
        onRowUpdating: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk mengubah data", "warning", 5000);

            }
            else {
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
                    toast_notify("Total nilai PJT tidak boleh 0", "error")
                    e.cancel = true;
                }
                else {
                    if (tDisbursment > summaryVal) {
                        toast_notify("Total nilai yang diinputkan tidak boleh lebih besar total nilai PJT", "error")
                        e.cancel = true;
                    }
                    else {
                        return $.ajax({
                            url: routeApi + "DataDPI/updateDis?tDisbursment=" + tDisbursment + "&NoPIB=" + e.oldData.ID_PEL_PIB + "&total_split=" + tsplit, //+ NPWP,
                            type: "POST",
                            dataType: "json",
                            success: function (data) {
                                e.newData.disbursment_USD = data;
                                e.oldData.disbursment_USD = data;
                                $("#gridSelectedPEB").dxDataGrid("instance").refresh();
                            },
                            timeout: 3000

                        });
                    }
                }
            }
        },
        onRowRemoving: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
            }
            else {
                var id_pel_pib = e.data.ID_PEL_PIB;

                return $.ajax({
                    url: URL + "DeleteSelectedPEBPIB?trx=20&id_pel_peb_pib=" + id_pel_pib, //+ NPWP,
                    type: "POST",
                    dataType: "json",
                    success: function (data) {
                        //location.reload(true)
                        $("#gridSelectedPEB").dxDataGrid("instance").refresh();
                        $("#gridPDKM").dxDataGrid("instance").refresh();
                    },
                    timeout: 3000

                });
            }

        }
    }).dxDataGrid("instance");



    $("#gridPDKM").dxDataGrid({
        dataSource: gridDataSource,
        columnAutoWidth: true,
        editing: {
            allowDeleting: true,
            //allowAdding: true,
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
        showBorders: true,
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.option("summary").totalItems[0].column = "";
            e.component.option("summary").totalItems[1].column = "";
            e.component.option("summary").totalItems[0].displayFormat = " ";
            e.component.columnOption("flag_npwp_exist", "visible", false);
            e.component.columnOption("nilai_disbursment_usd", "visible", false);

        },
        onExported: function (e) {
            e.component.option("summary").totalItems[0].displayFormat = "TOTAL";
            e.component.option("summary").totalItems[0].column = "id_pel_peb_pib";
            e.component.option("summary").totalItems[1].column = "nilai_disbursment_usd";
            e.component.columnOption("flag_npwp_exist", "visible", true);
            e.component.columnOption("nilai_disbursment_usd", "visible", true);
            e.component.endUpdate();
        },
        onRowRemoving: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menghapus data", "warning", 5000);
                e.cancel = true;
            }
        },
        onEditorPrepared: function (e) {
            // var NPWP = e.row.data.npwp_pdkm
            if (e.dataField == "npwp_pjt") {
                $(e.editorElement).dxTextBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPDKM").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var INPWP = args.value;
                    if (NPWP == INPWP.substring(0, 9) || NPWP == INPWP) {
                        toast_notify("NPWP ini sudah terdaftar sebagai salah satu perusahaan anda. Silahkan menggunakan NPWP yang lain ", "warning", 5000);

                        grid.cellValue(index, "flag_npwp_exist", 0);
                        grid.cellValue(index, "pdkm", '');

                    }
                    else {
                        $.ajax({
                            url: routeApi + "DataPDKM/CheckNPWP?NPWP=" + args.value, //+ NPWP,
                            type: "GET",
                            dataType: "json",
                            success: function (data) {
                                //   toast_notify(data[0].flag_npwp_exist);
                                //e.row.key.flag_npwp_exist = data[0].flag_npwp_exist;
                                if (data.length < 1) {
                                    grid.cellValue(index, "flag_npwp_exist", 0);
                                    grid.cellValue(index, "pjt", '');
                                }
                                else {
                                    grid.cellValue(index, "flag_npwp_exist", 1);
                                    grid.cellValue(index, "pjt", data[0].nama_perusahaan);
                                }

                            },
                            // timeout: 3000

                        });
                    }







                    //var result = "new description " + args.value;

                });
            }
            if (e.dataField == "nilai_disbursement_pjt") {
                $(e.editorElement).dxNumberBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPDKM").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var peb = e.row.data.id_pel_peb_pib
                    var valuta = e.row.data.valuta_nilai_disbursement_pjt;
                    var id_pel_pib = e.row.data.id_pel_peb_pib;
                    grid.cellValue(index, "nilai_invoice", args.value);

                    $.ajax({
                        url: routeApi + "DataDHE/ConvertValuta?nilaiDHE=" + args.value + "&valuta=" + valuta + "&id_pel_peb=" + id_pel_pib,
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
            if (e.dataField == "valuta_nilai_disbursement_pjt") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPDKM").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var nilai = e.row.data.nilai_disbursement_pjt;
                    var id_pel_pib = e.row.data.id_pel_peb_pib;


                    $.ajax({
                        url: routeApi + "DataDHE/ConvertValuta?nilaiDHE=" + nilai + "&valuta=" + args.value + "&id_pel_peb=" + id_pel_pib,
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
            if (e.dataField == "sandi_dhe_migas") {
                $(e.editorElement).dxSelectBox("instance").on("valueChanged", function (args) {
                    var grid = $("#gridPDKM").dxDataGrid("instance");
                    var index = e.row.rowIndex;

                    if (args.value == 1) {


                        grid.cellValue(index, "sandi_dhe_migas", args.value);
                        grid.cellValue(index, "npwp_pdkm", "000000000000000");
                        grid.cellValue(index, "flag_npwp_exist", 1);


                    }

                });
            }
            //if (e.dataField == "npwp_pdkm") {
            //    $(e.editorElement).dxTextBox("instance").on("valueChanged", function (args) {
            //        var grid = $("#gridPDKM").dxDataGrid("instance");
            //        var index = e.row.rowIndex;

            //        if (args.value == "000000000000000") {


            //            grid.cellValue(index, "sandi_dhe_migas", 1);
            //            ///  grid.cellValue(index, "npwp_pdkm", "000000000000000");
            //            grid.cellValue(index, "flag_npwp_exist", 1);


            //        }

            //    });
            //}
        },
        "export": {
            //enabled: true,
            fileName: "Data PJT"
            //allowExportSelectedData: true
        },
        onRowUpdating: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk mengubah data", "warning", 5000);
                e.cancel = true;
            }
            else {
                loadData();
                var SelectedPEB = $("#gridSelectedPEB").dxDataGrid('instance').getDataSource().items();

                var oldValDis = e.oldData.nilai_disbursment_usd;
                var oldPIB = e.oldData.id_pel_peb_pib;
                //svar oldInvoice = e.oldData.nilai_invoice;



                var newPIB = e.newData.id_pel_peb_pib;
                var newValDis = e.newData.nilai_disbursment_usd;
                var newInvoice = e.newData.nilai_invoice;
                var total;
                var x;
                var y;

                if (newPIB == null) {
                    newPIB = oldPIB;
                };
                if (newValDis <= 0) {
                    e.isValid = false;
                    e.errorText = "Nilai Disbursment harus lebih lebih dari 0";

                };
                if (newInvoice <= 0) {
                    e.isValid = false;
                    e.errorText = "Nilai Invoice harus lebih dari 0";
                }


                if (arrData.length != 0) {
                    total = 0;
                    for (x = 0; x < arrData.length; x++) {
                        if (arrData[x]["NomorPIB"] === newPIB) {
                            total = arrData[x]["value"] + newValDis - oldValDis;

                            break;
                        }
                    }
                    for (y = 0; y < SelectedPEB.length; y++) {
                        if (SelectedPEB[y]["ID_PEL_PIB"] === newPIB) {
                            if (total > SelectedPEB[y]["disbursment_USD"].toFixed(2)) {

                                e.isValid = false;
                                e.errorText = "Total nilai Barang tidak boleh lebih besar dari Total Nilai PJT";

                                break;
                            }

                        }
                    }
                }
                else {
                    for (y = 0; y < SelectedPEB.length; y++) {
                        if ((SelectedPEB[y]["ID_PEL_PIB"] === newPIB)) {
                            if (total > SelectedPEB[y]["disbursment_USD"].toFixed(2)) {

                                e.isValid = false;
                                e.errorText = "Total nilai Barang tidak boleh lebih besar dari Total Nilai PJT";

                                break;
                            }

                        }
                    }
                }

                if (e.isValid == false) {
                    toast_notify(e.errorText, "error");

                    e.cancel = true;
                }
            }
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
        sorting: {
            mode: "none"
        },
        columns: [
            {
                dataField: "id_pel_input_pjt",
                visible: false,

            },
            {
                caption: "No PPI",
                alignment: "left",
                dataField: "id_pel_peb_pib",
                sortOrder: "asc",
                allowEditing: false,
                //   groupIndex: 0,
                lookup: {
                    dataSource: DatagridSPEB,
                    displayExpr: "NO_PIB",
                    valueExpr: "ID_PEL_PIB"

                },
                validationRules: [{ type: "required" }]
            }, {
                caption: "NPWP PJT",
                alignment: "left",
                dataField: "npwp_pjt",
                //dataType: "number",
                validationRules: [{
                    type: 'pattern',
                    pattern: '^\\d+$',
                    message: "Kolom harus angka",
                }, {
                    type: "stringLength",
                    min: 15,
                    max: 15,
                    message: "Harus 15 karakter"
                }, {
                    type: "required"
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
                caption: "Nama Pemilik Barang",
                alignment: "left",
                dataField: "pjt",
                validationRules: [{
                    type: "stringLength",
                    max: 160,
                    message: "Maksimal 160 karakter"
                }, { type: "required" }]
            }, {
                caption: "Valuta",
                alignment: "center",
                allowEditing: false,
                visible: false,
                dataField: "valuta_nilai_disbursement_pjt",
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
                caption: "Nilai",
                alignment: "right",

                dataField: "nilai_disbursement_pjt",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                validationRules: [{ type: "required" }]
            }, {
                caption: "Nilai konversi USD",
                alignment: "center",
                dataType: "number",
                dataField: "nilai_disbursment_usd",
                //visible: false,
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                }

            }, {
                caption: "Nomor Invoice",
                alignment: "left",
                dataField: "no_invoice",
                validationRules: [{
                    type: "stringLength",
                    max: 30,
                    message: "Maksimal 30 karakter"
                },
                {
                    type: "required"
                }]
            }, {
                caption: "Tanggal Invoice",
                dataType: "date",
                alignment: "right",
                dataField: "tanggal_invoice",
                format: 'dd/MM/yyyy',
                validationRules: [{ type: "required" }]
            },
            //{
            //    caption: "Valuta Ivoice",
            //    alignment: "center",
            //    dataField: "valuta_invoice"
            //},
            {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "nilai_invoice",
                allowEditing: false,
                dataType: "number",
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
                column: "id_pel_pib",
                showInColumn: "id_pel_pib",

                displayFormat: "TOTAL"
            },
            {
                column: "nilai_disbursment_usd",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }

            },
            {
                column: "nilai_disbursement_pjt",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }

            },
            {
                column: "nilai_invoice",
                summaryType: "sum",
                displayFormat: "{0}",
                valueFormat: {
                    type: "fixedPoint",
                    precision: 2
                }

            }]
        }
    }).dxDataGrid("instance");




    $("#gridPDKM2").hide().dxDataGrid({
        dataSource: gridDataSource,
        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },
        showBorders: true,
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.columnOption("flag_npwp_exist", "visible", false);
            e.component.columnOption("nilai_invoice", "visible", false);
            e.component.columnOption("nilai_disbursment_usd", "visible", false);

        },
        onExported: function (e) {
            e.component.columnOption("flag_npwp_exist", "visible", true);
            e.component.columnOption("nilai_invoice", "visible", true);
            e.component.columnOption("nilai_disbursment_usd", "visible", true);
            e.component.endUpdate();
        },
        "export": {
            //enabled: true,
            fileName: "Template PJT"
            //allowExportSelectedData: true
        },
        columns: [
            {
                dataField: "id_pel_input_pjt",
                visible: false,

            },
            {
                caption: "No PPI",
                alignment: "left",
                dataField: "id_pel_peb_pib",
                sortOrder: "asc",
                allowEditing: false,
                //   groupIndex: 0,
                lookup: {
                    dataSource: DatagridSPEB,
                    displayExpr: "NO_PIB",
                    valueExpr: "ID_PEL_PIB"

                },
                validationRules: [{ type: "required" }]
            }, {
                caption: "NPWP PJT",
                alignment: "left",
                dataField: "npwp_pjt",
                //dataType: "number",
                validationRules: [{
                    type: 'pattern',
                    pattern: '^\\d+$',
                    message: "Kolom harus angka",
                }, {
                    type: "stringLength",
                    min: 15,
                    max: 15,
                    message: "Harus 15 karakter"
                }, {
                    type: "required"
                }]
            }, {
                caption: "Status",
                alignment: "leftf",

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
                caption: "Nama Pemilik Barang",
                alignment: "left",
                dataField: "pjt",
                validationRules: [{
                    type: "stringLength",
                    max: 160,
                    message: "Maksimal 160 karakter"
                }, { type: "required" }]
            }, {
                caption: "Valuta",
                alignment: "center",
                allowEditing: false,
                visible: false,
                dataField: "valuta_nilai_disbursement_pjt",
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
                caption: "Nilai",
                alignment: "right",

                dataField: "nilai_disbursement_pjt",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                validationRules: [{ type: "required" }]
            }, {
                caption: "Nilai konversi USD",
                alignment: "center",
                dataType: "number",
                dataField: "nilai_disbursment_usd",
                //visible: false,
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                }

            }, {
                caption: "Nomor Invoice",
                alignment: "left",
                dataField: "no_invoice",
                validationRules: [{
                    type: "stringLength",
                    max: 30,
                    message: "Maksimal 30 karakter"
                },
                {
                    type: "required"
                }]
            }, {
                caption: "Tanggal Invoice",
                dataType: "date",
                alignment: "right",
                dataField: "tanggal_invoice",
                format: 'dd/MM/yyyy',
                validationRules: [{ type: "required" }]
            },
            //{
            //    caption: "Valuta Ivoice",
            //    alignment: "center",
            //    dataField: "valuta_invoice"
            //},
            {
                caption: "Nilai Invoice",
                alignment: "right",
                dataField: "nilai_invoice",
                allowEditing: false,
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                editorOptions: {
                    format: "#,##0.##"
                },
                validationRules: [{ type: "required" }]

            }],

    }).dxDataGrid("instance");

    function getDisplayExpr(item) {
        if (!item) {
            return "";
        }

        return item.sandi_dhe_migas + "-" + item.keterangan;
    }


    $("#btnProses").dxButton({
        text: "Mulai Proses Input PJT",
        type: "default",
        stylingMode: "outlined",
        height: 35,
        onClick: function (e) {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk melakukan memproses ini", "warning", 5000);
            }
            else {
                var DataPEB = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items();
                var TDis = $("#gridSelectedPEB").dxDataGrid("instance").getTotalSummaryValue("disbursment_USD");
                var TSplit = $("#gridSelectedPEB").dxDataGrid("instance").getTotalSummaryValue("total_split");
                var CurrentPDKM = $("#gridPDKM").dxDataGrid("instance").totalCount();
                var cancel = false;

                if (TSplit > 100) {
                    toast_notify("Total maksimal PJT 100", "Error");

                }
                else {

                    if (TDis < 1 || TDis == null) {
                        toast_notify("Total nilai PJT tidak boleh 0", "error");
                    }
                    else {
                        var i;
                        var y;
                        var x = 0;

                        var arr = []
                        for (i = 0; i < DataPEB.length; i++) {
                            if (DataPEB[i].disbursment_USD <= 0 || DataPEB[i].disbursment_USD == null) {
                                toast_notify("nilai input PJT dipilih tidak boleh 0", "error", 5000);
                                cancel = true;
                                break;
                            }
                            if (DataPEB[i].total_split <= 0 || DataPEB[i].total_split == null) {
                                toast_notify("kolom baris PJT tidak boleh 0", "error", 5000);
                                cancel = true;
                                break;
                            }

                            var obj = {};
                            for (y = 0; y < $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items()[i].total_split; y++) {



                                obj["id_pel_peb_pib"] = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items()[i].ID_PEL_PIB;
                                obj["tanggal_invoice"] = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items()[i].TANGGAL_INVOICE;
                                obj["valuta_fob_cif"] = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items()[i].VALUTA_CIF;
                                obj["nilai_invoice"] = Number(1);
                                obj["nilai_disbursement_pjt"] = Number(1);


                                arr.push(obj);

                            }
                            obj = {};
                        }

                        if (!cancel) {

                            if (CurrentPDKM > arr.length) {
                                var confMes = "total pecahan PIB yang di-set lebih kecil dari sebelumnya. beberapa data akan terhapus. Apakah anda ingin melanjutkan? ";
                                var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                                confRes.done(function (dialogResult) {
                                    if (dialogResult) {

                                        var formData = new FormData();
                                        formData.append('data', JSON.stringify(arr));
                                        return $.ajax({
                                            url: URL + "SetNewPJTImpor",
                                            type: "POST",
                                            // dataType: "json",
                                            contentType: false,
                                            processData: false,
                                            data: formData,
                                            success: function (e) {

                                                $("#gridPDKM").dxDataGrid("instance").refresh();
                                                //$("#gridUploadPDKM").show();
                                                $("#gridPDKM2").dxDataGrid("instance").refresh();

                                                //user$("#btnProses").hide();

                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                var formData = new FormData();
                                formData.append('data', JSON.stringify(arr));
                                return $.ajax({
                                    url: URL + "SetNewPJTImpor",
                                    type: "POST",
                                    // dataType: "json",
                                    contentType: false,
                                    processData: false,
                                    data: formData,
                                    success: function (e) {

                                        $("#gridPDKM").dxDataGrid("instance").refresh();
                                        //$("#gridUploadPDKM").show();
                                        $("#gridPDKM2").dxDataGrid("instance").refresh();

                                        //user$("#btnProses").hide();

                                    }
                                });
                            }
                        }
                        else {

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

            window.location = routeApp + 'Pelapor/PIBPJT';
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
                toast_notify("Anda tidak memiliki wewenang untuk membatalkan tranaksi", "warning", 5000);
            }
            else {
                var confMes = "Anda akan membatalkan transaksi. seluruh data yang telah diisi akan dihapus. Apakah anda ingin melanjutkan? ";
                var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                confRes.done(function (dialogResult) {
                    if (dialogResult) {
                        return $.ajax({
                            url: URL + "CancelTransctionPJT?trx=20&id_pel_peb_pib=" + GetSelectedPIB(), //+ NPWP,
                            type: "POST",
                            dataType: "json",
                            success: function (data) {
                                removeLocalStorage("dokupenDataPJT!");
                                toast_notify("Transaksi berhasil dibatalkan", "success", 5000);

                                window.location = routeApp + 'Pelapor/PIBPJT';

                            },
                            timeout: 3000

                        });
                    }

                });
            }
        }
    }).dxButton("instance");



    $("#btnSave").dxButton({
        text: "Simpan & Selesaikan Transaksi",
        height: 34,
        width: 280,
        type: "success",
        icon: "save",
        stylingMode: "outlined",

        onClick: function () {
            if (viewOnly) {
                toast_notify("Anda tidak memiliki wewenang untuk menyelesaikan transaksi", "warning", 5000);
            }
            else {
                var isNpwpExist = true;
                var isNpwpHasvalue = true;
                var isPEBvalid = true;
                var isPEBvalid2 = true;


                var isEditingPDKM = $("#gridPDKM").dxDataGrid("instance").getController("editing").isEditing();
                var isEditingDokupen = $("#gridUploadPDKM").dxDataGrid("instance").getController("editing").isEditing();
                var isdEditingSelectedPEB = $("#gridSelectedPEB").dxDataGrid("instance").getController("editing").isEditing();


                if (isEditingPDKM == true || isEditingDokupen == true || isdEditingSelectedPEB == true) {

                    toast_notify("Tidak bisa menympan transaksi, masih ada data yang masih belum disimpan", "error", 5000)
                }
                else {
                    var data = $("#gridPDKM").dxDataGrid("instance").getDataSource().items();
                    var checkPEB = $("#gridSelectedPEB").dxDataGrid("instance").getDataSource().items();
                    var TSplit = $("#gridSelectedPEB").dxDataGrid("instance").getTotalSummaryValue("total_split");


                    for (var z = 0; z < checkPEB.length; z++) {
                        if (checkPEB[z].total_split < 1) {
                            var isPEBvalid = false;
                            break;
                        }
                    }

                    if (TSplit < data.length) {
                        var isPEBvalid2 = false;
                    }


                    if (!isPEBvalid) {
                        toast_notify("Baris PJT tidak boleh ada yang 0", "error", 5000)
                    }
                    else {
                        if (!isPEBvalid2) {
                            toast_notify("Total baris PJT tidak sama dengan yang diinput", "error", 5000)
                        }
                        else {
                            for (var i = 0; i < data.length; i++) {
                                var name = data[i].flag_npwp_exist;
                                var checknpwp = data[i].npwp_pjt;

                                if (checknpwp == null) {
                                    isNpwpHasvalue = false;

                                }

                                if (name === 0) {
                                    isNpwpExist = false;

                                }
                            }




                            if ($("#gridPDKM").dxDataGrid("instance").getDataSource().items().length == 0 || $("#gridUploadPDKM").dxDataGrid("instance").getDataSource().items().length == 0) {
                                toast_notify("dokumen pendukung dan PJT tidak boleh kosong", "error", 5000)
                            }
                            else {
                                if (!isNpwpHasvalue) {
                                    toast_notify("NPWP Tidak Boleh Kosong", "error", 5000);

                                }
                                else {
                                    var totalSelectedPEB = $("#gridSelectedPEB").dxDataGrid("instance").getTotalSummaryValue(1);
                                    var totalInput = $("#gridPDKM").dxDataGrid("instance").getTotalSummaryValue(1);

                                    if (totalSelectedPEB < totalInput) {
                                        toast_notify("Jumlah Nilai Invoice lebih besar daripada Nilai PJT", "error", 5000);
                                    }
                                    else {
                                        if (!isNpwpExist) {
                                            var confMes = "Terdapat NPWP yang belum terdaftar. Apakah anda ingin melanjutkan? ";
                                            var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                                            confRes.done(function (dialogResult) {
                                                if (dialogResult) {
                                                    $(".loading-overlay").show();
                                                    UploadDP();
                                                    return $.ajax({
                                                        url: URL + "SubmitPJT?trx=20&peb_pib=" + GetSelectedPIB(),
                                                        type: "POST",
                                                        // dataType: "json",

                                                        success: function (e) {
                                                            toast_notify("sukses simpan PJT", "success", 5000);
                                                            $(".loading-overlay").hide();
                                                            removeLocalStorage("dokupenDataPJT!");

                                                            window.location = routeApp + 'Pelapor/PIBPJT';

                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        else {
                                            var confMes = "PDKM yang diisi akan disimpan dan akan diproses. selama proses approval PDKM tidak dapat diubah. apakah anda yakin?";
                                            var confRes = DevExpress.ui.dialog.confirm(confMes, "Konfirmasi");
                                            confRes.done(function (dialogResult) {
                                                if (dialogResult) {
                                                    $(".loading-overlay").show();
                                                    UploadDP();
                                                    return $.ajax({
                                                        url: URL + "SubmitPJT?trx=20&peb_pib=" + GetSelectedPIB(),
                                                        type: "POST",
                                                        // dataType: "json",

                                                        success: function (e) {
                                                            removeLocalStorage("dokupenDataPJT!");
                                                            $(".loading-overlay").hide();
                                                            toast_notify("sukses simpan PJT", "success", 5000);

                                                            window.location = routeApp + 'Pelapor/PIBPJT';

                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }).dxButton("instance");


    function UploadDP() {
        var datas = {};
        var upJSon = "";
        $("#gridUploadPDKM").dxDataGrid("instance").option("dataSource").forEach(function (val, ix) {
            upJSon = upJSon + '{"id_pel_jenis":' + val.id_pel_jenis + ',"path_file":"' + val.path_file + '","nama_file":"' + val.nama_file + '"},';
        });
        upJSon = "[" + upJSon.substring(0, upJSon.length - 1) + "]";
        datas["json_up"] = upJSon;
        datas["id_trx"] = 10;
        datas["peb_pib"] = GetSelectedPIB();
        datas["id_pel_status"] = 8;


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
            //      toast_notify("Transaksi berhasil disimpan!", "success", 1000);
            //    window.location.reload();
            //}
            //else {
            //      toast_notify(msg, "error", 2500);
            //}
        });
    }





    function loadData() {
        arrData = [];
        var data = $("#gridPDKM").dxDataGrid('instance').getDataSource().items();
        var i;
        var y;
        for (i = 0; i < data.length; i++) {
            if (arrData.length === 0) {
                arrData.push({
                    NomorPIB: data[i]["id_pel_peb_pib"],
                    value: data[i]["nilai_disbursment_usd"]
                });
            }
            else {
                for (y = 0; y < arrData.length; y++) {
                    if (arrData[y]["NomorPIB"] == data[i]["id_pel_peb_pib"]) {
                        arrData[y]["value"] = arrData[y]["value"] + data[i]["nilai_disbursment_usd"];
                        break;
                    }
                    if (arrData[y]["NomorPIB"] != data[i]["id_pel_peb_pib"] && (arrData.length - 1 == y)) {
                        arrData.push({
                            NomorPIB: data[i]["id_pel_peb_pib"],
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