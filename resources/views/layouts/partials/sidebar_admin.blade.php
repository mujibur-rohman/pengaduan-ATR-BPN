<!-- ========== Left Sidebar Start menu ========== -->
<div class="vertical-menu mm-active">
    <div data-simplebar="init" class="h-100 mm-show">
        <div class="simplebar-wrapper" style="margin: 0px;">
            <div class="simplebar-height-auto-observer-wrapper">
                <div class="simplebar-height-auto-observer"></div>
            </div>
            <div class="simplebar-mask">
                <div class="simplebar-offset" style="right: -17px; bottom: 0px;">
                    <div class="simplebar-content-wrapper" style="height: 100%; overflow: hidden scroll;">
                        <div class="simplebar-content" style="padding: 0px;">

                            <!--- Sidemenu -->
                            <div id="sidebar-menu" class="mm-active">

                                <!-- Left Menu Start -->
                                <ul class="metismenu list-unstyled mm-show" id="side-menu">
                                    <li class="menu-title" data-key="t-menu">Menu</li>

                                    <li class="mm-active">
                                        <a href="{{ route('indexPusatAdmin') }}" class="active">
                                           <i _ngcontent-uqw-c237="" class="fas fa-home"></i>
                                            <span data-key="t-dashboard">Dashboard

                                            </span>
                                        </a>
                                    </li>
                                    
                                    <li>
                                        <a href="javascript: void(0);" class="has-arrow">
                                            <i _ngcontent-xeb-c237="" class="fas fa-address-card"></i>
                                            <span data-key="t-apps">Pengaduan Masuk</span>
                                        </a>
                                        <ul class="sub-menu mm-collapse" aria-expanded="false">
                                            <li> <a href="{{ url('admin/tr_pengaduan') }}">
                                                <i _ngcontent-uqw-c90="" class="fas fa-box"></i>
                                                <span data-key="t-apps">All</span>
                                                </a>
                                            </li>
                                            
                                            <li><a href="{{ url('admin/tr_pengaduan') }}?kanal_id=1">
                                                 <i _ngcontent-uqw-c90="" class="fab fa-twitter"></i>
                                                    <span data-key="t-twitter">Twitter</span>
                                                 </a>
                                            </li>
                                            <li><a href="{{ url('admin/tr_pengaduan') }}?kanal_id=2">
                                                <i _ngcontent-uqw-c196="" class="fab fa-facebook"></i>
                                                    <span data-key="t-facabook">Facebook</span>
                                                </a>
                                            </li>
                                            <li><a href="{{ url('admin/tr_pengaduan') }}?kanal_id=3">
                                                <i _ngcontent-uqw-c196="" class="fab fa-instagram"></i>
                                                    <span data-key="t-instagram">Instagram</a>
                                            </li>
                                            <li><a href="{{ url('admin/tr_pengaduan') }}?kanal_id=4">
                                                <i _ngcontent-uqw-c196="" class="fab fa-youtube"></i>
                                                    <span data-key="t-youtube">YouTube</span>
                                                </a>

                                            </li>
                                            <li><a href="{{ url('admin/tr_pengaduan') }}?kanal_id=7">
                                                 <i _ngcontent-uqw-c196="" class="fab fa-google"></i>
                                                    <span data-key="t-facabook">Email</span>
                                                </a>
                                            </li>
                                            <li><a href="{{ url('admin/tr_pengaduan') }}?kanal_id=8">
                                                 <i _ngcontent-uqw-c196="" class="far fa-newspaper"></i>
                                                    <span data-key="t-surat">Surat</span>
                                                </a>
                                            </li>
                                            <li> 
                                                <a href="{{ url('admin/tr_pengaduan') }}?kanal_id=5">
                                                    <i _ngcontent-uqw-c196="" class="fas fa-user-friends"></i>
                                                    <span data-key="t-portal">Portal Pengaduan</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                    <!-- start faq internal -->
                                    <li>
                                        <a href="javascript: void(0);" class="has-arrow">
                                            <i _ngcontent-xeb-c237="" class="fas fa-walking"></i>
                                            <span data-key="t-apps">FAQ Internal</span>
                                        </a>
                                    </li>
                                    <!-- end faq internal -->
                                    <!-- start faq internal -->
                                    <li>
                                        <a href="javascript: void(0);" class="has-arrow">
                                            <i _ngcontent-xeb-c237="" class="far fa-envelope"></i>
                                            <span data-key="t-apps">Laporan</span>
                                        </a>
                                    </li>
                                    <!-- end faq internal -->
                                    
                                    <!-- menu master -->

                                    <li>
                                        <a href="javascript: void(0);" class="has-arrow">
                                            <i _ngcontent-xeb-c237="" class="fas fa-wallet"></i>
                                            <span data-key="t-apps">Master Data</span>
                                        </a>
                                        <ul class="sub-menu mm-collapse" aria-expanded="false">
                                            <li><a href="{{route('list_mail_template')}}">
                                                <i _ngcontent-uqw-c196="" class="fas fa-envelope"></i>
                                                <span data-key="t-invoice-detail">Email Template</span></a>                  
                                            </li>
                                            <li><a href="{{route('listpengaduan_klasifikasi')}}">
                                                <i _ngcontent-uqw-c196="" class="far fa-chart-bar"></i>
                                                <span data-key="t-invoice-detail">Klasifikasi</span></a>                  
                                            </li>
                                            
                                            <li><a href="{{route('listpengaduan_kategori')}}">
                                                <i _ngcontent-uqw-c196="" class="far fa-list-alt"></i>
                                                <span data-key="t-invoice-detail">Kategori</span>
                                                </a>
                                            </li>
                                            
                                            <li><a href="{{route('listpengaduan_jenis')}}">
                                                <i _ngcontent-uqw-c196="" class="fas fa-hockey-puck"></i>
                                                <span data-key="t-invoice-detail">Jenis Pengaduan</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="{{ route('listpengaduan_kanal') }}">
                                                    <i _ngcontent-uqw-c196="" class="far fa-chart-bar"></i>
                                                    <span data-key="t-invoice-detail">Kanal Pengaduan</span>
                                                </a>
                                            </li>
                                            <li><a href="{{ route('listpengaduan_status') }}">
                                                <i _ngcontent-uqw-c196="" class="fab fa-delicious"></i>
                                                <span data-key="t-invoice-detail">Status Pengaduan</span>
                                                </a>
                                            </li>
                                            <li><a href="{{route('list_faq')}}">
                                                <i _ngcontent-uqw-c196="" class="fab fa-codiepie"></i>
                                                <span data-key="t-invoice-detail">FAQ</span>
                                            </a>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                </li>

                                <!--end master -->
                                <!-- manager user -->
            
                                <li>
                                    <a href="javascript: void(0);" class="has-arrow">
                                        <i _ngcontent-xeb-c237="" class="fas fa-users"></i>
                                        <span data-key="t-apps">User Management</span>
                                    </a>

                                    <ul class="sub-menu mm-collapse" aria-expanded="false">
                                        <li><a href="{{ route('listregister') }}">
                                        <i _ngcontent-xeb-c237="" class="fas fa-users"></i>
                                            <span data-key="t-invoice-detail">Users
                                            </span>
                                        </a>
                                        </li>
                                        <li><a href="#"> 
                                            <i _ngcontent-xeb-c237="" class="fas fa-users"></i>
                                            <span  data-key="t-invoice-detail">User Role</span>
                                            </a>
                                        </li>
                                        <li class="sub-menu mm-collapse" aria-expanded="false">
                                        <li><a href="#"> <i _ngcontent-xeb-c237="" class="fas fa-users"></i>
                                            <span  data-key="t-invoice-detail">Role Authorization</span>
                                            </a>
                                        </li>
                                </li>
                                </ul>
                                </li>
                                <!-- end manager user --->

                                <!-- starts manager user -->
                                <li>
                                    <a href="{{ url('admin/settings') }}"> 
                                        <i class="fas fa-users"></i>
                                        <span data-key="t-invoice-detail">Setting</span>
                                    </a>
