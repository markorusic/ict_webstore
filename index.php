<?php
$page_title = "274 store";
$page_description = "247 store. Ovde mozete pronaci ono sto ste oduvek zeleli.";
include('header.php'); ?>

<!-- Main Container -->
<main id="home">
    <!-- Hero Container -->
    <div class="hero-container">
        <div class="hero-overlay-bg">
            <div>
                <div>
                    <h1 id="shop-logo" class="lobster">247 Shop</h1>
                </div>

                <div class="col-12 offset-lg-2 col-lg-8">
                    <p>Ovde mozete pronaci ono sto ste oduvek zeleli.<br>
                        U bilo kojim bojama i brojevima.<br>
                </div>

                <div>
                    <a href="#" class="btn-white" id="hero-share-store">Podeli</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Hero Container END -->

    <!-- Store Info -->
    <div>
        <section class="text-center shop-info-section">
            <div class="flex-space-around-res">
                <div>
                    <article>
                        <h4>Popust</h4>
                        <p>Za svaku kupljenu stvar dobijate kupon koji Vam omogucava popust na sledecu kupovinu!</p>
                        <ul class="list-reset">
                            <li><span class="square-ul"></span> Jedan proizvod - 10%</li>
                            <li><span class="square-ul"></span> Dva proizvoda - 20%</li>
                            <li><span class="square-ul"></span> Pet proizvoda - 40%</li>
                        </ul>
                    </article>
                </div>
                <div>
                    <article>
                        <h4>Placajte na rate</h4>
                        <p>Olaksajte sebi proces placanja, platite na rate ili na odlozeno!</p>
                        <ul class="list-reset">
                            <li><span class="square-ul"></span> Odlozeno placenje od 12 ili 24 meseca</li>
                            <li><span class="square-ul"></span> Preko administrativne zabrane penzionog ceka bez kamate</li>
                        </ul>
                    </article>
                </div>
                <div>
                    <article>
                        <h4>Vredne nagrade</h4>
                        <p>Svakom kupovinom ostvarujete sansu da osvojite vredne bonuse!</p>
                        <ul class="list-reset">
                            <li><span class="square-ul"></span> Vaucer u vrednosti od 500 <i class="fa fa-eur"></i></li>
                            <li><span class="square-ul"></span> Kupon sa 50% popusta</li>
                            <li><span class="square-ul"></span> Vikend za dvoje </li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    </div>

    <div class="shop-counter">
        <div>
            <h5>Specijana ponuda traje jos:</h5>
            <div class="shop-counter-clock text-center">
                <div>
                    <span class="cc-number days">15</span>
                    <span>dana</span>
                </div>
                <div>
                    <span class="cc-number hours">0</span>
                    <span>sati</span>
                </div>
                <div>
                    <span class="cc-number minutes">0</span>
                    <span>minuta</span>
                </div>
                <div>
                    <span class="cc-number seconds">0</span>
                    <span>sekundi</span>
                </div>
            </div>
        </div>
    </div>
    <!-- Store Info END -->

    <!-- Articles List -->
    <div class="store-articles-list">
        <section>
            <!-- Sort by -->
            <div class="sort-by">
                <ul class="list-reset">
                    <li><a href="#" data-sort="cipele">Cipele</a></li>
                    <li><a href="#" data-sort="satovi">Satovi</a></li>
                    <li><a href="#" data-sort="kosulje">Kosulje</a></li>
                </ul>
                <div class="newsletter search-articles-by-name">
                    <input type="text" placeholder="Pretrazi po nazivu proizvoda">
                </div>
            </div>

            <!-- Photos -->
            <div class="articles-row">
                <!-- Prikazuje se dinamicki kroz Javascipt -->
            </div>
        </section>
    </div>
    <!-- Articles List END -->

    <!-- Cart Notification -->
    <div class="cart-notification bottom-right" style="display: none;">
        <span class="close-notification">
            <a href="#"><i class="fa fa-chevron-down" aria-hidden="true"></i></a>
        </span>
        <span class="info">
            <a href="#" class="show-popover-cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Brzi pregled</a>    
        </span>
        
        <span class="cache-out">
            <a href="/korpa.php">Korpa</a>
        </span>
    </div>

    <div class="popover-cart bottom-right" style="display: none;">
        <span class="close-notification">
            <a href="#"><i class="fa fa-chevron-down" aria-hidden="true"></i></a>
        </span>
        <div class="title"><a href="/korpa.php">Korpa</a></div>
        <table class='table'>
            <thead>
                <tr>
                    <th>Slika</th>
                    <th>Naziv</th>
                    <th>Kolicina</th>
                    <th>Cena</th>
                </tr>
            </thead>
            <tbody>                                    
            </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4">Ukupno: </td>
                        <td class="total-price"></td>
                    </tr>
                </tfoot>
        </table>
    </div>
    <!-- Cart Notification END -->


    <!-- Share modal -->
    <div class="modal-mask login-modal share-modal" id="share-store-modal">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header-ss">
                    <a class="top-right" href="#"><i class="fa fa-times" aria-hidden="true"></i></a>
                    <img src="img/logo.png" alt="Logo 247 store" class="log-reg-logo">
                </div>

                <div>
                    <h5>Podelite nasu prodavnicu!</h5>
                </div>

                <div class="modal-body">
                    <div id="share-buttons">

                        <!-- Facebook -->
                        <a href="http://www.facebook.com/sharer.php?u=https://markorusic-247-store.herokuapp.com" target="_blank">
                            <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
                        </a>
                        
                        <!-- Google+ -->
                        <a href="https://plus.google.com/share?url=https://markorusic-247-store.herokuapp.com/#" target="_blank">
                            <img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" />
                        </a>
                        
                        <!-- LinkedIn -->
                        <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://markorusic-247-store.herokuapp.com/#" target="_blank">
                            <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />
                        </a>
                        
                        <!-- Print -->
                        <a href="javascript:;" onclick="window.print()">
                            <img src="https://simplesharebuttons.com/images/somacro/print.png" alt="Print" />
                        </a>
                        
                        <!-- Reddit -->
                        <a href="http://reddit.com/submit?url=https://markorusic-247-store.herokuapp.com/#&amp;title=247 Store" target="_blank">
                            <img src="https://simplesharebuttons.com/images/somacro/reddit.png" alt="Reddit" />
                        </a>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Share modal END -->

<?php include('footer.php') ?>