<!--                                    <ul class="sub-menu mm-collapse" aria-expanded="false">
                                        <li><a href="#"> <i _ngcontent-xeb-c237="" class="fas fa-users"></i>
                                            <span  data-key="t-invoice-detail">Setting Akses Menu & Page</span>
                                         </a>
                                        </li>
                                        <li><a  href="#"> <i _ngcontent-xeb-c237="" class="fas fa-users"></i>
                                            <span data-key="t-invoice-detail">Parameter Durasi SLA</span>
                                            </a>
                                        </li>
                                        <ul class="sub-menu mm-collapse" aria-expanded="false">
                                            <li><a href="#"> <i _ngcontent-xeb-c237="" class="fas fa-users"></i>
                                            <span data-key="t-invoice-detail">Parameter System</span>
                                            </a>
                                        </li>
                                        <li><a href="#"> <i _ngcontent-xeb-c237="" class="fas fa-users"></i>
                                            <span data-key="t-invoice-detail">Log Pengaduan</span>
                                            </a>
                                        </li>
                                 
                                    </li>-->
                                </li>
                                <!-- moduls konfigurasi -->
                                <!---  --->
                                


                                </li>


                            </div>
                            <!-- Sidebar -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="simplebar-placeholder" style="width: auto; height: 995px;"></div>
        </div>
        <div class="simplebar-track simplebar-horizontal" style="visibility: hidden;">
            <div class="simplebar-scrollbar" style="transform: translate3d(0px, 0px, 0px); display: none;"></div>
        </div>
        <div class="simplebar-track simplebar-vertical" style="visibility: visible;">
            <div class="simplebar-scrollbar"
                style="height: 268px; transform: translate3d(0px, 0px, 0px); display: block;"></div>
        </div>
    </div>
</div>
<!-- Left Sidebar menu End -->